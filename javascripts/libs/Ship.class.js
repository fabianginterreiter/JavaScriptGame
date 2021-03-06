var Ship = Class.create(Sprite, (function() {
	function initialize($super) {		
		// Create and insert the #ship element
		$super(new Element("div", { id: "ship" }));
		this.y = 200;
		
		this.t = 0;
		this.r = true;
		this.right = true;
	}
	
	function onEnterFrame(frames) {
		
	
		this.doWalk(frames);
		
		this.doJump(frames);
		
		this.doCrouch(frames);
		
		this.doPunch(frames);
		
		this.setAnimation(frames);		
	}
	
	function doPunch(frames) {
	if (Key.isDown(Key.F) && this.punch != true) {
			this.punch = true;
			this.punch_status = 0;
			this.punch_frames = 0;
		} else if (this.punch) {		
			this.punch_frames += frames;
			if (this.punch_frames > 20) {
			this.punch = false;	
			} else if (this.punch_frames > 6) {
				this.punch_status = 1;
			}
		}
	}
	
	function doWalk(frames) {
		var speed = 5 * frames;
	
		if (Key.isDown(Key.SHIFT)) {
			speed = 2 * speed;
		}
	
		if (Key.isDown(Key.LEFT)) {
			this.x-= speed;
			this.right = false;
		}		
		
		if (Key.isDown(Key.RIGHT)) {
			this.x+=speed;
			this.right = true;
			
			//if (this.x > $('canvas').getWidth()) this.x = 0;
			
		}
		
		if (Key.isDown(Key.LEFT) || Key.isDown(Key.RIGHT)) {
			this.isWalking = true;
		} else {
			this.isWalking = false;
		}
		
		if (Key.isDown(Key.T)) {
			this.isDead = true;
		} else {
			this.isDead = false;
		}
	}
	
	
	function doJump(frames) {
		if (Key.isDown(Key.UP) && this.jump !== true) {
			this.jump = true;
			this.jump_frames = 0;
			this.jump_y = this.y;			
		} else if (this.jump) {
			this.jump_frames+=frames;
			this.y = this.jump_y - (-Math.pow(((this.jump_frames/2)-10),2)+100);
			if (this.y > this.jump_y) {
				this.y = this.jump_y;
				this.jump = false;
			}
		}		
		return this.jump;
	}
	
	function doCrouch(frames) {
		if (Key.isDown(Key.DOWN)) {
			this.isCrouch = true;
		} else {
			this.isCrouch = false;
		}
	}
	
	function addClass(d) {
		if (!this.element.hasClassName(d)) {
			this.element.addClassName(d);
		}
	}
	
	function removeClass(class) {
		if (this.element.hasClassName(class)) {
			this.element.removeClassName(class);
		}
	}
	
	function addMovingClass(class) {
		if (class != 'punch_one') {
			this.removeClass('punch_one');
		}
		if (class != 'punch_two') {
			this.removeClass('punch_two');
		}
		if (class != 'nothing') {
			this.removeClass('nothing');
		}
		if (class != 'walking') {
			this.removeClass('walking');
		}
		if (class != 'crouch') {
			this.removeClass('crouch');
		}
		if (class != 'dead') {
			this.removeClass('dead');
		}
		
		this.addClass(class);
	}
	
	function setAnimation(frames) {		
		if (this.right) {
			this.removeClass('left');
			this.addClass('right');
		} else {
			this.removeClass('right');
			this.addClass('left');
		}
		
		
	
		if (this.punch) {	
			if (this.punch_status == 0) {
				this.addMovingClass('punch_one');
			} else {
				this.addMovingClass('punch_two');
			}
		} else {	
			if (this.isDead) {
				this.addMovingClass('dead');
			} else {	
				if (this.jump) {
					this.addMovingClass('walking');
				} else {
		
					if (this.isCrouch) {
						this.addMovingClass('crouch');
					} else {	
						if (this.isWalking) {
							this.t+=frames;
							if (this.t > 5) {
								if (this.r) {									
									this.r = false;
								} else {									
									this.r = true;
								}
								this.t = 0;
							}
							if (this.r) {
								this.addMovingClass('walking');
							} else {
								this.addMovingClass('nothing');
							}
						} else {
							this.addMovingClass('nothing');
						}
					}
				}
			}
		}
	}
  
	return {
		initialize: initialize,
		onEnterFrame: onEnterFrame,
		setAnimation: setAnimation,
		doWalk: doWalk,
		doJump: doJump,
		doCrouch: doCrouch,
		doPunch: doPunch,
		
		addClass: addClass,
		removeClass: removeClass,
		addMovingClass: addMovingClass
	}
})());