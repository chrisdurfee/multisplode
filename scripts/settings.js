"use strict";

/*
	settings

	this will allow data to be added and retreived
	from the local storage. this will encode the data
	to and from json automatically.
*/
var Settings =
{
	audio: false,
	music: false,
	graphics: 'medium',

	/* this will setup the object and check if
	local storage is supported. */
	setup: function()
	{
		this.setupAudio();
		this.setupVideo();
	},

	setupAudio: function()
	{
		var music = Data.get('music');
		this.music = music === true? true : false;
		var toggle = new Toggle(this.music, this.toggleMusic.bind(this), 'music-toggle');
		toggle.setup();

		var audio = Data.get('audio');
		this.audio = audio === true? true : false;
		toggle = new Toggle(audio, this.toggleAudio.bind(this), 'sound-fx-toggle');
		toggle.setup();
	},

	toggleAudio: function(checked)
	{
		Data.set('audio', checked);
		this.audio = checked;
	},

	toggleMusic: function(checked)
	{
		Data.set('music', checked);
		this.music = checked;

		if(this.music === true)
		{
			game.music.start();
		}
		else
		{
			game.music.stop();
		}
	},

	graphicsModes:
	[
		'low',
		'medium',
		'high'
	],

	graphicsIterator: null,

	setupVideo: function()
	{
		var graphics = Data.get('graphics');
		this.graphics = graphics != null? graphics : 'medium';

		/* this will setup the iterator and
		select the current mode */
		var iterator = this.graphicsIterator = new Iterator(this.graphicsModes);
		iterator.selectOption(this.graphics)

		this.setupGraphicsEvents();
		this.updateGraphicsMode(this.graphics);
	},

	setupGraphicsEvents: function()
	{
		var button = document.getElementById("graphics");
		button.onclick = this.nextGraphics.bind(this);

		button = document.getElementById("graphics-previous");
		button.onclick = this.previousGraphics.bind(this);

		button = document.getElementById("graphics-next");
		button.onclick = this.nextGraphics.bind(this);
	},

	previousGraphics: function()
	{
		var iterator = this.graphicsIterator;
		var mode = iterator.previous();

		this.updateGraphicsMode(mode);
		return mode;
	},

	nextGraphics: function()
	{
		var iterator = this.graphicsIterator;
		var mode = iterator.next();

		this.updateGraphicsMode(mode);
		return mode;
	},

	updateGraphicsMode: function(mode)
	{
		this.updateGraphicsButton(mode);
		Data.set('graphics', mode);
		this.graphics = mode;
	},

	updateGraphicsButton: function(mode)
	{
		var button = document.getElementById("graphics");
		button.textContent = mode.toUpperCase();
	}
};

var Iterator = Class.extend(
{
	constructor: function(options)
	{
		this.options = options;
		this.selection = null;
	},

	get: function(index)
	{
		var options = this.options;
		return typeof options[index] !== 'undefined'? options[index] : false;
	},

	getSelectedIndex: function()
	{
		return (typeof this.selectedIndex !== 'undefined')? this.selectedIndex : 0;
	},

	next: function()
	{
		var selectedIndex = this.getSelectedIndex();
		var index = (selectedIndex < this.options.length - 1)? ++selectedIndex : 0;
		return this.select(index);
	},

	previous: function()
	{
		var selectedIndex = this.getSelectedIndex();
		var index = (selectedIndex > 0)? --selectedIndex : this.options.length - 1;
		return this.select(index);
	},

	select: function(index)
	{
		var option = this.get(index);
		if(option !== false)
		{
			this.selection = option;
			this.selectedIndex = index;
		}
		return option;
	},

	selectOption: function(option)
	{
		var index = this.options.indexOf(option);
		if(index > -1)
		{
			option = this.select(index);
		}
		return option;
	}
});