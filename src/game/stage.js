import { Buffer } from './buffer.js';

const ONE_SECOND = 1000;
const FPS = 60;

/**
 * This will set up the requestAnimationFrame and cancelAnimationFrame
 * for the game loop.
 */
window.requestAnimationFrame = (
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callBack)
	{
		return window.setTimeout(callBack, ONE_SECOND / FPS);
	}
);

const requestFrame = window.requestAnimationFrame;

window.cancelAnimationFrame = (
	window.cancelAnimationFrame ||
	window.mozCancelAnimationFrame ||
	function(requestID)
	{
		window.clearTimeout(requestID);
	}
);

/**
 * This will create a size object.
 *
 * @param {number} width
 * @param {number} height
 * @returns {object}
 */
const Size = (width, height) => ({ width, height });

/**
 * This will create a mouse object.
 *
 * @param {number} x
 * @param {number} y
 * @param {string} status
 * @returns {object}
 */
const Mouse = (x, y, status) => ({ x, y, status });

/**
 * Stage
 *
 * This will handle the game stage.
 *
 * @class
 */
export class Stage
{
	/**
	 * This will set up the game stage.
	 *
	 * @param {number} targetWidth
	 * @param {number} targetHeight
	 * @param {object} game
	 */
	constructor(targetWidth, targetHeight, game)
	{
		this.game = game;
		this.targetSize = Size(targetWidth, targetHeight);
		this.size = Size(0, 0);
		this.fps = FPS;

		/* this will store all thedata about our game canvas
		to make accessing it faster than selecting through dom */
		this.canvas = null;
		this.context = null;

		this.levelController = null;

		/* this will track the positions of mouse */
		this.mouse = Mouse(0, 0, 'up');

		/* this will store the animation timer id */
		this.animationId = false;

		/* this is our buffer object that will be used
		in the animation loop to increase performance */
		this.buffer = null;
	}

	/**
	 * This will set up the game stage.
	 *
	 * @returns {void}
	 */
	setup()
	{
		this.drawBind = this.draw.bind(this);
		//this.setupBuffer();
		this.setupEvents();
	}

	/**
	 * This will set up the canvas.
	 *
	 * @param {object} canvas
	 * @returns {void}
	 */
	setCanvas(canvas)
	{
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}

