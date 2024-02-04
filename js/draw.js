//   var playClass = function(){
// inherit attributes from ship class
//   shipClass.call( this );
// };
var player1AutoButton = new button("Auto", 80, 450);
var player1ConfirmButton = new button("Confirm", 280, 450);
var player2ConfirmButton = new button("Confirm", 750, 450);
var player2AutoButton = new button("Auto", 550, 450);

var posX = 400,
    posY = 120;
var menuButtonWidth = 180;
var singlePlayerButton = new button("Singleplayer", posX + 100, posY + 40, menuButtonWidth);
var multiplayerButton = new button("Multiplayer", posX + 100, posY + 90, menuButtonWidth);
// var onlineButton = new button("Online", posX + 100, posY + 140);
var instructionsButton = new button("Instructions", posX + 100, posY + 140, menuButtonWidth);
var statisticsButton = new button("Statistics", posX + 100, posY + 190, menuButtonWidth);
var creditsButton = new button("Credits", posX + 100, posY + 240, menuButtonWidth);

var anim = new animation();

/**
 * draw
 * description: draw function is executed 60 frames per second, it invokes different gameStates based on values
 */

var draw = function () {

    scale(globalScale);

    anim.animationPlay();

    if (densityLens) {
        background(0, 300, 0, 100);
    }

    if (menu === true) {
        menuState();
    } else if (makeNewMap === true) {
        newMapState();
    } else if (singlePlayer === true) {
        singlePlayerState();
    } else if (multiPlayerOnline === true) {
        multiPlayerOnlineState();
    } else if (credits === true) {
        creditsState();
    } else if (instructions === true) {
        instructionsState();
    } else if (multiPlayerOffline === true) {
        multiPlayerOfflineState();
    } else if (statistics === true) {
        statisticsState();
    } else if (winState === true) {
        winStateCall();
    }
};
