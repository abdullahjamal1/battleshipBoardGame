const shipClass = function () {
    this.win = false;
    this.ship = [
        { color: { r: 0, g: 163, b: 108 }, size: 2, id: 1, name: "patrolBoat" },
        { color: { r: 207, g: 159, b: 255 }, size: 3, id: 2, name: "submarine"},
        { color: { r: 128, g: 128, b: 128 }, size: 3, id: 3, name: "destroyer"},
        { color: { r: 255, g: 127, b: 80 }, size: 4, id: 4, name: "battleship"},
        { color: { r: 238, g: 220, b: 130 }, size: 5, id: 5, name: "aircraftCarrier"},
    ];
};
export default shipClass;
