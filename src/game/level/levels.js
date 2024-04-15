
export const Levels =
{
	/* this will store the current level and the
	levels options */
	currentLevel: null,
	activeLevels: [],
	controller: null,

	packs: [],
	activePack: null,

	setupActivePack()
	{
		if (this.packs.length > 0)
		{
			this.activePack = this.packs[0];
			this.activeLevels = this.activePack.setupLevels();
		}
	},

	addLevelPack(pack)
	{
		this.packs.push(pack);
	},

	/* this will setup each of the levels */
	setup()
	{
		this.setupActivePack();
	},

	/* this will select the last played level
	or first unlocked level */
	selectPrimaryLevel()
	{
		let level = this.getPrimaryLevel();
		this.selectLevel(level);
	},

	getPrimaryLevel()
	{
		let lastPlayed = Data.get('lastLevel');
		if(lastPlayed)
		{
			return this.activeLevels[lastPlayed.number - 1];
		}
		return this.getFirstUnlockedLevels();
	},

	/* this will get the first unlocked level
	@returns (object) the level */
	getFirstUnlockedLevels()
	{
		let activeLevels = this.activeLevels,
		previousLevel = false;
		for(let i = 0, count = activeLevels.length; i < count; i++)
		{
			let tmpLevel = activeLevels[i];
			if(tmpLevel.locked === true)
			{
				if(previousLevel)
				{
					return previousLevel;
				}
			}
			else if(i === (count - 1))
			{
				return tmpLevel;
			}
			previousLevel = tmpLevel;
		}
		return activeLevels[0];
	},

	getLevelByNumber(levelNumber)
	{
		let activeLevels = this.activeLevels;
		for(let i = 0, count = activeLevels.length; i < count; i++)
		{
			let tmpLevel = activeLevels[i];
			if(levelNumber === tmpLevel.level)
			{
				return tmpLevel;
			}
		}
		return false;
	},

	selectLevel(level, cancelPrompts)
	{
		if(level)
		{
			this.setupPreviousLevel();

			let activePack = this.activePack;

			game.setStageLevelController(activePack.controller);

			/* we want to select the level and reset the
			level object to setup the scoring */
			this.currentLevel = level;
			activePack.setupLevel(level, cancelPrompts);
			game.play();
		}
	},

	setupPreviousLevel()
	{
		if(this.currentLevel && this.lastSelectedLevel !== this.currentLevel)
		{
			this.lastSelectedLevel = this.currentLevel;
		}
	},

	unlockNextLevel()
	{
		let nextLevel = this.getNextLevel();
		if(nextLevel)
		{
			nextLevel.unlock();
		}
	},

	isNextLevelLocked()
	{
		let nextLevel = this.getNextLevel();
		if(nextLevel)
		{
			return nextLevel.locked;
		}
		return true;
	},

	retryLevel()
	{
		if(this.currentLevel)
		{
			this.selectLevel(this.currentLevel, true);
		}
	},

	getNextLevel()
	{
		let activeLevels = this.activeLevels,
		index = (this.currentLevel)? activeLevels.indexOf(this.currentLevel) : 0;
		let nextLevelIndex = (index < activeLevels.length - 1)? ++index : 0;
		return activeLevels[nextLevelIndex];
	},

	selectNextLevel()
	{
		let nextLevel = this.getNextLevel();
		if(nextLevel)
		{
			this.selectLevel(nextLevel);
		}
	},

	levelSummary()
	{
		this.activePack.levelSummary();
	},

	getPreviousLevel()
	{
		let activeLevels = this.activeLevels,
		index = (this.currentLevel)? activeLevels.indexOf(this.currentLevel) : 0;
		let previousLevelIndex = (index > 0)? --index : activeLevels.length - 1;
		return activeLevels[previousLevelIndex];
	},

	selectPreviousLevel()
	{
		let previousLevel = this.getPreviousLevel();
		if(previousLevel)
		{
			this.selectLevel(previousLevel);
		}
	}
};