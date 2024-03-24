import creditsState from "./states/creditsState";
import menuState from "./states/menuState";
import newMapState from "./states/newMapState";
import singlePlayerState from "./states/singlePlayerState";
import multiPlayerOnlineState from "./states/multiPlayerOnlineState.js";
import multiPlayerOfflineState from "./states/multiPlayerOfflineState";
import winStateCall from "./states/winStateCall";
import instructionsState from "./states/instructionsState";
import statisticsState from "./states/statisticsState";
import button from "./classes/Button";
import Animation from "./classes/BackgroundAnimation";
import { persistentGameState, GameStateEnum, saveGameState } from "./setup/sketch";

let posX = 400,
    posY = 120;
let menuButtonWidth = 180;
let themeSwitchButton = new button(persistentGameState.isLightTheme ?  "Light" : "Dark", posX + 550, 10, menuButtonWidth);

let animation = new Animation();
/**
 * draw
 * description: draw function is executed 60 frames per second, it invokes different gameStates based on values
 */
const draw = function () {

    animation.animationPlay();
    themeSwitchButton.draw();
    themeSwitchButton.onClick(()=>{
        persistentGameState.isLightTheme = !persistentGameState.isLightTheme;
        themeSwitchButton.txt = (persistentGameState.isLightTheme ? "Light" : "Dark");
        saveGameState();
    });
    switch (persistentGameState.currentState) {
        case GameStateEnum.Menu: menuState(); break;
        case GameStateEnum.NewMapSinglePlayer:
        case GameStateEnum.NewMapMultiPlayerOffline: newMapState(); break;
        case GameStateEnum.SinglePlayer: singlePlayerState(); break;
        case GameStateEnum.MultiPlayerOnline: multiPlayerOnlineState(); break;
        case GameStateEnum.Credits: creditsState(); break;
        case GameStateEnum.Instructions: instructionsState(); break;
        case GameStateEnum.MultiPlayerOffline: multiPlayerOfflineState(); break;
        case GameStateEnum.Statistics: statisticsState(); break;
        case GameStateEnum.WinState: winStateCall(); break;
        default: break;
    }
};

export {draw, animation};