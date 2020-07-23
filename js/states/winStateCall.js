var winStateCall = function () {
    // background(0, 0, 0);
    fill(240, 218, 240);
    // display victory message too
    if (player1.win === true) {

        textSize(40);
        text("Player 1 Wins --- player 1 map !!!", 400, 400, 400, 400);

        if (singlePlayerWin === true) {

            bot.drawGridActual();
        }
        else {

            player2.drawGridActual();
        }
    }
    else if (player2.win === true) {

        textSize(40);
        text("Player 2 Wins --- player 2 map !!!", 400, 400, 400, 400);
        player1.drawGridActual();
    }
    else {
        textSize(40);
        text("BOT Wins --- bot win !!!", 400, 400, 400, 400);
        player1.drawGridActual();
    }

    var backButton = new button("Menu", 150, 450);
    backButton.draw();

    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {

            fill(240, 218, 240, 100);
            rect(backButton.x, backButton.y, backButton.width, backButton.height);
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            winState = false;
            menu = true;

            singlePlayerWin = false;
            createNewMultiplayerObject();
            createNewSinglePlayerObject();
            player1.initializeGrid();
            player2.initializeGrid();
            bot.initializeGrid();
        }
    }
};
