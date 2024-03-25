import {STORAGE_KEYS, getItem, getLocalItem, setItem, setLocalItem} from '../service/storage';
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

let persistentGameState = {
  currentState: GameStateEnum.Menu,
  isDensityLensEnabled: false,
  playerOneTurn: true,
  singlePlayerWin: false,
  multiPlayerWin: false,
  statTableUpdated: false,
  isLightTheme: true
};

function getCurrentGameState(){
  return persistentGameState.currentState;
}

function saveGameState(){
  setLocalItem(STORAGE_KEYS.GAME_STATE, persistentGameState);
  setLocalItem(STORAGE_KEYS.PLAYER1_STATE, players.player1.getFieldsToSave());
  setLocalItem(STORAGE_KEYS.PLAYER2_STATE, players.player2.getFieldsToSave());
  setLocalItem(STORAGE_KEYS.BOT_STATE, players.bot.getBotFieldsToSave());
}
function saveBotState(){
  setLocalItem(STORAGE_KEYS.GAME_STATE, persistentGameState);
  setLocalItem(STORAGE_KEYS.BOT_STATE, players.bot.getBotFieldsToSave());
}
function savePlayer1State(){
  setLocalItem(STORAGE_KEYS.GAME_STATE, persistentGameState);
  setLocalItem(STORAGE_KEYS.PLAYER1_STATE, players.player1.getFieldsToSave());
}
function savePlayer2State(){
  setLocalItem(STORAGE_KEYS.GAME_STATE, persistentGameState);
  setLocalItem(STORAGE_KEYS.PLAYER2_STATE, players.player2.getFieldsToSave());
}

function updateCurrentGameState(gameState: GameStateEnum) {
  persistentGameState.currentState = gameState;
  saveGameState();
}

function loadGameState() {
  try {
    let cachedpersistentGameState = getLocalItem(STORAGE_KEYS.GAME_STATE);
    if (cachedpersistentGameState !== null) {
      console.log(`existing persistentGameState exist ${cachedpersistentGameState}`)
      persistentGameState = cachedpersistentGameState;
    }
    // load player1
    let cachedPlayer1 = getLocalItem(STORAGE_KEYS.PLAYER1_STATE);
    if (cachedPlayer1 !== null) {
      console.log(`existing player1 exist ${cachedPlayer1}`)
      players.player1.setFieldsToLoad(cachedPlayer1);
    }
    // load player2
    let cachedPlayer2 = getLocalItem(STORAGE_KEYS.PLAYER2_STATE);
    if (cachedPlayer2 !== null) {
      console.log(`existing player2 exist ${cachedPlayer2}`)
      players.player2.setFieldsToLoad(cachedPlayer2);
    }
    // load bot
    let cachedBot = getLocalItem(STORAGE_KEYS.BOT_STATE);
    if (cachedBot !== null) {
      console.log(`existing bot exist ${cachedBot}`)
      players.bot.setFieldsToLoad(cachedBot);
    }
    console.log("game states loaded successfully")
  } catch (error) {
    console.error(`error occurred while reading from storage ${error}`)
  }
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
  persistentGameState.isDensityLensEnabled = false;
  players.bot = new Bot();
  players.bot.initializeGrid();
};

function initPlayers() {
  initializeRandomMap();
  createNewSinglePlayerObject();
  createNewMultiplayerObject();
  saveGameState();
}

loadGameState();
// persistentGameState.isDensityLensEnabled = true;


export {persistentGameState, GameStateEnum, alerts, initializeRandomMap, updateCurrentGameState, getCurrentGameState, randomMap, statTable, players, initPlayers, saveGameState, saveBotState, savePlayer1State, savePlayer2State};