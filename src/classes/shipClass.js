var shipClass = function () {
    this.numberOfShips = 5;

    this.win = false;
    // the begin and end coordinate in below array is for sending backend the coordinates of the ship
    this.shipName = [
        //patrolBoat :
        { color: { r: 0, g: 163, b: 108 }, size: 2, id: 1 },
        //submarine  :
        { color: { r: 207, g: 159, b: 255 }, size: 3, id: 2 },
        //destroyer  :
        { color: { r: 128, g: 128, b: 128 }, size: 3, id: 3 },
        //battleship :
        { color: { r: 255, g: 127, b: 80 }, size: 4, id: 4 },
        //aircraftCarrier :
        { color: { r: 238, g: 220, b: 130 }, size: 5, id: 5 },
    ];
};
