

var generateIslands = function(islandsCount){

    var stack = {first :[], second:[]};

    stack.first.push(floor(random(0, 10)));
    stack.second.push(floor(random(0, 10)));

    while(stack.first.length !== 0 && islandsCount > 0){

        var nodeX = stack.first.pop();
        var nodeY = stack.second.pop();

        randomMap[ nodeX ][ nodeY ] = ISLAND;

        var blocked = true;
        var ar = [[],[]];

        if(nodeX + 1 < 10 && randomMap[nodeX + 1][nodeY] !== ISLAND){
            ar[0].push(nodeX + 1);
            ar[1].push(nodeY);
            blocked = false;
        }
        if(nodeY + 1 < 10 && randomMap[nodeX][nodeY + 1] !== ISLAND){
            ar[0].push(nodeX);
            ar[1].push(nodeY + 1);
            blocked = false;            
        }
        if(nodeX - 1 >= 0 && randomMap[nodeX - 1][nodeY] !== ISLAND){
            ar[0].push(nodeX - 1);
            ar[1].push(nodeY);
            blocked = false;            
        }
        if(nodeY - 1 >= 0 && randomMap[nodeX][nodeY - 1] !== ISLAND){
            ar[0].push(nodeX);
            ar[1].push(nodeY - 1);
            blocked = false;            
        }
       
        if(blocked === false){
        islandsCount --;
        }
        var randNumber = floor(random(0, ar[0].length));

        if(ar[0].length === 0){
        break;
        }

        stack.first.push(ar[0][randNumber]);
        stack.second.push(ar[1][randNumber]);

        ar[0].splice(randNumber, 1);
        ar[1].splice(randNumber, 1);

    }
    
};

var drawGeneratedMap = function(randomMap){

    var indent = 340;

    for (var i = 0; i < 10; i++) {

        for (var j = 0; j < 10; j++) {

            fill(64, 54, 255);
            
            if(randomMap[i][j] !== ISLAND){

                 rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
            }
            else{
                fill(255, 212, 128);
                rect(indent + 50 + 30 * i, 50 + 30 * j, 30, 30);
            }
        }
    }
};

var islandsCount = 0;

var newMapState = function(){

    var backButton = new button("  back", 250, 450);
    var newMapButton = new button("new map", 450, 450);
    var startButton = new button("start", 650, 450);

    var islandX = 600, islandY = 385;
    var islandsCountButton = new button("    " + islandsCount, islandX, islandY, 120, 40);
    var leftArrow = new button("<", islandX + 5, islandY + 5, 30, 30);
    var rightArrow = new button(">", islandX + 120 - 35, islandY + 5, 30, 30);

    fill(255, 255, 255);
    text("Island Blocks:", islandX - 200, islandY + 7, 200, 40);

    backButton.draw();
    startButton.draw();
    newMapButton.draw();
    islandsCountButton.draw();
    leftArrow.draw();
    rightArrow.draw();

    drawGeneratedMap(randomMap);
    
    if(leftArrow.insideButton()){

        if(!mouseIsPressed){

            leftArrow.lightUpButton();
        }
        else{
            if(islandsCount > 0){
                islandsCount--;
                mouseIsPressed = false;
            }
        }
    }

    if(rightArrow.insideButton()){

        if(!mouseIsPressed){

            rightArrow.lightUpButton();
        }
        else{
            if(islandsCount < 25){
                islandsCount++;
                mouseIsPressed = false;
            }
        }
    }

    if (startButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            startButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            makeNewMap = false;
            createNewSinglePlayerObject();        
        }
    } 

    if (newMapButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            newMapButton.lightUpButton();

        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            for(var i = 0; i < 10; i++){
                for(var j=0; j < 10; j++){
            
                    randomMap[ i ][ j ] = 0;
                }
            }         
            generateIslands(islandsCount);

        }
    }    
    // back button  - common for both the players
    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            backButton.lightUpButton();

        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            makeNewMap = false;
            singlePlayer = false;
            multiPlayerOffline = false;
            menu = true;
        }
    }


};