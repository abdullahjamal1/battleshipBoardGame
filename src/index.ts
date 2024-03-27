import * as P5 from "p5";
import {draw} from "./draw";
import { GLOBAL_SCALE, RGB_THEME } from "./constants/constants";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

function unsetMouseIsPressed() {
  p5.mouseIsPressed = false;
}

const sketch = (p: P5) => {
  p.setup = () => {
    // to make it responsive
    // p.createCanvas(p5.windowWidth, p5.windowHeight)
    p.createCanvas(750, 375);
    p.frameRate(60);
  };
  p.draw = () => {
    p.scale(GLOBAL_SCALE);
    p.background(RGB_THEME.BACKGROUND);
    draw();
  };
  p.mouseReleased = function () {
    p.mouseIsPressed = false;
  };
  p.mousePressed = function () {
    p.mouseIsPressed = true;
  };
  p.touchStarted = function () {
    p.mouseIsPressed = true;
  };
};

const p5 = new P5(sketch, document.body);

export { p5, unsetMouseIsPressed };
