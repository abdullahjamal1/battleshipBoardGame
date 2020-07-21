
     var sketchProc = function(processingInstance) {
     with (processingInstance) {

    size(1300,550); 
    frameRate(30);    
    var menu = true;
    var credits = false;
    var testing = 0;
    var instructions = false;
    var multiPlayerStatus = false;
    var multiplayerOnline = false;
    var statistics = false;
    var winState = false    ;
    var playerOneTurn = true;
    var singlePlayer = false;
    var singlePlayerWin = false;
    var multiPlayerWin = false;


    var mouseIsPressed = false;

    var mouseReleased = function(){
        mouseIsPressed = false;
    };
    var mousePressed = function(){
        mouseIsPressed = true;
    };

    var networkClass = function(){

        this.sendHtppRequest = true;
        this.startOnlineGame = false;
        
    };

    var shipClass = function(){


        this.numberOfShips = 5;

        this.win = false;

        // the begin and end coordinate in below array is for sending backend the coordinates of the ship
        this.shipName = [

        //patrolBoat : 
        { color : { r: 0, g: 240 , b: 0 } , size: 2  } ,
        //submarine  : 
        { color : { r: 153 , g: 0 , b: 204 } , size : 3 } ,
        //destroyer  : 
        { color : { r: 255 , g: 0 , b: 37 } , size : 3 } ,
        //battleship : 
        { color : { r: 235 , g: 104 , b: 65 }  , size : 4   } ,
        //aircraftCarrier : 
        {color : { r: 255 , g: 255 , b: 0 } , size: 5 } ,

        ];
        
    };  

    var playClass = function(){

    // inherit attributes ffrom ship class
    shipClass.call( this );



    };


    var player = function(playerName,playeris){
        
        // inherits objects/attributes from network class
        networkClass.call(this);
        // inherits objects/attributes from ship class
        shipClass.call(this);
        // can an if condition come inside constructor ??
        
        this.gridHidden=[[0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0]
                            ];

        this.gridActual=[[0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0]
                            ]; 

        this.currLife = [ 2,3,3,4,5 ];
        this.name = playerName ;
        this.playerIs = playeris;
        this.turn = 0;
        this.shipArranged = false;
        this.autoButtonPushed = false;
        this.confirmButtonPushed = false;
     //   this.hitX;
      //  this.hitY;
        this.ship = [

        //patrolBoat : 
        { begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //submarine  : 
        {   begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //destroyer  : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //battleship : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //aircraftCarrier : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,

        ];

    };

    // inherit methods from playClass o player class
    //player.prototype = Object.create(playClass.prototype);

    player.prototype.drawGridActual = function(){

        var i = 1, j = 1, indent = 0;

        //
        if(this.playerIs === 2){
            indent = 500;
        }

        for(i = 0 ; i < this.shipName.length ; i++ ){

            for(j = 0; j < this.shipName[i].size; j++){

                noFill();
                rect(indent + i*85 + 40 + 20*j , 40 ,20 ,25 );
            }
            for(j = 0; j < this.currLife[i] ; j++){
                
                fill( this.shipName[i].color.r , this.shipName[i].color.g , this.shipName[i].color.b );
                rect(indent + i*85 + 40 + 20*j , 40 ,20 ,25 );
            }
        }


        fill(64, 54, 255);
            for(i = 1; i <= 10; i++ ){
                for(j = 1; j <= 10; j++ ){
                    
                    // draws water blocks on the map
                // if( this.gridActual[i - 1][j - 1] === 0){

                    fill(64, 54, 255);
                    rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30);

                //  }
                    // draws the ships on the map
                    if(this.gridActual[i - 1][j - 1] > 0){

                    fill( this.shipName[ this.gridActual[i - 1][j - 1] - 1 ].color.r , this.shipName[ this.gridActual[i - 1][j - 1] - 1 ].color.g , this.shipName[ this.gridActual[i - 1][j - 1] - 1 ].color.b );    
                    ellipse(indent+ 65 + 30 * i, 65 + 30 * j , 25 , 25);
                    }
                    //noFill();
                }
            }   
    };

    player.prototype.drawGridHidden = function(){

        var i = 1, j = 1, indent = 0;
        
        //
        if(this.playerIs === 2){
            
            indent = 500;
        }
        
        
        textSize(20);
	fill(255,255,255);
        text("turn : "+ this.turn , 90+ indent,10 ,100 ,20);

        
        for(i = 0 ; i < this.shipName.length ; i++ ){

            for(j = 0; j < this.shipName[i].size; j++){

                noFill();
                rect(indent + i*85 + 40 + 20*j , 40 ,20 ,25 );
            }
            for(j = 0; j < this.currLife[i] ; j++){
                
                fill( this.shipName[i].color.r , this.shipName[i].color.g , this.shipName[i].color.b );
                rect(indent + i*85 + 40 + 20*j , 40 ,20 ,25 );
            }
        }
        

        fill(64, 54, 255);

        for(i=1;i<=10;i++){
            
            for(j=1;j<=10;j++){
                
                // block not yet hit
             //   if(this.gridHidden[i-1][j-1] === 0){
                fill(64, 54, 255);
                rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30);
             //   }
                // target hit inside the block

                if( this.gridHidden[i - 1][j - 1] > 0){
                    // red color
                    fill(255, 56, 63);  
                    ellipse(indent+ 65 + 30 * i, 65 + 30 * j , 20 , 20); 
                    fill(64, 54, 255);
                    ellipse(indent+ 65 + 30 * i, 65 + 30 * j , 10 , 10);

                }
                // missed inside block
                else if(this.gridHidden[i - 1][j - 1] === -1){
                    // yellow color
                    fill(255, 255, 0);
                    ellipse(indent+ 65 + 30 * i, 65 + 30 * j , 20 , 20);
                }
            }
        } 
        return 0;  
    };

    player.prototype.arrangeShip = function(){

    // solve random function ceiling
        var size;
        var a,b,i,num, shipOverlapped = false;
        
        for( size = 5; size > 0; size-- ){
            // put condition for overlap check !!!!!!!!!!!!!!!!!!!!!
            
            shipOverlapped = false;
            
            num = size;

            if(size === 1 || size === 2){

                num++;

            }
            
            if(floor(random(0,2))){               // horizontal arrangement trigger       

                while(1){

                    a = floor(random(0,9));
                    b = floor(random(0,10-num));
                    
                    for( i = 0 ; i < num ; i++ ){
                        
                        if( this.gridActual[ a ][ b + i] !== 0){

                            shipOverlapped = true;

                            // break and search for a non-overlapping spot again 
                            break;
                        }	
                    }

                    if(! shipOverlapped){

                        // updates ships begin coordinate which will be sent to database
                        this.ship[size-1].begin.x=a;
                        this.ship[size-1].begin.y=b;

                        for(i = 0; i < num; i++ ){
                            
                            this.gridActual[ a ][b + i] = size;	    //  horizontal arrangement by random
                        }

                        // updates ships end coordinate which will be sent to database
                        this.ship[size - 1].end= a;
                        this.ship[size - 1].end= b+i;

                        break;   // breaks from while loop as ship is arranged successfully
                    }
                    shipOverlapped =false;
                }        

            }
            
            else{
            
                while(1){   
                
                    b = floor(random(0,9));
                    a = floor(random(0,10-num));
                    
                    for(i=0;i<num;i++){
                        
                        if( this.gridActual[a+i][b] !== 0){

                            shipOverlapped = true;
                            // break from for loop if ship overlaps
                            break;   
                        }
                
                        
                    }
                    
                    if(! shipOverlapped){

                        // updates ships begin coordinate which will be sent to database
                        this.ship[size-1].begin.x=a;
                        this.ship[size-1].begin.x=b;

                        for(i=0;i<num;i++){
                        
                            this.gridActual[a+i][b]=size;	     //  vertical arrangement by random
                            
                        }
                        // updates ships end coordinate which will be sent to database
                        this.ship[size - 1].end= a+i;
                        this.ship[size - 1].end= b;

                        break;
                    } 
                    shipOverlapped = false ;   
                
                }
            }
            
        }
            //  return 0;
    };

    player.prototype.initializeGrid = function(){

        this.gridHidden=[[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]
                        ];
        this.gridActual=[[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]
                        ]; 
        this.turn = 0;
        this.shipArranged = false;
        this.autoButtonPushed = false;
        this.confirmButtonPushed = false;  
        this.currLife = [ 2,3,3,4,5 ];  
        this.ship = [

        //patrolBoat : 
        { begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //submarine  : 
        {   begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //destroyer  : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //battleship : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //aircraftCarrier : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,

        ];

        this.sendHtppRequest = true;
        this.startOnlineGame = false;            

    };


    player.prototype.checkShipLifeStatus = function(){

            if( ( this.currLife[0] + this.currLife[1] + this.currLife[2] + this.currLife[3] + this.currLife[4] ) === 0){
            return true;
        }

        return false;

    };

    player.prototype.play = function(playerIs){

        
    var indent =0 , i=1 , j=1 ;


        // if all oponents ships have sunk declare victory
    if(  this.checkShipLifeStatus() === true ){

        return true;
    }


    if(this.turn < 100){
        // check for win condition in each turn

        if(playerIs === 2){
            indent = 500;
        } 
        
        // ensure player is not able to hit the same grid again
        for(i=1;i<=10;i++){

            for(j=1;j<=10;j++){

                if(mouseX>indent+50+30*i && mouseX<indent+50+30*(i+1) && mouseY>50+30*j && mouseY<50+30*(j+1)){
                    
                    if(!mouseIsPressed){
                        
                        fill(140, 184, 250);
                        rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30);
                    }
                    
                    if(mouseIsPressed){
                        /*
                        fill(255, 0, 0);
                        rect(indent+50+25*i,5+25*j,25,25);
                        */
                        if( (this.gridActual[i - 1][j - 1] === 0) && (this.gridHidden[i - 1][j - 1] === 0) ){

                        this.turn++;    
                        // this deletes water block at location
                        this.gridHidden[i-1][j-1]= -1;  
                        
                        this.hitX = i-1;
                        this.hitY = j-1;
                        //send your hit coordinates info to the server
                        // send player2.hitX and player2.hitY

                        if(playerIs === 2){

                            playerOneTurn = false;
                        }

                        else{
                            playerOneTurn = true;
                        }

                        // returns when shot misses
                        return 0; 
                    }

                        else if( ( this.gridActual[i - 1][j - 1] > 0 ) && (this.gridHidden[i - 1][j - 1] === 0) ){

                            this.turn++;
                            // subtract ships life which is hit 
                            // mark as hit on hidden grid
                            this.gridHidden[i - 1][j - 1] = 1;
                            this.currLife[ this.gridActual[i - 1][j - 1] - 1] -- ;

                            this.hitX= i -1;
                            this.hitY = j-1;
                            //send your hit coordinates info to the server
                            // send player2.hitX and player2.hitY

                            if(playerIs === 2){

                            playerOneTurn = true;
                            
                            }
                            else{
                                playerOneTurn = false;
                            }
                            return 0;
                        }
                        
                        //player1.gridHidden[i-1][j-1]=-1;
                        
                        mouseIsPressed = false;
                    }
                    
                }

            }
        }
        // if above if statement dosnt return than extra shot 

    }
    return 0;
    };
  
    player.prototype.DeployShipsReceivedFromServer = function(){

        var i=0, j=0;

        for(i = 0; i < 5 ; i++ ){
                        // ship is arranged horizontally
                            if( this.ship[i].beign.x === this.ship[i].end.x){

                                for(j = 0; j < this.shipName[i].size ; j++){

                                    this.gridActual[ this.ship[i].begin.x ][ this.ship[i].begin.y + j ] = 1;
                                }
                            }
                            //ship is arranged vertically
                            else{
                                for(j = 0; j < this.shipName[i].size ; j++){
                                    
                                    this.gridActual[ this.ship[i].begin.x +j ][ this.ship[i].begin.y ] = 1;
                                }

                            }
                        }
    };
   

var botClass = function(){

     player.call(this,"p2",2);   

this.chainFire = false;
this.curr_big_ship = 5;
this.smallSize = 0;


    this.grid=[[0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
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

botClass.prototype.find = function ( x, y,  horiz,  size){   // inc small ship size if not hit

            var i,set=0;

            if( horiz ){

                for(i = 0; i < this.target_locked_x.length; i++){

                    if( this.target_locked_x[i] !== x){
                        return 0;
                    }
                    if( this.target_locked_y[i] >= y && this.target_locked_y[i] <= y + size ){
                        
                        set++;
                    }
                    // else set=0;
                }
            }

            // vertical

            else{

                for(i = 0; i < this.target_locked_x.length; i++){


                    if( this.target_locked_y[i] !== y){
                        return 0;
                    }
                    if( this.target_locked_x[i] >= x && ( this.target_locked_x[i] <= y + size )){
                        
                        set++;
                    }
                //	 else set=0;
                }

            }

            if( set === this.target_locked_x.length ){

              return 1;
            }

            return 0;
    };

// currship = currbigship
botClass.prototype.grid_filter = function ( i,  j ,  currship,  horiz){

        var k;
        
        if(horiz){
        
        for(k=0;k<currship;k++){
            
            if( this.grid[i][j+k]===0){
            return 0;
            }
            
            if(!this.chainFire){
                
            if( this.grid[i][j+k] ===1){
            return 0;	
            }
            }
        }
        
    }

        else{
        
        
        for(k=0;k<currship;k++){	
        
            if( this.grid[i+k][j] === 0){
            return 0;
            }
            
            if(!this.chainFire){
                
            if(  this.grid[i+k][j] === 1){
            return 0;	
            }
            
            }
        }
    }

        return 1;
};

botClass.prototype.biggestAliveShip = function (){

            // below for loops finds the current biggest alive ship of opponent
            var i = 0;
        
        for( i=4 ; i>=0 ; i--){

                
                    switch(i){
            case 0: i=2;
            break;
            
            
            case 1: i=3;
            break;
            
            case 2: i=3;
            break;
                
            case 3: i=4;
            break;
                
            case 4:	i=5;
            break;	
            
        }		
                return i;   
        }

};

botClass.prototype.smallestAliveShip = function (){
	
	var i;
	for( i=0 ; i< 5 ; i++){
	
	if(this.currLife[i]!==0){
		
		switch(i){
			case 0: i=2;
			break;
			
			
			case 1: i=3;
			break;
			
			case 2: i=3;
			break;
				
			case 3: i=4;
			break;
				
			case 4:	i=5;
			break;	
			
		}

		return i;
		
	}
}
return 0;

};

botClass.prototype.initialize = function (){
    
    var i , j;

    for(i = 0; i < 10; i++){

        for(j = 0; j < 10; j++){
            
            // marks missed shot as 0 & ignore  in density map
            if(this.gridHidden[ i ][ j ] === -1 ){
            this.grid[i][j]= 0;
            }
            // mark hit shot as 1 & ignore in density map
            else if(this.gridHidden[ i ][ j ] === 1 ){
                this.grid[ i ][ j ] = 1;
            }
            else{
                this.grid[ i ][ j ] = 2;
            }
        }
    }

    while(this.stack_x.length > 0){
        this.stack_x.pop();
        this.stack_y.pop();
    }
};

botClass.prototype.calcProbabilityDensity = function  () {
    
    
    var i,j,k;

    
    this.initialize();
    

// below for loop determines the biggest alive ship

    if(this.chainFire){
         
       this.curr_big_ship = this.smallestAliveShip() + this.smallSize;     //   when chainFire is enabled we will reduce filter to smallest ship
    }

// strategy always searches for biggest unsinked ship
    else{
            
        this.curr_big_ship = this.biggestAliveShip();
    }
    
    
    // horizontal probability update
    
    
    for(i = 0; i < 10; i++){
        
        for(j = 0; j <= 10 - this.curr_big_ship; j++){
            
            if(this.chainFire){
                
                if( this.grid_filter(i, j, this.curr_big_ship, 1) && this.find( i , j, 1, this.curr_big_ship )) {
                    
                }
                else {
                    continue;
                }
            }
            
            else{
    
                if( ! this.grid_filter(i,j,this.curr_big_ship,1) ){
                continue;	
                }
            }

            for(k=0;k< this.curr_big_ship;k++){
            
                    if(this.chainFire){
                    
                    if(this.grid[i][j+k]!== 0 && this.grid[i][j+k]!== 1){
                    
                    
                    ++this.grid[i][j+k]; 	
                    ++this.grid[i][j+k];
                    ++this.grid[i][j+k]; 	
                    ++this.grid[i][j+k];
                    ++this.grid[i][j+k]; 	
                    
                            }                         /// debug this po
                    }
                    
                    else{
                    
                    if( this.grid[i][j+k]!==0 && this.grid[i][j+k]!==1){
                    
                    ++this.grid[i][j+k];
                    }
                    
                }
            }
    
    }
}


    // vertical probability update
    
        for(i=0;i<=10-this.curr_big_ship;i++){
            
        for(j=0;j<10;j++){

        
                if( this.chainFire ){
                    
                    if( this.grid_filter(i, j, this.curr_big_ship, 0) && this.find ( i , j, 0, this.curr_big_ship )){
                
                    }
                    else {
                        continue;
                    }
                    
                }
            
                else{
                    
                    if( ! this.grid_filter( i, j, this.curr_big_ship, 0)){
                        continue;
                    
                    }
                }		
        
            
            for(k = 0; k < this.curr_big_ship; k++ ){
                
                if( this.chainFire ){
                    
                    if( this.grid[i+k][j] !==0 && this.grid[i+k][j]!== 1 ){
                    
                    ++this.grid[i+k][j]; 	
                    ++this.grid[i+k][j]; 
                    ++this.grid[i+k][j]; 	
                    ++this.grid[i+k][j]; 
                    ++this.grid[i+k][j];  
            
                }
                    
                }
                
                else{
                
                    if( this.grid[i+k][j] !== 0 && this.grid[i+k][j] !== 1){
                    
                        ++this.grid[i+k][j];
                    }
                }
                
            }
        
        }
    }


    return 0;

};

botClass.prototype.maxProbability = function (){

    var i , j, max = 0 ;

        for( i = 0; i < 10 ; i++ ){
            for( j = 0; j < 10; j++){

                if( this.grid[ i ][ j ] >= max ){

                    max = this.grid[ i ][ j ];
                }
            }
        }

        return max;
};

botClass.prototype.play = function (){


    var botHitX = 0 , botHitY = 0;

    if( this.checkShipLifeStatus() ){

        return true;
    }


    if(( this.missed_target_x.length > 0) && ( ! this.chainFire)){

        this.chainFire = true;
        var tempX = this.missed_target_x.pop();
        var tempY = this.missed_target_y.pop();

        // give loc high probability
      //  this.grid[ tempX ][ tempY ] = this.grid[ tempX ][ tempY ] + 20;
        this.target_locked_x.push( tempX );
        this.target_locked_y.push( tempY );
        this.hitShipType = this.gridActual[ tempX ][ tempY ];

    }


    this.calcProbabilityDensity();

    var i , j, max = 0 ;

    max = this.maxProbability();

    for( i = 0; i < 10 ; i++ ){
            for( j = 0; j < 10; j++){

                if( this.grid[ i ][ j ] === max ){

                    this.stack_x.push(i);
                    this.stack_y.push(j);
                }
            }
        }

        // stack made empty

        // selects target randomly from highest density block 

    botHitX = this.stack_x[ floor( random( 0, this.stack_x.length - 1 ) ) ];
    botHitY = this.stack_y[ floor( random( 0, this.stack_y.length - 1 ) ) ];


    // if shot missed execute this
    if( (this.gridActual[ botHitX ][ botHitY ] === 0) && (this.gridHidden[botHitX][botHitY] === 0) ){
    
    this.turn++;
    this.gridHidden[ botHitX ][ botHitY ] = -1;
    playerOneTurn = false;

    }
    // if shot hit execute this
    else if( ( this.gridActual[botHitX][botHitY] > 0 ) && (this.gridHidden[botHitX][botHitY] === 0) ){

        // subtract ships life which is hit 
        // mark as hit on hidden grid
        this.gridHidden[ botHitX ][ botHitY ] = 1;
        this.currLife[ this.gridActual[botHitX][botHitY] - 1] -- ;

        // whyyyyy ??????????
        // reduce ship size on actual map too
    //    this.gridActual[botHitX][botHitY] --;

    if( this.chainFire ){

        // if we hit another ship than add its coordinates to stack
        if( ( this.hitShipType !== this.gridActual[ botHitX ][ botHitY ] ) ){

            this.missed_target_x.push( botHitX );
            this.missed_target_y.push( botHitY );

        }

        // bug potential ---- check again
         else if(this.currLife[ this.gridActual[botHitX][botHitY] - 1]  > 0){

            this.target_locked_x.push( botHitX );
            this.target_locked_y.push( botHitY );

            // 2 <= 1
            // 2 <= 2
            // 3  5   target locked = 1

            if( this.smallestAliveShip() <= this.target_locked_x.length ){

                this.smallSize++; 

            }
/*
            if( this.smallestAliveShip() + this.smallSize <= this.gridActual[ botHitX ][ botHitY ] ){

            this.smallSize ++ ;
            }
*/
        }
                  
        else{

            while(this.target_locked_x.length >0){

                this.target_locked_x.pop();
                this.target_locked_y.pop();
            }

            this.smallSize = 0;
            this.hitShipType = 0;
            this.chainFire = false;
        }
    }
    else{

        this.turn++;
            this.hitShipType = this.gridActual[ botHitX ][ botHitY ];
        this.target_locked_x.push( botHitX );
        this.target_locked_y.push( botHitY );

        this.chainFire = true;
    }


}
//this.curr_big_ship = biggestAliveShip();

return 0;

};


    // class for buttons - object oriented programming
    var button = function(str , x, y){
        // buttons constructor
                this.x=x;
                this.y=y;
                this.txt = str;
                this.height = 40;
                this.width = 170;
            };

    // buttons method
    button.prototype.draw = function(){

        fill(219, 9, 219, 200);
        rect(this.x,this.y,this.width,this.height,10);
        fill(0, 0, 0);
    textSize(30);
        text(this.txt, this.x+11, this.y+30);
    };

     button.prototype.insideButton = function(){

        if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
            this.lightUpButton();
            return 1;
        }
        return 0;

     };

     button.prototype.isPressed = function(){

        if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
            if(mouseIsPressed()){
            return 1;
            }
            else {
                return 0;
            }
        }
        return 0;

    };

     button.prototype.lightUpButton = function(){

        fill(240, 218, 240,100);
        rect(this.x ,this.y ,this.width ,this.height ,10);
     };


    var createNewMultiplayerObject = function(){

        var player1 = new player("p1", 1);
        var player2 = new player("p2", 2);

    };

    var createNewSinglePlayerObject = function(){

        var player1 = new player("p1", 1);
        var bot = new botClass();
    };

    var player1 = new player("p1", 1);
    var player2 = new player("p2", 2);
    var bot = new botClass();



    var mapSwap = function( gameType ){

        var temp =[[0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
                    ];
        var i , j;

        for( i = 0; i < 10 ; i++ ){
            for( j = 0; j < 10; j++ ){
                temp[ i ][ j ] = player1.gridActual[ i ][ j ];
            }
        } 
        for( i = 0; i < 10 ; i++ ){
            for( j = 0; j < 10; j++ ){
                if( gameType === "singlePlayer"){
                player1.gridActual[ i ][ j ] = bot.gridActual[ i ][ j ];
                }
                else{
                    player1.gridActual[ i ][ j ] = player2.gridActual[ i ][ j ];

                }
            }
        } 
        for( i = 0; i < 10 ; i++ ){
            for( j = 0; j < 10; j++ ){
                if( gameType === "singlePlayer"){
                   bot.gridActual[ i ][ j ] = temp[ i ][ j ];
                }
                else{
                    player2.gridActual[ i ][ j ] = temp[ i ][ j ];
                }   
            }
        } 



    };

////////////////////////////// ANIMATION //////////////////////////////////////////////////////////////

    var submarineX = 1200;
    var submarineY = 200;
    var fishX1 = 0;
    var fishX2 = - 500;
    var fishY = 0;

var drawPebbles=function(x,y){
    
    for(var i=0;i<450;i++){
        var randomX=x+random(0,1300);
        var randomY=y+random(670,750);
        fill(random(0,300), random(0,200), random(0,100));
        ellipse(randomX,randomY,15,10);
    }
    
};

var drawFish= function(centerX,centerY,r,g,b) {
    
    var bodyLength = 72;
    var bodyHeight = 43;
    
  //  noStroke();
    fill(r,g,b);
    // body
    ellipse(centerX, centerY, bodyLength, bodyHeight);
    // tail
    fill(r,g,b);
    var tailWidth = bodyLength/4;
    var tailHeight = bodyHeight/2;
    triangle(centerX-bodyLength/2, centerY,
             centerX-bodyLength/2-tailWidth, centerY-tailHeight,
             centerX-bodyLength/2-tailWidth, centerY+tailHeight);
    // eye
    fill(33, 33, 33);
    ellipse(centerX+bodyLength/4, centerY, bodyHeight/5, bodyHeight/5);
         
    
    
};


var submarineGlass = function(submarineX,submarineY){
    
    fill(1, 36, 43);
    ellipse(submarineX+190,submarineY+37,45,45);
    fill(183, 226, 235);
    ellipse(submarineX+190,submarineY+37,35,35);
};

var drawFishGroup = function(x, y){

    drawFish(x + 100, y + 100,100,167,100);
        drawFish(x + 303,y + 100,322,144,253);
        drawFish(x + 164 ,y + 229,292,243,112);
        drawFish(x + 264,y + 303,155,118,253);
        drawFish(x+ 331,y + 197,155,243,146);
        drawFish(x + 65,y + 294,310,20,290);

};


var drawSubmarine = function(){
    
        fill(209, 4, 4);
    ellipse(submarineX + 196,submarineY + 36,105,70);
    ellipse(submarineX + 2,submarineY + 36,105,70);
    fill(224, 3, 3);
    rect(submarineX + 1,submarineY + 1,200,70);
    
    fill(163, 0, 38);
    rect(submarineX + 93,submarineY + -42,40,45);
    fill(163, 0, 38);
    rect(submarineX + 93,submarineY + 71,40,14);
    
    submarineGlass(submarineX,submarineY);
    submarineGlass(submarineX + -82,submarineY + 1);
    submarineGlass(submarineX + -164,submarineY + 1);
};

        var animation = function(){


        background(0, 2, 105);
        submarineX = submarineX - 1.5;
        fishX1 = fishX1 + 2.5;
        fishX2 = fishX2 + 2.5;

        drawFishGroup(fishX1, fishY);
        drawFishGroup(fishX2, fishY);


        if(submarineX < -100){
            
            submarineX = 1300;
        }
        if(fishX1 > 1300){
        fishX1 = - 300;   
        }
        if(fishX2 > 1300){
            fishX2 = -300;
        }

        drawSubmarine(submarineX, submarineY + 34);
    
        drawPebbles(4,-200);
    }

/////////////////////////////ANIMATION  END /////////////////////////////////////////////////////////

    var player1AutoButton = new button("auto", 50, 400);
    var player1ConfirmButton = new button("confirm", 250, 400);

    var player2ConfirmButton = new button("confirm",750, 400);
    var player2AutoButton    = new button("auto",550, 400);

    var posX = 400 , posY = 70;
    var singlePlayerButton = new button("singleplayer", posX+100, posY + 40);            
    var multiplayerButton = new button("Multiplayer", posX+100, posY+90);
    var onlineButton = new button("Online", posX+100, posY+140);
    var instructionsButton = new button("Instructions", posX+100, posY+ 190);
    var creditsButton = new button("Credits", posX+100, posY + 240);
    var statisticsButton = new button("statistics", posX+100, posY + 290 );

    //draw function
    var draw = function() {


        background(0, 0, 255,50);
        animation();
        //Main menu
        if(menu === true){
            //rectangle to go around the buttons

            fill(255, 100, 0,220);
            rect(posX+10, posY+5, 350, 370 , 60);
            fill(255, 255, 255);
            textSize(70);
            text("BATTLESHIP-YURI",300,20,1000,200);

            multiplayerButton.draw();
            onlineButton.draw();
            instructionsButton.draw();
            creditsButton.draw();  
            statisticsButton.draw();
            singlePlayerButton.draw();

              if(mouseX > singlePlayerButton.x && mouseX < singlePlayerButton.x + singlePlayerButton.width && mouseY > singlePlayerButton.y ){

                  if(mouseIsPressed){
                        //if mouse is pressed go to play
                        if( singlePlayerButton.insideButton()){


                            singlePlayerButton.lightUpButton();
                            menu = false;
                            singlePlayer = true;

                            createNewSinglePlayerObject();
                        }

                        else if( multiplayerButton.insideButton() ){

                            multiplayerButton.lightUpButton();
                            menu = false;
                            multiPlayerStatus = true;
                            // creates new object for players and buttons for next frame 
                            createNewMultiplayerObject();
                        }
                        else if( onlineButton.insideButton() ){

                            onlineButton.lightUpButton();
                            menu = false;
                            multiplayerOnline =true;
                        }
                        else if( instructionsButton.insideButton() ){

                            instructionsButton.lightUpButton();
                            menu = false;
                            instructions =true;
                        }
                        else if( creditsButton.insideButton() ){

                            creditsButton.lightUpButton();
                            menu = false;
                            credits =true;
                        }
                        else if( statisticsButton.insideButton() ){

                            statisticsButton.lightUpButton();
                            menu = false;
                            statistics =true;
                        }
                  }
              } 
            
        }  

        else if(singlePlayer === true){


           // background(0, 255, 255,100);
            var backButton1 = new button("back", 400, 450);
            backButton1.draw();

            // draws 10*10 grid for player 1
            if(! player1.confirmButtonPushed){

                player1.drawGridActual();
                player1AutoButton.draw();
            }
            else{
                player1.drawGridHidden();
            }

            // draws 10*10 grid for BOT
                bot.drawGridHidden();

            // auto button for player 1
            if(player1.shipArranged === false){

                player1AutoButton.draw();
                
                if(player1AutoButton.insideButton()){
                    //check to see if the mouse is pressed
                    
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1AutoButton.lightUpButton();
                        
                    }
                    if(mouseIsPressed){

                        if(player1.autoButtonPushed === true){
                            // initializes grid for player 1 
                            player1.initializeGrid();
                            //createNewMultiplayerObject();
                        }
                        player1.arrangeShip();
                        player1.autoButtonPushed = true ;
                        //shipArranged = true;
                    }
                }
            }
            
            // confirm button for player1
            if(player1.autoButtonPushed){

                player1ConfirmButton.draw();

                if(player1ConfirmButton.insideButton()){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1ConfirmButton.lightUpButton();
                    }
                    if(mouseIsPressed){

                    player1.autoButtonPushed = false ;
                    player1.shipArranged = true;
                    player1.confirmButtonPushed = true;

                    // arrange bots ship

                    bot.arrangeShip();
                    mapSwap("singlePlayer");


                        //shipArranged = true;
                    }
                }
            }

                // if both players have deployed ships start the game
                
                // main multiplayer pass N play if statement
                if(player1.confirmButtonPushed){

                    if(playerOneTurn){

                            // argument 3 represents bot
                          //  bot.play();

                            if( bot.play() === true ){
                                // make separate class for win 
                                winState = true ;
                                singlePlayer = false;
                                bot.win = true;
                                singlePlayerWin = true;
                            }
                    }          
                    else{

                      //  player1.play(1);

                         if( player1.play(1) === true ){

                            winState = true;
                            singlePlayer = false;
                            player1.win = true;
                            singlePlayerWin = true;
                        }  
                    }   

                }

            // back button  - common for both the players
            if(backButton1.insideButton() ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    backButton1.lightUpButton();
            
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    singlePlayer = false;
                    menu = true;
                    createNewSinglePlayerObject();
                    player1.initializeGrid();
                    bot.initializeGrid();

                    //mouseIsPressed = false;
                }
            }

        }
        
        else if(multiplayerOnline === true){

            // coming soon

            var backButton1 = new button("back", 400, 450);
            backButton1.draw();
            var connectButton = new button("connect",600,250);

            // draws 10*10 grid for player 1
            player1.drawGridActual();

            if(! player1.confirmButtonPushed){

                player1AutoButton.draw();
            }

            // draws 10*10 grid for player 2

            // auto button for player 1
            if(player1.shipArranged === false){

                player1AutoButton.draw();
                
                if( player1AutoButton.insideButton() ){
                    //check to see if the mouse is pressed
                    
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1AutoButton.lightUpButton();
                        
                    }
                    if(mouseIsPressed){

                        if(player1.autoButtonPushed === true){
                            // initializes grid for player 1 
                            player1.initializeGrid();
                            //createNewMultiplayerObject();
                        }
                        player1.arrangeShip();
                        player1.autoButtonPushed = true ;
                        //shipArranged = true;
                    }
                }
            }
            
            // confirm button for player1
            if(player1.autoButtonPushed){

                player1ConfirmButton.draw();

                if( player1ConfirmButton.insideButton() ){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1ConfirmButton.lightUpButton();
                    }
                    if(mouseIsPressed){
                    player1.autoButtonPushed = false ;
                    player1.shipArranged = true;
                    player1.confirmButtonPushed = true;
                        //shipArranged = true;
                    }
                }
            }

            if(player1.confirmButtonPushed && player1.sendHtppRequest ){

                connectButton.draw();

                if( connectButton.insideButton() ){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        connectButton.lightUpButton();
                    }
                    if(mouseIsPressed){

                        //send http request
                        // after receiving the request server creates new database with unique id 

                        // then send the below ship coordinates to database
                        /*
                        // ship are arranged from smaller to bigger (ascending order)
                        for(i=0 ; i<5 ; i++){
                        player1.ship[i].begin.x;
                        player1.ship[i].begin.y;
                        player1.ship[i].end.x;
                        player1.ship[i].end.y;
                        }
                        */
                        // after receiving this info server implements match making by searching for an unpaired user and assigning both the users the same pairId
                        // server also decides which player will start first

                        player1.sendHtppRequest = false;
                    }
                }
            }

            // after sending deployed ship coordinates , frontend begins listening to port (in this case web socket)
            if( (player1.sendHtppRequest === false) && (player1.startOnlineGame === false)){

                // listen to port

                // frontend loads the other player ship coordinates from server from server

                        /*
                        // ship are arranged from smaller to bigger (ascending order)
                        // assign other player ship coordinates received from server to the ship coordinates below

                        for(i=0 ; i<5 ; i++){

                        player2.ship[i].begin.x =  ;
                        player2.ship[i].begin.y = ;
                        player2.ship[i].end.x =  ;
                        player2.ship[i].end.y =  ;
                        }
                        */

                            // NOTE: // implement some condition here to execute below statement only if frontend successfully recieves the data in above mentioned comments inside this if loop

                        // method call updates the received coordinates o the gridActual matrix
                        //player2.DeployShipsReceivedFromServer();

                // frontend also loads if it is the first player from server
                // playerOneTurn = false; // if other player starts first
                // playerOneTurn = true;  // if current player starts first



                // implement some condition here to execute below statement only if frontend successfully recieves the data in above mentioned comments inside this if loop
                player1.startOnlineGame = true;

            }

            if(player1.startOnlineGame){
                // if both players have deployed ships start the game
               
                // main multiplayer pass N play if statement
                if(player1.confirmButtonPushed){

                    if(playerOneTurn){

                            if( player2.play(2) === true){
                                winState = true ;
                                multiplayerOnline= false;
                            }
                        
                        // inside play method call on line number 547 and 573 write method call to send this.hitX and this.hitY to the server

                    }
                    else{ 
                        // listen to hit coordinates of your opponent and assign them to variables below
                        // listen to opponents hit coordinates 
                        // player1.hitX= ;
                        // player1.hitY= ;

                        //player1.gridHidden[ hitX ][ hitY ] = 1;
   
                    }

                }


                // draws opponents map on the screen
                player2.drawGridHidden();

            }
            // back button  - common for both the players
            if(backButton1.insideButton() ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    backButton1.lightUpButton();
            
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    multiplayerOnline = false;
                    menu = true;
                    //createNewMultiplayerObject();
                    player1.initializeGrid();
                    player2.initializeGrid();
                    //mouseIsPressed = false;
                }
            }
        }
        
        //Credits
        else if(credits === true){
            //background
        // image(space, 0, 0, 400, 400);
       // background(0, 255, 255,100);
            //text
            fill(255, 0, 0);
            text("1) aj941 \n2)\n3)\n4)", 150, 150);
            //make button
            var backButton = new button("back",150,300);
            backButton.draw();
            //if the mouse is in the same place as the button
            if(mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y +backButton.height ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    fill(240, 218, 240,100);
                    rect(backButton.x, backButton.y, backButton.width, backButton.height );
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    credits = false;
                    menu = true;
                }
            }
        }
        //instructions
        else if(instructions === true){
            //background
            //image(space, 0, 0, 400, 400);
            //text
            //background(0, 255, 255,100);
            textSize(20);
            fill(255, 0, 0);
            text("Instructions", 0, 15);
            textSize(15);
            text("1)\n2)\n3)\n4)\n5)\n6)", 20, 40);
        //make button
        var backButton = new button("back",150,300);
            backButton.draw();
            //if the mouse is in the same place as the button
            if(mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y + backButton.height ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    fill(240, 218, 240,100);
                    rect(backButton.x, backButton.y, backButton.width, backButton.height );
                    fill(0, 0, 0);
                    text("Back", 184, 315);
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    instructions = false;
                    menu = true;
                }
            }
        }
        //play
        else if(multiPlayerStatus === true){
            //background
            //background(0, 255, 255,100);
            var backButton1 = new button("back", 400, 450);
            backButton1.draw();

            // draws 10*10 grid for player 1
            if(! player1.confirmButtonPushed){

                player1.drawGridActual();
                player1AutoButton.draw();
            }
            else{
                player1.drawGridHidden();
            }

            // draws 10*10 grid for player 2
            if(! player2.confirmButtonPushed){

                player2.drawGridActual();
                player2AutoButton.draw();
            }
            else{
                player2.drawGridHidden();
            }

            // auto button for player 1
            if(player1.shipArranged === false){

                player1AutoButton.draw();
                
                if(player1AutoButton.insideButton()){
                    //check to see if the mouse is pressed
                    
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1AutoButton.lightUpButton();
                        
                    }
                    if(mouseIsPressed){

                        if(player1.autoButtonPushed === true){
                            // initializes grid for player 1 
                            player1.initializeGrid();
                            //createNewMultiplayerObject();
                        }
                        player1.arrangeShip();
                        player1.autoButtonPushed = true ;
                        //shipArranged = true;
                    }
                }
            }
            
            // confirm button for player1
            if(player1.autoButtonPushed){

                player1ConfirmButton.draw();

                if(player1ConfirmButton.insideButton()){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1ConfirmButton.lightUpButton();
                    }
                    if(mouseIsPressed){
                    player1.autoButtonPushed = false ;
                    player1.shipArranged = true;
                    player1.confirmButtonPushed = true;
                        //shipArranged = true;
                    }
                }
            }

            // auto button for player 2 
            if(player2.shipArranged === false){

                player2AutoButton.draw();

                if( player2AutoButton.insideButton() ){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player2AutoButton.lightUpButton();
                    }
                    if(mouseIsPressed){
                        if(player2.autoButtonPushed === true){
                            // initializes grid for player 1 
                            player2.initializeGrid();
                            //createNewMultiplayerObject();
                        }
                        player2.arrangeShip();
                        player2.autoButtonPushed = true ;
                        //shipArranged = true;
                    }
                }
            }

                // confirm button for player2
                if( player2.autoButtonPushed ){

                    player2ConfirmButton.draw();

                    if(player2ConfirmButton.insideButton() ){
                        //check to see if the mouse is pressed
                        if(!mouseIsPressed){
                            //if mouse is not pressed then light up button
                        player2ConfirmButton.lightUpButton();

                        }
                        if(mouseIsPressed){
                            
                        player2.autoButtonPushed = false ;
                        player2.confirmButtonPushed = true;
                        player2.shipArranged = true;
                            // swap maps of players
                            mapSwap("multiPlayer");
                        }
                    }
                }

                // if both players have deployed ships start the game
                
                // main multiplayer pass N play if statement
                if(player1.confirmButtonPushed && player2.confirmButtonPushed){

                    if(playerOneTurn){

                            
                            if( player2.play(2) === true){
                                // make separate class for win 
                                winState = true ;
                                multiPlayerStatus = false;
                                player2.win = true;
                                singlePlayerWin = false;
                            }
                    }
                    else{ 
                        if( player1.play(1) === true){

                            winState = true;
                            multiPlayerStatus = false;
                            player1.win = true;
                            singlePlayerWin = false;

                        }     
                    }

                }

            // back button  - common for both the players
            if(backButton1.insideButton() ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    backButton1.lightUpButton();
            
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    multiPlayerStatus = false;
                    menu = true;
                    createNewMultiplayerObject();
                    player1.initializeGrid();
                    player2.initializeGrid();
                    //mouseIsPressed = false;
                }
            }
        }

        else if(statistics === true){

           // background(0, 255, 255,100);

            var backButton = new button("back",150,300);
            backButton.draw();
            if(mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y +backButton.height ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    fill(240, 218, 240,100);
                    rect(backButton.x, backButton.y, backButton.width, backButton.height );
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    statistics = false;
                    menu = true;
            }
            } 
        }      

        else if( winState === true ){
           // background(0, 0, 0);
            fill(240, 218, 240);
            // display victory message too
            if(player1.win === true ){

                textSize(40);
                text("Player 1 Wins --- player 1 map !!!",400,400,400,400);

                if( singlePlayerWin === true ){

                    bot.drawGridActual();
                    singlePlayerWin = false;
                }
                else{

                player2.drawGridActual();
                }
            }
            else if(player2.win === true){

                textSize(40);
                text("Player 2 Wins --- player 2 map !!!",400,400,400,400);
                player1.drawGridActual();
            }
            else{
                textSize(40);
                text("BOT Wins --- bot win !!!",400,400,400,400);
                player1.drawGridActual();
            }

            var backButton = new button("Menu",150,450);
            backButton.draw();

            if( backButton.insideButton() ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){

                    fill(240, 218, 240,100);
                    rect(backButton.x, backButton.y, backButton.width, backButton.height );
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    winState = false;
                    menu = true;
                    createNewMultiplayerObject();
                    createNewSinglePlayerObject();
                    player1.initializeGrid();
                    player2.initializeGrid();
                    bot.initializeGrid();
                }
            }
        }    

    };

    }};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas"); 
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc);
