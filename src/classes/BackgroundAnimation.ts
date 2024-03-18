import { RGB_THEME } from "../constants/constants";
import { p5 } from "../index";

class BackgroundAnimation {
  private submarineX1: number;
  private submarineY1: number;
  private submarineX2: number;
  private submarineY2: number;
  private fishX1: number;
  private fishX2: number;
  private fishY: number;

  constructor() {
    this.submarineX1 = 1300;
    this.submarineY1 = 230;
    this.submarineX2 = -230;
    this.submarineY2 = 140;
    this.fishX1 = 0;
    this.fishX2 = -500;
    this.fishY = 0;
  }
  public drawPebbles(x: number, y: number) {
    for (let i = 0; i < 450; i++) {
      let randomX = x + p5.random(0, 1300);
      let randomY = y + p5.random(670, 750);
      p5.fill(p5.random(0, 300), p5.random(0, 200), p5.random(0, 100));
      p5.ellipse(randomX, randomY, 15, 10);
    }
  }
  public drawFish(centerX: number, centerY: number, rgb: string) {
    let bodyLength = 72;
    let bodyHeight = 43;

    //  noStroke();
    p5.fill(rgb);
    // body
    p5.ellipse(centerX, centerY, bodyLength, bodyHeight);
    // tail
    p5.fill(rgb);
    let tailWidth = bodyLength / 4;
    let tailHeight = bodyHeight / 2;
    p5.triangle(
      centerX - bodyLength / 2,
      centerY,
      centerX - bodyLength / 2 - tailWidth,
      centerY - tailHeight,
      centerX - bodyLength / 2 - tailWidth,
      centerY + tailHeight
    );
    // // eye
    // fill(33, 33, 33);
    // ellipse(centerX + bodyLength / 4, centerY, bodyHeight / 5, bodyHeight / 5);
  }
  public submarineGlass(submarine_X: number, submarine_Y: number) {
    p5.fill(1, 36, 43);
    p5.ellipse(submarine_X + 190, submarine_Y + 37, 45, 45);
    p5.fill(183, 226, 235);
    p5.ellipse(submarine_X + 190, submarine_Y + 37, 35, 35);
  }
  public drawFishGroup(x: number, y: number) {
    this.drawFish(x + 100, y + 100, RGB_THEME.BOARD_ISLAND_BLOCK);
    this.drawFish(x + 303, y + 100, RGB_THEME.BUTTON);
    this.drawFish(x + 164, y + 229, RGB_THEME.BOARD_OCEAN_BLOCK);
    this.drawFish(x + 264, y + 303, RGB_THEME.BOARD_ISLAND_BLOCK);
    this.drawFish(x + 331, y + 197, RGB_THEME.BOARD_ISLAND_BLOCK);
    this.drawFish(x + 65, y + 294, RGB_THEME.BUTTON);
  }
  public drawSubmarine(submarine_X: number, submarine_Y: number) {
    //Gray
    p5.fill(129, 133, 137);
    p5.ellipse(submarine_X + 196, submarine_Y + 36, 105, 70);
    p5.ellipse(submarine_X + 2, submarine_Y + 36, 105, 70);
    p5.fill(129, 133, 137);
    p5.rect(submarine_X + 1, submarine_Y + 1, 200, 70);

    //Gunmetal Gray
    p5.fill(128, 128, 128);
    p5.rect(submarine_X + 93, submarine_Y + -42, 40, 45);
    p5.fill(128, 128, 128);
    p5.rect(submarine_X + 93, submarine_Y + 71, 40, 14);
    this.submarineGlass(submarine_X, submarine_Y);
    this.submarineGlass(submarine_X + -82, submarine_Y + 1);
    this.submarineGlass(submarine_X + -164, submarine_Y + 1);
  }

  public showMessage(msg: string, textMessageSize = 40, type = "info") {
    if (type === "info") {
      p5.fill(54, 157, 160, 250);
    } else if (type === "warn") {
      p5.fill(211, 187, 168, 250);
    } else {
      p5.fill(156, 3, 3, 250);
    }
    p5.strokeWeight(3);
    p5.rect(400, 200, 400, 150, 300);
    if (type === "warn") {
      p5.fill(0, 0, 0);
    } else {
      p5.fill(255, 255, 255);
    }
    p5.strokeWeight(1);
    p5.textFont("Helvetica");
    p5.textSize(textMessageSize);
    p5.text(msg, 440, 260, 400, 150);
  }

  public animationPlay() {
    this.submarineX1 = this.submarineX1 - 1.5;
    this.submarineX2 = this.submarineX2 + 1.5;
    this.fishX1 = this.fishX1 + 2.5;
    this.fishX2 = this.fishX2 + 2.5;

    this.drawFishGroup(this.fishX1, this.fishY);
    this.drawFishGroup(this.fishX2, this.fishY);

    if (this.submarineX1 < -100) {
      this.submarineX1 = 1300;
    }
    if (this.submarineX2 > 1300) {
      this.submarineX2 = -200;
    }

    if (this.fishX1 > 1300) {
      this.fishX1 = -300;
    }
    if (this.fishX2 > 1300) {
      this.fishX2 = -300;
    }

    this.drawSubmarine(this.submarineX1, this.submarineY1);
    this.drawSubmarine(this.submarineX2, this.submarineY2);

    //  this.drawPebbles(4, -200);
  }
}
export default BackgroundAnimation;
