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
	
	Main Animations: dinoSprite, dinoSky
	gamebg, foreground


============================================= */ 

$(document).ready(function() {

	//var startPanel = $("#gameCanvas");
	var canvas = document.getElementById('dinoSprite');
	var background = document.getElementById('gameBg');
	var foreground = document.getElementById('foreground');
	var wordIcon = document.getElementById('wordIcon');
	
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var windowFrame = 0;

	canvas.width = 700;
	canvas.height = 500;

	// Game settings
	var playGame;
	var player;

	// Game UI
	var ui = $("#gameUI");
	var uiIntro = $("#gameIntro");
	var uiStats = $("#gameStats");
	var uiComplete = $("#gameComplete");
	var uiPlay = $("#gamePlay");
	var uiReset = $(".gameReset");
	var uiScore = $(".gameScore");

	// Reset and start the game
	function startGame() {

		// Set up initial game settings
		playGame = false;
			
	};

	// Inititialize game environment
	function init() {
		uiStats.hide();
		uiComplete.hide();

		uiPlay.click(function(e) {
		   e.preventDefault();
		   uiIntro.hide();
		   startGame();
		   // uiScore();
		   
		 });

		uiReset.click(function(e) {
		   e.preventDefault();
		   uiComplete.hide();
		   startGame();
		   // uiScore();

		 });
	};

		////FOREGROUND CLASS///// 
		var foreground = function() {
			//getting the foreground image
			this.foreground = new Image();
			this.foreground.src = 'assets/img/dinoSpell-fg.png';
			ctx.clearRect(0,0,canvas.width,canvas.height);
			this.walking = false;

			//setting or attributes
			this.offsetX = 0;
			this.offsetY = 0;
			this.posX = 0;
			this.posY = 0;
		
			var frameSize = 240,
				currentFrame = 0,
				spriteWidth = 700,
				spriteHeight = 500,
				numFrames = 8;

			//drawing foreground image and parallax movement
			this.draw = function(frame){
				ctx.drawImage(this.foreground,this.offsetX,this.offsetY,5600,1000,this.posX,this.posY, spriteWidth*4,spriteHeight);
				
				if(this.walking == true) {
					this.posX -= 3;
					this.posX = (this.posX + 1); 
				}
			}
		}

		var gameBg = function() {
			//getting the background image			
			this.gameBg = new Image();
			this.gameBg.src = 'assets/img/dinoSpell-midground.png';
			ctx.clearRect(0,0,canvas.width,canvas.height);
			this.walking = false;

			//setting or attributes
			this.offsetX = 0;
			this.offsetY = 0;
			this.posX = 0;
			this.posY = 0;
			var frameSize = 240,
				currentFrame = 0,
				spriteWidth = 700,
				spriteHeight = 500,
				numFrames = 8;
				
			//drawing background image and movement
			this.draw = function(frame){
				ctx.drawImage(this.gameBg,this.offsetX,this.offsetY,5600,1000,this.posX,this.posY, spriteWidth*4,spriteHeight);
				if(this.walking == true) {
					this.posX -= 2.5;
					this.posX = (this.posX + 1); 
				}
			}
		}

		var dinoSky = function() {
			//getting the background image			
			this.dinoSky = new Image();
			this.dinoSky.src = 'assets/img/dinoSpell-sky.jpg';
			ctx.clearRect(0,0,canvas.width,canvas.height);
			this.walking = false;

			//setting or attributes
			this.offsetX = 0;
			this.offsetY = 0;
			this.posX = 0;
			this.posY = 0;
			var frameSize = 240,
				currentFrame = 0,
				spriteWidth = 700,
				spriteHeight = 500,
				numFrames = 8;
				
			//drawing background image and movement
			this.draw = function(frame){
				ctx.drawImage(this.dinoSky,this.offsetX,this.offsetY,5600,1000,this.posX,this.posY, spriteWidth*4,spriteHeight);
				if(this.walking == true) {
					this.posX -= 0.1;
					this.posX = (this.posX - 1); 
				}
			}
		}

		
		var dinoSprite = function(){
			//getting the dino image	
			this.dinoSprite = new Image();
			this.dinoSprite.src = 'assets/img/dannySprite.png';
			this.walking = false;

			//setting or attributes
			this.offsetX = 0;
			this.offsetY = 0;
			this.posX = 15;
			this.posY = 265;

			var	frameSize = 240,
				currentFrame = 0,
				spriteWidth = 165,
				spriteHeight = 165,
				numFrames = 7;

			this.draw = function(frame){

				this.offsetX = currentFrame * frameSize;
				ctx.drawImage(this.dinoSprite,this.offsetX,this.offsetY,frameSize,frameSize,this.posX,this.posY, spriteWidth,spriteHeight);
				if(this.walking == true) {
					if ( (frame % 8) ==  0) {
						currentFrame = (currentFrame + 1) % numFrames;
					}

					this.posX = (this.posX + 1) % canvas.width; 
				}
			}
		}

		/*var wordIcon = function(){
			//getting the wordIcon image	
			this.wordIcon = new Image();
			this.wordIcon.src = 'assets/img/word-icon.png';
			this.walking = false;

			//setting or attributes
			this.offsetX = 0;
			this.offsetY = 0;
			this.posX = 500;
			this.posY = 365;

			// it was the frameSize all along! 
			var	frameSize = 100,
				currentFrame = 0,
				spriteWidth = 50,
				spriteHeight = 50,
				numFrames = 1;

			this.draw = function(frame){

				// changed from "*" to "/"
				this.offsetX = currentFrame / frameSize;
				ctx.drawImage(this.wordIcon,this.offsetX,this.offsetY,frameSize,frameSize,this.posX,this.posY, spriteWidth,spriteHeight);

				if(this.walking == true) {
					if ( (frame % 8) ==  0) {
						currentFrame = (currentFrame + 1) % numFrames;
					}
					// subtracted instead of adding to make it go backwards!
					this.posX = (this.posX - 1.6) % canvas.width; 
				}
			}
		}*/

		// setting dino, bg, fg, sky and word
		var dino = new dinoSprite();
		//var word = new wordIcon();
		var bg = new gameBg();
		var fg = new foreground();
		var sky = new dinoSky();


		$(document).keydown(function() {
			dino.walking = true;
			//word.walking = true;
			bg.walking = true;
			fg.walking = true;
			sky.walking = true;
		});

		$(document).keyup(function() {
			currentFrame = 0;
			dino.walking = false;
			//word.walking = false;
			bg.walking = false;
			fg.walking = false;
			sky.walking = false;
		});
		// creating animation loop
		var animationLoop = function() {
			window.requestAnimationFrame(animationLoop);
			sky.draw(windowFrame);
			bg.draw(windowFrame);
			//word.draw(windowFrame);
			dino.draw(windowFrame);
			fg.draw(windowFrame);

			windowFrame++;
			if (playGame) {
				// Run animation loop (33 milliseconds)
			   setTimeout(animate, 33);
		  };
		};

	animationLoop();
	init();

});
