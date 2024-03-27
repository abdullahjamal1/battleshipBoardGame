import { players } from "../setup/sketch";

/**
 * mapSwap
 * Description : it takes argument as a string, if the parameter is "singlePlayer" it swaps the maps of player1 and bot,
 *               if the parameter is "MultiPlayer" it swaps the maps of player1 and player2
 *
 * @Param {String} gameType  gameType = "singlePlayer" or "multiPlayer"
 */
let mapSwap = function (gameType: string) {
    let temp = new Array(10);
    for (let i = 0; i < 10; i++) {
        temp[i] = new Array(10);
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            temp[i][j] = players.player1.gridActual[i][j];
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gameType === "singlePlayer") {
                players.player1.gridActual[i][j] = players.bot.gridActual[i][j];
            } else {
                players.player1.gridActual[i][j] = players.player2.gridActual[i][j];
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gameType === "singlePlayer") {
                players.bot.gridActual[i][j] = temp[i][j];
            } else {
                players.player2.gridActual[i][j] = temp[i][j];
            }
        }
    }
};
export default mapSwap;
