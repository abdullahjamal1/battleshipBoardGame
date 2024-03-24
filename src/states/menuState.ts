import button from "../classes/Button";
import {p5} from '../index'
import { initializeRandomMap, persistentGameState, GameStateEnum, updateCurrentGameState } from "../setup/sketch";

let posX = 400,
    posY = 120;
let menuButtonWidth = 180;
let singlePlayerButton = new button("Singleplayer", posX + 100, posY + 40, menuButtonWidth);
let multiplayerButton = new button("Multiplayer", posX + 100, posY + 90, menuButtonWidth);
// let onlineButton = new button("Online", posX + 100, posY + 140);
let instructionsButton = new button("Instructions", posX + 100, posY + 140, menuButtonWidth);
let statisticsButton = new button("Statistics", posX + 100, posY + 190, menuButtonWidth);
let creditsButton = new button("Credits", posX + 100, posY + 240, menuButtonWidth);

const menuState = function () {

    p5.fill(1, 36, 43, 10);
    p5.strokeWeight(50);
    p5.ellipse(posX + 190, posY + 140, 350, 350);
    p5.strokeWeight(1);
    p5.fill(183, 226, 235, 150);
    p5.ellipse(posX + 190, posY + 140, 300, 300);

    p5.fill(255, 255, 255);
    p5.textSize(65);

    multiplayerButton.draw();
    // onlineButton.draw();
    instructionsButton.draw();
    // creditsButton.draw();
    statisticsButton.draw();
    singlePlayerButton.draw();

    // if (
    //     mouseX > singlePlayerButton.x * globalScale &&
    //     mouseX < (singlePlayerButton.x + singlePlayerButton.width) * globalScale &&
    //     mouseY > singlePlayerButton.y * globalScale
    // ) {
        //if mouse is pressed go to play
        if (singlePlayerButton.insideButton()) {
            singlePlayerButton.lightUpButton();

            if (p5.mouseIsPressed) {
                // makeNewMap = true;
                updateCurrentGameState(GameStateEnum.NewMapSinglePlayer);
                initializeRandomMap();
            }
        } else if (multiplayerButton.insideButton()) {
            multiplayerButton.lightUpButton();

            if (p5.mouseIsPressed) {
                // makeNewMap = true;
                updateCurrentGameState(GameStateEnum.NewMapMultiPlayerOffline);
                initializeRandomMap();
            }
        }
        else if (instructionsButton.insideButton()) {
            instructionsButton.lightUpButton();
            if (p5.mouseIsPressed) {
                updateCurrentGameState(GameStateEnum.Instructions);
            }
        } 
        else if (statisticsButton.insideButton()) {
            statisticsButton.lightUpButton();
            if (p5.mouseIsPressed) {
                updateCurrentGameState(GameStateEnum.Statistics);
            }
        }
        // else if (creditsButton.insideButton()) {
        //     creditsButton.lightUpButton();

        //     if (mouseIsPressed) {
        //         menu = false;
        //         credits = true;
        //     }
        // } 
        // else if (onlineButton.insideButton()) {

        //     onlineButton.lightUpButton();

        //     if (mouseIsPressed) {

        //         menu = false;
        //         multiPlayerOnline = true;

        //     }
        // }
    // }
};
export default menuState;
