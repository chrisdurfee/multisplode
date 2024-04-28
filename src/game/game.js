import { Prompts } from '../components/prompts/prompts.js';
import { Levels } from './level/levels.js';
import { RandomLevelPack } from './level/packs/random/random-level-pack.js';
import { Settings } from './settings.js';
import { Stage } from './stage.js';

export class Game
{
	/**
	 * This will set up the stage.
	 *
	 * @param {number} width
	 * @param {number} height
	 * @param {object} app
	 */
	constructor(width, height, app)
	{
		this.stage = new Stage(width, height, this);
		this.app = app;

		Levels.setGame(this);
		Prompts.setGame(this);
		Prompts.setup();
	}

	/**
	 * This will get the current level.
	 *
	 * @returns {object|null}
	 */
	getCurrentLevel()
	{
		return Levels.currentLevel;
	}

	/**
	 * This will set up the canvas.
	 *
	 * @param {object} canvas
	 */
	setCanvas(canvas)
	{
		this.stage.setCanvas(canvas);
	}

	/**
	 * This will set up the game.
	 *
	 * @returns {void}
	 */
	setup()
	{
		/* we want to setup the levels and select primary
		level and show our splash screen */
		this.setupLevels();
		Levels.selectPrimaryLevel();
	}

	/**
	 * This will set up the stage.
	 *
	 * @returns {void}
	 */
	setupStage()
	{
		this.stage.setup();
	}

	/**
	 * This will set up the level packs.
	 */
	setupLevelPacks()
	{
		const LevelPacks = [
			new RandomLevelPack(this)
		];

		LevelPacks.forEach((pack) => {
			Levels.addLevelPack(pack);
		});
	}

	/**
	 * This will change the stage level controller.
	 *
	 * @param {object} controller
	 */
	setStageLevelController(controller)
	{
		this.stage.levelController = controller;
	}

	/**
	 * This will setup the levels.
	 */
	setupLevels()
	{
		this.setupLevelPacks();
		/* we want to setup the levels and select primary
		level and show our splash screen */
		Levels.setup();
	}

	/**
	 * This will start the game.
	 *
	 * @returns {void}
	 */
	startGame()
	{
		this.app.navigate('/play');
	}

	/**
	 * This will start the game.
	 *
	 * @returns {void}
	 */
	play()
	{
		this.startStage();
		Settings.song = 'play-loop.mp3';
	}

	/**
	 * This will pause the game.
	 *
	 * @returns {void}
	 */
	pause()
	{
		this.stopStage();
	}

	/**
	 * This will retry the level.
	 *
	 * @returns {void}
	 */
	retryLevel()
	{
		Levels.retryLevel();
		this.app.navigate('/play');
	}

	/**
	 * This will select the newxt level.
	 *
	 * @returns {void}
	 */
	nextLevel()
	{
		Levels.selectNextLevel();
	}

	/**
	 * This will select the previous level.
	 *
	 * @returns {void}
	 */
	previousLevel()
	{
		Levels.selectPreviousLevel();
	}

	/**
	 * This will reset the current level.
	 *
	 * @returns {void}
	 */
	resetCurrentLevel()
	{
		Levels.retryLevel();
	}

	/**
	 * This will navigate to the level summary.
	 */
	levelSummary()
	{
		this.stopStage();
		Settings.song = 'summary-slow-loop.mp3';

		this.app.navigate('/play/level-summary');
	}

	/**
	 * This will start drawing the stage.
	 *
	 * @returns {void}
	 */
	startDraw()
	{
		this.stage.startDraw();
	}

	/**
	 * This will stop drawing the stage.
	 *
	 * @returns {void}
	 */
	stopDraw()
	{
		this.stage.stopDraw();
	}

	/**
	 * This will start the stage.
	 *
	 * @returns {void}
	 */
	startStage()
	{
		const stage = this.stage;
		stage.addEvent();
		stage.startDraw();
	}

	/**
	 * This will stop the stage.
	 *
	 * @returns {void}
	 */
	stopStage()
	{
		const stage = this.stage;
		stage.removeEvent();
		stage.stopDraw();
	}
}
