import { p5 } from "..";
import Button from "../classes/Button";
import { animation } from "../draw";
import mapSwap from "../mapSwap";
import { GameStateEnum, alerts, initPlayers, players, sessionGameState, updateCurrentGameState } from "../setup/sketch";

// background(0, 255, 255,100);
let backButton1 = new Button("Exit", 10, 10);
let densityLensButton = new Button("Density Filter", 210, 10, 230);

let player1AutoButton = new Button("Auto", 80, 490);
let player1ConfirmButton = new Button("Confirm", 280, 490);

let singlePlayerState = function () {

  backButton1.draw();

  //densityLens = false;

  // draws 10*10 grid for player 1
  if (!players.player1.confirmButtonPushed) {
    players.player1.drawGridActual();
    player1AutoButton.draw();
  } else {
    players.player1.drawGridHidden();

    densityLensButton.draw();
    if (densityLensButton.insideButton()) {
      if (!p5.mouseIsPressed) {
        densityLensButton.lightUpButton();
      }
      if (p5.mouseIsPressed) {
       
        sessionGameState.isDensityLensEnabled = !sessionGameState.isDensityLensEnabled;
        p5.mouseIsPressed = false;
      }
    }
  }

  // draws 10*10 grid for BOT
  players.bot.drawGridHidden();

  // auto button for player 1
  if (players.player1.shipArranged === false) {
    player1AutoButton.draw();

    if (player1AutoButton.insideButton()) {
      //check to see if the mouse is pressed
      if (!p5.mouseIsPressed) {
        //if mouse is not pressed then light up button
        player1AutoButton.lightUpButton();
      }
      if (p5.mouseIsPressed) {
        players.player1.initializeGrid();
        players.player1.arrangeShip();
        players.player1.autoButtonPushed = true;
        p5.mouseIsPressed = false;
        //shipArranged = true;
      }
    }
  }

  // confirm button for player1
  if (players.player1.autoButtonPushed) {
    player1ConfirmButton.draw();

    if (player1ConfirmButton.insideButton()) {
      //check to see if the mouse is pressed
      if (!p5.mouseIsPressed) {
        //if mouse is not pressed then light up button
        player1ConfirmButton.lightUpButton();
      }
      if (p5.mouseIsPressed) {
        players.player1.autoButtonPushed = false;
        players.player1.shipArranged = true;
        players.player1.confirmButtonPushed = true;

        // arrange bots ship
        players.bot.initializeGrid();
        players.bot.arrangeShip();
        mapSwap("singlePlayer");
        p5.mouseIsPressed = false;
        //shipArranged = true;
      }
    }
  }

  // if both players have deployed ships start the game
  // main multiplayer pass N play if statement
  if (players.player1.confirmButtonPushed) {
    if (alerts.shipSunk.active || alerts.shipHit.active || alerts.playerSwitching.active) {
    }else if (sessionGameState.playerOneTurn) {
      // argument 3 represents bot
      //  players.bot.play();
      if (players.bot.play() === true) {
        updateCurrentGameState(GameStateEnum.WinState);
        players.bot.win = true;
        sessionGameState.singlePlayerWin = true;
      }
    } else {
      //  players.player1.play(1);
      if (players.player1.play(1) === true) {
        updateCurrentGameState(GameStateEnum.WinState);
        players.player1.win = true;
        sessionGameState.singlePlayerWin = true;
      }
    }
    if (sessionGameState.isDensityLensEnabled === true) {
      players.bot.calcProbabilityDensity();
      players.bot.drawProbabilityDensityGrid();
    }
    if (alerts.shipSunk.active) {
      alerts.shipSunk.iterator++;
      if (alerts.shipSunk.iterator <= 90) {
        animation.showMessage("SHIP SUNK! BONUS TURN", 25, "alert");
      } else if (alerts.shipSunk.iterator > 100) {
        alerts.shipSunk.active = false;
        alerts.shipSunk.iterator = 0;
      }
    } else if (alerts.shipHit.active) {
      alerts.shipHit.iterator++;
      if (alerts.shipHit.iterator <= 50) {
        animation.showMessage("SHIP HIT! BONUS TURN", 30, "warn");
      } else if (alerts.shipHit.iterator > 70) {
        alerts.shipHit.active = false;
        alerts.shipHit.iterator = 0;
      }
    } else if (alerts.playerSwitching.active) {
      // delay loop
      alerts.playerSwitching.iterator++;
      if (alerts.playerSwitching.iterator <= 50) {
        if (sessionGameState.playerOneTurn) {
          animation.showMessage("PLAYER 1 TURN");
        } else {
          animation.showMessage(" BOT TURN");
        }
      } else if (alerts.playerSwitching.iterator > 60) {
        alerts.playerSwitching.iterator = 0;

        alerts.playerSwitching.active = false;

        if (sessionGameState.playerOneTurn === true) {
          sessionGameState.playerOneTurn = false;
        } else {
          sessionGameState.playerOneTurn = true;
        }
      }
    } 
  }

  // back button  - common for both the players
  if (backButton1.insideButton()) {
    //check to see if the mouse is pressed
    if (!p5.mouseIsPressed) {
      //if mouse is not pressed then light up button
      backButton1.lightUpButton();
    }
    if (p5.mouseIsPressed) {
      //if mouse is pressed go to menu
      updateCurrentGameState(GameStateEnum.Menu);
      initPlayers();
      players.player1.initializeGrid();
      players.bot.initializeGrid();

      p5.mouseIsPressed = false;
    }
  }
};
export default singlePlayerState;