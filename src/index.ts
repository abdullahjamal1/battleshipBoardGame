import * as P5 from "p5";
import {draw} from "./draw";
import { GLOBAL_SCALE, RGB_THEME } from "./constants/constants";

let mouseReleased = function () {
  p5.mouseIsPressed = false;
};
let mousePressed = function () {
  p5.mouseIsPressed = true;
};
let touchStarted = function () {
  p5.mouseIsPressed = true;
};

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
};

const p5 = new P5(sketch, document.body);

export { p5, unsetMouseIsPressed };
