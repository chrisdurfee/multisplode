
import { Stage } from './stage.js';

export class Game
{
	constructor(width, height, container)
	{
		this.stage = new Stage(width, height, container);
	}

	setup()
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
	}

	setupMessages()
	{
		Messages.setupMessages();
		Prompts.setup();
	}

	setupUi()
	{
		let ui = UI;
		ui.setupProgress();
		ui.setupTouches();
	}

	setupStateEngine()
	{
		StateEngine.setup();
	}

	setupLevelPacks()
	{
		let pack = new RandomLevelPack();
		Levels.addLevelPack(pack);
	}

	setupLevels()
	{
		this.setupLevelPacks();
		/* we want to setup the levels and select primary
		level and show our splash screen */
		Levels.setup();
	}

	/* this will setup the local data system to allow
	the persistant data to be added and updated */
	setupPersistentData()
	{
		/* this will setup the local data system to allow
		the persistant data to be added and updated */
		Data.setup();
	}

	fullscreen = false;

	showFullscreen()
	{
		if(this.fullscreen === false)
		{
			this.fullscreen = true;
			let element = document.body;
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
	}

	/* this will lock the orientation of the device
	so that the orientation will be fixed */
	lockOrientation()
	{
		if(screen)
		{
			let orientation = screen.orientation;
			if(orientation && typeof orientation.lock === 'function')
			{
				try{
					orientation.lock('landscape').then(
						(result) =>
						{

						},

						(err) =>
						{

						}
					);
				}
				catch(e)
				{
					console.log(e);
				}
			}
		}
	}

	music = new Music('sound_fx', 'play-loop.mp3');

	/* this will show the home menu */
	showHomeMenu()
	{
		this.changeState('menu');
	}

	setStageLevelController(controller)
	{
		this.stage.levelController = controller;
	}

	/* this will select the last played level or the
	first unlocked level and start the game */
	startGame()
	{
		//this.showFullscreen();
		Levels.selectPrimaryLevel();
	}

	/* this will play the game */
	play()
	{
		this.changeState('play');
	}

	/* this will pause the game */
	pause()
	{
		this.changeState('pause');
	}

	/* this will retry the current level */
	retryLevel()
	{
		Levels.retryLevel();
	}

	/* this will play the next level */
	nextLevel()
	{
		Levels.selectNextLevel();
	}

	/* this will play the previous level */
	previousLevel()
	{
		Levels.selectPreviousLevel();
	}

	/* this will open and close the level
	select panel */
	toggleLevelSelect()
	{
		this.changeState('level-select');
	}

	/* this will open and close the level
	select panel */
	toggleSettings()
	{
		this.changeState('settings');
	}

	/* thisw will setup the level select options */
	setupLevelSelect()
	{
		Levels.setupLevelSelect();
	}

	/* this will change the state of the game.
	@param (string) state = the state */
	changeState(state)
	{
		StateEngine.change(state);
	}

	/* this will reset the current level. */
	resetCurrentLevel()
	{
		Levels.retryLevel();
	}

	/* this will show the level summary */
	levelSummary()
	{
		let progress = UI.progress;
		if(progress)
		{
			progress.reset();
		}

		this.changeState('level-summary');

		Levels.levelSummary();
	}

	startDraw()
	{
		this.stage.startDraw();
	}

	stopDraw()
	{
		this.stage.stopDraw();
	}

	startStage()
	{
		let stage = this.stage;
		stage.addEvent();
		stage.startDraw();
	}

	stopStage()
	{
		let stage = this.stage;
		stage.removeEvent();
		stage.stopDraw();
	}
}
