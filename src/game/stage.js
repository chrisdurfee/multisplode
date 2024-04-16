
let requestFrame = null;

export class Stage
{
	constructor(targetWidth, targetHeight, container)
	{
		this.targetSize = { width: targetWidth, height: targetHeight };
		this.size = { width: 0, height: 0 };

		/* this will store all thedata about our game canvas
		to make accessing it faster than selecting through dom */
		this.canvas = null;
		this.context = null;

		this.levelController = null;

		/* this will track the positions of mouse */
		this.mouse = { x: 0, y: 0, status: 'up' };

		/* this will store the animation timer id */
		this.animationId = false;

		/* this is our buffer object that will be used
		in the animation loop to increase performance */
		this.buffer = null;
		this.fps = 60;
		this.container = container;
	}

	setup()
	{
		this.drawBind = this.draw.bind(this);
		this.setupCanvas();
		this.setupAnimationFrame();
		//this.setupBuffer();
		this.setupEvents();
	}

	/* this will setup our canvas and context and
	add them to our object */
	setupCanvas()
	{
		let canvas = this.canvas = this.container;
		this.context = canvas.getContext('2d');
	}

	/* this will setup the events for the game */
	setupEvents()
	{
		this.setupMouse();
		this.resize();
		window.addEventListener('resize', this.resize.bind(this), false);

		/* we want to create the callback of the mouse down
		and add it to our closure scoped add and remove
		methods. this allows the events to be added and removed
		during game play */
		let callBack = this.mouseDown.bind(this);
		let canvas = this.canvas;

		this.addEvent = () =>
		{
			canvas.addEventListener("mousedown", callBack, false);
			canvas.addEventListener("touchstart", callBack, false);
		};

		this.removeEvent = () =>
		{
			canvas.removeEventListener("mousedown", callBack, false);
			canvas.removeEventListener("touchstart", callBack, false);
		};
	}

	/* this will setup the mouse events */
	setupMouse()
	{
		let doc = document,
		canvas = this.canvas,
		mousePosition = this.mousePosition.bind(this),
		mouseStatus = this.mouseUp.bind(this);

		canvas.addEventListener("mousemove", mousePosition);
		doc.addEventListener("mouseup", mouseStatus);

		canvas.addEventListener("touchmove", mousePosition);
		doc.addEventListener("touchend", mouseStatus);
	}

	/* this will create a primary exlosion that will remove
	a touch from the level touch count */
	interact(mouseX, mouseY)
	{
		this.levelController.interact(mouseX, mouseY)
	}

	getInteractPositions(e)
	{
		/* this will convert the mouse position to the scaled
		canvas size by changing the actual canvas size to
		scaled canvas size */
		let scale = this.scaleRatio,
		rect = this.canvasBoundBox;

		const getScaledPosition = (x, y) =>
		{
			/* we also need to get the element offset and subtract
			it from the mouse position */
			return {
				x: parseInt((x - rect.left) * scale),
				y: parseInt((y - rect.top) * scale)
			};
		};

		let positions = [];
		let touches = e.touches;
		if(touches && touches.length)
		{
			let touch = touches[touches.length - 1];
			positions.push(getScaledPosition(touch.pageX, touch.pageY));
		}
		else
		{
			let eX, eY;
			eX = e.x || e.clientX;
			eY = e.y || e.clientY;
			positions.push(getScaledPosition(eX, eY));
		}
		return positions;
	}

