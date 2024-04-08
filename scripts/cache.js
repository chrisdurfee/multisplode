"use strict";

var Cache =
{
	/* this will create our canvas and resize it
	to match the game canvas */
	add: function(callBack, width, height)
	{
		var canvas = this.createCacheCanvas(width, height);
		var ctx = canvas.getContext("2d");
		if(typeof callBack === 'function')
		{
			callBack(ctx);
		}
		return canvas;
	},

	createCacheCanvas: function(width, height)
	{
		var canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}
};