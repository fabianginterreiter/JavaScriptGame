var Sprite = Class.create((function() {
  
	function initialize(element) {
		this.element = element;
		$("canvas").insert(this.element);
		this.x = 0;
		this.y = 0;
		this.height = this.element.style.height;
		this.width = this.element.style.width;
	}
  
	function onEnterFrame(frames) {
	
	}
	
	function draw() {
		// return (parseInt($("ship").style.left) ||0);
		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	}	
		
	function getWidth() {
		return (parseInt(this.element.style.width) || 0);
	}
	
	function getHeight() {
		return (parseInt(this.element.style.height) || 0);
	}
  
	return {
		initialize: initialize,
		draw: draw,
		onEnterFrame: onEnterFrame,
		
		getWidth: getWidth,
		getHeight: getHeight
	};
})());