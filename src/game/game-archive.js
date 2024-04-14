"use strict";

if(multisplode === 'undefined')
{
  var multisplode = {};
}

/* we want to setup aliases to use in the game
controller */
var buffer = multisplode.buffer,
levels = multisplode.levels,
points = multisplode.points,
sounds = multisplode.sounds,
sparks = multisplode.sparks,
stateEngine = multisplode.stateEngine,
devices = multisplode.devices,
particles = multisplode.particles,
prompts = multisplode.prompts,
settings = multisplode.settings,
utilites = multisplode.utilites,
data = multisplode.data;

var requestFrame = null;

/*
	game

	This is the main controller for our game. this will setup
	all objects, events, systems, and animations to play our
	game.
*/
multisplode.game =
{
	/* this will track the positions of mouse */
	mouse: { x: 0, y: 0, status: 'up' },

	/* this will store all thedata about our game canvas
	to make accessing it faster than selecting through dom */
	canvas: null,
	context: null,
	size: { width: 0, height: 0 },
	targetSize: { width: 774, height: 493 },

	/* this is our buffer object that will be used
	in the animation loop to increase performance */
	buffer: buffer,

	fps: 60,

	/* this will store the animation timer id */
	animationId: false,

	/* this will setup the entire game by initializing the canvas
	and canvas buffer, adding the game events, setting up the
	persistant data, adding the levels, and starting the splash
	screen. */
	setup: function()
	{
		this.lockOrientation();

		/* this will setup the local data system to allow
		the persistant data to be added and updated */
		this.setupPersistentData();

		/* we want to setup the gamecanvas first then setup
		the game buffer canvas to mirror the first canvas */
		this.setupCanvas();
		//this.setupBuffer();

		this.setupEvents();
		this.setupStateEngine();
		multisplode.messages.setupMessages();

		this.showHomeMenu();

		this.setupAnimationFrame();
		this.drawBind = this.draw.bind(this);

		prompts.setup();

		/* we want to setup the levels and select primary
		level and show our splash screen */
		this.setupLevels();

		var ui = multisplode.ui;
		ui.setupProgress();
		ui.setupTouches();

		this.music.delay();
	},

	setupStateEngine: function()
	{
		stateEngine.setup();
	},

	setupLevels: function()
	{
		/* we want to setup the levels and select primary
		level and show our splash screen */
		levels.setup();
	},

	setupBuffer: function()
	{
		this.buffer.setup();
	},

	/* this will setup the local data system to allow
	the persistant data to be added and updated */
	setupPersistentData: function()
	{
		/* this will setup the local data system to allow
		the persistant data to be added and updated */
		data.setup();
	},

	fullscreen: false,

	showFullscreen: function()
	{
		if(this.fullscreen === false)
		{
			this.fullscreen = true;
			var element = document.body;
			if(element.requestFullscreen)
			{
				element.requestFullscreen();
			}
			else if(element.mozRequestFullScreen)
			{
				element.mozRequestFullScreen();
			}
			else if(element.webkitRequestFullscreen)
			{
				element.webkitRequestFullscreen();
			}
			else if(element.msRequestFullscreen)
			{
				element.msRequestFullscreen();
			}
		}
	},

	/* this will lock the orientation of the device
	so that the orientation will be fixed */
	lockOrientation: function()
	{
		if(screen)
		{
			var orientation = screen.orientation;
			if(orientation && typeof orientation.lock === 'function')
			{
				try{
					orientation.lock('landscape').then(
						function(result)
						{

						},

						function(err)
						{

						}
					);
				}
				catch(e){}
			}
		}
	},

	/* this will setup our canvas and context and
	add them to our object */
	setupCanvas: function()
	{
		var canvas = this.canvas = document.getElementById('portal');
		this.context = canvas.getContext('2d');
	},

	music:
	{
		eleId: 'sound_fx',
		element: null,
		song: 'play-loop.mp3',

		getElement: function()
		{
			if(this.element === null)
			{
				this.element = document.getElementById(this.eleId);
			}
			return this.element;
		},

		change: function(fileName)
		{
			if(this.song !== fileName)
			{
				this.song = fileName;
				var music = this.getElement();
				music.src = 'sound/music/' + fileName;

				if(settings.music === true)
				{
					this.start();
				}
			}
		},

		delay: function()
		{
			if(settings.music === true)
			{
				this.start();
			}
		},

		start: function()
		{
			var music = this.getElement();
			music.volume = 0.6;
			music.play();
		},

		stop: function()
		{
			var music = this.getElement();
			music.pause();
		}
	},

	/* this will setup the mouse events */
	setupMouse: function()
	{
		var doc = document,
		canvas = this.canvas,
		mousePosition = this.mousePosition.bind(this),
		mouseStatus = this.mouseUp.bind(this);

		canvas.addEventListener("mousemove", mousePosition);
		doc.addEventListener("mouseup", mouseStatus);

		canvas.addEventListener("touchmove", mousePosition);
		doc.addEventListener("touchend", mouseStatus);
	},

	getInteractPositions: function(e)
	{
		/* this will convert the mouse position to the scaled
		canvas size by changing the actual canvas size to
		scaled canvas size */
		var scale = this.scaleRatio,
		rect = this.canvasBoundBox;

		var getScaledPosition = function(x, y)
		{
			/* we also need to get the element offset and subtract
			it from the mouse position */
			return {
				x: parseInt((x - rect.left) * scale),
				y: parseInt((y - rect.top) * scale)
			};
		};

		var positions = [];
		var touches = e.touches;
		if(touches && touches.length)
		{
			var touch = touches[touches.length - 1];
			positions.push(getScaledPosition(touch.pageX, touch.pageY));
		}
		else
		{
			var eX, eY;
			eX = e.x || e.clientX;
			eY = e.y || e.clientY;
			positions.push(getScaledPosition(eX, eY));
		}
		return positions;
	},

	getEventPosition: function(e)
	{
		var eX, eY;

		var touches = e.touches;
		if(touches && touches.length)
		{
			var touch = touches[0];
			eX = touch.pageX;
			eY = touch.pageY;
		}
		else
		{
			eX = e.x || e.clientX;
			eY = e.y || e.clientY;
		}

		/* this will convert the mouse position to the scaled
		canvas size by changing the actual canvas size to
		scaled canvas size */
		var scale = this.scaleRatio,
		rect = this.canvasBoundBox;

		/* we also need to get the element offset and subtract
		it from the mouse position */
	    var x = parseInt((eX - rect.left) * scale),
		y = parseInt((eY - rect.top) * scale);

		var mouse = this.mouse;
		mouse.x = x;
		mouse.y = y;
	},

	/* this will will get the current mouse position
	and save it to the object.
	@param (object) e = the event object */
	mousePosition: function(e)
	{
		this.getEventPosition(e);
	},

	/* this will update the mouse status to up */
	mouseDown: function(e)
	{
		e.preventDefault();
		e.stopPropagation();

		var positions = this.getInteractPositions(e);
		for(var i = 0, length = positions.length; i < length; i++)
		{
			var position = positions[i];
			this.interact(position.x, position.y);
		}

		this.mouse.status = 'down';
	},

	/* this will update the mouse status to down */
	mouseUp: function()
	{
		this.mouse.status = 'up';
	},

	/* this will get the size of the game container.
	@return (object) the height and width of the container */
	getContainerSize: function()
	{
		var size =
		{
			width: 0,
			height: 0
		};

		var container = this.canvas.parentNode;
		if(container)
		{
			var style = container.style;
			/* padding and border for left and right */
			var bordersLR = (style.borderLeftWidth + style.borderRightWidth);
			var paddingLR = (style.paddingLeft + style.paddingRight);

			/* padding and border for top and bottom */
			var bordersTB = (style.borderTopWidth + style.borderBottomWidth);
			var paddingTB = (style.paddingTop + style.paddingBottom);

			var boxSizing = style.boxSizing,
			minSize = 0,
			width = 0,
			height = 0;

			/* we need to check to remove padding and border by box sizing */
			if(boxSizing !== 'border-box')
			{
				/* we want to get the panel size and subtract any border or padding */
				width = container.clientWidth - (bordersLR + paddingLR);
				height = container.clientHeight  - (bordersTB + paddingTB);
			}
			else
			{
				width = container.clientWidth;
				height = container.clientHeight;
			}

			size.width = (width > minSize)? width : minSize;
			size.height = height;
		}

		return size;
	},

	canvasBoundBox: null,

	/* this will resize the canvas and buffer. */
	resize: function()
	{
		var containerSize = this.getContainerSize();
		if(containerSize.width > 0)
		{
			var canvas = this.canvas,
			targetSize = this.targetSize;

			/* this will set the size of the canvas as the target
			resolution of our game and save the size to our game */
			canvas.width = targetSize.width;
			canvas.height = targetSize.height;
			this.size = {width: canvas.width, height: canvas.height};

			/* this will scale the main canvas to fill the parent
			container but also maintain aspect ratio */
			this.scale(containerSize, canvas);

			/* this will cache our canvas size to
			use in the mouse event positions */
			this.canvasBoundBox = canvas.getBoundingClientRect();

			//this.buffer.resize();
		}
	},

	/* this is our canvas scale ration used in the
	mouse position */
	scaleRatio: 1,

	/* this will scale the canvas to the size of the
	parent container using the css style property,
	while keeping the aspect ratio as the main canvas
	@param (object) containerSize = the size object
	@param (object) canvas = the main canvas */
	scale: function(containerSize, canvas)
	{
		var height = canvas.height,
		width = canvas.width;

		var gameWidth = containerSize.width,
		gameHeight = containerSize.height,
		scaleToFitX = gameWidth / width,
		scaleToFitY = gameHeight / height;

		//var currentScreenRatio = gameWidth / gameHeight;
		var optimalRatio = Math.min(scaleToFitX, scaleToFitY);

		canvas.style.width = width * optimalRatio + "px";
		canvas.style.height = height * optimalRatio + "px";

		/* this will cache our scale ratio to use
		in our mouse position to scale the mouse
		position in our scaled canvas */
		this.scaleRatio = this.size.width / parseInt(canvas.style.width);
	},

	/* this will show the home menu */
	showHomeMenu: function()
	{
		this.changeState('menu');
	},

	/* this will select the last played level or the
	first unlocked level and start the game */
	startGame: function()
	{
		levels.selectPrimaryLevel();

		this.showFullscreen();
	},

	/* this will play the game */
	play: function()
	{
		this.changeState('play');
	},

	/* this will pause the game */
	pause: function()
	{
		this.changeState('pause');
	},

	/* this will open and close the level
	select panel */
	toggleLevelSelect: function()
	{
		this.changeState('level-select');
	},

	/* this will open and close the level
	select panel */
	toggleSettings: function()
	{
		this.changeState('settings');
	},

	/* thisw will setup the level select options */
	setupLevelSelect: function()
	{
		levels.setupLevelSelect();
	},

	/* this will setup the events for the game */
	setupEvents: function()
	{
		this.setupMouse();
		this.resize();
		window.addEventListener('resize', this.resize.bind(this), false);

		/* we want to create the callback of the mouse down
		and add it to our closure scoped add and remove
		methods. this allows the events to be added and removed
		during game play */
		var callBack = this.mouseDown.bind(this);
		var canvas = this.canvas;

		this.addEvent = function()
		{
			canvas.addEventListener("mousedown", callBack, false);
			canvas.addEventListener("touchstart", callBack, false);
		};

		this.removeEvent = function()
		{
			canvas.removeEventListener("mousedown", callBack, false);
			canvas.removeEventListener("touchstart", callBack, false);
		};
	},

	/* this will change the state of the game.
	@param (string) state = the state */
	changeState: function(state)
	{
		stateEngine.change(state);
	},

	/* this will reset the current level. */
	resetCurrentLevel: function()
	{
		var currentLevel = levels.currentLevel;
		if(currentLevel && typeof currentLevel.reset === 'function')
		{
			currentLevel.reset();
			this.setupParticles(currentLevel);
			multisplode.ui.touches.setupTouches(currentLevel);
		}
	},

	/* this will show the level summary */
	levelSummary: function()
	{
		this.changeState('level-summary');

		var currentLevel = levels.currentLevel;
		if(currentLevel)
		{
			currentLevel.getSummary();
		}
	},

	/* this will create a primary exlosion that will remove
	a touch from the level touch count */
	interact: function(mouseX, mouseY)
	{
		var currentLevel = levels.currentLevel;
		if(currentLevel)
		{
			//if the touch count is less than limit
			if(currentLevel.touch < currentLevel.touchLimit)
			{
				/* this will update the touch count and get the
				current device type to create the new device */
				var touch = currentLevel.updateTouch();
				devices.add(mouseX, mouseY, 'rgba(255,255,255,.9)', 1, touch.type);
			}
		}
	},

	/* this will create a secondary explosion from a particle
	colliding with a device. this will also add sparks
	from particle being removed.
	@param (number) x = the position x
	@param (number) y = the position y
	@param (string) color = the particle color */
	createDevice: function(x, y, color, multiplier)
	{
		devices.add(x, y, color, multiplier);
		this.createSparks(x, y, color);
	},

	/* this will create sparks from particle being removed.
	@param (number) x = the position x
	@param (number) y = the position y
	@param (string) color = the particle color */
	createSparks: function(x, y, color)
	{
		sparks.add(x, y, color);
	},

	/* this will create points from particle being removed.
	@param (number) x = the position x
	@param (number) y = the position y
	@param (number) value = the particle value */
	createPoints: function(x, y, value)
	{
		var currentLevel = levels.currentLevel;
		if(currentLevel)
		{
			/*if(settings.graphics === 'high')
			{
				points.add(x, y, value);
			}*/

			//update destoyed number and points
			currentLevel.updateScore(1, value);
		}
	},

	/* this will check if a particle has collided with a
	wave.
	@param (object) particle = the particle
	@param (object) wave
	@return (bool) true or false if collided */
	checkDistance: function(particle, wave)
	{
		var S = particle.position.x - wave.position.x,
		D = particle.position.y - wave.position.y,
		F = wave.size + particle.size;
		//return true or false
		return (S * S + D * D <= F * F);
	},

	//creat random number from set number range
	randomFromTo: function(from, to)
	{
	   return math.floor(Math.random() * (to - from + 1) + from);
	},

	//create random color (colors are set, intensity is dynamic)
	newColor: function(limit)
	{
		limit = (typeof limit !== 'number')? 7 : limit;
		var number = math.floor(Math.random() * 7);
		var color = '';
		switch(number)
		{
			case 0:
				/* bright red */
				color = '#FF0000';
				break;
			case 1:
				/* purple */
				color = '#93488B';
				break;
			case 2:
				/* yellow */
				color = '#FFF427';
				break;
			case 3:
				/* orange */
				color = '#DA6B0F';
				break;
			case 4:
				/* blue */
				color = '#1C75BC';
				break;
			case 5:
				/* magenta */
				color = '#B52B85';
				break;
			case 6:
				/* green */
				color = '#CFFF9E';
				break;
			case 7:
				/* cyan */
				color = '#26CFCE';
				break;
		}
		return color;

	},

	/* this will reset all game objects */
	reset: function()
	{
		sounds.reset();
		particles.reset();
		points.reset();
		devices.reset();
		sparks.reset();
	},

	/* this will setup the level particles.
	@param (object) level = the level */
	setupParticles: function(level)
	{
		this.reset();

		var levelParticles = level.particles;
		if(levelParticles && typeof levelParticles === 'object')
		{
			for(var type in levelParticles)
			{
				if(levelParticles.hasOwnProperty(type) === true)
				{
					var count = levelParticles[type];
					for(var i = 0; i < count; i++)
					{
						particles.add(type);
					}
				}
			}
		}
		else
		{
			for(var i = 0, count = level.quantity; i < count; i++)
			{
				particles.add();
			}
		}
	},

	levelNumberElement: null,

	updateLevelNumber: function(number)
	{
		var levelNumber = this.levelNumberElement;
		/* this will setup  the control panel ui
		to show the level settings */
		if(levelNumber !== null)
		{
			levelNumber.textContent = number;
		}
		else
		{
			this.levelNumberElement = document.getElementById('levelNumber');
			this.updateLevelNumber(number);
		}
	},

	/* this will setup the level.
	@param (level) level = the level object */
	setupLevel: function(level, cancelPrompts)
	{
		multisplode.messages.removeAll();

		this.updatePlayContainerClass(level);

		/* this will setup  the control panel ui
		to show the level settings */
		this.updateLevelNumber(level.number);
		this.updateLevelMin(level.minimum);

		var ui = multisplode.ui;
		ui.progress.reset();
		ui.touches.setupTouches(level);

		this.setupParticles(level);
		this.changeState('play');

		/* this will save the level as the last played
		level */
		data.set('lastLevel', level);

		/* we renderthe prompt last because it can allow
		the prompt to stop the game play */
		if(cancelPrompts !== true)
		{
			var promptId = level.promptId;
			if(promptId)
			{
				window.setTimeout(function()
				{
					prompts.showPrompt(promptId);
				}, 50);
			}
		}
	},

	playContainerElement: null,

	updatePlayContainerClass: function(level)
	{
		var defaultClass = 'play-container';
		if(this.playContainerElement === null)
		{
			this.playContainerElement = document.getElementById('play-container');
		}
		this.playContainerElement.className = defaultClass + ' ' + level.levelClass;
	},

	/* this will retry the current level */
	retryLevel: function()
	{
		levels.retryLevel();
	},

	/* this will play the next level */
	nextLevel: function()
	{
		levels.selectNextLevel();
	},

	/* this will play the previous level */
	previousLevel: function()
	{
		levels.selectPreviousLevel();
	},

	levelMinElement: document.getElementById('levelMinimum'),

	updateLevelMin: function(number)
	{
		this.levelMinElement.textContent = number;
	},

	/* this will update the control panel ui with the
	current data. */
	updatePlayUi: function()
	{
		var currentLevel = levels.currentLevel;
		multisplode.ui.progress.update(currentLevel.scoreNumber, currentLevel.minimum);
	},

	updateTouchUi: function()
	{
		return multisplode.ui.touches.select();
	},

	destroyAllParticles: function()
	{
		var particleArray = particles.getAll();
		var particleCount = particleArray.length;
		if(particleArray)
		{
			for(var i = particleCount - 1; i >= 0; i--)
			{
				var particle = particleArray[i];
				//remove destroyed particles
				particles.remove(particle);

				var pos = particle.position;
				/* this will add a new device for the particle
				that has been destroyed, including sparks from the
				explosion, and the newpoints from the destruction */
				this.createDevice(pos.x, pos.y, particle.fillColor);
			}
		}
	},

	/* this is th draw aniamtion loop. this will draw the
	game objects on the game canvas and check to stop when
	the level is compelete. */
	draw: function()
	{
		var canvas = this.canvas,
		currentLevel = levels.currentLevel;

		/* we want to clear the buffer canvas */
		//var backBuffer = this.buffer,
		var ctx = this.context;

		/* we want to clear the canvas and reset
		the settings */
		var size = this.size;
		ctx.clearRect(0, 0, size.width, size.height);
		//ctx.globalAlpha = 1;

		//primary explosions
		devices.draw(ctx);
		//particle sparks
		sparks.draw(ctx);

		//particles
		var particleArray = particles.getAll();
		var particleCount = particleArray.length;
		var particleIndex = particleCount - 1;
		if(particleCount > 0)
		{
			var activeDevices = devices.getAll();
			var activeDeviceLength = activeDevices.length;
			var activeDeviceIndex = activeDeviceLength - 1;
			do
			{
				var particle = particleArray[particleIndex];
				var collided = false;
				var deviceIndex = activeDeviceIndex;
				if(activeDeviceLength > 0)
				{
					/* this will check each particle to see
					ifithas collided with a device */
					do
					{
						var device = activeDevices[deviceIndex];
						if(this.checkDistance(particle, device) === true)
						{
							collided = true;
							switch(device.type)
							{
								case 'gravityField':
									device.orbitParticle(particle);
									break;
								default:
									particleCount--;
									//remove destroyed particles
									particles.remove(particle);

									//after touch
									/*if(currentLevel.scoreNumber >= currentLevel.afterTouch)
									{
										currentLevel.afterTouchReady = 'yes';
									}*/

									var pos = particle.position;
									/* this will add a new device for the particle
									that has been destroyed, including sparks from the
									explosion, and the newpoints from the destruction */
									this.createDevice(pos.x, pos.y, particle.fillColor, particle.multiplier);
									this.createPoints(pos.x - 55, pos.y - 35, particle.value);
							}
							break;
						}
					} while(deviceIndex--);
				}

				/* we dont want to move the particle if the particle
				is interacting with a device */
				if(collided === false)
				{
					particle.move();
				}

				particle.draw(ctx);

			} while(particleIndex--);
		}

		/*if(settings.graphics === 'high')
		{
			points.draw(ctx);
		}*/

		//end the level
		if(currentLevel.isComplete(particleCount) === true)
		{
			/* this will stop drawing and go to the summary panel */
			this.stopDraw();
			this.levelSummary();
		}
		else
		{
			this.animationId = requestFrame(this.drawBind);
		}

		/* this will draw the buffer canvas on the game canvas */
		//this.renderFromBuffer(this.size.width, this.size.height, backBuffer);
	},

	renderFromBuffer: function(width, height, backBuffer)
	{
		/* this will draw the buffer canvas on the game canvas */
		var mainCtx = this.context;
		mainCtx.clearRect(0, 0, width, height);
		mainCtx.drawImage(backBuffer.canvas, 0, 0);
	},

	/* this will setup the request animation frame to
	allow backwards compat. */
	setupAnimationFrame: function()
	{
		/* setup request for prefix or setTimeout if
		not supported */
		window.requestAnimationFrame = (
			window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callBack)
			{
				return window.setTimeout(callBack, 1000 / this.fps);
			}
		);
		requestFrame = window.requestAnimationFrame;

		/* setup cancel for prefix or setTimeout if
		not supported */
		window.cancelAnimationFrame = (
			window.cancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			function(requestID)
			{
				window.clearTimeout(requestID);
			}
		);
	},

	startDraw: function()
	{
		if(typeof this.animationId !== 'undefined')
		{
			this.stopDraw();
			this.draw();
		}
	},

	stopDraw: function()
	{
		window.cancelAnimationFrame(this.animationId);
		this.animationId = null;
	}
};
