////////////////////////////// ANIMATION //////////////////////////////////////////////////////////////
class animation {
    constructor() {
        this.submarineX1 = 1300;
        this.submarineY1 = 230;
        this.submarineX2 = -230;
        this.submarineY2 = 140;
        this.fishX1 = 0;
        this.fishX2 = -500;
        this.fishY = 0;
    }
    drawPebbles(x, y) {
        for (var i = 0; i < 450; i++) {
            var randomX = x + random(0, 1300);
            var randomY = y + random(670, 750);
            fill(random(0, 300), random(0, 200), random(0, 100));
            ellipse(randomX, randomY, 15, 10);
        }
    }
    drawFish(centerX, centerY, rgb) {
        var bodyLength = 72;
        var bodyHeight = 43;

        //  noStroke();
        fill(rgb);
        // body
        ellipse(centerX, centerY, bodyLength, bodyHeight);
        // tail
        fill(rgb);
        var tailWidth = bodyLength / 4;
        var tailHeight = bodyHeight / 2;
        triangle(
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
    submarineGlass(submarine_X, submarine_Y) {
        fill(1, 36, 43);
        ellipse(submarine_X + 190, submarine_Y + 37, 45, 45);
        fill(183, 226, 235);
        ellipse(submarine_X + 190, submarine_Y + 37, 35, 35);
    }
    drawFishGroup(x, y) {
        this.drawFish(x + 100, y + 100, RGB.BOARD_ISLAND_BLOCK);
        this.drawFish(x + 303, y + 100, RGB.BUTTON);
        this.drawFish(x + 164, y + 229, RGB.BOARD_OCEAN_BLOCK);
        this.drawFish(x + 264, y + 303, RGB.BOARD_ISLAND_BLOCK);
        this.drawFish(x + 331, y + 197, RGB.BOARD_ISLAND_BLOCK);
        this.drawFish(x + 65, y + 294, RGB.BUTTON);
    }
    drawSubmarine(submarine_X, submarine_Y) {
        //Gray
        fill(129, 133, 137);
        ellipse(submarine_X + 196, submarine_Y + 36, 105, 70);
        ellipse(submarine_X + 2, submarine_Y + 36, 105, 70);
        fill(129, 133, 137);
        rect(submarine_X + 1, submarine_Y + 1, 200, 70);

        //Gunmetal Gray
        fill(128, 128, 128);
        rect(submarine_X + 93, submarine_Y + -42, 40, 45);
        fill(128, 128, 128);
        rect(submarine_X + 93, submarine_Y + 71, 40, 14);
        this.submarineGlass(submarine_X, submarine_Y);
        this.submarineGlass(submarine_X + -82, submarine_Y + 1);
        this.submarineGlass(submarine_X + -164, submarine_Y + 1);
    }

    showMessage(msg, textMessageSize = 40, type = "info") {
        if (type === "info") {
            fill(54, 157, 160, 250);
        } else if (type === "warn") {
            fill(211, 187, 168, 250);
        } else {
            fill(156, 3, 3, 250);
        }
        strokeWeight(3);
        rect(400, 200, 400, 150, 300);
        if(type === "warn"){
            fill(0, 0, 0)
        }
        else{
            fill(255, 255, 255);
        }
        strokeWeight(1);
        textFont("Helvetica");
        textSize(textMessageSize);
        text(msg, 440, 260, 400, 150);
    }

    animationPlay() {
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
