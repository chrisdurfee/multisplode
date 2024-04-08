"use strict";

/*
	buffer

	this will setup a buffer object that can mirror our
	game canvas and allow the game to render to an offscreen
	canvas that can later push all rendered data to our
	onscreen canvas
*/
var Buffer = function()
{
	/* this will store our buffer canvas and context */
	this.canvas = null;
	this.ctx = null;
};

Class.extend(
{
	constructor: Buffer,

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