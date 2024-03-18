import Button from '../classes/Button';
import {p5, unsetMouseIsPressed} from '../index';
import { GameStateEnum, sessionGameState } from '../setup/sketch';

let backButton = new Button("back", 150, 300);

const creditsState = function () {
    p5.fill(255, 255, 255);
    p5.textSize(15);
    p5.text(
        "Github repo: https://github.com/abdullahjamal1/battleshipBoardGame ",
        150,
        150
    );
    backButton.draw();
    if (backButton.insideButton()) {
        backButton.lightUpButton();
        if (backButton.isPressed()) {
            sessionGameState.currentState = GameStateEnum.Menu;
        }
    }
};
export default creditsState;
