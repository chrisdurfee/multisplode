import { Level } from '../level.js';

/**
 * LevelPack
 *
 * This will create a level pack.
 *
 * @class
 */
export class LevelPack
{
	/**
	 * @type {object|null} controller
	 */
	controller = null;

	/**
	 * This will create a level pack.
	 *
	 * @param {object} game
	 */
	constructor(game)
	{
		this.label = '';
		this.game = game;
	}

	/**
	 * @type {array} levels
	 */
	levels = [
		/*the order of the settings are:

			touchLimit,
			levelMinimum,
			levelAfterTouch,
			quantity,
			waveScale,
			waveMaxSize,
			prompt id,
		*/

		//level 1
		[1,28,40,40,1,65, 'startup-panel', 'first']
	];

	/**
	 * This will setup the levels.
	 *
	 * @returns {array}
	 */
	setupLevels()
	{
		let lastLevelPanelClass = '';

		const gameLevels = [];
		const levels = this.levels;

		for (let i = 0, count = levels.length; i < count; i++)
		{
			let settings = levels[i],
			levelPanelClass = (typeof settings[7] !== 'undefined')? settings[7] : lastLevelPanelClass;

			if (levelPanelClass !== lastLevelPanelClass)
			{
				lastLevelPanelClass = levelPanelClass;
			}

			gameLevels.push(this.createLevel(i + 1, settings, levelPanelClass));
		}
		return gameLevels;
	}

	/**
	 * This will create a level.
	 *
	 * @param {number} number
	 * @param {array} settings
	 * @param {string} levelPanelClass
	 * @returns {object}
	 */
	createLevel(number, settings, levelPanelClass)
	{
		const gameLevel = new Level(number, settings[0], settings[1], settings[2], settings[3], settings[4], settings[5], settings[6], levelPanelClass);
		gameLevel.setup();
		return gameLevel;
	}

	/**
	 * This will change the level.
	 *
	 * @param {object} level
	 * @returns {void}
	 */
	changeLevel(level)
	{
		this.controller.changeLevel(level);
	}

	/**
	 * This will setup the level.
	 *
	 * @param {number} level
	 * @param {boolean} cancelPrompts
	 * @returns {void}
	 */
	setLevel(level, cancelPrompts)
	{
		this.changeLevel(level);
		this.controller.setLevel(cancelPrompts);
	}

	/**
	 * This will get the summary.
	 *
	 * @returns {void}
	 */
	levelSummary()
	{
		this.controller.getSummary();
	}
}