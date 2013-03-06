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
  
---------------	 Draw wordIcon  ---------------

============================================= */ 

$(document).ready(function() {

	var canvas = document.getElementById('dinoSprite');
	var wordIcon = document.getElementById('wordIcon');
	
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var windowFrame = 0;

	canvas.width = 700;
	canvas.height = 500;


	var wordIcon = function(){
		//getting the dino image	
		this.wordIcon = new Image();
		this.wordIcon.src = 'assets/img/word-icon.png';
		this.walking = false;

		//setting or attributes
		this.offsetX = 0;
		this.offsetY = 0;
		this.posX = 500;
		this.posY = 365;

		var	frameSize = 95,
			currentFrame = 0,
			spriteWidth = 50,
			spriteHeight = 50,
			numFrames = 1;

		this.draw = function(frame){

			this.offsetX = currentFrame / frameSize;
			ctx.drawImage(this.wordIcon,this.offsetX,this.offsetY,frameSize,frameSize,this.posX,this.posY, spriteWidth,spriteHeight);

			if(this.walking == true) {
				if ( (frame % 8) ==  0) {
					currentFrame = (currentFrame + 1) % numFrames;
				}

				this.posX = (this.posX - 1.7) % canvas.width; 
			}
		}
	}


		// setting dino, bg, fg, sky and word
		var word = new wordIcon();

		$(document).keydown(function() {
			word.walking = true;

		});

		$(document).keyup(function() {
			currentFrame = 0;
			word.walking = false;
		});
		// creating animation loop
		var animationLoop = function() {
			window.requestAnimationFrame(animationLoop);
			word.draw(windowFrame);

			windowFrame++;

		};

	animationLoop();


});

























