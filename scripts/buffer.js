/**
 * Buffer
 *
 * This class will create a buffer canvas.
 *
 * @class Buffer
 */
export class Buffer
{
	/**
	 * This will store our buffer canvas and context.
	 *
	 * @constructor
	 */
	constructor()
	{
		/* this will store our buffer canvas and context */
		this.canvas = null;
		this.ctx = null;
	}

	/**
	 * This will setup our buffer canvas.
	 *
	 * @return {void}
	 */
	setup()
	{
		this.createBufferCanvas();
	}

	/**
	 * This will create our buffer canvas.
	 *
	 * @return {void}
	 */
	createBufferCanvas()
	{
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.resize();
	}

	/**
	 * This will resize our buffer canvas.
	 *
	 * @param {object} size
	 * @return {void}
	 */
	resize(size)
	{
		const canvas = this.canvas;
		canvas.width = size.width;
		canvas.height = size.height;
	}
}