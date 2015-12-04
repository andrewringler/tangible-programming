var islandOffsets = [0, 16, 21]; // Transform is 3 islands of 16 x 24
var islandOffset = function(island){
  return islandOffsets[island-1]; // convert 1-indexed arg to 0-indexed
}
var clearIsland = function(island){
  var xOffset = islandOffsets[island-1];
  for(var i=0; i<16; i++){
    for(var j=0; j<24; j++){
      xForm.setPinHeight(xOffset+i,j,0);
    }
  }
}

/* start animations in sequence */
var sequence = function(animations) {
  var runNextAnimation = function(animations, i){
    if(i < animations.length){
      var animation = animations[i];
      animation(function() {
        runNextAnimation(animations, i+1);
      });        
    }    
  };
  runNextAnimation(animations, 0);
};
var simultaneous = function(animations){
  var s = function(onDoneCallback) {
    console.log(animations);
    for(var i=1; i<animations.length; i++){
      var f = animations[i];
      f();
    }    
    // register callback on just the first animation
    var f = animations[0];
    f(onDoneCallback);
  };
  return s;
};
var delay = function(animation, delay){
  var s = function(onDoneCallback) {
    var runAnimation = function() {
      animation(onDoneCallback);
    };
    window.setTimeout(runAnimation, delay);
  };
  return s;
};

var codeBlock = function(spec) {
  var that = {};
  
  /* introduce new line of code to source-code panel
   * animates from left-to-right */
  that.enter = function(onDoneCallback) {
    var width = 0;
    var update = function() {
      width++;
      var box = xForm.makeBox(spec.x + islandOffset(spec.island), spec.y, width, spec.height, spec.d);
      box.draw();
      if(width < spec.width){
        window.setTimeout(update, 45);
      }else{
        if(onDoneCallback){
          onDoneCallback();          
        }
      }
    };
    update();
  };
  
  /* user presses down on this line of code */
  that.press = function(onDoneCallback) {
    var d = spec.d;
    var update = function() {
      d -= 0.1;
      var box = xForm.makeBox(spec.x + islandOffset(spec.island), spec.y, spec.width, spec.height, d);
      box.draw();
      if(d > 0.75){
        window.setTimeout(update, 10);
      }else{
        if(onDoneCallback){
          onDoneCallback();          
        }
      }
    };
    update();
  };
  
  return that;
};

/* detailed view of the move cursor on left display
 * allows users to edit direction of the move 
 * and distance of the move
 *
 * top left corner of a rectangle containing
 * arrow will be 0,0 origin of this object
 *
 *              O
 *             OOO
 *            OOOOO
 *             OOO
 *             OOO
 *             OOO
 *             OOO
 *             OOO
 *
 */
var moveCursor = function() {
  var that = {};
  var direction = 0; // north (points up)
  var distance = 5; // default number of moves
  var MAX_DIRECTION = 3;

  // transform is 16x24 each panel
  /* x,y origins based on direction of arrow */
  var origins = [
    [islandOffset(1) + 5, 9],
    [islandOffset(1) + 10, 11],
    [islandOffset(1) + 5, 14],
    [islandOffset(1) + 3, 11]
  ];

  var arrowSpec = [
  /**** north ****/
  [ /*row1*/[2,0],
    /*row2*/[1,1],[2,1],[3,1],
    /*row3*/[0,2],[1,2],[2,2],[3,2],[4,2]],
    
  /**** east ****/
  [ /*row1*/[0,0],
    /*row2*/[0,1],[1,0],
    /*row3*/[0,2],[1,2],[2,2],
    /*row4*/[0,3],[1,3],
    /*row5*/[0,4]],

  /**** south ****/
  [ /*row3*/[0,0],[1,0],[2,0],[3,0],[4,0],  
    /*row2*/[1,1],[2,1],[3,1],
    /*row1*/[2,2]],
    
  /**** west ****/
  [ /*row1*/[2,0],
    /*row2*/[1,1],[2,1],
    /*row3*/[0,2],[1,2],[2,2],
    /*row4*/[1,3],[2,3],
    /*row5*/[2,4]]
        
  ];

  that.counterclockwise = function(onDoneCallback) {
    direction--;
    if(direction < 0){
      direction = MAX_DIRECTION;
    }
    redraw(onDoneCallback);
  };
  
  that.clockwise = function(onDoneCallback) {
    direction++;
    if(direction > MAX_DIRECTION){
      direction = 0;
    }
    redraw(onDoneCallback);
  };
    
  var draw = function(d) {
    // set origin of arrow based on direction
    var x = origins[direction][0];
    var y = origins[direction][1];
    
    // draw shaft    
    switch(direction){
      case 0: // north
      var box = xForm.makeBox(x + 1, y + 3, 3, distance, d);
      box.draw();
      break;
      
      case 1: // east
      var box = xForm.makeBox(x - distance, y + 1, distance, 3, d);
      box.draw();
      break;
      
      case 2: // south
      var box = xForm.makeBox(x + 1, y - distance, 3, distance, d);
      box.draw();
      break;

      case 3: // west
      var box = xForm.makeBox(x + 3, y + 1, distance, 3, d);
      box.draw();
      break;
    }
    
    // draw arrow head
    var toDraw = arrowSpec[direction];
    for(var i=0; i<toDraw.length; i++){
      var arrowX = x + toDraw[i][0];
      var arrowY = y + toDraw[i][1];
      xForm.setPinHeight(arrowX,arrowY,d);
    }
  };
  
  /* just draw the arrow in the up state, don't animate */
  var redraw = function(onDoneCallback) {
    clearIsland(1);
    draw(1);
    if(onDoneCallback){
      onDoneCallback();          
    }
  };
  
  /* introduce cursor icon to left display */
  that.on = function(onDoneCallback) {
    var d = 0;
    var update = function() {
      d += 0.1;
      draw(d);
      if(d < 1){
        window.setTimeout(update, 20);
      }else{
        if(onDoneCallback){
          onDoneCallback();          
        }
      }
    };
    update();
  };
    
  return that;
};


// Lines of code for middle display
var line1 = codeBlock({x: 4, y: 10, width: 10, height: 1, d: 1.0, island: 2});
var line2 = codeBlock({x: 4, y: 13, width: 10, height: 1, d: 1.0, island: 2});
var line3 = codeBlock({x: 4, y: 16, width: 10, height: 1, d: 1.0, island: 2});
var line4 = codeBlock({x: 4, y: 19, width: 10, height: 1, d: 1.0, island: 2});

var move1 = moveCursor();
var move2 = moveCursor();
var move3 = moveCursor();
var move4 = moveCursor();

//handle keyboard events
document.addEventListener('keydown', function(event) {
  switch(event.which){
    case 49: // 1
    sequence([
      simultaneous([line1.enter, move1.on]),
      delay(move1.clockwise, 1000),
      delay(move1.clockwise, 1000)
    ]);
    break;
    case 50: // 2
    sequence([
      simultaneous([line2.enter, move2.on]),
      delay(move2.counterclockwise, 1000)
    ]);
    break;
    case 51: // 3
    break;
    case 52: // 4
    break;
    case 53: // 5
    break;
  }
});

//this function will be executed with each frame
return function () {  
};
