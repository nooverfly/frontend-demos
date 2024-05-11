import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Box3,
  DirectionalLight,
  DirectionalLightHelper,
  Fog,
  FogExp2,
  GridHelper,
  LoadingManager,
  LoopOnce,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  Scene,
  SpotLight,
  SpotLightHelper,
  sRGBEncoding,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
// @ts-ignore
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const REVISION = "140.2";
const MANAGER = new LoadingManager();
const THREE_PATH = `https://unpkg.com/three@0.${REVISION}`;
const DRACO_LOADER = new DRACOLoader(MANAGER).setDecoderPath(
  `${THREE_PATH}/examples/js/libs/draco/gltf/`
);
const KTX2_LOADER = new KTX2Loader(MANAGER).setTranscoderPath(
  `${THREE_PATH}/examples/js/libs/basis/`
);

const step = 1;
const liftStep = 0.5;
const angleToRad = Math.PI / 180;

enum mode {
  v,
  up,
  down,
}

export class Viewer {
  el: HTMLDivElement;
  scene: Scene;
  camera: any;
  defaultCamera: any;
  renderer: WebGLRenderer;
  controls: OrbitControls;
  loader: GLTFLoader;
  animateSelf: any;
  axesCorner: any;
  selectObj: any;
  moveTotal: number;
  liftTotal: number;
  animationMode: mode | null;
  targetObjs: any;
  pmremGenerator: PMREMGenerator;
  mixer?: AnimationMixer | null;
  clips: any;
  prevTime: number;
  constructor(el: HTMLDivElement) {
    this.el = el;

    this.scene = new Scene();
    this.moveTotal = 0;
    this.liftTotal = 0;
    this.animationMode = null;
    this.targetObjs = [];
    this.prevTime = 0;

    const fov = 25;
    this.camera = new PerspectiveCamera(
      fov,
      el.clientWidth / el.clientHeight,
      1,
      10000
    );
    this.camera.position.set(262.391, 253.388, 146.914);
    this.camera.rotation.set(
      63.6003 * angleToRad,
      0 * angleToRad,
      -28.4 * angleToRad
    );
    this.camera.lookAt(392.346, -10.0543, -500.366);
    this.defaultCamera = this.camera;

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setClearColor(0xcccccc);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(el.clientWidth, el.clientHeight);
    this.renderer.toneMappingExposure = 1.0;

    this.pmremGenerator = new PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 0;
    this.controls.autoRotate = false;
    this.controls.screenSpacePanning = true;
    this.controls.target.set(392.346, -10.0543, -500.366);

    this.el.appendChild(this.renderer.domElement);
    this.addHelper();
    this.addLight();
    this.updateEnvironment();

    const loader = new GLTFLoader(MANAGER)
      .setCrossOrigin("anonymous")
      .setDRACOLoader(DRACO_LOADER)
      .setKTX2Loader(KTX2_LOADER.detectSupport(this.renderer))
      .setMeshoptDecoder(MeshoptDecoder);
    this.loader = loader;

    // this.scene.fog = new Fog(0xefd1b5, 1000, 2000);

    this.animateSelf = this.animate.bind(this);
    requestAnimationFrame(this.animateSelf);
  }

  addHelper() {
    this.axesCorner = new AxesHelper(500);
    this.scene.add(this.axesCorner);
    // const gridHelper = new GridHelper(1000);
    // this.scene.add(gridHelper);
  }

  addLight() {
    const ambientLight = new AmbientLight(0xffffff, 1);
    this.camera.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 2);
    directionalLight.position.set(800, 200, 0); // ~60º
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    const helper = new DirectionalLightHelper(directionalLight, 5);
    this.scene.add(helper);

    // const spotLight = new SpotLight(0x404040, 3, 2000, Math.PI, 0.5, 0.5);
    // spotLight.position.set(500, 200, 300);
    // // spotLight.castShadow = true;
    // this.scene.add(spotLight);

