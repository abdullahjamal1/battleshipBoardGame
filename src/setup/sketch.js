function setup() {
  createCanvas(750, 375);
  frameRate(60);
}

var mouseIsPressed = false;

var mouseReleased = function () {
  mouseIsPressed = false;
};
var mousePressed = function () {
  mouseIsPressed = true;
};
var touchStarted = function () {
  mouseIsPressed = true;
};

/**
    global variables
*/
var globalScale = 0.65;
var menu = true;
var credits = false;
var instructions = false;
var multiPlayerOffline = false;
var multiPlayerOnline = false;
var statistics = false;
var winState = false;
var makeNewMap = false;

var playerOneTurn = true;
var singlePlayer = false;
var singlePlayerWin = false;
var multiPlayerWin = false;
var densityLens = false;
var statTableUpdated = false;
var playerSwitching = true;
var playerSwitchingIterator = 0;
var shipHitAlertIterator = 0;
var triggerShipHitAlert = false;
var triggerShipSunkAlert = false;
var sunkShipId = -1;
var shipSunkAlertIterator = 0;
const ISLAND = -2;
var isLightTheme = true;

const RGB = {
  get BACKGROUND() {
    return isLightTheme ? 'rgb(19, 41, 75)': 'rgb(19, 41, 75)';
  },
  get BUTTON() {
    return isLightTheme ? 'rgba(54, 157, 160, 1.0)': 'rgba(54, 157, 160, 1.0)';
  },
  get SHIP_HIT() {
    return isLightTheme ? 'rgb(210, 43, 43)': 'rgb(210, 43, 43)';
  },
  get SHIP_MISS() {
    return isLightTheme ? 'rgb(54, 157, 160)': 'rgb(54, 157, 160)';
  },
  get BUTTON_TEXT() {
    return isLightTheme ? 'rgb(0, 0, 0)': 'rgb(0, 0, 0)';
  },
  get BOARD_OCEAN_BLOCK() {
    return isLightTheme ? 'rgb(22, 92, 125)': 'rgb(211, 187, 168)';
  },
  get BOARD_OCEAN_BLOCK_HIGHLIGHT() {
    return isLightTheme ? 'rgba(31, 126, 171, 0.8)': 'rgba(31, 126, 171, 0.8)';
  },
  get BOARD_ISLAND_BLOCK() {
    return isLightTheme ? 'rgb(211, 187, 168)': 'rgb(22, 92, 125)';
  },
  get STATS_HIGH() {
    return isLightTheme ? 'rgb(211, 187, 168)': 'rgb(144, 238, 144)';
  },
  get STATS_LOW() {
    return isLightTheme ? 'rgb(228, 213, 211)': 'rgb(255, 127, 127)';
  }
}

var randomMap = new Array(10);
for (var i = 0; i < randomMap.length; i++) {
  randomMap[i] = new Array(10);
}

var initializeRandomMap = function () {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      randomMap[i][j] = 0;
    }
  }
};

initializeRandomMap();

for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    randomMap[i][j] = 0;
  }
}
// creating statistics table
var statTable = new Array(3);
for (var i = 0; i < statTable.length; i++) {
  statTable[i] = new Array(6);
}
// init statTable
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 6; j++) {
    statTable[i][j] = 0;
  }
}

async function loadStatsFromStorage() {
  try {
    var stats = await getItem(STORAGE_KEYS.STATS);
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
