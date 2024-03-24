import Player from "./Player";
import { alerts, persistentGameState, saveBotState } from "../setup/sketch";
import {p5} from '../index';
import { ISLAND } from "../constants/constants";

class Bot extends Player {
    target_locked_x: any[];
    chainFire: boolean;
    curr_big_ship: number;
    smallSize: number;
    grid: any[];
    target_locked_y: any[];
    missed_target_x: any[];
    missed_target_y: any[];
    stack_x: any[];
    stack_y: any[];
    hitShipType: number;
    constructor() {
        super("p2", 2);
        this.chainFire = false;
        this.curr_big_ship = 5;
        this.smallSize = 0;
        this.grid = new Array(10);
        for (let i = 0; i < 10; i++) {
            this.grid[i] = new Array(10);
        }
        this.target_locked_x = [];
        this.target_locked_y = [];
        this.missed_target_x = [];
        this.missed_target_y = [];
        this.stack_x = [];
        this.stack_y = [];
    }
    getBotFieldsToSave(){
        return {
            target_locked_x: this.target_locked_x,
            target_locked_y: this.target_locked_y,
            chainFire: this.chainFire,
            curr_big_ship: this.curr_big_ship,
            smallSize: this.smallSize,
            grid: this.grid,
            missed_target_x: this.missed_target_x,
            missed_target_y: this.missed_target_y,
            stack_x: this.stack_x,
            stack_y: this.stack_y,
            hitShipType: this.hitShipType,
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
        this.target_locked_x = data.target_locked_x;
        this.target_locked_y = data.target_locked_y;
        this.chainFire = data.chainFire;
        this.curr_big_ship = data.curr_big_ship;
        this.smallSize = data.smallSize;
        this.grid = data.grid;
        this.missed_target_x = data.missed_target_x;
        this.missed_target_y = data.missed_target_y;
        this.stack_x = data.stack_x;
        this.stack_y = data.stack_y;
        this.hitShipType = data.hitShipType;
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
    drawProbabilityDensityGrid() {
        let i = 1;
        let j = 1;
        const indent = 150;
        const indent_y = 120;

        for (i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                if (this.grid[i][j] > 2) {
                    if (!persistentGameState.isLightTheme) {
                        p5.fill(this.grid[i][j] * 25, 0, 0);
                    } else {
                        p5.fill(0, 0, this.grid[i][j] * 25);
                    }
                    p5.rect(indent + 550 + 35 * (i + 1), indent_y + 35 * (j + 1), 35, 35);
                } else if (this.grid[i][j] === 2) {
                    p5.fill(0, 0, 0);
                    p5.rect(indent + 550 + 35 * (i + 1), indent_y + 35 * (j + 1), 35, 35);
                }
            }
        }
        return 0;
    }
    // size = this.curr_big_ship
    find(x: number, y: number, horiz: number) {
        let i,
            set = 0;
    
        if (horiz) {
            for (i = 0; i < this.target_locked_x.length; i++) {
                if (this.target_locked_x[i] !== x) {
                    return 0;
                }
                if (
                    this.target_locked_y[i] >= y &&
                    this.target_locked_y[i] <= y + this.curr_big_ship
                ) {
                    set++;
                }
                // else set=0;
            }
        }
    
        // vertical
        else {
            for (i = 0; i < this.target_locked_x.length; i++) {
                if (this.target_locked_y[i] !== y) {
                    return 0;
                }
                if (
                    this.target_locked_x[i] >= x &&
                    this.target_locked_x[i] <= x + this.curr_big_ship
                ) {
                    set++;
                }
                //	 else set=0;
            }
        }
    
        if (set === this.target_locked_x.length) {
            return 1;
        }
        return 0;
    };
    grid_filter(i: number, j: number, horiz: number, currShip: number) {
        let k;
    
        if (horiz) {
            for (k = 0; k < currShip; k++) {
                if (this.grid[i][j + k] <= 0) {
                    return 0;
                }
    
                if (!this.chainFire) {
                    if (this.grid[i][j + k] === 1) {
                        return 0;
                    }
                }
            }
        } else {
            for (k = 0; k < currShip; k++) {
                if (this.grid[i + k][j] <= 0) {
                    return 0;
                }
    
                if (!this.chainFire) {
                    if (this.grid[i + k][j] === 1) {
                        return 0;
                    }
                }
            }
        }
    
        return 1;
    };
    largestAliveShip() {
        // below for loops finds the current biggest alive ship of opponent
        let i = 0;
    
        for (i = 4; i >= 0; i--) {
            if (this.currLife[i] !== 0) {
                switch (i) {
                    case 0:
                        i = 2;
                        break;
                    case 1:
                        i = 3;
                        break;
    
                    case 2:
                        i = 3;
                        break;
    
                    case 3:
                        i = 4;
                        break;
    
                    case 4:
                        i = 5;
                        break;
                }
                return i;
            }
        }
    };
    smallestAliveShip() {
        let i;
        for (i = 0; i < 5; i++) {
            if (this.currLife[i] !== 0) {
                switch (i) {
                    case 0:
                        i = 2;
                        break;
    
                    case 1:
                        i = 3;
                        break;
    
                    case 2:
                        i = 3;
                        break;
    
                    case 3:
                        i = 4;
                        break;
    
                    case 4:
                        i = 5;
                        break;
                }
    
                return i;
            }
        }
        return 0;
    };
    initialize() {
        for (let i = 0; i < 10; i++) {
            this.grid[i] = new Array(10);
        }
    
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                // marks missed shot as 0 & ignore  in density map
                if (this.gridHidden[i][j] === -1 || this.gridHidden[i][j] === ISLAND) {
                    this.grid[i][j] = 0;
                }
                // mark hit shot as 1 & ignore in density map
                else if (this.gridHidden[i][j] === 1) {
                    this.grid[i][j] = 1;
                } else {
                    this.grid[i][j] = 2;
                }
            }
        }
    
