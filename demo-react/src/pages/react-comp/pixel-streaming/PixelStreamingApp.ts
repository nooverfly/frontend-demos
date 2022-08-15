import { message } from "antd";
import WebRtcPlayer from "./WebRtcPlayer";

let haveEvents = "GamepadEvent" in window;
let haveWebkitEvents = "WebKitGamepadEvent" in window;
// @ts-ignore
const WebSocket = window.WebSocket || window.MozWebSocket;
const WS_OPEN_STATE = 1;
const ToClientMessageType = {
  QualityControlOwnership: 0,
  Response: 1,
  Command: 2,
  FreezeFrame: 3,
  UnfreezeFrame: 4,
  VideoEncoderAvgQP: 5,
  LatencyTest: 6,
  InitialSettings: 7,
  FileExtension: 8,
  FileMimeType: 9,
  FileContents: 10,
};

// Must be kept in sync with PixelStreamingProtocol::EToUE4Msg C++ enum.
const MessageType = {
  /**********************************************************************/

  /*
   * Control Messages. Range = 0..49.
   */
  IFrameRequest: 0,
  RequestQualityControl: 1,
  FpsRequest: 2,
  AverageBitrateRequest: 3,
  StartStreaming: 4,
  StopStreaming: 5,
  LatencyTest: 6,
  RequestInitialSettings: 7,

  /**********************************************************************/

  /*
   * Input Messages. Range = 50..89.
   */

  // Generic Input Messages. Range = 50..59.
  UIInteraction: 50,
  Command: 51,

  // Keyboard Input Message. Range = 60..69.
  KeyDown: 60,
  KeyUp: 61,
  KeyPress: 62,

  // Mouse Input Messages. Range = 70..79.
  MouseEnter: 70,
  MouseLeave: 71,
  MouseDown: 72,
  MouseUp: 73,
  MouseMove: 74,
  MouseWheel: 75,

  // Touch Input Messages. Range = 80..89.
  TouchStart: 80,
  TouchEnd: 81,
  TouchMove: 82,

  // Gamepad Input Messages. Range = 90..99
  GamepadButtonPressed: 90,
  GamepadButtonReleased: 91,
  GamepadAnalog: 92,

  /**************************************************************************/
};

const ControlSchemeType = {
  // A mouse can lock inside the WebRTC player so the user can simply move the
  // mouse to control the orientation of the camera. The user presses the
  // Escape key to unlock the mouse.
  LockedMouse: 0,

  // A mouse can hover over the WebRTC player so the user needs to click and
  // drag to control the orientation of the camera.
  HoveringMouse: 1,
};

let inputOptions = {
  // The control scheme controls the behaviour of the mouse when it interacts
  // with the WebRTC player.
  controlScheme: ControlSchemeType.LockedMouse,

  // Browser keys are those which are typically used by the browser UI. We
  // usually want to suppress these to allow, for example, UE4 to show shader
  // complexity with the F5 key without the web page refreshing.
  suppressBrowserKeys: true,

  // UE4 has a faketouches option which fakes a single finger touch when the
  // user drags with their mouse. We may perform the reverse; a single finger
  // touch may be converted into a mouse drag UE4 side. This allows a
  // non-touch application to be controlled partially via a touch device.
  fakeMouseWithTouches: false,
};

let afk: any = {
  enabled: false, // Set to true to enable the AFK system.
  warnTimeout: 120, // The time to elapse before warning the user they are inactive.
  closeTimeout: 10, // The time after the warning when we disconnect the user.

  active: false, // Whether the AFK system is currently looking for inactivity.
  overlay: undefined, // The UI overlay warning the user that they are inactive.
  warnTimer: undefined, // The timer which waits to show the inactivity warning overlay.
  countdown: 0, // The inactivity warning overlay has a countdown to show time until disconnect.
  countdownTimer: undefined, // The timer used to tick the seconds shown on the inactivity warning overlay.
};

let freezeFrame: any = {
  receiving: false,
  size: 0,
  jpeg: undefined,
  height: 0,
  width: 0,
  valid: false,
};

let file: any = {
  mimetype: "",
  extension: "",
  receiving: false,
  size: 0,
  data: [],
  valid: false,
  timestampStart: undefined,
};

let print_inputs = false;
let normalizeAndQuantizeUnsigned: any = undefined;
let normalizeAndQuantizeSigned: any = undefined;
let unquantizeAndDenormalizeUnsigned: any = undefined;

let styleWidth: any = 0;
let styleHeight: any = 0;
let styleTop: any = 0;
let styleLeft: any = 0;
let styleCursor = "default";
let styleAdditional: any;
let VideoEncoderQP: any = "N/A";
let streamTrackSource: any = null;

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const MouseButton = {
  MainButton: 0, // Left button.
  AuxiliaryButton: 1, // Wheel button.
  SecondaryButton: 2, // Right button.
  FourthButton: 3, // Browser Back button.
  FifthButton: 4, // Browser Forward button.
};

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
const MouseButtonsMask = {
  PrimaryButton: 1, // Left button.
  SecondaryButton: 2, // Right button.
  AuxiliaryButton: 4, // Wheel button.
  FourthButton: 8, // Browser Back button.
  FifthButton: 16, // Browser Forward button.
};

// Fix for bug in iOS where windowsize is not correct at instance or orientation change
// https://github.com/dimsemenov/PhotoSwipe/issues/1315
let _orientationChangeTimeout: any;

// Must be kept in sync with JavaScriptKeyCodeToFKey C++ array. The index of the
// entry in the array is the special key code given below.
const SpecialKeyCodes = {
  BackSpace: 8,
  Shift: 16,
  Control: 17,
  Alt: 18,
  RightShift: 253,
  RightControl: 254,
  RightAlt: 255,
};
function getKeyCode(e: any) {
  if (e.keyCode === SpecialKeyCodes.Shift && e.code === "ShiftRight")
    return SpecialKeyCodes.RightShift;
  else if (e.keyCode === SpecialKeyCodes.Control && e.code === "ControlRight")
    return SpecialKeyCodes.RightControl;
  else if (e.keyCode === SpecialKeyCodes.Alt && e.code === "AltRight")
    return SpecialKeyCodes.RightAlt;
  else return e.keyCode;
}

// Browser keys do not have a charCode so we only need to test keyCode.
function isKeyCodeBrowserKey(keyCode: any) {
  // Function keys or tab key.
  return (keyCode >= 112 && keyCode <= 123) || keyCode === 9;
}

export default class PixelStreamingApp {
  wsUrl: string;
  playerNode: HTMLDivElement;
  ws: WebSocket | undefined;
  webRtcPlayerObj: WebRtcPlayer | null;
  autoPlayAudio: boolean;
  freezeFrameOverlay: any;
  shouldShowPlayOverlay: boolean;
  qualityController: boolean;
  matchViewportResolution: any;
  lastTimeResized: number;
  resizeTimeout: any;
  playerElementClientRect: any;
  responseEventListeners: Map<any, any>;
  hiddenInput: any;
  editTextButton: any;
  activeKeys: any[];
  print_stats: boolean;

