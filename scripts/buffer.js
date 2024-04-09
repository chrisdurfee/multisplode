"use strict";

var Buffer = Class.extend(
{
	constructor: function()
	{
		/* this will store our buffer canvas and context */
		this.canvas = null;
		this.ctx = null;
	},

	/* this will create our canvas and resize it
	to match the game canvas */
	setup: function()
	{
		this.createBufferCanvas();
	},

	createBufferCanvas: function()
	{
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.resize();
	},

	resize: function(size)
	{
		var canvas = this.canvas;
		canvas.width = size.width;
		canvas.height = size.height;
	}
});