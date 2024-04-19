
import { Stage } from './stage.js';

export class Game
{
	/**
	 * This will set up the stage.
	 *
	 * @param {number} width
	 * @param {number} height
	 * @param {object} container
	 */
	constructor(width, height, container)
	{
		this.stage = new Stage(width, height, container);
	}

	/**
	 * This will set up the game.
	 *
	 * @returns {void}
	 */
	setup()
	{
		this.stage.setup();

		/* we want to setup the levels and select primary
		level and show our splash screen */
		this.setupLevels();
	}

	setupLevelPacks()
	{
		let pack = new RandomLevelPack();
		Levels.addLevelPack(pack);
	}

	setStageLevelController(controller)
	{
		this.stage.levelController = controller;
	}

	setupLevels()
	{
		this.setupLevelPacks();
		/* we want to setup the levels and select primary
		level and show our splash screen */
		Levels.setup();
	}

	startGame()
	{
		Levels.selectPrimaryLevel();
	}

	play()
	{
		this.changeState('play');
	}

	pause()
	{
		this.changeState('pause');
	}

	retryLevel()
	{
		Levels.retryLevel();
	}

	nextLevel()
	{
		Levels.selectNextLevel();
	}

	previousLevel()
	{
		Levels.selectPreviousLevel();
	}

	resetCurrentLevel()
	{
		Levels.retryLevel();
	}

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
