import {p5, unsetMouseIsPressed} from '../index';
import { GLOBAL_SCALE, RGB_THEME, ISLAND } from '../constants/constants';
import { alerts, randomMap, savePlayer1State, savePlayer2State, persistentGameState } from '../setup/sketch';

class Player{
    gridHidden: any[][];
    gridActual: any[][];
    currLife: number[];
    name: string;
    playerIs: number;
    turn: number;
    shipArranged: boolean;
    autoButtonPushed: boolean;
    confirmButtonPushed: boolean;
    playeris: number;
    sendHtppRequest: boolean;
    startOnlineGame: boolean;
    hitX: number;
    hitY: number;
    shipDetails: { color: { r: number; g: number; b: number; }; size: number; id: number; name: string; begin: { x: number; y: number; }; end: { x: number; y: number; }; }[];
    win: boolean;
    constructor(playerName: string, playeris: number){

        // TODO
        // // inherits objects/attributes from network class
        // networkClass.call(this);
        // // inherits objects/attributes from ship class
        // shipClass.call(this);

        // can an if condition come inside constructor ???
        this.gridHidden = Array.from({ length: 10 }, () => new Array(10));
        this.gridActual = Array.from({ length: 10 }, () => new Array(10));
        
        this.currLife = [2, 3, 3, 4, 5];
        this.name = playerName;
        this.playerIs = playeris;
        this.turn = 0;
        this.shipArranged = false;
        this.autoButtonPushed = false;
        this.confirmButtonPushed = false;
        this.win = false;
        //   this.hitX;
        //  this.hitY;

        this.shipDetails = [
            { color: { r: 0, g: 163, b: 108 }, size: 2, id: 1, name: "patrolBoat", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }  },
            { color: { r: 207, g: 159, b: 255 }, size: 3, id: 2, name: "submarine", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }},
            { color: { r: 128, g: 128, b: 128 }, size: 3, id: 3, name: "destroyer", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }},
            { color: { r: 255, g: 127, b: 80 }, size: 4, id: 4, name: "battleship", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }},
            { color: { r: 238, g: 220, b: 130 }, size: 5, id: 5, name: "aircraftCarrier", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }},
        ];
    }
    getFieldsToSave(){
        return {
            gridHidden: this.gridHidden,
            gridActual: this.gridActual,
            currLife: this.currLife,
            name: this.name,
            playerIs: this.playerIs,
            turn: this.turn,
            shipArranged: this.shipArranged,
            autoButtonPushed: this.autoButtonPushed,
            confirmButtonPushed: this.confirmButtonPushed,
            playeris: this.playeris,
            sendHtppRequest: this.sendHtppRequest,
            startOnlineGame: this.startOnlineGame,
            hitX: this.hitX,
            hitY: this.hitY,
            shipDetails: this.shipDetails,
            win: this.win
        }
    }
    setFieldsToLoad(data: any){
        this.gridHidden = data.gridHidden;
        this.gridActual = data.gridActual;
        this.currLife = data.currLife;
        this.name = data.name;
        this.playerIs = data.playerIs;
        this.turn = data.turn;
        this.shipArranged = data.shipArranged;
        this.autoButtonPushed = data.autoButtonPushed;
        this.confirmButtonPushed = data.confirmButtonPushed;
        this.playeris = data.playeris;
        this.sendHtppRequest = data.sendHtppRequest;
        this.startOnlineGame = data.startOnlineGame;
        this.hitX = data.hitX;
        this.hitY = data.hitY;
        this.shipDetails = data.shipDetails;
        this.win = data.win;
    }
    countShipStatus(shipStatus: string) {
        let numberOfShipsDestroyed = 0;
        for (let i = 0; i < 5; i++) {
            if (this.currLife[i] === 0) {
                numberOfShipsDestroyed++;
            }
        }
        return numberOfShipsDestroyed;
    }
    drawGridActual() {
        let i = 1,
            j = 1,
            indent = 0;
        let indent_y = 40;
    
        //
        if (this.playerIs === 2) {
            indent = 650;
        }
    
        for (i = 0; i < this.shipDetails.length; i++) {
            for (j = 0; j < this.shipDetails[i].size; j++) {
                p5.noFill();
                p5.rect(indent + i * 85 + 40 + 20 * j, indent_y + 40, 20, 20);
            }
            for (j = 0; j < this.currLife[i]; j++) {
                p5.fill(
                    this.shipDetails[i].color.r,
                    this.shipDetails[i].color.g,
                    this.shipDetails[i].color.b
                );
                p5.rect(indent + i * 85 + 40 + 20 * j, indent_y + 40, 20, 20);
            }
        }
    
        p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK);
        for (i = 1; i <= 10; i++) {
            for (j = 1; j <= 10; j++) {
                p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK);
                p5.rect(indent + 50 + 35 * i, indent_y + 50 + 35 * j, 35, 35);
    
                // draws the ships on the map
                if (this.gridActual[i - 1][j - 1] > 0) {
                    p5.fill(
                        this.shipDetails[this.gridActual[i - 1][j - 1] - 1].color.r,
                        this.shipDetails[this.gridActual[i - 1][j - 1] - 1].color.g,
                        this.shipDetails[this.gridActual[i - 1][j - 1] - 1].color.b
                    );
                    p5.ellipse(indent + 67.5 + 35 * i, indent_y + 67.5 + 35 * j, 25, 25);
                }
                if (this.gridActual[i - 1][j - 1] === ISLAND) {
                    p5.fill(RGB_THEME.BOARD_ISLAND_BLOCK);
                    p5.rect(indent + 50 + 35 * i, indent_y + 50 + 35 * j, 35, 35);
                }
            }
        }
    };
    drawGridHidden() {
        let i = 1,
            j = 1,
            indent = this.playerIs === 2 ? 650 : 0;
    
        let indent_y = 40;
    
        p5.fill(255, 255, 255);
        p5.textSize(25);
        p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK);
        p5.rect(120 + indent, indent_y + 460, 120, 40)
        p5.rect(280 + indent, indent_y + 460, 120, 40)
        p5.fill(255, 255, 255);
        p5.text(this.playerIs === 2 ? "Player 2" : "Player 1", 130 + indent, indent_y + 470, 200, 50);
        p5.text("Turn : " + this.turn, 290 + indent, indent_y + 470, 200, 50);
    
        p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK);
        p5.rect(indent + 30, indent_y + 30, 465, 40)
    
        // textSize(20);
        // text("Turn : " + this.turn, 170 + indent, 10, 100, 20);
        for (i = 0; i < this.shipDetails.length; i++) {
            for (j = 0; j < this.shipDetails[i].size; j++) {
                if (this.currLife[i] > 0 && j < this.shipDetails[i].size) {
                    p5.fill(
                        this.shipDetails[i].color.r,
                        this.shipDetails[i].color.g,
                        this.shipDetails[i].color.b
                    );
                } else {
                    if (
                        alerts.shipSunk.shipId === this.shipDetails[i].id &&
                        alerts.shipSunk.active === true &&
                        ((this.playerIs === 1 && persistentGameState.playerOneTurn === false) ||
                            (this.playerIs === 2 && persistentGameState.playerOneTurn == true)) &&
                        Math.floor(alerts.shipSunk.iterator / 10) % 2 === 0
                    ) {
                        p5.fill(
                            this.shipDetails[i].color.r,
                            this.shipDetails[i].color.g,
                            this.shipDetails[i].color.b
                        );
                    } else {
                        p5.noFill();   
                    }
                }
                p5.rect(indent + (i * 85) + 40 + 20 * j, indent_y + 40, 20, 20);
            }
        }
    
        p5.fill(64, 54, 255);
    
        for (i = 1; i <= 10; i++) {
            
            p5.fill(255, 255, 255);
            p5.textFont("Helvetica");
            p5.textSize(20);
            p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK);
            p5.rect(indent + 50 + 35 * i, indent_y + 80, 35, 35);
            p5.fill(255, 255, 255);
            p5.text(String.fromCharCode(64 + i), indent + 60 + 35 * i, indent_y + 105.5);
            p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK);
            p5.rect(indent + 50, indent_y + 80 + 35 * i, 35, 35);
            p5.fill(255, 255, 255);
            p5.text(i, indent + (i === 10 ? 55 : 62.5), indent_y + 105 + 35 * i);
            for (j = 1; j <= 10; j++) {
                // block not yet hit
                //   if(this.gridHidden[i-1][j-1] === 0){
                p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK);
                if (persistentGameState.isDensityLensEnabled === false || this.playeris !== 2) {
                    if (this.gridHidden[i - 1][j - 1] === ISLAND) {
                        //sandy beach colour
                        p5.fill(RGB_THEME.BOARD_ISLAND_BLOCK);
                    }
                    p5.rect(indent + 50 + 35 * i, indent_y + 80 + 35 * j, 35, 35);
                }
                // target hit inside the block
                if (this.gridHidden[i - 1][j - 1] > 0) {
                    p5.fill(RGB_THEME.SHIP_HIT);
                    p5.ellipse(indent + 67.5 + 35 * i, indent_y + 97.5 + 35 * j, 25, 25);
                }
                // missed inside block
                else if (this.gridHidden[i - 1][j - 1] === -1) {
                    p5.fill(RGB_THEME.SHIP_MISS);
                    p5.ellipse(indent + 67.5 + 35 * i, indent_y + 97.5 + 35 * j, 25, 25);
                }
            }
        }
        return 0;
    };
    arrangeShip() {
        // solve random function ceiling
        let size;
        let a,
            b,
            i,
            num,
            shipOverlapped = false;
    
        for (size = 5; size > 0; size--) {
            // put condition for overlap check !!!!!!!!!!!!!!!!!!!!!
            shipOverlapped = false;
    
            num = size;
    
            if (size === 1 || size === 2) {
                num++;
            }
    
            if (Math.floor(p5.random(0, 2))) {
                // horizontal arrangement trigger
    
                while (1) {
                    a = Math.floor(p5.random(0, 10));
                    b = Math.floor(p5.random(0, 11 - num));
    
                    for (i = 0; i < num; i++) {
                        if (this.gridActual[a][b + i] !== 0) {
                            shipOverlapped = true;
    
                            // break and search for a non-overlapping spot again
                            break;
                        }
                    }
    
                    if (!shipOverlapped) {
                        // updates ships begin coordinate which will be sent to database
                        this.shipDetails[size - 1].begin.x = a;
                        this.shipDetails[size - 1].begin.y = b;
    
                        for (i = 0; i < num; i++) {
                            this.gridActual[a][b + i] = size; //  horizontal arrangement by random
                        }
    
                        // updates ships end coordinate which will be sent to database
                        this.shipDetails[size - 1].end.x = a;
                        this.shipDetails[size - 1].end.y = b + i;
    
                        break; // breaks from while loop as ship is arranged successfully
                    }
                    shipOverlapped = false;
                }
            } else {
                while (1) {
                    b = Math.floor(p5.random(0, 10));
                    a = Math.floor(p5.random(0, 11 - num));
    
                    for (i = 0; i < num; i++) {
                        if (this.gridActual[a + i][b] !== 0) {
                            shipOverlapped = true;
                            // break from for loop if ship overlaps
                            break;
                        }
                    }
    
                    if (!shipOverlapped) {
                        // updates ships begin coordinate which will be sent to database
                        this.shipDetails[size - 1].begin.x = a;
                        this.shipDetails[size - 1].begin.x = b;
    
                        for (i = 0; i < num; i++) {
                            this.gridActual[a + i][b] = size; //  vertical arrangement by random
                        }
                        // updates ships end coordinate which will be sent to database
                        this.shipDetails[size - 1].end.x = a + i;
                        this.shipDetails[size - 1].end.y = b;
    
                        break;
                    }
                    shipOverlapped = false;
                }
            }
        }
        //  return 0;
    };
    initializeGrid() {
        /*
          for(let i = 0; i < 10; i++){
              this.gridHidden[ i ] = new Array(10);
          }
      
          for(let i = 0; i < 10; i++){
              this.gridActual[ i ] = new Array(10);
          }
      */
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.gridHidden[i][j] = randomMap[i][j];
                this.gridActual[i][j] = randomMap[i][j];
            }
        }
    
        this.turn = 0;
        this.shipArranged = false;
        this.autoButtonPushed = false;
        this.confirmButtonPushed = false;
        this.win = false;
    
        this.currLife = [2, 3, 3, 4, 5];
        this.shipDetails = [
            { color: { r: 0, g: 163, b: 108 }, size: 2, id: 1, name: "patrolBoat", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }  },
            { color: { r: 207, g: 159, b: 255 }, size: 3, id: 2, name: "submarine", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }},
            { color: { r: 128, g: 128, b: 128 }, size: 3, id: 3, name: "destroyer", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }},
            { color: { r: 255, g: 127, b: 80 }, size: 4, id: 4, name: "battleship", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }},
            { color: { r: 238, g: 220, b: 130 }, size: 5, id: 5, name: "aircraftCarrier", begin: { x: 0, y: 0 }, end: { x: 0, y: 0 }},
        ];
    
        this.sendHtppRequest = true;
        this.startOnlineGame = false;
    };
    checkShipLifeStatus() {
        if (
            this.currLife[0] +
            this.currLife[1] +
            this.currLife[2] +
            this.currLife[3] +
            this.currLife[4] ===
            0
        ) {
            return true;
        }
    
        return false;
    };
    play(playerIs: number) {
        let indent = 0,
            i = 1,
            j = 1;
        let indent_y = 40;
    
        // if all oponents ships have sunk declare victory
        if (this.checkShipLifeStatus() === true) {
            return true;
        }
    
        if (this.turn < 100) {
            // check for win condition in each turn
            if (playerIs === 2) {
                indent = 650;
            }
    
            // ensure player is not able to hit the same grid again
            for (i = 1; i <= 10; i++) {
                for (j = 1; j <= 10; j++) {
                    if (
                        p5.mouseX / GLOBAL_SCALE > indent + 50 + 35 * i &&
                        p5.mouseX / GLOBAL_SCALE < indent + 50 + 35 * (i + 1) &&
                        p5.mouseY / GLOBAL_SCALE > indent_y + 80 + 35 * j &&
                        p5.mouseY / GLOBAL_SCALE < indent_y + 80 + 35 * (j + 1)
                    ) {
                        if (!p5.mouseIsPressed && this.gridHidden[i - 1][j - 1] !== ISLAND) {
                            p5.fill(RGB_THEME.BOARD_OCEAN_BLOCK_HIGHLIGHT);
                            p5.rect(indent + 50 + 35 * i, indent_y + 80 + 35 * j, 35, 35);
                        }
    
                        if (p5.mouseIsPressed) {
                            /*
                                        fill(255, 0, 0);
                                        rect(indent+50+25*i,5+25*j,25,25);
                                        */
                            if (
                                this.gridActual[i - 1][j - 1] === 0 &&
                                this.gridHidden[i - 1][j - 1] === 0
                            ) {
                                this.turn++;
                                // this deletes water block at location
                                this.gridHidden[i - 1][j - 1] = -1;
    
                                this.hitX = i - 1;
                                this.hitY = j - 1;
                                //send your hit coordinates info to the server
                                // send player2.hitX and player2.hitY
    
                                alerts.playerSwitching.active = true;
                                persistentGameState.playerOneTurn = !persistentGameState.playerOneTurn;

                                if (playerIs === 2) {
                                    savePlayer2State();
                                } else {
                                    savePlayer1State();
                                }
                                if (this.checkShipLifeStatus() === true) {
                                    return true;
                                }
                                
    
                                // returns when shot misses
                                return 0;
                            } else if (
                                this.gridActual[i - 1][j - 1] > 0 &&
                                this.gridHidden[i - 1][j - 1] === 0
                            ) {
                                // subtract ships life which is hit
                                // mark as hit on hidden grid
                                this.gridHidden[i - 1][j - 1] = 1;
                                this.currLife[this.gridActual[i - 1][j - 1] - 1]--;
                                if (this.currLife[this.gridActual[i - 1][j - 1] - 1] === 0) {
                                    alerts.shipSunk.active = true;
                                    alerts.shipSunk.shipId = this.shipDetails[this.gridActual[i - 1][j - 1] - 1].id;
                                } else {
                                    alerts.shipHit.active = true;
                                }
    
                                this.hitX = i - 1;
                                this.hitY = j - 1;
                                //send your hit coordinates info to the server
                                // send player2.hitX and player2.hitY
                                if (playerIs === 2) {
                                    persistentGameState.playerOneTurn = true;
                                    savePlayer2State();
                                } else {
                                    persistentGameState.playerOneTurn = false;
                                    savePlayer1State();
                                }
                                return 0;
                            }
    
                            //player1.gridHidden[i-1][j-1]=-1;
                            unsetMouseIsPressed();
                        }
                    }
                }
            }
            // if above if statement dosnt return than extra shot
        }
        return 0;
    };
    deployShipsReceivedFromServer() {
        let i = 0,
            j = 0;
    
        for (i = 0; i < 5; i++) {
            // ship is arranged horizontally
            if (this.shipDetails[i].begin.x === this.shipDetails[i].end.x) {
                for (j = 0; j < this.shipDetails[i].size; j++) {
                    this.gridActual[this.shipDetails[i].begin.x][this.shipDetails[i].begin.y + j] = 1;
                }
            }
    
            //ship is arranged vertically
            else {
                for (j = 0; j < this.shipDetails[i].size; j++) {
                    this.gridActual[this.shipDetails[i].begin.x + j][this.shipDetails[i].begin.y] = 1;
                }
            }
        }
    };

}
export default Player;
