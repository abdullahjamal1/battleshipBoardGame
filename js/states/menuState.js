//draw function
var menuState = function () {

    fill(1, 36, 43, 10);
    strokeWeight(50);
    ellipse(posX + 190, posY + 140, 350, 350);
    strokeWeight(1);
    fill(183, 226, 235, 150);
    ellipse(posX + 190, posY + 140, 300, 300);

    fill(255, 255, 255);
    textSize(65);

    multiplayerButton.draw();
    // onlineButton.draw();
    instructionsButton.draw();
    // creditsButton.draw();
    statisticsButton.draw();
    singlePlayerButton.draw();

    if (
        mouseX > singlePlayerButton.x * globalScale &&
        mouseX < (singlePlayerButton.x + singlePlayerButton.width) * globalScale &&
        mouseY > singlePlayerButton.y * globalScale
    ) {
        //if mouse is pressed go to play
        if (singlePlayerButton.insideButton()) {
            singlePlayerButton.lightUpButton();

            if (mouseIsPressed) {
                menu = false;
                singlePlayer = true;
                makeNewMap = true;
                initializeRandomMap();
            }
        } else if (multiplayerButton.insideButton()) {
            multiplayerButton.lightUpButton();

            if (mouseIsPressed) {
                menu = false;
                multiPlayerOffline = true;
                makeNewMap = true;
                initializeRandomMap();
            }
        }
        // else if (onlineButton.insideButton()) {

        //     onlineButton.lightUpButton();

        //     if (mouseIsPressed) {

        //         menu = false;
        //         multiPlayerOnline = true;

        //     }
        // }
        else if (instructionsButton.insideButton()) {
            instructionsButton.lightUpButton();

            if (mouseIsPressed) {
                menu = false;
                instructions = true;
            }
        } 
        // else if (creditsButton.insideButton()) {
        //     creditsButton.lightUpButton();

        //     if (mouseIsPressed) {
        //         menu = false;
        //         credits = true;
        //     }
        // } 
        else if (statisticsButton.insideButton()) {
            statisticsButton.lightUpButton();

            if (mouseIsPressed) {
                menu = false;
                statistics = true;
            }
        }
    }
};
