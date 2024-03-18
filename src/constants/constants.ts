import { persistentGameState } from "../setup/sketch";

const GLOBAL_SCALE = 0.65;
const ISLAND = -2;

const RGB_THEME = {
  get BACKGROUND() {
    return persistentGameState.isLightTheme
      ? "rgb(19, 41, 75)"
      : "rgb(22, 92, 125)";
  },
  get BUTTON() {
    return persistentGameState.isLightTheme
      ? "rgba(54, 157, 160, 1.0)"
      : "rgba(198, 218, 231, 1.0)";
  },
  get SHIP_HIT() {
    return persistentGameState.isLightTheme
      ? "rgb(210, 43, 43)"
      : "rgb(210, 43, 43)";
  },
  get SHIP_MISS() {
    return persistentGameState.isLightTheme
      ? "rgb(54, 157, 160)"
      : "rgb(198, 218, 231)";
  },
  get BUTTON_TEXT() {
    return persistentGameState.isLightTheme ? "rgb(0, 0, 0)" : "rgb(0, 0, 0)";
  },
  get BOARD_OCEAN_BLOCK() {
    return persistentGameState.isLightTheme
      ? "rgb(22, 92, 125)"
      : "rgb(54, 157, 160)";
  },
  get BOARD_OCEAN_BLOCK_HIGHLIGHT() {
    return persistentGameState.isLightTheme
      ? "rgba(31, 126, 171, 0.8)"
      : "rgba(70, 170, 190, 0.8)";
  },
  get BOARD_ISLAND_BLOCK() {
    return persistentGameState.isLightTheme
      ? "rgb(211, 187, 168)"
      : "rgb(228, 213, 211)";
  },
  get STATS_HIGH() {
    return persistentGameState.isLightTheme
      ? "rgb(211, 187, 168)"
      : "rgb(211, 187, 168)";
  },
  get STATS_LOW() {
    return persistentGameState.isLightTheme
      ? "rgb(228, 213, 211)"
      : "rgb(228, 213, 211)";
  },
};

const SHIP_INFO = [
  { color: { r: 0, g: 163, b: 108 }, size: 2, id: 1, name: "patrolBoat" },
  { color: { r: 207, g: 159, b: 255 }, size: 3, id: 2, name: "submarine"},
  { color: { r: 128, g: 128, b: 128 }, size: 3, id: 3, name: "destroyer"},
  { color: { r: 255, g: 127, b: 80 }, size: 4, id: 4, name: "battleship"},
  { color: { r: 238, g: 220, b: 130 }, size: 5, id: 5, name: "aircraftCarrier"},
];

export { RGB_THEME, GLOBAL_SCALE, ISLAND, SHIP_INFO };