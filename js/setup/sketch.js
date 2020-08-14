  
	function setup() {
    
    createCanvas(1300, 550);
     frameRate(50);
  
	}

    var mouseIsPressed = false;

    var mouseReleased = function(){
        mouseIsPressed = false;
    };
    var mousePressed = function(){
        mouseIsPressed = true;
    };
    var touchStarted = function(){
      mouseIsPressed = true;
    };

    /**
    global variables
    */
    var menu = true;
    var credits = false;
    var instructions = false;
    var multiPlayerOffline = false;
    var multiPlayerOnline = false;
    var statistics = false;
    var winState = false;

    var playerOneTurn = true;
    var singlePlayer = false;
    var singlePlayerWin = false;
    var multiPlayerWin = false;
    var densityLens = false;
