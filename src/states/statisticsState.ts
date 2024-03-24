import Button from '../classes/Button';
import { RGB_THEME } from '../constants/constants';
import {p5, unsetMouseIsPressed} from '../index';
import { GameStateEnum, persistentGameState, statTable } from '../setup/sketch';

const statisticsState = function () {
  // background(0, 255, 255,100);
  let backButton = new Button("Back", 150, 480);
  backButton.draw();

  let statTableX = 180,
    statTableY = 230;
  let slotHeight = 40 * 1.5,
    slotWidth = 100 * 1.5;

  p5.strokeWeight(0);
  // fill(170, 120, 200, 300);
  // rect(statTableX / 4 + 180, statTableY / 4 - 7, slotWidth, slotHeight);
  // fill(0, 0, 0);
  // text("ONLINE", statTableX / 4 + 195, statTableY / 4 + 10, slotWidth, slotHeight);

  // fill(0, 180, 0, 200);
  p5.fill(RGB_THEME.BUTTON)

  p5.rect(statTableX / 4 + 30, statTableY / 4 - 7, slotWidth, slotHeight);

  p5.strokeWeight(1);

  p5.fill(RGB_THEME.BUTTON_TEXT);
  p5.text(
    "OFFLINE",
    statTableX / 4 + 40,
    statTableY / 4 + 10,
    slotWidth,
    slotHeight
  );
  p5.fill(RGB_THEME.BUTTON);

  p5.rect(
    statTableX - slotWidth,
    statTableY - slotHeight * 2,
    statTableX * 6,
    statTableY * 1.5,
    30
  );
  p5.strokeWeight(2);

  p5.fill(RGB_THEME.BUTTON_TEXT);

  p5.textSize(20);
  p5.text(
    "WON",
    30 + statTableX + slotWidth * 0,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  p5.text(
    "LOST",
    30 + statTableX + slotWidth * 1,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  p5.text(
    "SHIPS DESTROYED",
    30 + statTableX + slotWidth * 2,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  p5.text(
    "SHIPS LOST",
    30 + statTableX + slotWidth * 3,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  p5.text(
    "AVG TURNS TO WIN",
    30 + statTableX + slotWidth * 4,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  p5.text(
    "WIN %",
    30 + statTableX + slotWidth * 5,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );

  p5.text(
    "PLAYER 1",
    30 + statTableX - slotWidth,
    12.5 + statTableY + slotHeight * 0,
    slotWidth,
    slotHeight
  );
  p5.text(
    "PLAYER 2",
    30 + statTableX - slotWidth,
    12.5 + statTableY + slotHeight * 1,
    slotWidth,
    slotHeight
  );
  p5.text(
    "     BOT",
    30 + statTableX - slotWidth,
    12.5 + statTableY + slotHeight * 2,
    slotWidth,
    slotHeight
  );

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      let highestValInCol = false;

      for (let k = 0; k < 3; k++) {
        if (statTable[i][j] >= statTable[k][j]) {
          highestValInCol = true;
        } else {
          highestValInCol = false;
          break;
        }
      }
      if (highestValInCol) {
        p5.fill(RGB_THEME.STATS_HIGH);
      } else {
        p5.fill(RGB_THEME.STATS_LOW);
      }

      p5.rect(
        statTableX + slotWidth * j,
        statTableY + slotHeight * i,
        slotWidth,
        slotHeight
      );

      p5.fill(RGB_THEME.BUTTON_TEXT);
      p5.textSize(30);
      p5.text(
        statTable[i][j],
        30 + statTableX + slotWidth * j,
        15 + statTableY + slotHeight * i,
        slotWidth,
        slotHeight
      );
    }
  }
  p5.strokeWeight(1);
  if (backButton.insideButton()) {
    //check to see if the mouse is pressed
    if (!p5.mouseIsPressed) {
      backButton.lightUpButton();
    }
    if (p5.mouseIsPressed) {
      persistentGameState.currentState = GameStateEnum.Menu;
    }
  }
};
export default statisticsState;
