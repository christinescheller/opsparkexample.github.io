var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min) ) + min;
        }
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
           
            
            // TODO: 3 - Add a moon and starfield

            //everytime the loop runs it creates a circle with a random x and y respective to the canvas and is added to the background
            for (var i = 0; i <= 100; i++){
                var circle = draw.circle(3,'white','LightGray',2); // creates a variable called circle that holds each circle
                circle.x = canvasWidth*Math.random(); // multiplies canvasWidth * a random decimal between .1 and .99 and assigns it to circle.x
                circle.y = groundY*Math.random(); // multiplies groundY * a random decimal between .1 and .99 and assigns it to circle.y
                background.addChild(circle); //adds the circle to the background
            }

            var moon = draw.bitmap('img/moon.png'); //A variable moon that holds the bitmap drawing of the moon
            moon.x = canvasWidth - 300; //holds the x value (left to right)
            moon.y = groundY - 450; //holds the y value (up and down)
            moon.scaleX = 0.5; //changes the x scale of the moon
            moon.scaleY = 0.5; //changes the y scale of the moon
            background.addChild(moon); //adds the moon to the background     
      
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
        
            // every time this loop runs, it creates a building with an x and y value and pushes it to the buildings array
            for(var i = 0; i < 5; i++) {
                var colors = Math.floor(Math.random()*16777215).toString(16);
                var randomHeight = getRndInteger(100, 300);
                 //declare a variable called buildingHeight that holds the height of the building in pixels
                var building = draw.rect(75, randomHeight, "#" + colors, 'Black', 1); //declares a variable called building which will hold each building
                building.x = 500 + 200*i; //adds 200 pixels to the x value every time loop runs
                building.y = groundY-randomHeight; //sets the building's y position by subracting the height of the building from groundY
                background.addChild(building); //adds the building to the background so we can see it
                buildings.push(building); //push the building's data to the buildings array and store it as an index
            }
   
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = canvasWidth - 300;
            tree.y = groundY - 235;
            background.addChild(tree);

            var backgroundbottom = draw.rect(canvasWidth,groundY,'white');
            backgroundbottom.x = 0;
            backgroundbottom.y = groundY + 10;
            background.addChild(backgroundbottom)
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!

            tree.x = tree.x - 1; // takes the current value of tree.x and subtracts 1 pixel 60/second to move the tree to the left
            //if the tree's x value is less than -200 pixels then reassign canvasWidth to the tree's x position
            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax

            //loops the buildings and moves them to the left by 0.5 pixels
            for (var i = 0; i < buildings.length; i++){
                buildings[i].x = buildings[i].x - 0.5; //moves the building's x position by .5 pixels
                if(buildings[i].x < 0) { //checks to see if the building's x pos is off the left side and if it is it resets the x position to the right
                    buildings[i].x = canvasWidth;
                }
            }
           

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

