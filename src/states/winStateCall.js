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

function roundTo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

async function updateStatTable(statTable){
    await setItem(STORAGE_KEYS.STATS, statTable);
    statTableUpdated = true;
}

var winStateCall = function () {
    // background(0, 0, 0);
    fill(240, 218, 240);

    // display victory message too
    if (player1.win === true) {

        textSize(40);
        text("Player 1 Wins !!! Turns: " + player1.turn, 500, 470, 400, 400);


        if (singlePlayerWin === true) {

            bot.drawGridActual();

            if (!statTableUpdated) {
                // average turns to win
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.avgTurnsToWin] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.avgTurnsToWin] * statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + player1.turn) / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + 1));

                // opponent loses match
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesLost]++;
                // matches won by player
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon]++;

                // win percentage
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost])) * 100);
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesLost])) * 100);
                // number of ships destroyed

                var numberOfShipsLost = 0;
                for (var i = 0; i < 5; i++) {
                    if (player1.currLife[i] === 0) {
                        numberOfShipsLost++;
                    }
                }

                statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsDestroyed] += numberOfShipsLost;
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsLost] += numberOfShipsLost;
                // number of ships lost

                statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] += bot.countShipStatus("destroyed");
                statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsDestroyed] += bot.countShipStatus("destroyed");
                updateStatTable(statTable)
            }
        }
        else {

            player2.drawGridActual();

            if (!statTableUpdated) {

                // average turns to win
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.avgTurnsToWin] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.avgTurnsToWin] * statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + player1.turn) / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + 1));

                statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesLost]++;
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon]++;

                // win percentage
                statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost])) * 100.0);
                statTable[statisticsEnum.row.Player2][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesLost])) * 100.0);
                // number of ships destroyed
                var numberOfShipsDestroyed = 0;
                for (var i = 0; i < 5; i++) {
                    if (player2.currLife[i] === 0) {
                        numberOfShipsDestroyed++;
                    }
                }
                var numberOfShipsLost = 0;
                for (var i = 0; i < 5; i++) {
                    if (player1.currLife[i] === 0) {
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
    else if (player2.win === true) {

        textSize(40);
        text("Player 2 Wins !!! Turns : " + player2.turn, 500, 470, 400, 400);

        if (!statTableUpdated) {

            // average turns to win
            statTable[statisticsEnum.row.Player2][statisticsEnum.col.avgTurnsToWin] = roundTo((statTable[statisticsEnum.row.Player2][statisticsEnum.col.avgTurnsToWin] * statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] + player2.turn) / (statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] + 1) );

            statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon]++;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost]++;

            // win percentage
            statTable[statisticsEnum.row.Player2][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player2][statisticsEnum.col.matchesLost])) * 100.0);
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost])) * 100.0);
            // number of ships destroyed
            var numberOfShipsDestroyed = 0;
            for (var i = 0; i < 5; i++) {
                if (player1.currLife[i] === 0) {
                    numberOfShipsDestroyed++;
                }
            }
            var numberOfShipsLost = 0;
            for (var i = 0; i < 5; i++) {
                if (player2.currLife[i] === 0) {
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
        player1.drawGridActual();
    }
    else {

        textSize(40);
        text("BOT Wins !!! turns: " + bot.turn, 500, 460, 400, 400);

        if (statTableUpdated === false) {

            // average turns to win
            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.avgTurnsToWin] = roundTo((statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.avgTurnsToWin] * statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] + bot.turn )/( statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] + 1 ));
            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon]++;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost]++;

            // win percentage
            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.matchesLost])) * 100);
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.winPercentage] = roundTo((statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] / (statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesWon] + statTable[statisticsEnum.row.Player1][statisticsEnum.col.matchesLost])) * 100);
            // number of ships destroyed
            var numberOfShipsDestroyed = 0;
            for (var i = 0; i < 5; i++) {
                if (player1.currLife[i] === 0) {
                    numberOfShipsDestroyed++;
                }
            }

            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsDestroyed] += bot.countShipStatus("lost");;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsLost] += bot.countShipStatus("lost");;
            // number of ships lost

            statTable[statisticsEnum.row.botPlayer][statisticsEnum.col.shipsLost] += numberOfShipsDestroyed;
            statTable[statisticsEnum.row.Player1][statisticsEnum.col.shipsDestroyed] += numberOfShipsDestroyed;

            updateStatTable(statTable)
        }

        player1.drawGridActual();
    }

    var backButton = new button("Menu", 150, 500);
    backButton.draw();

    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {

            backButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            winState = false;
            menu = true;
            statTableUpdated = false;

            singlePlayerWin = false;
            player1.initializeGrid();
            player2.initializeGrid();
            bot.initializeGrid();
            createNewMultiplayerObject();
            createNewSinglePlayerObject();
        }
    }
};
