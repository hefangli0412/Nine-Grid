// jQuery usage: addClass, removeClass, attr('id'); $
// $ means using jQuery; elem means document element(DOM)

window.onload = init;
window.onresize = setSize;

// Initialize the game
function init() {
  setSize();  // must be implemented before setting cell values
  resetGame();
  document.getElementById("btnNewGame").onclick = resetGame;
}

// Reset all the cells
function resetGame() {
  $('#row0').masonry(); // use masonry library instead of float methods
  $('#row1').masonry(); // no idea why row class will mess up
  $('#row2').masonry();
   for (var cellNum = 0; cellNum < 9; cellNum++) {
         var elm = document.getElementById(cellNum);
         elm.innerHTML = cellNum + 1 + "";  // Reset 9 blocks 
         elm.addEventListener("mouseover", mouseOver);
         elm.addEventListener("mouseout", mouseOut);
         elm.addEventListener("mousedown", play);
         // elm.onmousedown = play;
   }
   var last = document.getElementById("8");
   last.innerHTML = "&nbsp;";  // Reset the last block
}

// Responsive windowsize
function setSize() {
  var width = $(window).width();
  if (width < 200) {
    width = width * 0.9;
  } else if (width < 300) {
    width = width * 0.75;
  } else if (width < 400) {
    width = width * 0.6;
  } else if (width < 600) {
    width = width * 0.47;    
  } else if (width < 800) {
    width = width * 0.4;
  } else if (width < 1000) {
    width = width * 0.35;
  } else {
    width = width * 0.32;
  }

  $("#panel").css("width", width);
  $("#panel").css("height", width);
// $(".cell").css("width", width * 0.33); // no idea why this cannot be set
  $(".cell").css("height", width *0.33);
  $(".cell").css("padding", width * 0.33 * 0.15);  // set middle on Y-axis
  $(".cell").css("font-size", width * 0.33 * 0.5);
  $("h1").css("font-size", width * 0.33 * 0.5 * 0.7)
};

// Mouse-hover handler
function mouseOver(evt) {
   var thisCell;
   if (evt) {  // non-IE
     thisCell = evt.target;
   } else {    // IE
     thisCell = window.event.srcElement;
   }

   var thisId = $(thisCell).attr('id');
   //var thisCell = $(thisId); // jQuery object
   if (findBlank(thisId) !== -1) {
     $(thisCell).addClass("changeClass");
   }
}

function mouseOut(evt) {
   var thisCell;
   if (evt) {  // non-IE
     thisCell = evt.target; //elem type
   } else {    // IE
     thisCell = window.event.srcElement;
   }

   $(thisCell).removeClass("changeClass");
}

// return the id of the surrounding blank cell; if not, return -1
// stringConvertToInterger is called implicitly
function findBlank(thisId) {
  if ((parseInt(thisId) - 3) >= 0) {
    var upElem = document.getElementById(parseInt(thisId) - 3);
    if (upElem.innerHTML === "&nbsp;") {
       return parseInt(thisId) - 3;
    }
  }
  if ((parseInt(thisId) -1) >= 0) {
    var leftElem = document.getElementById(parseInt(thisId) - 1);
    if (leftElem.innerHTML === "&nbsp;") {
       return parseInt(thisId) - 1;
    }
  }
  if ((parseInt(thisId) + 1) <= 8) {
    var rightElem = document.getElementById(parseInt(thisId) + 1);
    if (rightElem.innerHTML === "&nbsp;") {
       return parseInt(thisId) + 1;
    }
  }
  if ((parseInt(thisId) + 3) <= 8) {
    var downElem = document.getElementById(parseInt(thisId) + 3);
    if (downElem.innerHTML === "&nbsp;") {
       return parseInt(thisId) + 3;
    }
  }
  return -1;
}

// Mouse-click handler
function play(evt) {
  /* disable click for a while before trasition is finished
   * less than 900 causes unfavorable flicking effect
   */
  for (var cellNum = 0; cellNum < 9; cellNum++) {
         var elm = document.getElementById(cellNum);
         elm.removeEventListener("mousedown", play);
  }
  setTimeout(function() {
    for (var cellNum = 0; cellNum < 9; cellNum++) {
           var elm = document.getElementById(cellNum);
           elm.addEventListener("mousedown", play);
    }
  }, 900);

  var thisCell;
  if (evt) {  // non-IE
    thisCell = evt.target;
  } else {    // IE
    thisCell = window.event.srcElement;
  }

  var thisId = $(thisCell).attr('id');
  if (findBlank(thisId) !== -1) {
    var blankBlock = document.getElementById(findBlank(thisId));
    var temp = thisCell.innerHTML;

    $(thisCell).animate({opacity:'0.01'}, 500);
    /* setTimeout(function() {thisCell.innerHTML = "&nbsp;";}, 470);
     * no need because only animation and delay for one object can queue up
     */
    thisCell.innerHTML = "&nbsp;";
    $(thisCell).animate({opacity:'1'}, 500);

    $(blankBlock).animate({opacity:'0.01'}, 0);
    blankBlock.innerHTML = temp;
    /* the sequence of setting thisCell.innerHTML and blankBlock.innerHTML = temp
     * seems crucial to the visual effect and fast-click event but actually both
     * of these conditions have little influence otherwise it is crazy.
     */
    $(blankBlock).delay(500);
    $(blankBlock).animate({opacity:'1'}, 500);
 
    setTimeout(function() {$(thisCell).removeClass("changeClass");}, 350);
  }

  if (checkWin) {
  // dosomething();
  }
}
 
// //Check if the current player wins the game
function checkWin() {
}
