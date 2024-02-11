//Credits
var creditsState = function () {
    //background
    // background(0, 255, 255,100);
    //text
    fill(255, 255, 255);
    textSize(15);
    text(
        "Github repo: https://github.com/abdullahjamal1/battleshipBoardGame ",
        150,
        150
    );
    //make button
    var backButton = new button("back", 150, 300);
    backButton.draw();
    //if the mouse is in the same place as the button
    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            fill(240, 218, 240, 100);
            rect(backButton.x, backButton.y, backButton.width, backButton.height);
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            credits = false;
            menu = true;
        }
    }
};