  constructor(props: any) {
    this.wsUrl = props.wsUrl;
    this.playerNode = props.playerNode;
    this.webRtcPlayerObj = null;
    this.autoPlayAudio = false;
    this.qualityController = false;

    this.shouldShowPlayOverlay = false;
    this.lastTimeResized = new Date().getTime();
    this.responseEventListeners = new Map();
    this.activeKeys = [];
    this.print_stats = false;

    this.matchViewportResolution = true;
  }

  load() {
    this.setupHtmlEvents();
    this.setupFreezeFrameOverlay();
    this.registerKeyboardEvents();
    this.start();
  }

  registerKeyboardEvents() {
    document.onkeydown = (e) => {
      this.sendInputData(
        new Uint8Array([MessageType.KeyDown, getKeyCode(e), e.repeat]).buffer
      );
      this.activeKeys.push(getKeyCode(e));
      // Backspace is not considered a keypress in JavaScript but we need it
      // to be so characters may be deleted in a UE4 text entry field.
      if (e.keyCode === SpecialKeyCodes.BackSpace) {
        document.onkeypress!({
          charCode: SpecialKeyCodes.BackSpace,
        } as any);
      }
      if (inputOptions.suppressBrowserKeys && isKeyCodeBrowserKey(e.keyCode)) {
        e.preventDefault();
      }
    };

    document.onkeyup = (e) => {
      this.sendInputData(
        new Uint8Array([MessageType.KeyUp, getKeyCode(e)]).buffer
      );
      if (inputOptions.suppressBrowserKeys && isKeyCodeBrowserKey(e.keyCode)) {
        e.preventDefault();
      }
    };

    document.onkeypress = (e) => {
      let data = new DataView(new ArrayBuffer(3));
      data.setUint8(0, MessageType.KeyPress);
      data.setUint16(1, e.charCode, true);
      this.sendInputData(data.buffer);
    };
  }

  setupFreezeFrameOverlay() {
    this.freezeFrameOverlay = document.createElement("div");
    this.freezeFrameOverlay.id = "freezeFrameOverlay";
    this.freezeFrameOverlay.style.display = "none";
    this.freezeFrameOverlay.style.pointerEvents = "none";
    this.freezeFrameOverlay.style.position = "absolute";
    this.freezeFrameOverlay.style.zIndex = "20";

    let freezeFrameImage = document.createElement("img");
    freezeFrameImage.style.position = "absolute";
    this.freezeFrameOverlay.appendChild(freezeFrameImage);
  }

  start() {
    this.connect();
  }

  connect() {
    // 连接mqtt
    if (!WebSocket) {
      message.warning("Your browser doesn't support WebSocket");
      return;
    }
    const href = window.location.href;
    this.ws = new WebSocket(
      this.wsUrl
        ? this.wsUrl
        : href.indexOf("http://") > -1
        ? `ws://${window.location.hostname}/`
        : `wss://${window.location.hostname}/`
    );

    this.ws.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      switch (msg.type) {
        case "config":
          console.log(
            "%c[Inbound SS (config)]",
            "background: lightblue; color: black",
            msg
          );
          this.onConfig(msg);
          break;
        case "playerCount":
          console.log(
            "%c[Inbound SS (playerCount)]",
            "background: lightblue; color: black",
            msg
          );
          break;
        case "offer":
          console.log(
            "%c[Inbound SS (offer)]",
            "background: lightblue; color: black",
            msg
          );
          this.onWebRtcOffer(msg);
          break;
        case "answer":
          console.log(
            "%c[Inbound SS (answer)]",
            "background: lightblue; color: black",
            msg
          );
          this.onWebRtcAnswer(msg);
          break;
        case "iceCandidate":
          this.onWebRtcIce(msg.candidate);
          break;
        case "warning":
          console.log(msg);
          break;
        default:
          console.error("Invalid SS message type", msg.type);
      }
    };

    this.ws.onerror = (event) => {
      console.log(`WS error: ${JSON.stringify(event)}`);
    };