    // const spotLightHelper = new SpotLightHelper(spotLight, 0xff0000);
    // this.scene.add(spotLightHelper);
  }

  updateEnvironment() {
    const environment = {
      id: "gamrig",
      name: "gamrig",
      path: "https://images.tuyacn.com/rms-static/8350d420-ae72-11ec-abba-53a968a3df2d-1648456739427.hdr?tyName=venice_sunset_1k.hdr", // 'https://images.tuyacn.com/rms-static/f6c70250-ab55-11ec-af62-df3a3a62f625-1648114624245.hdr?tyName=gamrig_2k.hdr',
      format: ".hdr",
    };
    this.getCubeMapTexture(environment).then(({ envMap }: any) => {
      this.scene.environment = envMap;
    });
  }

  getCubeMapTexture(environment: any) {
    const { path } = environment;
    if (!path) return Promise.resolve({ envMap: null });

    return new Promise((resolve, reject) => {
      new RGBELoader().load(
        path,
        (texture) => {
          const envMap =
            this.pmremGenerator.fromEquirectangular(texture).texture;
          this.pmremGenerator.dispose();
          resolve({ envMap });
        },
        undefined,
        reject
      );
    });
  }

  loadWithCamera(url: string, callback?: any) {
    this.loader.load(
      url,
      (gltf) => {
        const scene = gltf.scene || gltf.scenes[0];
        this.scene.add(scene);
        const camera = gltf.cameras[0];
        this.camera = camera;
        this.setClips(scene, gltf.animations);
        // const box = new Box3().setFromObject(scene);
        // const size = box.getSize(new Vector3()).length();
        // const center = box.getCenter(new Vector3());
        // console.log(size);
        if (typeof callback === "function") {
          callback(scene);
        }
      },
      undefined,
      console.log
    );
  }

  load(
    url: string,
    castShadow: boolean = false,
    receiveShadow: boolean = false,
    callback?: any
  ) {
    this.loader.load(
      url,
      (gltf) => {
        const scene = gltf.scene || gltf.scenes[0];
        this.scene.add(scene);
        if (typeof callback === "function") {
          callback(scene);
        }
      },
      undefined,
      console.log
    );
  }

  setClips(scene: any, clips: any[]) {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.mixer.getRoot());
      this.mixer = null;
    }

    this.clips = clips;
    if (!clips.length) return;

    this.mixer = new AnimationMixer(this.scene);
    this.mixer.addEventListener("finished", (e) => {
      this.defaultCamera.position.set(262.391, 253.388, 146.914);
      this.defaultCamera.rotation.set(
        63.6003 * angleToRad,
        0 * angleToRad,
        -28.4 * angleToRad
      );
      this.defaultCamera.lookAt(392.346, -10.0543, -500.366);
      this.controls.target.set(392.346, -10.0543, -500.366);
      this.defaultCamera.updateMatrixWorld(true);
      this.defaultCamera.updateProjectionMatrix();
      this.camera = this.defaultCamera;
    });
    this.clips.forEach((clip: any) => {
      const action = this.mixer!.clipAction(clip);
      action.clampWhenFinished = true;
      action.setLoop(LoopOnce, 1);
      action.play();
    });
  }

  animate(time: any) {
    requestAnimationFrame(this.animateSelf);
    this.controls.update();
    const dt = (time - this.prevTime) / 1000;
    this.mixer && this.mixer.update(dt);
    if (this.animationMode === mode.v) {
      if (this.selectObj) {
        this.moveTotal += step;
        this.selectObj.position.z -= step;
        if (this.moveTotal >= 70) {
          this.selectObj = null;
          this.animationMode = null;
        }
      }
    } else if (this.animationMode === mode.up) {
      this.liftTotal += liftStep;
      this.targetObjs.forEach((obj: any, index: number) => {
        obj.position.y += liftStep * index;
      });
      if (this.liftTotal >= 8) {
        this.targetObjs = [];
        this.animationMode = null;
      }
    } else if (this.animationMode === mode.down) {
      this.liftTotal -= liftStep;
      this.targetObjs.forEach((obj: any, index: number) => {
        obj.position.y -= liftStep * index;
      });
      if (this.liftTotal <= 0) {
        this.targetObjs = [];
        this.animationMode = null;
      }
    }
    this.render();
    this.prevTime = time;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  back(obj: any) {
    // obj.position.x += 100;
    obj.position.z += this.moveTotal;
    this.moveTotal = 0;
    this.selectObj = null;
  }

  select(obj: any) {
    // obj.position.x -= 100;
    // obj.position.z -= 80;
    this.animationMode = mode.v;
    this.selectObj = obj;
  }

  start(objs: any) {
    this.animationMode = mode.up;
    this.targetObjs = objs;
  }

  end(objs: never[]) {
    this.animationMode = mode.down;
    this.targetObjs = objs;
  }
}
