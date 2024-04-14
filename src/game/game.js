"use strict";

var Game = Class.extend(
{
	constructor: function(width, height, container)
	{
		this.stage = new Stage(width, height, container);
	},

	setup: function()
	{
		this.lockOrientation();
		this.stage.setup();

		/* this will setup the local data system to allow
		the persistant data to be added and updated */
		this.setupPersistentData();
		this.setupStateEngine();
		this.setupMessages();
		this.showHomeMenu();

		/* we want to setup the levels and select primary
		level and show our splash screen */
		this.setupLevels();
		this.setupUi();

		this.music.delay();
	},

	setupMessages: function()
	{
		Messages.setupMessages();
		Prompts.setup();
	},

	setupUi: function()
	{
		var ui = UI;
		ui.setupProgress();
		ui.setupTouches();
	},

	setupStateEngine: function()
	{
		StateEngine.setup();
	},

	setupLevelPacks: function()
	{
		var pack = new RandomLevelPack();
		Levels.addLevelPack(pack);
	},

	setupLevels: function()
	{
		this.setupLevelPacks();
		/* we want to setup the levels and select primary
		level and show our splash screen */
		Levels.setup();
	},

	/* this will setup the local data system to allow
	the persistant data to be added and updated */
	setupPersistentData: function()
	{
		/* this will setup the local data system to allow
		the persistant data to be added and updated */
		Data.setup();
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

	music: new Music('sound_fx', 'play-loop.mp3'),

	/* this will show the home menu */
	showHomeMenu: function()
	{
		this.changeState('menu');
	},

	setStageLevelController: function(controller)
	{
		this.stage.levelController = controller;
	},

	/* this will select the last played level or the
	first unlocked level and start the game */
	startGame: function()
	{
		//this.showFullscreen();
		Levels.selectPrimaryLevel();
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

	/* this will retry the current level */
	retryLevel: function()
	{
		Levels.retryLevel();
	},

	/* this will play the next level */
	nextLevel: function()
	{
		Levels.selectNextLevel();
	},

	/* this will play the previous level */
	previousLevel: function()
	{
		Levels.selectPreviousLevel();
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
		Levels.setupLevelSelect();
	},

	/* this will change the state of the game.
	@param (string) state = the state */
	changeState: function(state)
	{
		StateEngine.change(state);
	},

	/* this will reset the current level. */
	resetCurrentLevel: function()
	{
		Levels.retryLevel();
	},

	/* this will show the level summary */
	levelSummary: function()
	{
		var progress = UI.progress;
		if(progress)
		{
			progress.reset();
		}

		this.changeState('level-summary');

		Levels.levelSummary();
	},

	startDraw: function()
	{
		this.stage.startDraw();
	},

	stopDraw: function()
	{
		this.stage.stopDraw();
	},

	startStage: function()
	{
		var stage = this.stage;
		stage.addEvent();
		stage.startDraw();
	},

	stopStage: function()
	{
		var stage = this.stage;
		stage.removeEvent();
		stage.stopDraw();
	}
});