    this.ws.onclose = (event) => {
      console.log(`WS closed: ${JSON.stringify(event.code)}-${event.reason}`);
      // Todo
      this.ws = undefined;
      /* if () {
        this.playerNode.removeChild();

      } */
    };
  }

  onConfig(config: any) {
    let playerElement = this.setupWebRtcPlayer(this.playerNode, config);
    this.resizePlayerStyle();

    switch (inputOptions.controlScheme) {
      case ControlSchemeType.HoveringMouse:
        this.registerHoveringMouseEvents(playerElement);
        break;
      case ControlSchemeType.LockedMouse:
        this.registerLockedMouseEvents(playerElement);
        break;
      default:
        console.log(
          `ERROR: Unknown control scheme ${inputOptions.controlScheme}`
        );
        this.registerLockedMouseEvents(playerElement);
        break;
    }
  }

  onWebRtcOffer(webRTCData: any) {
    this.webRtcPlayerObj!.receiveOffer(webRTCData);
  }

  onWebRtcAnswer(webRTCData: any) {
    this.webRtcPlayerObj!.receiveAnswer(webRTCData);
  }

  onWebRtcIce(iceCandidate: any) {
    if (this.webRtcPlayerObj) {
      this.webRtcPlayerObj.handleCandidateFromServer(iceCandidate);
    }
  }

  setupWebRtcPlayer(htmlElement: HTMLDivElement, config: any) {
    this.webRtcPlayerObj = new WebRtcPlayer(config);
    this.autoPlayAudio = false;
    htmlElement.appendChild(this.webRtcPlayerObj.video);
    htmlElement.appendChild(this.webRtcPlayerObj.audio);
    htmlElement.appendChild(this.freezeFrameOverlay);

    this.webRtcPlayerObj.onWebRtcOffer = (offer: RTCSessionDescriptionInit) => {
      if (this.ws && this.ws.readyState === WS_OPEN_STATE) {
        let offerStr = JSON.stringify(offer);
        console.log(
          "%c[Outbound SS message (offer)]",
          "background: lightgreen; color: black",
          offer
        );
        this.ws.send(offerStr);
      }
    };

    this.webRtcPlayerObj.onWebRtcCandidate = (candidate: any) => {
      if (this.ws && this.ws.readyState === WS_OPEN_STATE) {
        this.ws.send(
          JSON.stringify({
            type: "iceCandidate",
            candidate: candidate,
          })
        );
      }
    };

    this.webRtcPlayerObj.onWebRtcAnswer = (answer: any) => {
      if (this.ws && this.ws.readyState === WS_OPEN_STATE) {
        let answerStr = JSON.stringify(answer);
        console.log(
          "%c[Outbound SS message (answer)]",
          "background: lightgreen; color: black",
          answer
        );
        this.ws.send(answerStr);
      }
    };

    this.webRtcPlayerObj.onVideoInitialised = () => {
      if (this.ws && this.ws.readyState === WS_OPEN_STATE) {
        this.resizePlayerStyle();
        this.playStream();
      }
    };

    this.webRtcPlayerObj.onDataChannelConnected = () => {
      if (this.ws && this.ws.readyState === WS_OPEN_STATE) {
        this.showTextOverlay(
          "WebRTC data channel connected... waiting for video"
        );
        this.requestQualityControl();
      }
    };

    const showFreezeFrame = () => {
      let base64 = window.btoa(
        freezeFrame.jpeg.reduce(
          (data: any, byte: any) => data + String.fromCharCode(byte),
          ""
        )
      );
      let freezeFrameImage = document.getElementById("freezeFrameOverlay")!
        .childNodes[0] as HTMLImageElement;
      freezeFrameImage.src = "data:image/jpeg;base64," + base64;
      freezeFrameImage.onload = () => {
        freezeFrame.height = freezeFrameImage.naturalHeight;
        freezeFrame.width = freezeFrameImage.naturalWidth;
        this.resizeFreezeFrameOverlay();
        if (this.shouldShowPlayOverlay) {
          this.showPlayOverlay();
          this.resizePlayerStyle();
        } else {
          this.showFreezeFrameOverlay();
        }
        this.webRtcPlayerObj!.setVideoEnabled(false);
      };
    };

    const processFileExtension = (view: any) => {
      // Reset file if we got a file message and we are not "receiving" it yet
      if (!file.receiving) {
        file.mimetype = "";
        file.extension = "";
        file.receiving = true;
        file.valid = false;
        file.size = 0;
        file.data = [];
        file.timestampStart = new Date().getTime();
        console.log("Received first chunk of file");
      }

      let extensionAsString = new TextDecoder("utf-16").decode(view.slice(1));
      console.log(extensionAsString);
      file.extension = extensionAsString;
    };

    const processFileMimeType = (view: any) => {
      // Reset file if we got a file message and we are not "receiving" it yet
      if (!file.receiving) {
        file.mimetype = "";
        file.extension = "";
        file.receiving = true;
        file.valid = false;
        file.size = 0;
        file.data = [];
        file.timestampStart = new Date().getTime();
        console.log("Received first chunk of file");
      }

      let mimeAsString = new TextDecoder("utf-16").decode(view.slice(1));
      console.log(mimeAsString);
      file.mimetype = mimeAsString;
    };

    const processFileContents = (view: any) => {
      // If we haven't received the intial setup instructions, return
      if (!file.receiving) return;

      // Extract the toal size of the file (across all chunks)
      file.size = Math.ceil(
        new DataView(view.slice(1, 5).buffer).getInt32(0, true) /
          16379 /* The maximum number of payload bits per message*/
      );

      // Get the file part of the payload
      let fileBytes = view.slice(1 + 4);

      // Append to existing data that holds the file
      file.data.push(fileBytes);

      // Uncomment for debug
      console.log(`Received file chunk: ${file.data.length}/${file.size}`);

      if (file.data.length === file.size) {
        file.receiving = false;
        file.valid = true;
        console.log("Received complete file");
        const transferDuration = new Date().getTime() - file.timestampStart;
        const transferBitrate = Math.round(
          (file.size * 16 * 1024) / transferDuration
        );
        console.log(
          `Average transfer bitrate: ${transferBitrate}kb/s over ${
            transferDuration / 1000
          } seconds`
        );

        // File reconstruction
        /**
         * Example code to reconstruct the file
         *
         * This code reconstructs the received data into the original file based on the mime type and extension provided and then downloads the reconstructed file
         */
        // var received = new Blob(file.data, { type: file.mimetype });
        // var a = document.createElement("a");
        // a.setAttribute("href", URL.createObjectURL(received));
        // a.setAttribute("download", `transfer.${file.extension}`);
        // var aj = $(a);
        // aj.appendTo("body");
        // // aj[0].click();
        // aj.remove();
      } else if (file.data.length > file.size) {
        file.receiving = false;
        console.error(
          `Received bigger file than advertised: ${file.data.length}/${file.size}`
        );
      }
    };

    const processFreezeFrameMessage = (view: any) => {
      // Reset freeze frame if we got a freeze frame message and we are not "receiving" yet.
      if (!freezeFrame.receiving) {
        freezeFrame.receiving = true;
        freezeFrame.valid = false;
        freezeFrame.size = 0;
        freezeFrame.jpeg = undefined;
      }

      // Extract total size of freeze frame (across all chunks)
      freezeFrame.size = new DataView(view.slice(1, 5).buffer).getInt32(
        0,
        true
      );

      // Get the jpeg part of the payload
      let jpegBytes = view.slice(1 + 4);

      // Append to existing jpeg that holds the freeze frame
      if (freezeFrame.jpeg) {
        let jpeg = new Uint8Array(freezeFrame.jpeg.length + jpegBytes.length);
        jpeg.set(freezeFrame.jpeg, 0);
        jpeg.set(jpegBytes, freezeFrame.jpeg.length);
        freezeFrame.jpeg = jpeg;
      }
      // No existing freeze frame jpeg, make one
      else {
        freezeFrame.jpeg = jpegBytes;
        freezeFrame.receiving = true;
        console.log(
          `received first chunk of freeze frame: ${freezeFrame.jpeg.length}/${freezeFrame.size}`
        );
      }

      // Uncomment for debug
      //console.log(`Received freeze frame chunk: ${freezeFrame.jpeg.length}/${freezeFrame.size}`);

      // Finished receiving freeze frame, we can show it now
      if (freezeFrame.jpeg.length === freezeFrame.size) {
        freezeFrame.receiving = false;
        freezeFrame.valid = true;
        console.log(`received complete freeze frame ${freezeFrame.size}`);
        showFreezeFrame();
      }
      // We received more data than the freeze frame payload message indicate (this is an error)
      else if (freezeFrame.jpeg.length > freezeFrame.size) {
        console.error(
          `received bigger freeze frame than advertised: ${freezeFrame.jpeg.length}/${freezeFrame.size}`
        );
        freezeFrame.jpeg = undefined;
        freezeFrame.receiving = false;
      }
    };

    this.webRtcPlayerObj.onNewVideoTrack = (streams: any) => {
      if (
        this.webRtcPlayerObj!.video &&
        this.webRtcPlayerObj!.video.srcObject &&
        this.webRtcPlayerObj!.onVideoInitialised
      ) {
        this.webRtcPlayerObj!.onVideoInitialised();
      }
    };

    this.webRtcPlayerObj.onDataChannelMessage = (data: any) => {
      let view = new Uint8Array(data);

      if (view[0] === ToClientMessageType.QualityControlOwnership) {
        let ownership = view[1] === 0 ? false : true;
        console.log(
          "Received quality controller message, will control quality: " +
            ownership
        );
        this.qualityController = ownership;

        const qualityControlOwnershipCheckBox = document.getElementById(
          "quality-control-ownership-tgl"
        ) as HTMLInputElement;
        // If we own the quality control, we can't relinquish it. We only lose
        // quality control when another peer asks for it
        if (qualityControlOwnershipCheckBox !== null) {
          qualityControlOwnershipCheckBox.disabled = ownership;
          qualityControlOwnershipCheckBox.checked = ownership;
        }
      } else if (view[0] === ToClientMessageType.Response) {
        let response = new TextDecoder("utf-16").decode(data.slice(1));
        for (let listener of this.responseEventListeners.values()) {
          listener(response);
        }
      } else if (view[0] === ToClientMessageType.Command) {
        let commandAsString = new TextDecoder("utf-16").decode(data.slice(1));
        console.log(commandAsString);
        let command = JSON.parse(commandAsString);
        if (command.command === "onScreenKeyboard") {
          this.showOnScreenKeyboard(command);
        }
      } else if (view[0] === ToClientMessageType.FreezeFrame) {
        processFreezeFrameMessage(view);
      } else if (view[0] === ToClientMessageType.UnfreezeFrame) {
        this.invalidateFreezeFrameOverlay();
      } else if (view[0] === ToClientMessageType.VideoEncoderAvgQP) {
        VideoEncoderQP = new TextDecoder("utf-16").decode(data.slice(1));
        //console.log(`received VideoEncoderAvgQP ${VideoEncoderQP}`);
      } else if (view[0] == ToClientMessageType.LatencyTest) {
        let latencyTimingsAsString = new TextDecoder("utf-16").decode(
          data.slice(1)
        );
        console.log("Got latency timings from UE.");
        console.log(latencyTimingsAsString);
        let latencyTimingsFromUE = JSON.parse(latencyTimingsAsString);
        if (this.webRtcPlayerObj) {
          this.webRtcPlayerObj.latencyTestTimings.SetUETimings(
            latencyTimingsFromUE
          );
        }
      } else if (view[0] == ToClientMessageType.InitialSettings) {
        let settingsString = new TextDecoder("utf-16").decode(data.slice(1));
        let settingsJSON = JSON.parse(settingsString);

        if (settingsJSON.PixelStreaming) {
          let allowConsoleCommands =
            settingsJSON.PixelStreaming.AllowPixelStreamingCommands;
          if (allowConsoleCommands === false) {
            document.getElementById(
              "encoder-min-qp-text"
            ); /* ?.disabled = true;
            document.getElementById("encoder-max-qp-text").disabled = true;
            document.getElementById("webrtc-fps-text").disabled = true;
            document.getElementById("webrtc-min-bitrate-text").disabled = true;
            document.getElementById("webrtc-max-bitrate-text").disabled = true;
            document.getElementById("show-fps-button").disabled = true;
            document.getElementById("encoder-params-submit").disabled = true;
            document.getElementById("webrtc-params-submit").disabled = true; */

            if (!document.getElementById("warning-elem-webrtc")) {
              let warningElem1 = document.createElement("p");
              warningElem1.innerText =
                "(Disabled by -AllowPixelStreamingCommands=false)";
              // @ts-ignore
              warningElem1.classList = "subtitle-text";
              warningElem1.id = "warning-elem-webrtc";
              const settingHeader = document.getElementById(
                "webRTCSettingsHeader"
              );
              if (settingHeader) {
                settingHeader.appendChild(warningElem1);
              }
            }

            if (!document.getElementById("warning-elem-encoder")) {
              let warningElem2 = document.createElement("p");
              warningElem2.innerText =
                "(Disabled by -AllowPixelStreamingCommands=false)";
              // @ts-ignore
              warningElem2.classList = "subtitle-text";
              warningElem2.id = "warning-elem-encoder";
              const setHeader = document.getElementById(
                "encoderSettingsHeader"
              );
              if (setHeader) {
                setHeader.appendChild(warningElem2);
              }
            }

            console.warn(
              "-AllowPixelStreamingCommands=false, sending console commands from browser to UE is disabled, including toggling FPS and changing encoder settings from the browser."
            );
          }
          /* let disableLatencyTest =
            settingsJSON.PixelStreaming.DisableLatencyTest;
          if (disableLatencyTest) {
            document.getElementById("test-latency-button").disabled = true;
            document.getElementById("test-latency-button").title =
              "Disabled by -PixelStreamingDisableLatencyTester=true";
            console.warn(
              "-PixelStreamingDisableLatencyTester=true, requesting latency report from the the browser to UE is disabled."
            );
          } */
        }
        /* if (settingsJSON.Encoder) {
          document.getElementById("encoder-min-qp-text").value =
            settingsJSON.Encoder.MinQP;
          document.getElementById("encoder-max-qp-text").value =
            settingsJSON.Encoder.MaxQP;
        }
        if (settingsJSON.WebRTC) {
          document.getElementById("webrtc-fps-text").value =
            settingsJSON.WebRTC.FPS;
          // reminder bitrates are sent in bps but displayed in kbps
          document.getElementById("webrtc-min-bitrate-text").value =
            settingsJSON.WebRTC.MinBitrate / 1000;
          document.getElementById("webrtc-max-bitrate-text").value =
            settingsJSON.WebRTC.MaxBitrate / 1000;
        } */
      } else if (view[0] == ToClientMessageType.FileExtension) {
        processFileExtension(view);
      } else if (view[0] == ToClientMessageType.FileMimeType) {
        processFileMimeType(view);
      } else if (view[0] == ToClientMessageType.FileContents) {
        processFileContents(view);
      } else {
        console.error(`unrecognized data received, packet ID ${view[0]}`);
      }
    };

    this.registerInputs(this.webRtcPlayerObj.video);

    // On a touch device we will need special ways to show the on-screen keyboard.
    if ("ontouchstart" in document.documentElement) {
      this.createOnScreenKeyboardHelpers(htmlElement);
    }

    //createWebRtcOffer();
    return this.webRtcPlayerObj.video;
  }

  showPlayOverlay() {
    let divNode = document.createElement("div");
    divNode.innerText = "Start Streaming";
    this.setOverlay("clickableState", divNode, (event: any) => {
      this.playStream();
    });
    this.shouldShowPlayOverlay = false;
  }

  hideOverlay() {
    this.setOverlay("hiddenState");
  }

  setOverlay(
    htmlClass: string,
    htmlElement?: HTMLElement,
    onClickFunction?: any
  ) {
    let videoPlayOverlay = document.getElementById("videoPlayOverlay");
    if (!videoPlayOverlay) {
      videoPlayOverlay = document.createElement("div");
      videoPlayOverlay.id = "videoPlayOverlay";
      this.playerNode.appendChild(videoPlayOverlay);
    }

    // Remove existing html child elements so we can add the new one
    while (videoPlayOverlay.lastChild) {
      videoPlayOverlay.removeChild(videoPlayOverlay.lastChild);
    }

    if (htmlElement) videoPlayOverlay.appendChild(htmlElement);

    if (onClickFunction) {
      const onOverlayClick = (event: any) => {
        onClickFunction(event);
        videoPlayOverlay!.removeEventListener("click", onOverlayClick);
      };
      videoPlayOverlay.addEventListener("click", onOverlayClick);
    }

    // Remove existing html classes so we can set the new one
    let cl = videoPlayOverlay.classList;
    for (let i = cl.length - 1; i >= 0; i--) {
      cl.remove(cl[i]);
    }

    videoPlayOverlay.classList.add(htmlClass);
  }

  playStream() {
    if (this.webRtcPlayerObj && this.webRtcPlayerObj.video) {
      this.playVideo();
      this.requestInitialSettings();
      this.requestQualityControl();
      this.showFreezeFrameOverlay();
      this.hideOverlay();
    } else {
      console.error(
        "Could not player video stream because webRtcPlayerObj.video was not valid."
      );
    }
  }

  playVideo() {
    this.webRtcPlayerObj!.video.play().catch((onRejectedReason) => {
      if (this.webRtcPlayerObj!.audio.srcObject) {
        this.webRtcPlayerObj!.audio.pause();
      }
      console.error(onRejectedReason);
      console.log(
        "Browser does not support autoplaying video without interaction - to resolve this we are going to show the play button overlay."
      );
      this.showPlayOverlay();
    });
  }

  requestInitialSettings() {
    this.sendInputData(
      new Uint8Array([MessageType.RequestInitialSettings]).buffer
    );
  }

  requestQualityControl() {
    if (!this.qualityController) {
      this.sendInputData(
        new Uint8Array([MessageType.RequestQualityControl]).buffer
      );
    }
  }

  showFreezeFrameOverlay() {
    if (freezeFrame.valid) {
      this.freezeFrameOverlay.classList.add("freezeframeBackground");
      this.freezeFrameOverlay.style.display = "block";
    }
  }

  // A generic message has a type and a descriptor.
  emitDescriptor(messageType: number, descriptor: any) {
    // Convert the dscriptor object into a JSON string.
    let descriptorAsString = JSON.stringify(descriptor);

    // Add the UTF-16 JSON string to the array byte buffer, going two bytes at
    // a time.
    let data = new DataView(
      new ArrayBuffer(1 + 2 + 2 * descriptorAsString.length)
    );
    let byteIdx = 0;
    data.setUint8(byteIdx, messageType);
    byteIdx++;
    data.setUint16(byteIdx, descriptorAsString.length, true);
    byteIdx += 2;
    for (let i = 0; i < descriptorAsString.length; i++) {
      data.setUint16(byteIdx, descriptorAsString.charCodeAt(i), true);
      byteIdx += 2;
    }
    this.sendInputData(data.buffer);
  }

  // A build-in command can be sent to UE4 client. The commands are defined by a
  // JSON descriptor and will be executed automatically.
  // The currently supported commands are:
  //
  // 1. A command to run any console command:
  //    "{ ConsoleCommand: <string> }"
  //
  // 2. A command to change the resolution to the given width and height.
  //    "{ Resolution.Width: <value>, Resolution.Height: <value> } }"
  //
  emitCommand(descriptor: any) {
    this.emitDescriptor(MessageType.Command, descriptor);
  }

  sendInputData(data: any) {
    if (this.webRtcPlayerObj) {
      this.resetAfkWarningTimer();
      this.webRtcPlayerObj.send(data);
    }
  }

  resetAfkWarningTimer() {
    if (afk.active) {
      clearTimeout(afk.warnTimer);
      afk.warnTimer = setTimeout(() => {
        this.showAfkOverlay();
      }, afk.warnTimeout * 1000);
    }
  }

  // Start a timer which when elapsed will warn the user they are inactive.
  startAfkWarningTimer() {
    afk.active = afk.enabled;
    this.resetAfkWarningTimer();
  }

  // Stop the timer which when elapsed will warn the user they are inactive.
  stopAfkWarningTimer() {
    afk.active = false;
  }

  updateAfkOverlayText() {
    afk.overlay.innerHTML =
      "<center>No activity detected<br>Disconnecting in " +
      afk.countdown +
      " seconds<br>Click to continue<br></center>";
  }

  showAfkOverlay() {
    // Pause the timer while the user is looking at the inactivity warning overlay.
    this.stopAfkWarningTimer();

    // Show the inactivity warning overlay.
    afk.overlay = document.createElement("div");
    afk.overlay.id = "afkOverlay";
    this.setOverlay("clickableState", afk.overlay, (event: any) => {
      // The user clicked so start the timer again and carry on.
      this.hideOverlay();
      clearInterval(afk.countdownTimer);
      this.startAfkWarningTimer();
    });

    afk.countdown = afk.closeTimeout;
    this.updateAfkOverlayText();

    if (inputOptions.controlScheme == ControlSchemeType.LockedMouse) {
      document.exitPointerLock();
    }

    afk.countdownTimer = setInterval(() => {
      afk.countdown--;
      if (afk.countdown == 0) {
        // The user failed to click so disconnect them.
        this.hideOverlay();
        this.ws!.close();
      } else {
        // Update the countdown message.
        this.updateAfkOverlayText();
      }
    }, 1000);
  }

  resizePlayerStyle(event?: any) {
    let playerElement = this.playerNode;

    if (!playerElement) return;

    this.updateVideoStreamSize();

    if (playerElement.classList.contains("fixed-size")) {
      this.setupMouseAndFreezeFrame(playerElement);
      return;
    }

    this.setupMouseAndFreezeFrame(playerElement);
  }

  updateVideoStreamSize() {
    if (!this.matchViewportResolution) {
      return;
    }

    let now = new Date().getTime();
    if (now - this.lastTimeResized > 1000) {
      let playerElement = this.playerNode;
      if (!playerElement) return;

      let descriptor = {
        ConsoleCommand:
          "r.setres " +
          playerElement.clientWidth +
          "x" +
          playerElement.clientHeight,
      };
      this.emitCommand(descriptor);
      this.lastTimeResized = new Date().getTime();
    } else {
      console.log("Resizing too often - skipping");
      this.resizeTimeout && clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.updateVideoStreamSize, 1000);
    }
  }

  setupMouseAndFreezeFrame(playerElement: any) {
    // Calculating and normalizing positions depends on the width and height of
    // the player.
    this.playerElementClientRect = playerElement.getBoundingClientRect();
    this.setupNormalizeAndQuantize();
    this.resizeFreezeFrameOverlay();
  }

  setupNormalizeAndQuantize() {
    let playerElement = this.playerNode;
    let videoElement = playerElement.getElementsByTagName("video");

    if (playerElement && videoElement.length > 0) {
      let playerAspectRatio =
        playerElement.clientHeight / playerElement.clientWidth;
      let videoAspectRatio =
        videoElement[0].videoHeight / videoElement[0].videoWidth;

      // Unsigned XY positions are the ratio (0.0..1.0) along a viewport axis,
      // quantized into an uint16 (0..65536).
      // Signed XY deltas are the ratio (-1.0..1.0) along a viewport axis,
      // quantized into an int16 (-32767..32767).
      // This allows the browser viewport and client viewport to have a different
      // size.
      // Hack: Currently we set an out-of-range position to an extreme (65535)
      // as we can't yet accurately detect mouse enter and leave events
      // precisely inside a video with an aspect ratio which causes mattes.
      if (playerAspectRatio > videoAspectRatio) {
        if (print_inputs) {
          console.log(
            "Setup Normalize and Quantize for playerAspectRatio > videoAspectRatio"
          );
        }
        let ratio = playerAspectRatio / videoAspectRatio;
        // Unsigned.
        normalizeAndQuantizeUnsigned = (x: number, y: number) => {
          let normalizedX = x / playerElement.clientWidth;
          let normalizedY =
            ratio * (y / playerElement.clientHeight - 0.5) + 0.5;
          if (
            normalizedX < 0.0 ||
            normalizedX > 1.0 ||
            normalizedY < 0.0 ||
            normalizedY > 1.0
          ) {
            return {
              inRange: false,
              x: 65535,
              y: 65535,
            };
          } else {
            return {
              inRange: true,
              x: normalizedX * 65536,
              y: normalizedY * 65536,
            };
          }
        };
        unquantizeAndDenormalizeUnsigned = (x: number, y: number) => {
          let normalizedX = x / 65536;
          let normalizedY = (y / 65536 - 0.5) / ratio + 0.5;
          return {
            x: normalizedX * playerElement.clientWidth,
            y: normalizedY * playerElement.clientHeight,
          };
        };
        // Signed.
        normalizeAndQuantizeSigned = (x: number, y: number) => {
          let normalizedX = x / (0.5 * playerElement.clientWidth);
          let normalizedY = (ratio * y) / (0.5 * playerElement.clientHeight);
          return {
            x: normalizedX * 32767,
            y: normalizedY * 32767,
          };
        };
      } else {
        if (print_inputs) {
          console.log(
            "Setup Normalize and Quantize for playerAspectRatio <= videoAspectRatio"
          );
        }
        let ratio = videoAspectRatio / playerAspectRatio;
        // Unsigned.
        normalizeAndQuantizeUnsigned = (x: number, y: number) => {
          let normalizedX = ratio * (x / playerElement.clientWidth - 0.5) + 0.5;
          let normalizedY = y / playerElement.clientHeight;
          if (
            normalizedX < 0.0 ||
            normalizedX > 1.0 ||
            normalizedY < 0.0 ||
            normalizedY > 1.0
          ) {
            return {
              inRange: false,
              x: 65535,
              y: 65535,
            };
          } else {
            return {
              inRange: true,
              x: normalizedX * 65536,
              y: normalizedY * 65536,
            };
          }
        };
        unquantizeAndDenormalizeUnsigned = (x: number, y: number) => {
          let normalizedX = (x / 65536 - 0.5) / ratio + 0.5;
          let normalizedY = y / 65536;
          return {
            x: normalizedX * playerElement.clientWidth,
            y: normalizedY * playerElement.clientHeight,
          };
        };
        // Signed.
        normalizeAndQuantizeSigned = (x: number, y: number) => {
          let normalizedX = (ratio * x) / (0.5 * playerElement.clientWidth);
          let normalizedY = y / (0.5 * playerElement.clientHeight);
          return {
            x: normalizedX * 32767,
            y: normalizedY * 32767,
          };
        };
      }
    }
  }

  resizeFreezeFrameOverlay() {
    if (freezeFrame.width !== 0 && freezeFrame.height !== 0) {
      let displayWidth = 0;
      let displayHeight = 0;
      let displayTop = 0;
      let displayLeft = 0;
      let playerElement = this.playerNode;
      // Video is coming in at native resolution, we care more about the player size
      let playerAspectRatio =
        playerElement.offsetWidth / playerElement.offsetHeight;
      let videoAspectRatio = freezeFrame.width / freezeFrame.height;
      if (playerAspectRatio < videoAspectRatio) {
        displayWidth = playerElement.offsetWidth;
        displayHeight = Math.floor(
          playerElement.offsetWidth / videoAspectRatio
        );
        displayTop = Math.floor(
          (playerElement.offsetHeight - displayHeight) * 0.5
        );
        displayLeft = 0;
      } else {
        displayWidth = Math.floor(
          playerElement.offsetHeight * videoAspectRatio
        );
        displayHeight = playerElement.offsetHeight;
        displayTop = 0;
        displayLeft = Math.floor(
          (playerElement.offsetWidth - displayWidth) * 0.5
        );
      }
      let freezeFrameImage = document.getElementById("freezeFrameOverlay")!
        .childNodes[0] as HTMLElement;
      this.freezeFrameOverlay.style.width = playerElement.offsetWidth + "px";
      this.freezeFrameOverlay.style.height = playerElement.offsetHeight + "px";
      this.freezeFrameOverlay.style.left = 0 + "px";
      this.freezeFrameOverlay.style.top = 0 + "px";

      freezeFrameImage.style.width = displayWidth + "px";
      freezeFrameImage.style.height = displayHeight + "px";
      freezeFrameImage.style.left = displayLeft + "px";
      freezeFrameImage.style.top = displayTop + "px";
    }
  }

  showTextOverlay(text: string) {
    console.log(text);
  }

  showOnScreenKeyboard(command: any) {
    if (command.showOnScreenKeyboard) {
      // Show the 'edit text' button.
      this.editTextButton.classList.remove("hiddenState");
      // Place the 'edit text' button near the UE4 input widget.
      let pos = unquantizeAndDenormalizeUnsigned(command.x, command.y);
      this.editTextButton.style.top = pos.y.toString() + "px";
      this.editTextButton.style.left = (pos.x - 40).toString() + "px";
    } else {
      // Hide the 'edit text' button.
      this.editTextButton.classList.add("hiddenState");
      // Hide the on-screen keyboard.
      this.hiddenInput.blur();
    }
  }

  createOnScreenKeyboardHelpers(htmlElement: HTMLElement) {
    if (document.getElementById("hiddenInput") === null) {
      this.hiddenInput = document.createElement("input");
      this.hiddenInput.id = "hiddenInput";
      this.hiddenInput.maxLength = 0;
      htmlElement.appendChild(this.hiddenInput);
    }

    if (document.getElementById("editTextButton") === null) {
      this.editTextButton = document.createElement("button");
      this.editTextButton.id = "editTextButton";
      this.editTextButton.innerHTML = "edit text";
      htmlElement.appendChild(this.editTextButton);

      // Hide the 'edit text' button.
      this.editTextButton.classList.add("hiddenState");

      this.editTextButton.addEventListener("click", () => {
        // Show the on-screen keyboard.
        this.hiddenInput.focus();
      });
    }
  }

  invalidateFreezeFrameOverlay() {
    this.freezeFrameOverlay.style.display = "none";
    freezeFrame.valid = false;
    this.freezeFrameOverlay.classList.remove("freezeframeBackground");

    if (this.webRtcPlayerObj) {
      this.webRtcPlayerObj.setVideoEnabled(true);
    }
  }

  registerInputs(playerElement: HTMLVideoElement) {
    if (!playerElement) return;

    this.registerMouseEnterAndLeaveEvents(playerElement);
    this.registerTouchEvents(playerElement);
  }

  registerMouseEnterAndLeaveEvents(playerElement: any) {
    playerElement.onmouseenter = (e: any) => {
      if (print_inputs) {
        console.log("mouse enter");
      }
      let Data = new DataView(new ArrayBuffer(1));
      Data.setUint8(0, MessageType.MouseEnter);
      this.sendInputData(Data.buffer);
      playerElement.pressMouseButtons(e);
    };

    playerElement.onmouseleave = (e: any) => {
      if (print_inputs) {
        console.log("mouse leave");
      }
      let Data = new DataView(new ArrayBuffer(1));
      Data.setUint8(0, MessageType.MouseLeave);
      this.sendInputData(Data.buffer);
      playerElement.releaseMouseButtons(e);
    };
  }

  registerTouchEvents(playerElement: HTMLVideoElement) {
    // We need to assign a unique identifier to each finger.
    // We do this by mapping each Touch object to the identifier.
    let fingers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    let fingerIds: any = {};

    const rememberTouch = (touch: any) => {
      let finger = fingers.pop();
      if (finger === undefined) {
        console.log("exhausted touch indentifiers");
      }
      fingerIds[touch.identifier] = finger;
    };

    const forgetTouch = (touch: any) => {
      fingers.push(fingerIds[touch.identifier]);
      delete fingerIds[touch.identifier];
    };

    const emitTouchData = (type: number, touches: any) => {
      let data = new DataView(new ArrayBuffer(2 + 7 * touches.length));
      data.setUint8(0, type);
      data.setUint8(1, touches.length);
      let byte = 2;
      for (let t = 0; t < touches.length; t++) {
        let touch = touches[t];
        let x = touch.clientX - playerElement.offsetLeft;
        let y = touch.clientY - playerElement.offsetTop;
        if (print_inputs) {
          console.log(`F${fingerIds[touch.identifier]}=(${x}, ${y})`);
        }
        let coord = normalizeAndQuantizeUnsigned(x, y);
        data.setUint16(byte, coord.x, true);
        byte += 2;
        data.setUint16(byte, coord.y, true);
        byte += 2;
        // @ts-ignore
        data.setUint8(byte, fingerIds[touch.identifier], true);
        byte += 1;
        // @ts-ignore
        data.setUint8(byte, 255 * touch.force, true); // force is between 0.0 and 1.0 so quantize into byte.
        byte += 1;
        // @ts-ignore
        data.setUint8(byte, coord.inRange ? 1 : 0, true); // mark the touch as in the player or not
        byte += 1;
      }

      this.sendInputData(data.buffer);
    };

    if (inputOptions.fakeMouseWithTouches) {
      let finger: any = undefined;

      playerElement.ontouchstart = (e: any) => {
        if (finger === undefined) {
          let firstTouch = e.changedTouches[0];
          finger = {
            id: firstTouch.identifier,
            x: firstTouch.clientX - this.playerElementClientRect.left,
            y: firstTouch.clientY - this.playerElementClientRect.top,
          };
          // Hack: Mouse events require an enter and leave so we just
          // enter and leave manually with each touch as this event
          // is not fired with a touch device.
          playerElement.onmouseenter!(e);
          this.emitMouseDown(MouseButton.MainButton, finger.x, finger.y);
        }
        e.preventDefault();
      };

      playerElement.ontouchend = (e: any) => {
        for (let t = 0; t < e.changedTouches.length; t++) {
          let touch = e.changedTouches[t];
          if (touch.identifier === finger.id) {
            let x = touch.clientX - this.playerElementClientRect.left;
            let y = touch.clientY - this.playerElementClientRect.top;
            this.emitMouseUp(MouseButton.MainButton, x, y);
            // Hack: Manual mouse leave event.
            playerElement.onmouseleave!(e);
            finger = undefined;
            break;
          }
        }
        e.preventDefault();
      };

      playerElement.ontouchmove = (e: any) => {
        for (let t = 0; t < e.touches.length; t++) {
          let touch = e.touches[t];
          if (touch.identifier === finger.id) {
            let x = touch.clientX - this.playerElementClientRect.left;
            let y = touch.clientY - this.playerElementClientRect.top;
            this.emitMouseMove(x, y, x - finger.x, y - finger.y);
            finger.x = x;
            finger.y = y;
            break;
          }
        }
        e.preventDefault();
      };
    } else {
      playerElement.ontouchstart = (e) => {
        // Assign a unique identifier to each touch.
        for (let t = 0; t < e.changedTouches.length; t++) {
          rememberTouch(e.changedTouches[t]);
        }

        if (print_inputs) {
          console.log("touch start");
        }
        emitTouchData(MessageType.TouchStart, e.changedTouches);
        e.preventDefault();
      };

      playerElement.ontouchend = (e) => {
        if (print_inputs) {
          console.log("touch end");
        }
        emitTouchData(MessageType.TouchEnd, e.changedTouches);

        // Re-cycle unique identifiers previously assigned to each touch.
        for (let t = 0; t < e.changedTouches.length; t++) {
          forgetTouch(e.changedTouches[t]);
        }
        e.preventDefault();
      };

      playerElement.ontouchmove = (e) => {
        if (print_inputs) {
          console.log("touch move");
        }
        emitTouchData(MessageType.TouchMove, e.touches);
        e.preventDefault();
      };
    }
  }

  emitMouseMove(x: number, y: number, deltaX: number, deltaY: number) {
    if (print_inputs) {
      console.log(`x: ${x}, y:${y}, dX: ${deltaX}, dY: ${deltaY}`);
    }
    let coord = normalizeAndQuantizeUnsigned(x, y);
    let delta = normalizeAndQuantizeSigned(deltaX, deltaY);
    let Data = new DataView(new ArrayBuffer(9));
    Data.setUint8(0, MessageType.MouseMove);
    Data.setUint16(1, coord.x, true);
    Data.setUint16(3, coord.y, true);
    Data.setInt16(5, delta.x, true);
    Data.setInt16(7, delta.y, true);
    this.sendInputData(Data.buffer);
  }

  emitMouseDown(button: any, x: number, y: number) {
    if (print_inputs) {
      console.log(`mouse button ${button} down at (${x}, ${y})`);
    }
    let coord = normalizeAndQuantizeUnsigned(x, y);
    let Data = new DataView(new ArrayBuffer(6));
    Data.setUint8(0, MessageType.MouseDown);
    Data.setUint8(1, button);
    Data.setUint16(2, coord.x, true);
    Data.setUint16(4, coord.y, true);
    this.sendInputData(Data.buffer);
  }

  emitMouseUp(button: any, x: number, y: number) {
    if (print_inputs) {
      console.log(`mouse button ${button} up at (${x}, ${y})`);
    }
    let coord = normalizeAndQuantizeUnsigned(x, y);
    let Data = new DataView(new ArrayBuffer(6));
    Data.setUint8(0, MessageType.MouseUp);
    Data.setUint8(1, button);
    Data.setUint16(2, coord.x, true);
    Data.setUint16(4, coord.y, true);
    this.sendInputData(Data.buffer);
  }

  emitMouseWheel(delta: any, x: number, y: number) {
    if (print_inputs) {
      console.log(`mouse wheel with delta ${delta} at (${x}, ${y})`);
    }
    let coord = normalizeAndQuantizeUnsigned(x, y);
    let Data = new DataView(new ArrayBuffer(7));
    Data.setUint8(0, MessageType.MouseWheel);
    Data.setInt16(1, delta, true);
    Data.setUint16(3, coord.x, true);
    Data.setUint16(5, coord.y, true);
    this.sendInputData(Data.buffer);
  }

  // A hovering mouse works by the user clicking the mouse button when they want
  // the cursor to have an effect over the video. Otherwise the cursor just
  // passes over the browser.
  registerHoveringMouseEvents(playerElement: HTMLVideoElement) {
    styleCursor = "none"; // We will rely on UE4 client's software cursor.
    //styleCursor = 'default';  // Showing cursor

    playerElement.onmousemove = (e) => {
      this.emitMouseMove(e.offsetX, e.offsetY, e.movementX, e.movementY);
      e.preventDefault();
    };

    playerElement.onmousedown = (e) => {
      this.emitMouseDown(e.button, e.offsetX, e.offsetY);
      e.preventDefault();
    };

    playerElement.onmouseup = (e) => {
      this.emitMouseUp(e.button, e.offsetX, e.offsetY);
      e.preventDefault();
    };

    // When the context menu is shown then it is safest to release the button
    // which was pressed when the event happened. This will guarantee we will
    // get at least one mouse up corresponding to a mouse down event. Otherwise
    // the mouse can get stuck.
    // https://github.com/facebook/react/issues/5531
    playerElement.oncontextmenu = (e) => {
      this.emitMouseUp(e.button, e.offsetX, e.offsetY);
      e.preventDefault();
    };

    if ("onmousewheel" in playerElement) {
      // @ts-ignore
      playerElement.onmousewheel = (e) => {
        this.emitMouseWheel(e.wheelDelta, e.offsetX, e.offsetY);
        e.preventDefault();
      };
    } else {
      playerElement.addEventListener(
        "DOMMouseScroll",
        (e: any) => {
          this.emitMouseWheel(e.detail * -120, e.offsetX, e.offsetY);
          e.preventDefault();
        },
        false
      );
    }
    // @ts-ignore
    playerElement.pressMouseButtons = (e) => {
      this.pressMouseButtons(e.buttons, e.offsetX, e.offsetY);
    };
    // @ts-ignore
    playerElement.releaseMouseButtons = (e) => {
      this.releaseMouseButtons(e.buttons, e.offsetX, e.offsetY);
    };
  }

  // If the user has any mouse buttons pressed then release them.
  releaseMouseButtons(buttons: any, x: number, y: number) {
    if (buttons & MouseButtonsMask.PrimaryButton) {
      this.emitMouseUp(MouseButton.MainButton, x, y);
    }
    if (buttons & MouseButtonsMask.SecondaryButton) {
      this.emitMouseUp(MouseButton.SecondaryButton, x, y);
    }
    if (buttons & MouseButtonsMask.AuxiliaryButton) {
      this.emitMouseUp(MouseButton.AuxiliaryButton, x, y);
    }
    if (buttons & MouseButtonsMask.FourthButton) {
      this.emitMouseUp(MouseButton.FourthButton, x, y);
    }
    if (buttons & MouseButtonsMask.FifthButton) {
      this.emitMouseUp(MouseButton.FifthButton, x, y);
    }
  }

  // If the user has any mouse buttons pressed then press them again.
  pressMouseButtons(buttons: any, x: number, y: number) {
    if (buttons & MouseButtonsMask.PrimaryButton) {
      this.emitMouseDown(MouseButton.MainButton, x, y);
    }
    if (buttons & MouseButtonsMask.SecondaryButton) {
      this.emitMouseDown(MouseButton.SecondaryButton, x, y);
    }
    if (buttons & MouseButtonsMask.AuxiliaryButton) {
      this.emitMouseDown(MouseButton.AuxiliaryButton, x, y);
    }
    if (buttons & MouseButtonsMask.FourthButton) {
      this.emitMouseDown(MouseButton.FourthButton, x, y);
    }
    if (buttons & MouseButtonsMask.FifthButton) {
      this.emitMouseDown(MouseButton.FifthButton, x, y);
    }
  }

  // A locked mouse works by the user clicking in the browser player and the
  // cursor disappears and is locked. The user moves the cursor and the camera
  // moves, for example. The user presses escape to free the mouse.
  registerLockedMouseEvents(playerElement: HTMLVideoElement) {
    let x = playerElement.width / 2;
    let y = playerElement.height / 2;

    playerElement.requestPointerLock =
      // @ts-ignore
      playerElement.requestPointerLock || playerElement.mozRequestPointerLock;
    document.exitPointerLock =
      // @ts-ignore
      document.exitPointerLock || document.mozExitPointerLock;

    playerElement.onclick = function () {
      playerElement.requestPointerLock();
    };

    const lockStateChange = () => {
      if (
        document.pointerLockElement === playerElement ||
        // @ts-ignore
        document.mozPointerLockElement === playerElement
      ) {
        console.log("Pointer locked");
        document.addEventListener("mousemove", updatePosition, false);
      } else {
        console.log("The pointer lock status is now unlocked");
        document.removeEventListener("mousemove", updatePosition, false);

        // If mouse loses focus, send a key up for all of the currently held-down keys
        // This is necessary as when the mouse loses focus, the windows stops listening for events and as such
        // the keyup listener won't get fired
        [...new Set(this.activeKeys)].forEach((uniqueKeycode) => {
          this.sendInputData(
            new Uint8Array([MessageType.KeyUp, uniqueKeycode]).buffer
          );
        });
        // Reset the active keys back to nothing
        this.activeKeys = [];
      }
    };
    // Respond to lock state change events
    document.addEventListener("pointerlockchange", lockStateChange, false);
    document.addEventListener("mozpointerlockchange", lockStateChange, false);

    const updatePosition = (e: any) => {
      x += e.movementX;
      y += e.movementY;
      if (x > styleWidth) {
        x -= styleWidth;
      }
      if (y > styleHeight) {
        y -= styleHeight;
      }
      if (x < 0) {
        x = styleWidth + x;
      }
      if (y < 0) {
        y = styleHeight - y;
      }
      this.emitMouseMove(x, y, e.movementX, e.movementY);
    };

    // @ts-ignore
    playerElement.onmousedown = (e) => {
      this.emitMouseDown(e.button, x, y);
    };

    playerElement.onmouseup = (e) => {
      this.emitMouseUp(e.button, x, y);
    };

    // @ts-ignore
    playerElement.onmousewheel = (e) => {
      this.emitMouseWheel(e.wheelDelta, x, y);
    };

    // @ts-ignore
    playerElement.pressMouseButtons = (e) => {
      this.pressMouseButtons(e.buttons, x, y);
    };

    // @ts-ignore
    playerElement.releaseMouseButtons = (e) => {
      this.releaseMouseButtons(e.buttons, x, y);
    };
  }

  setupHtmlEvents() {
    //Window events
    window.addEventListener("resize", this.resizePlayerStyle, true);
    window.addEventListener("orientationchange", this.onOrientationChange);
  }

  onOrientationChange(event: any) {
    clearTimeout(_orientationChangeTimeout);
    _orientationChangeTimeout = setTimeout(() => {
      this.resizePlayerStyle();
    }, 500);
  }
}
