import { useEffect, useRef } from "react";
import {
  animationFrameScheduler,
  combineLatest,
  fromEvent,
  interval,
  map,
  merge,
  Observable,
} from "rxjs";

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 10;
const BRICK_ROWS = 5;
const BRICK_COLUMNS = 7;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 3;

const PADDLE_SPEED = 240;
const PADDLE_KEYS = {
  left: 37,
  right: 39,
};

const BALL_SPEED = 60;
const TICKER_INTERVAL = 17;

const BreakoutExam = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 480;
      canvas.height = 320;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.fillStyle = "pink";

      const factory = () => {
        let width =
          (canvas.width - BRICK_GAP - BRICK_GAP * BRICK_COLUMNS) /
          BRICK_COLUMNS;
        let bricks: any[] = [];
        for (let i = 0; i < BRICK_ROWS; i++) {
          for (let j = 0; j < BRICK_COLUMNS; j++) {
            bricks.push({
              x: j * (width + BRICK_GAP) + width / 2 + BRICK_GAP,
              y:
                i * (BRICK_HEIGHT + BRICK_GAP) +
                BRICK_HEIGHT / 2 +
                BRICK_GAP +
                20,
              width: width,
              height: BRICK_HEIGHT,
            });
          }
        }
        return bricks;
      };

      const INITIAL_OBJECTS = {
        ball: {
          position: {
            x: canvas.width / 2,
            y: canvas.height / 2,
          },
          direction: {
            x: 2,
            y: 2,
          },
        },
        bricks: factory,
        score: 0,
      };

      // draw Title
      context.textAlign = "center";
      context.font = "24px Courier New";
      context.fillText(
        "rxjs breakout",
        canvas.width / 2,
        canvas.height / 2 - 24
      );

      // draw controls
      context.textAlign = "center";
      context.font = "16px Courier New";
      context.fillText(
        "press [<] and [>] to play",
        canvas.width / 2,
        canvas.height / 2
      );

      // draw author
      context.fillText(
        "by Manuel Wieser",
        canvas.width / 2,
        canvas.height / 2 + 24
      );

      // const ticker$ = map;
      /*  map(interval(TICKER_INTERVAL, animationFrameScheduler), () => ({
          time: Date.now(),
          deltaTime: null,
        }))
        .scan((previous: any, current: any) => ({
          time: current.time,
          deltaTime: (current.time - previous.time) / 1000,
        })); */

      const input$ = merge(
        fromEvent(document, "keydown", (event: any) => {
          switch (event.keyCode) {
            case PADDLE_KEYS.left:
              return -1;
            case PADDLE_KEYS.right:
              return 1;
            default:
              return 0;
          }
        }),
        fromEvent(document, "keyup", (event) => 0)
      );
    }
  }, []);

  return (
    <div
      className="__wh100"
      style={{ width: "calc(100vw - 200px)", height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        width={480}
        height={320}
        style={{ background: "salmon" }}
      ></canvas>
    </div>
  );
};

export default BreakoutExam;
