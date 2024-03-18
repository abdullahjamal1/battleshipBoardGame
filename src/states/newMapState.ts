import Button from "../classes/Button";
import { ISLAND, RGB_THEME } from "../constants/constants";
import {p5} from '../index'
import { GameStateEnum, randomMap, sessionGameState, updateCurrentGameState } from "../setup/sketch";

function generateIslands(islandsCount: number) {
    let stack: any = { first: [], second: [] };

    stack.first.push(Math.floor(p5.random(0, 10)));
    stack.second.push(Math.floor(p5.random(0, 10)));

    let nodeX = Math.floor(p5.random(0, 10));
    let nodeY = Math.floor(p5.random(0, 10));

    while (islandsCount > 0) {

        if (stack.first.length === 0 && islandsCount > 0) {
            while (randomMap[nodeX][nodeY] === ISLAND) {
                nodeX = Math.floor(p5.random(0, 10));
                nodeY = Math.floor(p5.random(0, 10));
            }
            stack.first.push(nodeX);
            stack.second.push(nodeY);
        }

        nodeX = stack.first.pop();
        nodeY = stack.second.pop();

        while (stack.first.length !== 0 && randomMap[nodeX][nodeY] === ISLAND) {
            nodeX = stack.first.pop();
            nodeY = stack.second.pop();
        }

        if (randomMap[nodeX][nodeY] === ISLAND) {
            continue;
        }

        randomMap[nodeX][nodeY] = ISLAND;

        islandsCount--;

        let ar: any[][] = [[], []];

        if (nodeX + 1 < 10 && randomMap[nodeX + 1][nodeY] !== ISLAND) {
            ar[0].push(nodeX + 1);
            ar[1].push(nodeY);
        }
        if (nodeY + 1 < 10 && randomMap[nodeX][nodeY + 1] !== ISLAND) {
            ar[0].push(nodeX);
            ar[1].push(nodeY + 1);
        }
        if (nodeX - 1 >= 0 && randomMap[nodeX - 1][nodeY] !== ISLAND) {
            ar[0].push(nodeX - 1);
            ar[1].push(nodeY);
        }
        if (nodeY - 1 >= 0 && randomMap[nodeX][nodeY - 1] !== ISLAND) {
            ar[0].push(nodeX);
            ar[1].push(nodeY - 1);
        }

        let randNumber = Math.floor(p5.random(0, ar[0].length));

        if (ar[0].length === 0) {
            continue;
        }

        stack.first.push(ar[0][randNumber]);
        stack.second.push(ar[1][randNumber]);

        ar[0].splice(randNumber, 1);
        ar[1].splice(randNumber, 1);
    }
};

function drawGeneratedMap(randomMap: any[]) {
    let indent = 340;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK);
            // fill(22, 92, 125);

            if (randomMap[i][j] !== ISLAND) {
                p5.rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
            } else {
                // fill(255, 212, 128);
                p5.fill(RGB_THEME.BOARD_ISLAND_BLOCK);
                p5.rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
            }
        }
    }
};

const islandX = 600,
islandY = 385;

let islandsCount = 0;
let backButton = new Button("Back", 250, 450);
let newMapButton = new Button("New Map", 450, 450);
let startButton = new Button("Start", 650, 450);
let leftArrow = new Button("<", islandX + 5, islandY + 5, 35, 35);
let rightArrow = new Button(">", islandX + 120 - 35, islandY + 5, 35, 35);

function newMapState() {

    let islandsCountButton = new Button(
        "    " + islandsCount,
        islandX,
        islandY,
        125,
        45
    );

    p5.fill(255, 255, 255);
    p5.text("Island Blocks:", islandX - 200, islandY + 7, 200, 40);

    backButton.draw();
    startButton.draw();
    newMapButton.draw();
    islandsCountButton.draw();
    leftArrow.draw();
    rightArrow.draw();

    drawGeneratedMap(randomMap);

    if (leftArrow.insideButton()) {
        if (!p5.mouseIsPressed) {
            leftArrow.lightUpButton();
        } else {
            if (islandsCount > 0) {
                islandsCount--;
            }
            p5.mouseIsPressed = false;
        }
    }

    if (rightArrow.insideButton()) {
        if (!p5.mouseIsPressed) {
            rightArrow.lightUpButton();
        } else {
            if (islandsCount < 25) {
                islandsCount++;
                p5.mouseIsPressed = false;
            }
        }
    }

    if (startButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!p5.mouseIsPressed) {
            startButton.lightUpButton();
        }
        if (p5.mouseIsPressed) {

            if(sessionGameState.currentState === GameStateEnum.NewMapSinglePlayer){
                updateCurrentGameState(GameStateEnum.SinglePlayer);
            }
            else if(sessionGameState.currentState === GameStateEnum.NewMapMultiPlayerOffline){
                updateCurrentGameState(GameStateEnum.MultiPlayerOffline);
            }
            p5.mouseIsPressed = false;
        }
    }

    if (newMapButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!p5.mouseIsPressed) {
            //if mouse is not pressed then light up button
            newMapButton.lightUpButton();
        }
        if (p5.mouseIsPressed) {
            //if mouse is pressed go to menu
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    randomMap[i][j] = 0;
                }
            }
            generateIslands(islandsCount);
            p5.mouseIsPressed = false;
        }
    }
    // back button  - common for both the players
    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!p5.mouseIsPressed) {
            //if mouse is not pressed then light up button
            backButton.lightUpButton();
        }
        if (p5.mouseIsPressed) {
            updateCurrentGameState(GameStateEnum.Menu);
            p5.mouseIsPressed = false;
        }
    }
};
export default newMapState;