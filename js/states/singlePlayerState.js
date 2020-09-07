

var singlePlayerState = function () {

    // background(0, 255, 255,100);
    var backButton1 = new button("back", 400, 450);
    var DensityLensButtonOn = new button("DensityON", 600, 450);
    var DensityLensButtonOff = new button("DensityOFF", 800, 450);	
	
    backButton1.draw();
	
    //densityLens = false;

    // draws 10*10 grid for player 1
    if (!player1.confirmButtonPushed) {

        player1.drawGridActual();
        player1AutoButton.draw();
    }
    else {
        player1.drawGridHidden();
        
        DensityLensButtonOn.draw();
	DensityLensButtonOff.draw();
        if(DensityLensButtonOn.insideButton()){

            if(!mouseIsPressed){
                DensityLensButtonOn.lightUpButton();
            }
            if(mouseIsPressed){
                densityLens = true;
            }
        }
	if(DensityLensButtonOff.insideButton()){

            if(!mouseIsPressed){
                DensityLensButtonOn.lightUpButton();
            }
            if(mouseIsPressed){
                densityLens = false;
            }
        }
           
    }

    // draws 10*10 grid for BOT
      bot.drawGridHidden();

    // auto button for player 1
    if (player1.shipArranged === false) {

        player1AutoButton.draw();

        if (player1AutoButton.insideButton()) {
            //check to see if the mouse is pressed
            if (!mouseIsPressed) {
                //if mouse is not pressed then light up button
                player1AutoButton.lightUpButton();

            }
            if (mouseIsPressed) {

                if (player1.autoButtonPushed === true) {
                    // initializes grid for player 1 
                    player1.initializeGrid();
                    //createNewMultiplayerObject();
                }
                player1.arrangeShip();
                player1.autoButtonPushed = true;
                //shipArranged = true;
            }
        }
    }

    // confirm button for player1
    if (player1.autoButtonPushed) {

        player1ConfirmButton.draw();

        if (player1ConfirmButton.insideButton()) {
            //check to see if the mouse is pressed
            if (!mouseIsPressed) {
                //if mouse is not pressed then light up button
                player1ConfirmButton.lightUpButton();
            }
            if (mouseIsPressed) {

                player1.autoButtonPushed = false;
                player1.shipArranged = true;
                player1.confirmButtonPushed = true;

                // arrange bots ship
                bot.arrangeShip();
                mapSwap("singlePlayer");


                //shipArranged = true;
            }
        }
    }

    // if both players have deployed ships start the game
    // main multiplayer pass N play if statement
    if (player1.confirmButtonPushed) {

        if (playerOneTurn) {

            // argument 3 represents bot
            //  bot.play();
            if (bot.play() === true) {
                // make separate class for win 
                winState = true;
                singlePlayer = false;

                bot.win = true;
                singlePlayerWin = true;
            }
        }
        else {

            //  player1.play(1);
            if (player1.play(1) === true) {

                winState = true;
                singlePlayer = false;
                
                player1.win = true;
                singlePlayerWin = true;
            }
        }
        
        if(densityLens === true){
            bot.drawProbabilityDensityGrid();
        }
        

    }

    // back button  - common for both the players
    if (backButton1.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            backButton1.lightUpButton();

        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            singlePlayer = false;
            menu = true;
            createNewSinglePlayerObject();
            player1.initializeGrid();
            bot.initializeGrid();

            //mouseIsPressed = false;
        }
    }

};
