var singlePlayerState = function () {
  // background(0, 255, 255,100);
  var backButton1 = new button("Exit", 350, 520);
  var DensityLensButton = new button("Density Lens", 550, 520, 230);

  backButton1.draw();

  //densityLens = false;

  // draws 10*10 grid for player 1
  if (!player1.confirmButtonPushed) {
    player1.drawGridActual();
    player1AutoButton.draw();
  } else {
    player1.drawGridHidden();

    DensityLensButton.draw();
    if (DensityLensButton.insideButton()) {
      if (!mouseIsPressed) {
        DensityLensButton.lightUpButton();
      }
      if (mouseIsPressed) {
        densityLens = !densityLens;
        mouseIsPressed = false;
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
        player1.initializeGrid();
        player1.arrangeShip();
        player1.autoButtonPushed = true;
        mouseIsPressed = false;
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
        bot.initializeGrid();
        bot.arrangeShip();
        mapSwap("singlePlayer");
        mouseIsPressed = false;
        //shipArranged = true;
      }
    }
  }

  // if both players have deployed ships start the game
  // main multiplayer pass N play if statement
  if (player1.confirmButtonPushed) {
    if (triggerShipSunkAlert || triggerShipHitAlert || playerSwitching) {
    }else if (playerOneTurn) {
      // argument 3 represents bot
      //  bot.play();
      if (bot.play() === true) {
        // make separate class for win
        winState = true;
        singlePlayer = false;

        bot.win = true;
        singlePlayerWin = true;
      }
    } else {
      //  player1.play(1);
      if (player1.play(1) === true) {
        winState = true;
        singlePlayer = false;

        player1.win = true;
        singlePlayerWin = true;
      }
    }
    if (densityLens === true) {
      bot.calcProbabilityDensity();
      bot.drawProbabilityDensityGrid();
    }
    if (triggerShipSunkAlert) {
      shipSunkAlertIterator++;
      if (shipSunkAlertIterator <= 90) {
        anim.showMessage("SHIP SUNK! BONUS TURN", 25, "alert");
      } else if (shipSunkAlertIterator > 100) {
        triggerShipSunkAlert = false;
        shipSunkAlertIterator = 0;
      }
    } else if (triggerShipHitAlert) {
      shipHitAlertIterator++;
      if (shipHitAlertIterator <= 50) {
        anim.showMessage("SHIP HIT! BONUS TURN", 30, "warn");
      } else if (shipHitAlertIterator > 70) {
        triggerShipHitAlert = false;
        shipHitAlertIterator = 0;
      }
    } else if (playerSwitching) {
      // delay loop
      playerSwitchingIterator++;
      if (playerSwitchingIterator <= 50) {
        if (playerOneTurn) {
          anim.showMessage("PLAYER 1 TURN");
        } else {
          anim.showMessage(" BOT TURN");
        }
      } else if (playerSwitchingIterator > 60) {
        playerSwitchingIterator = 0;

        playerSwitching = false;

        if (playerOneTurn === true) {
          playerOneTurn = false;
        } else {
          playerOneTurn = true;
        }
      }
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

      mouseIsPressed = false;
    }
  }
};