        while (this.stack_x.length > 0) {
            this.stack_x.pop();
            this.stack_y.pop();
        }
    };
    calcProbabilityDensity() {
        let i, j, k;
    
        this.initialize();
    
        // below for loop determines the biggest alive ship
        if (this.chainFire) {
            this.curr_big_ship = this.smallestAliveShip() + this.smallSize; //   when chainFire is enabled we will reduce filter to smallest ship
        }
    
        // strategy always searches for biggest unsinked ship
        else {
            this.curr_big_ship = this.largestAliveShip();
        }
    
        // horizontal probability update
        for (i = 0; i < 10; i++) {
            for (j = 0; j <= 10 - this.curr_big_ship; j++) {
                // enables probability filter when chain fire is active
                if (
                    this.chainFire &&
                    !(this.grid_filter(i, j, 1, this.curr_big_ship) && this.find(i, j, 1))
                ) {
                    continue;
                }
    
                // enables probability filter when chain fire is dormant
                else if (!this.grid_filter(i, j, 1, this.curr_big_ship)) {
                    continue;
                }
    
                for (k = 0; k < this.curr_big_ship; k++) {
                    if (this.grid[i][j + k] > 1) {
                        if (this.chainFire) {
                            this.grid[i][j + k] = this.grid[i][j + k] + 100;
                        } else {
                            this.grid[i][j + k]++;
                        }
                    }
                }
            }
        }
    
        // vertical probability update
        for (i = 0; i <= 10 - this.curr_big_ship; i++) {
            for (j = 0; j < 10; j++) {
                if (
                    this.chainFire &&
                    !(this.grid_filter(i, j, 0, this.curr_big_ship) && this.find(i, j, 0))
                ) {
                    continue;
                } else if (!this.grid_filter(i, j, 0, this.curr_big_ship)) {
                    continue;
                }
    
                for (k = 0; k < this.curr_big_ship; k++) {
                    if (this.grid[i + k][j] > 1) {
                        if (this.chainFire) {
                            this.grid[i + k][j] = this.grid[i + k][j] + 100;
                        } else {
                            ++this.grid[i + k][j];
                        }
                    }
                }
            }
        }
        return 0;
    };
    maxProbability() {
        let i,
            j,
            max = 0;
    
        for (i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                if (this.grid[i][j] >= max) {
                    max = this.grid[i][j];
                }
            }
        }
        return max;
    };
    play() {
        if (this.checkShipLifeStatus()) {
            return true;
        }
    
        if (this.missed_target_x.length > 0 && !this.chainFire) {
            this.chainFire = true;
            let tempX = this.missed_target_x.pop();
            let tempY = this.missed_target_y.pop();
    
            // give lock high probability
            this.grid[tempX][tempY] = this.grid[tempX][tempY] + 20;
            this.target_locked_x.push(tempX);
            this.target_locked_y.push(tempY);
            this.hitShipType = this.gridActual[tempX][tempY];
        }
    
        this.calcProbabilityDensity();
    
        let max = this.maxProbability();
    
        while (this.stack_x.length > 0) {
            this.stack_x.pop();
            this.stack_y.pop();
        }
    
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (this.grid[i][j] === max) {
                    if (
                        this.chainFire === false ||
                        this.target_locked_x[0] === i ||
                        this.target_locked_y[0] === j
                    ) {
                        this.stack_x.push(i);
                        this.stack_y.push(j);
                    }
                }
            }
        }
    
        // selects target randomly from highest density block
    
        let randomNumber = Math.floor(p5.random(0, this.stack_x.length));
    
        const botHitX = this.stack_x[randomNumber];
        const botHitY = this.stack_y[randomNumber];
    
        while (this.stack_x.length > 0) {
            this.stack_x.pop();
            this.stack_y.pop();
        }
    
        // if shot missed execute this
        if (
            this.gridActual[botHitX][botHitY] === 0 &&
            this.gridHidden[botHitX][botHitY] === 0
        ) {
            this.gridHidden[botHitX][botHitY] = -1;
            alerts.playerSwitching.active = true;
            persistentGameState.playerOneTurn = !persistentGameState.playerOneTurn;
            this.turn++;
            saveBotState();
        }
    
        // if shot hit execute this
        else if (
            this.gridActual[botHitX][botHitY] > 0 &&
            this.gridHidden[botHitX][botHitY] === 0
        ) {
            // ruduce ships life which is hit
            // mark as hit on hidden grid
            this.gridHidden[botHitX][botHitY] = 1;
            this.currLife[this.gridActual[botHitX][botHitY] - 1]--;
            if (this.currLife[this.gridActual[botHitX][botHitY] - 1] <= 0) {
                alerts.shipSunk.active = true;
                alerts.shipSunk.shipId = this.shipDetails[this.gridActual[botHitX][botHitY] - 1].id;
            } else {
                alerts.shipHit.active = true;
            }
    
            if (this.chainFire) {
                // if we hit another ship than add its coordinates to stack
                if (this.hitShipType !== this.gridActual[botHitX][botHitY]) {
                    this.missed_target_x.push(botHitX);
                    this.missed_target_y.push(botHitY);
                } else if (this.currLife[this.gridActual[botHitX][botHitY] - 1] > 0) {
                    this.target_locked_x.push(botHitX);
                    this.target_locked_y.push(botHitY);
    
                    if (this.smallestAliveShip() <= this.target_locked_x.length) {
                        this.smallSize++;
                    }
                }
    
                // if ship sinked execute this else
                else {
                    while (this.target_locked_x.length > 0) {
                        this.target_locked_x.pop();
                        this.target_locked_y.pop();
                    }
    
                    this.smallSize = 0;
                    this.hitShipType = 0;
                    this.chainFire = false;
                }
            }
    
            // if chain fire is off
            else {
                this.hitShipType = this.gridActual[botHitX][botHitY];
                this.target_locked_x.push(botHitX);
                this.target_locked_y.push(botHitY);
                this.chainFire = true;
            }
            saveBotState();
        }
        return 0;
    };
    destroy() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.grid[i][j] = 0;
            }
        }
    
        while (this.target_locked_x.length > 0) {
            this.target_locked_x.pop();
            this.target_locked_y.pop();
        }
    
        while (this.missed_target_x.length > 0) {
            this.missed_target_x.pop();
            this.missed_target_y.pop();
        }
    };
}

export default Bot;