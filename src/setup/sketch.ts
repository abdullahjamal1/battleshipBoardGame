import {STORAGE_KEYS, getItem, setItem} from '../service/storage';
import Player from '../classes/Player';
import Bot from '../classes/Bot';
/**
    global dynamic variables
*/

// create a enum for currentGameState
enum GameStateEnum {
  Menu = 'menu',
  Credits = 'credits',
  Instructions = 'instructions',
  SinglePlayer = 'singlePlayer',
  MultiPlayerOffline = 'multiPlayerOffline',
  MultiPlayerOnline = 'multiPlayerOnline',
  Statistics = 'statistics',
  WinState = 'winState',
  NewMapSinglePlayer = 'newMapSinglePlayer',
  NewMapMultiPlayerOffline = 'newMapMultiPlayerOffline'
}

const sessionGameState = {
  currentState: GameStateEnum.Menu,
  isDensityLensEnabled: false,
  playerOneTurn: true,
  singlePlayerWin: false,
  multiPlayerWin: false,
  statTableUpdated: false,
};

function getCurrentGameState(){
  return sessionGameState.currentState;
}

function updateCurrentGameState(gameState: GameStateEnum) {
  sessionGameState.currentState = gameState;
}

let persistentGameState = {
  isLightTheme: true
}

let alerts = {
  shipHit: {
    active: false,
    iterator: 0,
  },
  shipSunk: {
    shipId: -1,
    active: false,
    iterator: 0,
  },
  playerSwitching: {
    active: true,
    iterator: 0,
  },
}
/*
 *   creates new instances of player1, player2 and bot
 */
const players = {
  player1: new Player("p1", 1),
  player2: new Player("p2", 2),
  bot: new Bot()
};

let randomMap = new Array(10);

// creating statistics table
let statTable = new Array(3);

const initializeRandomMap = function () {
  for (let i = 0; i < randomMap.length; i++) {
    randomMap[i] = new Array(10);
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      randomMap[i][j] = 0;
    }
  }
};
const initializeStats = function () {

  for (let i = 0; i < statTable.length; i++) {
    statTable[i] = new Array(6);
  }
  // init statTable
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      statTable[i][j] = 0;
    }
  }
}

initializeRandomMap();
initializeStats();

async function loadStatsFromStorage() {
  try {
    let stats = await getItem(STORAGE_KEYS.STATS);
    if (stats === null) {
      console.log("stats not found, creating new");
      await setItem(STORAGE_KEYS.STATS, statTable);
    } else {
      console.log(`existing stats exist ${stats}`)
      statTable = stats;
    }
  } catch (error) {
    console.error(`error occurred while reading stats from storage ${error}`)
  }
}


loadStatsFromStorage();

/*
 * createNewSinglePlayerObject
 * Description : re-initializes instances of Multiplayer object
 */

let createNewMultiplayerObject = function () {
  players.player1 = new Player("p1", 1);
  players.player1.initializeGrid();

  players.player2 = new Player("p2", 2);
  players.player2.initializeGrid();
};

/*
* createNewSinglePlayerObject
* Description : re-initializes instances of single player object
*/

let createNewSinglePlayerObject = function () {
  players.player1 = new Player("p1", 1);
  players.player1.initializeGrid();

  // destructor equivalent for previous...
  sessionGameState.isDensityLensEnabled = false;
  players.bot = new Bot();
  players.bot.initializeGrid();
};

function initPlayers() {
  createNewSinglePlayerObject();
  createNewMultiplayerObject();
}

export {sessionGameState, GameStateEnum, persistentGameState, alerts, initializeRandomMap, updateCurrentGameState, getCurrentGameState, randomMap, statTable, players, initPlayers};