	/**
	 * This will set up the events for the game.
	 *
	 * @returns {void}
	 */
	setupEvents()
	{
		this.setupMouse();
		this.resize();
		window.addEventListener('resize', this.resize.bind(this), false);

		/* we want to create the callback of the mouse down
		and add it to our closure scoped add and remove
		methods. this allows the events to be added and removed
		during game play */
		const callBack = this.mouseDown.bind(this);
		const canvas = this.canvas;

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

	/**
	 * This will set up the mouse events.
	 *
	 * @returns {void}
	 */
	setupMouse()
	{
		const doc = document,
		canvas = this.canvas,
		mousePosition = this.mousePosition.bind(this),
		mouseStatus = this.mouseUp.bind(this);

		canvas.addEventListener("mousemove", mousePosition);
		doc.addEventListener("mouseup", mouseStatus);

		canvas.addEventListener("touchmove", mousePosition);
		doc.addEventListener("touchend", mouseStatus);
	}

	/**
	 * This will interact with the stage.
	 *
	 * @param {number} mouseX
	 * @param {number} mouseY
	 * @returns {void}
	 */
	interact(mouseX, mouseY)
	{
		this.levelController.interact(mouseX, mouseY)
	}

	/**
	 * This will get the interaction position.
	 *
	 * @param {object} e
	 * @returns {array}
	 */
	getInteractPositions(e)
	{
		/* this will convert the mouse position to the scaled
		canvas size by changing the actual canvas size to
		scaled canvas size */
		const scale = this.scaleRatio,
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

		const positions = [];
		const touches = e.touches;
		if (touches && touches.length)
		{
			const touch = touches[touches.length - 1];
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

	/**
	 * This will get the event position.
	 *
	 * @param {object} e
	 */
	getEventPosition(e)
	{
		let eX, eY;

		const touches = e.touches;
		if (touches && touches.length)
		{
			const touch = touches[0];
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
		const scale = this.scaleRatio,
		rect = this.canvasBoundBox;

		/* we also need to get the element offset and subtract
		it from the mouse position */
		let x = parseInt((eX - rect.left) * scale),
		y = parseInt((eY - rect.top) * scale);

		let mouse = this.mouse;
		mouse.x = x;
		mouse.y = y;
	}

	/**
	 * This will get the mouse position.
	 *
	 * @param {object} e
	 */
	mousePosition(e)
	{
		this.getEventPosition(e);
	}

	/**
	 * This will handle the mouse down event.
	 *
	 * @param {object} e
	 */
	mouseDown(e)
	{
		e.preventDefault();
		e.stopPropagation();

		const positions = this.getInteractPositions(e);
		for (let i = 0, length = positions.length; i < length; i++)
		{
			let position = positions[i];
			this.interact(position.x, position.y);
		}

		this.mouse.status = 'down';
	}

	/**
	 * This will handle the mouse up event.
	 *
	 * @returns {void}
	 */
	mouseUp()
	{
		this.mouse.status = 'up';
	}

	/**
	 * This will get the container size.
	 *
	 * @returns {object}
	 */
	getContainerSize()
	{
		const size =
		{
			width: 0,
			height: 0
		};

		const container = this.canvas.parentNode;
		if (container)
		{
			const style = container.style;
			/* padding and border for left and right */
			const bordersLR = (style.borderLeftWidth + style.borderRightWidth);
			const paddingLR = (style.paddingLeft + style.paddingRight);

			/* padding and border for top and bottom */
			const bordersTB = (style.borderTopWidth + style.borderBottomWidth);
			const paddingTB = (style.paddingTop + style.paddingBottom);

			let boxSizing = style.boxSizing,
			minSize = 0,
			width = 0,
			height = 0;

			/* we need to check to remove padding and border by box sizing */
			if (boxSizing !== 'border-box')
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

	/**
	 * This will resize the canvas.
	 *
	 * @returns {void}
	 */
	resize()
	{
		const containerSize = this.getContainerSize();
		if (containerSize.width > 0)
		{
			const canvas = this.canvas,
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

	/**
	 * This will scale the canvas.
	 *
	 * @param {object} containerSize
	 * @param {object} canvas
	 * @returns {void}
	 */
	scale(containerSize, canvas)
	{
		const height = canvas.height,
		width = canvas.width;

		const gameWidth = containerSize.width,
		gameHeight = containerSize.height,
		scaleToFitX = gameWidth / width,
		scaleToFitY = gameHeight / height;

		//let currentScreenRatio = gameWidth / gameHeight;
		const optimalRatio = Math.min(scaleToFitX, scaleToFitY);

		canvas.style.width = width * optimalRatio + "px";
		canvas.style.height = height * optimalRatio + "px";

		/* this will cache our scale ratio to use
		in our mouse position to scale the mouse
		position in our scaled canvas */
		this.scaleRatio = this.size.width / parseInt(canvas.style.width);
	}

	/**
	 * This will draw the game.
	 *
	 * @returns {void}
	 */
	draw()
	{
		/* we want to clear the buffer canvas */
		//let backBuffer = this.buffer,
		const ctx = this.context;

		/* we want to clear the canvas and reset
		the settings */
		const size = this.size;
		ctx.clearRect(0, 0, size.width, size.height);

		const stop = this.levelController.draw(ctx, this);
		if (stop === true)
		{
			this.stopDraw();
			this.game.levelSummary();
		}
		else
		{
			this.animationId = requestFrame(this.drawBind);
		}

		/* this will draw the buffer canvas on the game canvas */
		//this.renderFromBuffer(size.width, size.height, backBuffer);
	}

	/**
	 * This will render from the buffer.
	 *
	 * @param {number} width
	 * @param {number} height
	 * @param {object} backBuffer
	 * @returns {void}
	 */
	renderFromBuffer(width, height, backBuffer)
	{
		/* this will draw the buffer canvas on the game canvas */
		const mainCtx = this.context;
		mainCtx.clearRect(0, 0, width, height);
		mainCtx.drawImage(backBuffer.canvas, 0, 0);
	}

	/**
	 * This will start drawing.
	 *
	 * @returns {void}
	 */
	startDraw()
	{
		if (typeof this.animationId !== 'undefined')
		{
			this.stopDraw();
			this.draw();
		}
	}

	/**
	 * This will stop drawing.
	 *
	 * @returns {void}
	 */
	stopDraw()
	{
		window.cancelAnimationFrame(this.animationId);
		this.animationId = null;
	}

	/**
	 * This will set up the buffer.
	 *
	 * @returns {void}
	 */
	setupBuffer()
	{
		this.buffer = new Buffer();
		this.buffer.setup();
	}
}