	getEventPosition(e)
	{
		let eX, eY;

		let touches = e.touches;
		if(touches && touches.length)
		{
			let touch = touches[0];
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
		let scale = this.scaleRatio,
		rect = this.canvasBoundBox;

		/* we also need to get the element offset and subtract
		it from the mouse position */
	    let x = parseInt((eX - rect.left) * scale),
		y = parseInt((eY - rect.top) * scale);

		let mouse = this.mouse;
		mouse.x = x;
		mouse.y = y;
	}

	/* this will will get the current mouse position
	and save it to the object.
	@param (object) e = the event object */
	mousePosition(e)
	{
		this.getEventPosition(e);
	}

	/* this will update the mouse status to up */
	mouseDown(e)
	{
		e.preventDefault();
		e.stopPropagation();

		let positions = this.getInteractPositions(e);
		for(let i = 0, length = positions.length; i < length; i++)
		{
			let position = positions[i];
			this.interact(position.x, position.y);
		}

		this.mouse.status = 'down';
	}

	/* this will update the mouse status to down */
	mouseUp()
	{
		this.mouse.status = 'up';
	}

	/* this will get the size of the game container.
	@returns (object) the height and width of the container */
	getContainerSize()
	{
		let size =
		{
			width: 0,
			height: 0
		};

		let container = this.canvas.parentNode;
		if(container)
		{
			let style = container.style;
			/* padding and border for left and right */
			let bordersLR = (style.borderLeftWidth + style.borderRightWidth);
			let paddingLR = (style.paddingLeft + style.paddingRight);

			/* padding and border for top and bottom */
			let bordersTB = (style.borderTopWidth + style.borderBottomWidth);
			let paddingTB = (style.paddingTop + style.paddingBottom);

			let boxSizing = style.boxSizing,
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
	}

	canvasBoundBox = null;

	/* this will resize the canvas and buffer. */
	resize()
	{
		let containerSize = this.getContainerSize();
		if(containerSize.width > 0)
		{
			let canvas = this.canvas,
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

			//this.buffer.resize(this.size);
		}
	}

	/* this is our canvas scale ration used in the
	mouse position */
	scaleRatio = 1;

	/* this will scale the canvas to the size of the
	parent container using the css style property,
	while keeping the aspect ratio as the main canvas
	@param (object) containerSize = the size object
	@param (object) canvas = the main canvas */
	scale(containerSize, canvas)
	{
		let height = canvas.height,
		width = canvas.width;

		let gameWidth = containerSize.width,
		gameHeight = containerSize.height,
		scaleToFitX = gameWidth / width,
		scaleToFitY = gameHeight / height;

		//let currentScreenRatio = gameWidth / gameHeight;
		let optimalRatio = Math.min(scaleToFitX, scaleToFitY);

		canvas.style.width = width * optimalRatio + "px";
		canvas.style.height = height * optimalRatio + "px";

		/* this will cache our scale ratio to use
		in our mouse position to scale the mouse
		position in our scaled canvas */
		this.scaleRatio = this.size.width / parseInt(canvas.style.width);
	}

	/* this is th draw aniamtion loop. this will draw the
	game objects on the game canvas and check to stop when
	the level is compelete. */
	draw()
	{
		/* we want to clear the buffer canvas */
		//let backBuffer = this.buffer,
		let ctx = this.context;

		/* we want to clear the canvas and reset
		the settings */
		let size = this.size;
		ctx.clearRect(0, 0, size.width, size.height);

		let stop = this.levelController.draw(ctx, this);
		if(stop === true)
		{
			this.stopDraw();
		}
		else
		{
			this.animationId = requestFrame(this.drawBind);
		}

		/* this will draw the buffer canvas on the game canvas */
		//this.renderFromBuffer(size.width, size.height, backBuffer);
	}

	renderFromBuffer(width, height, backBuffer)
	{
		/* this will draw the buffer canvas on the game canvas */
		let mainCtx = this.context;
		mainCtx.clearRect(0, 0, width, height);
		mainCtx.drawImage(backBuffer.canvas, 0, 0);
	}

	/* this will setup the request animation frame to
	allow backwards compat. */
	setupAnimationFrame()
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
	}

	startDraw()
	{
		if(typeof this.animationId !== 'undefined')
		{
			this.stopDraw();
			this.draw();
		}
	}

	stopDraw()
	{
		window.cancelAnimationFrame(this.animationId);
		this.animationId = null;
	}

	setupBuffer()
	{
		this.buffer = new Buffer();
		this.buffer.setup();
	}
}