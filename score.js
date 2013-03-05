/////////////Paul Irish//////////////////////

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
/////////////Paul Irish END//////////////////////




/* =============================================
  
-------	 Draw wordIcon and keep score! --------

using tutorial below as reference

@ http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game

============================================= */ 

$(document).ready(function() {

    var canvas = document.getElementById('dinoSprite');
    var ctx = canvas.getContext("2d");

    canvas.width = 700;
    canvas.height = 500;
     
    document.body.appendChild(canvas); 

	// draw wordIcon
	var wordIcon = false;
	var wordImage = new Image();
	wordImage.onload = function () {
		wordIcon = true;
	};
	wordImage.src = "assets/img/word-icon.png";

	// Game objects
	var word = {};
	var coins = 0;

/*// after word is spelled correctly we reset wordIcon & danny
	var reset = function () {
	// popup word that needs to be spelled
	// place wordIcon back in same spot
	//return danny to start position
};*/

	var render = function() {

		if (wordIcon) {
			ctx.drawImage(wordImage, word.x, word.y);
		}

		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "right";
		ctx.textBaseline = "top";
		ctx.fillText("Coins: " + coins, 32, 32);
	};

	/*// collision detection
	var update = function() {

		// Are they touching?
		if (
			dino.x <= (word.x + 32)
			&& word.x <= (dino.x + 32)
			&& dino.y <= (word.y + 32)
			&& word.y <= (dino.y + 32)
		) {
			++coins;
			reset();
		}
	};*/


	// Let's play this game!
	reset();
});



