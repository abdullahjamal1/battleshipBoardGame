  
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


