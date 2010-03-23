var ship;
// wait till the page has loaded before observing events
document.observe("dom:loaded", function() {	
	document.observe("keydown", function(event) {
		//console.log(event.keyCode);
		Key.down(event.keyCode);
		
	});
  
	document.observe("keyup", function(event) {
		Key.up(event.keyCode);
	});
	
	ship = new Ship();
	
	tick();
});

var Key = (function() {
  var pressed = {};
  
  function isDown(keyCode) {
    return pressed[keyCode] === true;
  }
  
  function down(keyCode) {
    pressed[keyCode] = true;
  }
  
  function up(keyCode) {
    delete pressed[keyCode];
  }
  
  return {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
	
	SHIFT: 16,
	
	F: 70,
	T: 84,
    
    isDown: isDown,
    down: down,
    up: up
  };
})();

function tick() {
	draw();
	setTimeout(tick, 20);
}

var lasttime = (new Date()).getTime();

function draw() {
	var m = (new Date()).getTime();
	var frames = 0;
	while ((m - lasttime) > 20) {
		lasttime += 20;
		frames++;
	}

	ship.onEnterFrame(frames);
	ship.draw();
}

