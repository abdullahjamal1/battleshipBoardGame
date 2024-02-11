var statisticsState = function () {
  // background(0, 255, 255,100);
  var backButton = new button("Back", 150, 480);
  backButton.draw();

  var statTableX = 180,
    statTableY = 230;
  var slotHeight = 40 * 1.5,
    slotWidth = 100 * 1.5;

  strokeWeight(0);
  // fill(170, 120, 200, 300);
  // rect(statTableX / 4 + 180, statTableY / 4 - 7, slotWidth, slotHeight);
  // fill(0, 0, 0);
  // text("ONLINE", statTableX / 4 + 195, statTableY / 4 + 10, slotWidth, slotHeight);

  // fill(0, 180, 0, 200);
  fill(RGB.BUTTON)

  rect(statTableX / 4 + 30, statTableY / 4 - 7, slotWidth, slotHeight);

  strokeWeight(1);

  fill(RGB.BUTTON_TEXT);
  text(
    "OFFLINE",
    statTableX / 4 + 40,
    statTableY / 4 + 10,
    slotWidth,
    slotHeight
  );
  fill(RGB.BUTTON);

  rect(
    statTableX - slotWidth,
    statTableY - slotHeight * 2,
    statTableX * 6,
    statTableY * 1.5,
    30
  );
  strokeWeight(2);

  fill(RGB.BUTTON_TEXT);

  textSize(20);
  text(
    "WON",
    30 + statTableX + slotWidth * 0,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  text(
    "LOST",
    30 + statTableX + slotWidth * 1,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  text(
    "SHIPS DESTROYED",
    30 + statTableX + slotWidth * 2,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  text(
    "SHIPS LOST",
    30 + statTableX + slotWidth * 3,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  text(
    "AVG TURNS TO WIN",
    30 + statTableX + slotWidth * 4,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );
  text(
    "WIN %",
    30 + statTableX + slotWidth * 5,
    12.5 + statTableY + slotHeight * -1,
    slotWidth,
    slotHeight
  );

  text(
    "PLAYER 1",
    30 + statTableX - slotWidth,
    12.5 + statTableY + slotHeight * 0,
    slotWidth,
    slotHeight
  );
  text(
    "PLAYER 2",
    30 + statTableX - slotWidth,
    12.5 + statTableY + slotHeight * 1,
    slotWidth,
    slotHeight
  );
  text(
    "     BOT",
    30 + statTableX - slotWidth,
    12.5 + statTableY + slotHeight * 2,
    slotWidth,
    slotHeight
  );

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
      var highestValInCol = false;

      for (var k = 0; k < 3; k++) {
        if (statTable[i][j] >= statTable[k][j]) {
          highestValInCol = true;
        } else {
          highestValInCol = false;
          break;
        }
      }
      if (highestValInCol) {
        fill(RGB.STATS_HIGH);
      } else {
        fill(RGB.STATS_LOW);
      }

      rect(
        statTableX + slotWidth * j,
        statTableY + slotHeight * i,
        slotWidth,
        slotHeight
      );

      fill(RGB.BUTTON_TEXT);
      textSize(30);
      text(
        statTable[i][j],
        30 + statTableX + slotWidth * j,
        15 + statTableY + slotHeight * i,
        slotWidth,
        slotHeight
      );
    }
  }
  strokeWeight(1);
  if (backButton.insideButton()) {
    //check to see if the mouse is pressed
    if (!mouseIsPressed) {
      backButton.lightUpButton();
    }
    if (mouseIsPressed) {
      //if mouse is pressed go to menu
      statistics = false;
      menu = true;
    }
  }
};
