import { GLOBAL_SCALE, RGB_THEME } from '../constants/constants';
import {p5, unsetMouseIsPressed} from '../index';

// class for buttons - object oriented programming
class Button {
    x: number;
    y: number;
    txt: string;
    height: number;
    width: number;

    constructor(str: string, x: number, y: number, w = 170, h = 40) {
        this.x = x;
        this.y = y;
        this.txt = str;
        this.height = h;
        this.width = w;
    }

    draw() {
        p5.fill(RGB_THEME.BUTTON);
        p5.rect(this.x, this.y, this.width, this.height, 10);
        p5.fill(RGB_THEME.BUTTON_TEXT);
        p5.textSize(30);
        p5.text(this.txt, this.x + 11, this.y + 30);
    }

    insideButton() {
        if (
            p5.mouseX > this.x * GLOBAL_SCALE &&
            p5.mouseX < (this.x + this.width) * GLOBAL_SCALE &&
            p5.mouseY > this.y * GLOBAL_SCALE &&
            p5.mouseY < (this.y + this.height) * GLOBAL_SCALE
        ) {
            this.lightUpButton();
            return 1;
        }
        return 0;
    }

    isPressed() {
        if (this.insideButton()) {
            if (p5.mouseIsPressed) {
                return 1;
            } else {
                return 0;
            }
        }
        return 0;
    }

    onClick(callback: Function) {
        if (this.insideButton()) {
            this.lightUpButton();
            if (p5.mouseIsPressed) {
                callback();
                unsetMouseIsPressed();
            }
        }
    }

    lightUpButton() {
        p5.fill(240, 218, 240, 100);
        p5.rect(this.x, this.y, this.width, this.height, 10);
    }
}

export default Button;