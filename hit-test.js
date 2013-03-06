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



/* =================================================================================
    
            ------------  Hit Test! -------------

using code below as reference
@ http://upshots.org/javascript/jquery-hittest
@ http://nicbell.net/blog/2012/12/jquery-hit-test-plugin

================================================================================= */ 

$(document).ready(function(){

    var canvas = document.getElementById('dinoSprite');
    var wordIcon = document.getElementById('wordIcon');
    
    var windowFrame = 0;

    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);

    canvas.width = 700;
    canvas.height = 500;

    // event listener for keydown 
    canvas.addEventListener("keydown", handleKeydown);
    //setInterval(handleTick, 25);

    /*
     * jQuery "hitTest" plugin
     * @warning: does not work with elements that are "display:hidden"
     * @param {Number} x The x coordinate to test for collision
     * @param {Number} y The y coordinate to test for collision
     * @return {Boolean} True if the given jQuery object's rectangular bounds contain the point defined by params x,y
     */
    (function($){
        $.fn.hitTest = function(x, y){
            var bounds = this.offset();
            bounds.right = bounds.left + this.outerWidth();
            bounds.bottom = bounds.top + this.outerHeight();
            return x &gt;= bounds.left
                &amp;&amp; x = bounds.top
                &amp;&amp; y &lt;= bounds.bottom;
        };
    })(jQuery);



});








