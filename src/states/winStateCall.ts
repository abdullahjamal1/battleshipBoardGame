import Button from '../classes/Button';
import {p5} from '../index'
import { setItem, STORAGE_KEYS } from '../service/storage';
import { GameStateEnum, initPlayers, players, persistentGameState, statTable } from '../setup/sketch';

const statisticsEnum = {
    row: {
        Player1: 0,
        Player2: 1,
        botPlayer: 2
    },
    col: {
        matchesWon: 0,
        matchesLost: 1,
        shipsDestroyed: 2,
        shipsLost: 3,
        avgTurnsToWin: 4,
        winPercentage: 5
    }
};

function roundTo(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

async function updateStatTable(statTable: any){
    await setItem(STORAGE_KEYS.STATS, statTable);
    persistentGameState.statTableUpdated = true;
}

let winStateCall = function () {
    // background(0, 0, 0);
    p5.fill(240, 218, 240);

    // display victory message too
    if (players.player1.win === true) {

        p5.textSize(40);
        p5.text("Player 1 Wins !!! Turns: " + players.player1.turn, 400, 470, 400, 400);


        if (persistentGameState.singlePlayerWin === true) {

            players.bot.drawGridActual();

            if (!persistentGameState.statTableUpdated) {
                // average turns to win
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.avgTurnsToWin] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.avgTurnsToWin] * statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + players.player1.turn) / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + 1));

                // opponent loses match
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesLost]++;
                // matches won by player
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon]++;

                // win percentage
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost])) * 100);
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesLost])) * 100);
                // number of ships destroyed

                let numberOfShipsLost = 0;
                for (let i = 0; i < 5; i++) {
                    if (players.player1.currLife[i] === 0) {
                        numberOfShipsLost++;
                    }
                }

                statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsDestroyed] += numberOfShipsLost;
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsLost] += numberOfShipsLost;
                // number of ships lost

                statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] += players.bot.countShipStatus("destroyed");
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsDestroyed] += players.bot.countShipStatus("destroyed");
                updateStatTable(statTable)
            }
        }
        else {

            players.player2.drawGridActual();

            if (!persistentGameState.statTableUpdated) {

                // average turns to win
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.avgTurnsToWin] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.avgTurnsToWin] * statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + players.player1.turn) / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + 1));

                statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesLost]++;
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon]++;

                // win percentage
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost])) * 100.0);
                statTable[statisticsEnum.row.Player2][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesLost])) * 100.0);
                // number of ships destroyed
                let numberOfShipsDestroyed = 0;
                for (let i = 0; i < 5; i++) {
                    if (players.player2.currLife[i] === 0) {
                        numberOfShipsDestroyed++;
                    }
                }
                let numberOfShipsLost = 0;
                for (let i = 0; i < 5; i++) {
                    if (players.player1.currLife[i] === 0) {
                        numberOfShipsLost++;
                    }
                }
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsDestroyed] += numberOfShipsLost;
                statTable[statisticsEnum.row.Player2][statisticsEnum.col.shipsLost] += numberOfShipsLost;
                // number of ships lost

                statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] += numberOfShipsDestroyed;
                statTable[statisticsEnum.row.Player2][statisticsEnum.col.shipsDestroyed] += numberOfShipsDestroyed;
                updateStatTable(statTable)
            }
        }
    }
    else if (players.player2.win === true) {

        p5.textSize(40);
        p5.text("Player 2 Wins !!! Turns : " + players.player2.turn, 500, 470, 400, 400);

        if (!persistentGameState.statTableUpdated) {

            // average turns to win
            statTable[statisticsEnum.row.Player2][statisticsEnum.col.avgTurnsToWin] = roundTo((statTable[statisticsEnum.row.Player2][statisticsEnum.col.avgTurnsToWin] * statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] + players.player2.turn) / (statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] + 1) );

            statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon]++;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost]++;

            // win percentage
            statTable[statisticsEnum.row.Player2][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesLost])) * 100.0);
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost])) * 100.0);
            // number of ships destroyed
            let numberOfShipsDestroyed = 0;
            for (let i = 0; i < 5; i++) {
                if (players.player1.currLife[i] === 0) {
                    numberOfShipsDestroyed++;
                }
            }
            let numberOfShipsLost = 0;
            for (let i = 0; i < 5; i++) {
                if (players.player2.currLife[i] === 0) {
                    numberOfShipsLost++;
                }
            }

            statTable[statisticsEnum.row.Player2][statisticsEnum.col.shipsDestroyed] += numberOfShipsLost;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] += numberOfShipsLost;
            // number of ships lost

            statTable[statisticsEnum.row.Player2][statisticsEnum.col.shipsLost] += numberOfShipsDestroyed;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsDestroyed] += numberOfShipsDestroyed;

            updateStatTable(statTable)
        }
        players.player1.drawGridActual();
    }
    else {

        p5.textSize(40);
        p5.text("BOT Wins !!! turns: " + players.bot.turn, 500, 460, 400, 400);

        if (persistentGameState.statTableUpdated === false) {

            // average turns to win
            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.avgTurnsToWin] = roundTo((statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.avgTurnsToWin] * statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] + players.bot.turn )/( statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] + 1 ));
            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon]++;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost]++;

            // win percentage
            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesLost])) * 100);
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost])) * 100);
            // number of ships destroyed
            let numberOfShipsDestroyed = 0;
            for (let i = 0; i < 5; i++) {
                if (players.player1.currLife[i] === 0) {
                    numberOfShipsDestroyed++;
                }
            }

            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsDestroyed] += players.bot.countShipStatus("lost");;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] += players.bot.countShipStatus("lost");;
            // number of ships lost

            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsLost] += numberOfShipsDestroyed;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsDestroyed] += numberOfShipsDestroyed;

            updateStatTable(statTable)
        }

        players.player1.drawGridActual();
    }

    let backButton = new Button("Menu", 150, 500);
    backButton.draw();

    if (backButton.insideButton()) {
        if (!p5.mouseIsPressed) {

            backButton.lightUpButton();
        }
        if (p5.mouseIsPressed) {

            persistentGameState.currentState = GameStateEnum.Menu;

            persistentGameState.statTableUpdated = false;
            persistentGameState.singlePlayerWin = false;
            initPlayers();
        }
    }
};
export default winStateCall;
