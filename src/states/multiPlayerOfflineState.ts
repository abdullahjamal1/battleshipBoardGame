import { p5 } from "..";
import Button from "../classes/Button";
import { animation } from "../draw";
import mapSwap from "../utils/mapSwap";
import { GameStateEnum, alerts, initPlayers, players, persistentGameState, updateCurrentGameState } from "../setup/sketch";

let player1AutoButton = new Button("Auto", 80, 490);
let player1ConfirmButton = new Button("Confirm", 280, 490);
let player2ConfirmButton = new Button("Confirm", 930, 490);
let player2AutoButton = new Button("Auto", 730, 490);

const multiPlayerOfflineState = function () {
    //background
    //background(0, 255, 255,100);
    let backButton1 = new Button("Exit", 10, 10);
    backButton1.draw();

    // draws 10*10 grid for player 1
    if (!players.player1.confirmButtonPushed) {
        players.player1.drawGridActual();
        player1AutoButton.draw();
    } else {
        players.player1.drawGridHidden();
    }

    // draws 10*10 grid for player 2
    if (!players.player2.confirmButtonPushed) {
        players.player2.drawGridActual();
        player2AutoButton.draw();
    } else {
        players.player2.drawGridHidden();
    }

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
                p5.mouseIsPressed = false;
                //shipArranged = true;
            }
        }
    }

    // auto button for player 2
    if (players.player2.shipArranged === false) {
        player2AutoButton.draw();

        if (player2AutoButton.insideButton()) {
            //check to see if the mouse is pressed
            if (!p5.mouseIsPressed) {
                //if mouse is not pressed then light up button
                player2AutoButton.lightUpButton();
            }
            if (p5.mouseIsPressed) {
                players.player2.initializeGrid();
                players.player2.arrangeShip();
                players.player2.autoButtonPushed = true;
                p5.mouseIsPressed = false;
                //shipArranged = true;
            }
        }
    }

    // confirm button for player2
    if (players.player2.autoButtonPushed) {
        player2ConfirmButton.draw();

        if (player2ConfirmButton.insideButton()) {
            //check to see if the mouse is pressed
            if (!p5.mouseIsPressed) {
                //if mouse is not pressed then light up button
                player2ConfirmButton.lightUpButton();
            }
            if (p5.mouseIsPressed) {
                players.player2.autoButtonPushed = false;
                players.player2.confirmButtonPushed = true;
                players.player2.shipArranged = true;
                // swap maps of players
                mapSwap("multiPlayer");
                p5.mouseIsPressed = false;
            }
        }
    }

    // if both players have deployed ships start the game
    // main multiplayer pass N play if statement
    if (players.player1.confirmButtonPushed && players.player2.confirmButtonPushed) {
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
                animation.showMessage("SHIP HIT! BONUS TURN", 30, "alert");
            } else if (alerts.shipHit.iterator > 60) {
                alerts.shipHit.active= false;
                alerts.shipHit.iterator = 0;
            }
        } else if (alerts.playerSwitching.active) {
            // delay loop
            alerts.playerSwitching.iterator++;

            if (alerts.playerSwitching.iterator <= 50) {
                if (persistentGameState.playerOneTurn) {
                    animation.showMessage("PLAYER 2 TURN");
                } else {
                    animation.showMessage("PLAYER 1 TURN");
                }
            }
            if (alerts.playerSwitching.iterator > 60) {
                alerts.playerSwitching.iterator = 0;
                alerts.playerSwitching.active = false;
            }
        } else if (persistentGameState.playerOneTurn) {
            if (players.player2.play(2) === true) {
                // make separate class for win
                // multiPlayerOffline = false;
                players.player2.win = true;
                persistentGameState.singlePlayerWin = false;
                updateCurrentGameState(GameStateEnum.WinState);
            }
        } else {
            if (players.player1.play(1) === true) {
                // multiPlayerOffline = false;
                players.player1.win = true;
                persistentGameState.singlePlayerWin = false;
                updateCurrentGameState(GameStateEnum.WinState);
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
            // multiPlayerOffline = false;
            initPlayers();
            updateCurrentGameState(GameStateEnum.Menu);
            p5.mouseIsPressed = false;
            //p5.mouseIsPressed = false;
        }
    }
};
export default multiPlayerOfflineState;
