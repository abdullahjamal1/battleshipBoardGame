import Button from '../classes/Button';
import { RGB_THEME } from '../constants/constants';
import {p5, unsetMouseIsPressed} from '../index';
import { GameStateEnum, persistentGameState } from '../setup/sketch';

let backButton = new Button("back", 225, 500);

const instructionsState = function () {
    //background
    //image(space, 0, 0, 400, 400);
    //text
    //background(0, 255, 255,100);
    p5.textSize(35);
    p5.fill(255, 255, 255);
    p5.text("Instructions", 50, 50);
    p5.fill(RGB_THEME.BUTTON);
    p5.rect(100, 100, 500, 350, 20);
    p5.fill(RGB_THEME.BUTTON_TEXT);
    p5.textSize(17);
    p5.text(
        "Two players arrange five ships on their maps and then do guess-fire on each other's map in alternate turns until either player wins by sinking all the ships. Players get bonus turn if they hit opponents ship. BOT uses probability density map to guess coordinates of ship .\n\n 1. Press AUTO to arrange your ships randomly on map , press auto again if you want to re-arranage your ships in different order. \n\n 2. Press 'CONFIRM' to start the game. \n\n Enjoying the game? Please rate us on the Chrome Web Store!",
        125,
        125,
        450,
        300
    );

    backButton.draw();
    if (backButton.insideButton()) {
        if (!p5.mouseIsPressed) {
            backButton.lightUpButton();
        }
        if (p5.mouseIsPressed) {
            persistentGameState.currentState = GameStateEnum.Menu;
        }
    }
};
export default instructionsState;