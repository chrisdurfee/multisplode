import { Data } from '../../components/data.js';

/**
 * Levels
 *
 * This will manage the levels.
 *
 * @type {object} Levels
 */
export const Levels =
{
	currentLevel: null,
	activeLevels: [],
	controller: null,

	packs: [],
	activePack: null,

	/**
	 * @member {object|null} game
	 */
	game: null,

	/**
	 * This will set the game.
	 *
	 * @param {object} game
	 */
	setGame(game)
	{
		this.game = game;
	},

	/**
	 * This will setup the active pack.
	 *
	 * @returns {void}
	 */
	setupActivePack()
	{
		if (this.packs.length > 0)
		{
			this.activePack = this.packs[0];
			this.activeLevels = this.activePack.setupLevels();
		}
	},

	/**
	 * This will add a level pack.
	 *
	 * @param {object} pack
	 * @returns {void}
	 */
	addLevelPack(pack)
	{
		this.packs.push(pack);
	},

	/**
	 * This will setup the level packs.
	 *
	 * @returns {void}
	 */
	setup()
	{
		this.setupActivePack();
	},

	/**
	 * This will select the primary level.
	 *
	 * @returns {void}
	 */
	selectPrimaryLevel()
	{
		const level = this.getPrimaryLevel();
		this.setLevel(level);
	},

	/**
	 * This will get the primary level.
	 *
	 * @returns {object}
	 */
	getPrimaryLevel()
	{
		const lastPlayed = Data.get('lastLevel');
		if (lastPlayed)
		{
			return this.activeLevels[lastPlayed.number - 1];
		}
		return this.getFirstUnlockedLevels();
	},

	/**
	 * This will get the first unlocked levels.
	 *
	 * @returns {object}
	 */
	getFirstUnlockedLevels()
	{
		const activeLevels = this.activeLevels;
		let previousLevel = false;
		for (let i = 0, count = activeLevels.length; i < count; i++)
		{
			let tmpLevel = activeLevels[i];
			if (tmpLevel.locked === true)
			{
				if (previousLevel)
				{
					return previousLevel;
				}
			}
			else if (i === (count - 1))
			{
				return tmpLevel;
			}
			previousLevel = tmpLevel;
		}
		return activeLevels[0];
	},

	/**
	 * This will get the level by number.
	 *
	 * @param {number} levelNumber
	 * @returns {object|boolean}
	 */
	getLevelByNumber(levelNumber)
	{
		const activeLevels = this.activeLevels;
		for (let i = 0, count = activeLevels.length; i < count; i++)
		{
			let tmpLevel = activeLevels[i];
			if (levelNumber === tmpLevel.level)
			{
				return tmpLevel;
			}
		}
		return false;
	},

	/**
	 * This will select the level.
	 *
	 * @param {object} level
	 * @param {boolean} cancelPrompts
	 * @returns {void}
	 */
	selectLevel(level, cancelPrompts)
	{
		if (!level)
		{
			return;
		}

		this.setPreviousLevel();

		this.setLevel(level, cancelPrompts);
	},

	/**
	 * This will set the level.
	 *
	 * @param {object} level
	 */
	setLevel(level, cancelPrompts)
	{
		const activePack = this.activePack;
		this.game.setStageLevelController(activePack.controller);

		/* we want to select the level and reset the
		level object to setup the scoring */
		this.currentLevel = level;
		activePack.setLevel(level, cancelPrompts);
	},

	/**
	 * This will setup the previous level.
	 */
	setPreviousLevel()
	{
		if (this.currentLevel && this.lastSelectedLevel !== this.currentLevel)
		{
			this.lastSelectedLevel = this.currentLevel;
		}
	},

	/**
	 * This will unlock the next level.
	 */
	unlockNextLevel()
	{
		const nextLevel = this.getNextLevel();
		if (nextLevel)
		{
			nextLevel.unlock();
		}
	},

	/**
	 * This will check if the next level is locked.
	 *
	 * @returns {boolean}
	 */
	isNextLevelLocked()
	{
		const nextLevel = this.getNextLevel();
		if (nextLevel)
		{
			return nextLevel.locked;
		}
		return true;
	},

	/**
	 * This will retry the level.
	 */
	retryLevel()
	{
		if(this.currentLevel)
		{
			this.selectLevel(this.currentLevel, true);
		}
	},

	/**
	 * This will get the next level.
	 *
	 * @returns {object}
	 */
	getNextLevel()
	{
		const activeLevels = this.activeLevels;
		let index = (this.currentLevel)? activeLevels.indexOf(this.currentLevel) : 0;
		const nextLevelIndex = (index < activeLevels.length - 1)? ++index : 0;
		return activeLevels[nextLevelIndex];
	},

	/**
	 * This will select the next level.
	 */
	selectNextLevel()
	{
		const nextLevel = this.getNextLevel();
		if (nextLevel)
		{
			this.selectLevel(nextLevel);
		}
	},

	/**
	 * This will get the previous level.
	 *
	 * @returns {object}
	 */
	levelSummary()
	{
		this.activePack.levelSummary();
	},

	/**
	 * This will get the previous level.
	 *
	 * @returns {object}
	 */
	getPreviousLevel()
	{
		const activeLevels = this.activeLevels;
		let index = (this.currentLevel)? activeLevels.indexOf(this.currentLevel) : 0;
		const previousLevelIndex = (index > 0)? --index : activeLevels.length - 1;
		return activeLevels[previousLevelIndex];
	},

	/**
	 * This will select the previous level.
	 *
	 * @returns {void}
	 */
	selectPreviousLevel()
	{
		const previousLevel = this.getPreviousLevel();
		if(previousLevel)
		{
			this.selectLevel(previousLevel);
		}
	}
};