var statisticsState = function () {

    // background(0, 255, 255,100);
    var backButton = new button("back", 150, 300);
    backButton.draw();
    if (mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y + backButton.height) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            fill(240, 218, 240, 100);
            rect(backButton.x, backButton.y, backButton.width, backButton.height);
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            statistics = false;
            menu = true;
        }
    }
};
