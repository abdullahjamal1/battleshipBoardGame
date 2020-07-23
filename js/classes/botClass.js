var botClass = function () {

    player.call(this, "p2", 2);

    this.chainFire = false;
    this.curr_big_ship = 5;
    this.smallSize = 0;


    this.grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    this.target_locked_x = [];
    this.target_locked_y = [];
    this.missed_target_x = [];
    this.missed_target_y = [];
    this.stack_x = [];
    this.stack_y = [];

};
// botclass inherits all player class methods
botClass.prototype = Object.create(player.prototype);


botClass.prototype.find = function (x, y, horiz, size) {

    var i, set = 0;

    if (horiz) {

        for (i = 0; i < this.target_locked_x.length; i++) {

            if (this.target_locked_x[i] !== x) {
                return 0;
            }
            if (this.target_locked_y[i] >= y && this.target_locked_y[i] <= y + size) {

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
            if (this.target_locked_x[i] >= x && (this.target_locked_x[i] <= y + size)) {

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
// currship = currbigship
botClass.prototype.grid_filter = function (i, j, currship, horiz) {

    var k;

    if (horiz) {

        for (k = 0; k < currship; k++) {

            if (this.grid[i][j + k] === 0) {
                return 0;
            }

            if (!this.chainFire) {

                if (this.grid[i][j + k] === 1) {
                    return 0;
                }
            }
        }

    }

    else {


        for (k = 0; k < currship; k++) {

            if (this.grid[i + k][j] === 0) {
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
botClass.prototype.biggestAliveShip = function () {

    // below for loops finds the current biggest alive ship of opponent
    var i = 0;

    for (i = 4; i >= 0; i--) {


        switch (i) {
            case 0: i = 2;
                break;


            case 1: i = 3;
                break;

            case 2: i = 3;
                break;

            case 3: i = 4;
                break;

            case 4: i = 5;
                break;

        }
        return i;
    }

};
botClass.prototype.smallestAliveShip = function () {

    var i;
    for (i = 0; i < 5; i++) {

        if (this.currLife[i] !== 0) {

            switch (i) {
                case 0: i = 2;
                    break;


                case 1: i = 3;
                    break;

                case 2: i = 3;
                    break;

                case 3: i = 4;
                    break;

                case 4: i = 5;
                    break;

            }

            return i;

        }
    }
    return 0;

};
botClass.prototype.initialize = function () {

    var i, j;

    for (i = 0; i < 10; i++) {

        for (j = 0; j < 10; j++) {

            // marks missed shot as 0 & ignore  in density map
            if (this.gridHidden[i][j] === -1) {
                this.grid[i][j] = 0;
            }

            // mark hit shot as 1 & ignore in density map
            else if (this.gridHidden[i][j] === 1) {
                this.grid[i][j] = 1;
            }
            else {
                this.grid[i][j] = 2;
            }
        }
    }

    while (this.stack_x.length > 0) {
        this.stack_x.pop();
        this.stack_y.pop();
    }
};
botClass.prototype.calcProbabilityDensity = function () {


    var i, j, k;


    this.initialize();


    // below for loop determines the biggest alive ship
    if (this.chainFire) {

        this.curr_big_ship = this.smallestAliveShip() + this.smallSize; //   when chainFire is enabled we will reduce filter to smallest ship
    }


    // strategy always searches for biggest unsinked ship
    else {

        this.curr_big_ship = this.biggestAliveShip();
    }


    // horizontal probability update
    for (i = 0; i < 10; i++) {

        for (j = 0; j <= 10 - this.curr_big_ship; j++) {

            if (this.chainFire) {

                if (this.grid_filter(i, j, this.curr_big_ship, 1) && this.find(i, j, 1, this.curr_big_ship)) {
                }
                else {
                    continue;
                }
            }

            else {

                if (!this.grid_filter(i, j, this.curr_big_ship, 1)) {
                    continue;
                }
            }

            for (k = 0; k < this.curr_big_ship; k++) {

                if (this.chainFire) {

                    if (this.grid[i][j + k] !== 0 && this.grid[i][j + k] !== 1) {


                        this.grid[i][j + k] = this.grid[i][j + k] + 100;

                    } /// debug this po
                }

                else {

                    if (this.grid[i][j + k] !== 0 && this.grid[i][j + k] !== 1) {

                        ++this.grid[i][j + k];
                    }

                }
            }

        }
    }


    // vertical probability update
    for (i = 0; i <= 10 - this.curr_big_ship; i++) {

        for (j = 0; j < 10; j++) {


            if (this.chainFire) {

                if (this.grid_filter(i, j, this.curr_big_ship, 0) && this.find(i, j, 0, this.curr_big_ship)) {
                }
                else {
                    continue;
                }

            }

            else {

                if (!this.grid_filter(i, j, this.curr_big_ship, 0)) {
                    continue;

                }
            }


            for (k = 0; k < this.curr_big_ship; k++) {

                if (this.chainFire) {

                    if (this.grid[i + k][j] !== 0 && this.grid[i + k][j] !== 1) {

                        this.grid[i + k][j] = this.grid[i + k][ j ] + 100;

                    }

                }

                else {

                    if (this.grid[i + k][j] !== 0 && this.grid[i + k][j] !== 1) {

                        ++this.grid[i + k][j];
                    }
                }

            }

        }
    }


    return 0;

};
botClass.prototype.maxProbability = function () {

    var i, j, max = 0;

    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {

            if (this.grid[i][j] >= max) {

                max = this.grid[i][j];
            }
        }
    }

    return max;
};
botClass.prototype.play = function () {


    var botHitX = 0, botHitY = 0;

    if (this.checkShipLifeStatus()) {

        return true;
    }


    if ((this.missed_target_x.length > 0) && (!this.chainFire)) {

        this.chainFire = true;
        var tempX = this.missed_target_x.pop();
        var tempY = this.missed_target_y.pop();

        // give loc high probability
        //  this.grid[ tempX ][ tempY ] = this.grid[ tempX ][ tempY ] + 20;
        this.target_locked_x.push(tempX);
        this.target_locked_y.push(tempY);
        this.hitShipType = this.gridActual[tempX][tempY];

    }


    this.calcProbabilityDensity();

    var i, j, max = 0;

    max = this.maxProbability();

    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {

            if (this.grid[i][j] === max) {

                this.stack_x.push(i);
                this.stack_y.push(j);
            }
        }
    }

    // stack made empty
    // selects target randomly from highest density block 
    botHitX = this.stack_x[ floor( random(0, this.stack_x.length - 1) ) ];
    botHitY = this.stack_y[ floor( random(0, this.stack_y.length - 1) ) ];


    // if shot missed execute this
    if ((this.gridActual[botHitX][botHitY] === 0) && (this.gridHidden[botHitX][botHitY] === 0)) {

        this.turn++;
        this.gridHidden[botHitX][botHitY] = -1;
        playerOneTurn = false;

    }

    // if shot hit execute this
    else if ((this.gridActual[botHitX][botHitY] > 0) && (this.gridHidden[botHitX][botHitY] === 0)) {

        // subtract ships life which is hit 
        // mark as hit on hidden grid
        this.gridHidden[botHitX][botHitY] = 1;
        this.currLife[this.gridActual[botHitX][botHitY] - 1]--;

        if (this.chainFire) {

            // if we hit another ship than add its coordinates to stack
            if ((this.hitShipType !== this.gridActual[botHitX][botHitY])) {

                this.missed_target_x.push(botHitX);
                this.missed_target_y.push(botHitY);

            }


            // bug potential ---- check again
            else if (this.currLife[this.gridActual[botHitX][botHitY] - 1] > 0) {

                this.target_locked_x.push(botHitX);
                this.target_locked_y.push(botHitY);

                // 2 <= 1
                // 2 <= 2
                // 3  5   target locked = 1
                if (this.smallestAliveShip() <= this.target_locked_x.length) {

                    this.smallSize++;

                }
                /*
                            if( this.smallestAliveShip() + this.smallSize <= this.gridActual[ botHitX ][ botHitY ] ){
                
                            this.smallSize ++ ;
                            }
                */
            }

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
        else {

            this.turn++;
            this.hitShipType = this.gridActual[botHitX][botHitY];
            this.target_locked_x.push(botHitX);
            this.target_locked_y.push(botHitY);

            this.chainFire = true;
        }


    }
    //this.curr_big_ship = biggestAliveShip();
    return 0;

};
