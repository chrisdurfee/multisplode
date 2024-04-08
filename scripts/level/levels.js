"use strict";

/*
	levels

	this is the level controller for all levels. this will
	setup and load all levels and settings. this will store
	the level options and the current selectedlevel
*/
var Levels =
{
	/* this will store the current level and the
	levels options */
	currentLevel: null,
	activeLevels: [],
	controller: null,

	packs: [],
	activePack: null,

	setupActivePack: function()
	{
		var pack;
		var packs = this.packs;
		for(var i = 0, length = packs.length; i < length; i++)
		{
			pack = packs[i];
			if(i === 0)
			{
				this.activePack = pack;
				this.activeLevels = pack.setupLevels();
			}
		}
	},

	addLevelPack: function(pack)
	{
		this.packs.push(pack);
	},

	/* this will setup each of the levels */
	setup: function()
	{
		this.setupActivePack();
	},

	/* this will select the last played level
	or first unlocked level */
	selectPrimaryLevel: function()
	{
		var level = this.getPrimaryLevel();
		this.selectLevel(level);
	},

	getPrimaryLevel: function()
	{
		var lastPlayed = Data.get('lastLevel');
		if(lastPlayed)
		{
			return this.activeLevels[lastPlayed.number - 1];
		}
		return this.getFirstUnlockedLevels();
	},

	/* this will get the first unlocked level
	@return (object) the level */
	getFirstUnlockedLevels: function()
	{
		var activeLevels = this.activeLevels,
		previousLevel = false;
		for(var i = 0, count = activeLevels.length; i < count; i++)
		{
			var tmpLevel = activeLevels[i];
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

	/* this will setup the level select options. */
	setupLevelSelect: function()
	{
		var container = document.getElementById('level_select_panel'),
		self = this;

		var createLevelButton = function(levelObj)
		{
			var obj = document.createElement('div');
			obj.innerHTML = '<div class="content">' + levelObj.number + '</div>';
			var classList = (levelObj.locked === false)? ' unlocked' : '';
			if(levelObj === currentLevel)
			{
				classList += ' selected';
			}
			obj.className = 'bttn option circle fadeIn' + classList;
			if(levelObj.locked === false)
			{
				obj.onclick = function()
				{
					self.selectLevel(levelObj);
				};
			}
			return obj;
		};

		container.innerHTML = '';
		var levelArray = this.activeLevels,
		currentLevel = this.getPrimaryLevel();

		var updateLevels = function()
		{
			/* we want to add all the new elements to a
			document fragment then add the fragment to
			the container */
			var frag = document.createDocumentFragment();

			for(var i = 0, maxLength = levelArray.length; i < maxLength; i++)
			{
				var obj = createLevelButton(levelArray[i]);
				frag.appendChild(obj);
			}

			container.appendChild(frag);
			container.style.display = 'flex';
		};
		window.setTimeout(updateLevels, 350);
	},

	getLevelByNumber: function(levelNumber)
	{
		var activeLevels = this.activeLevels;
		for(var i = 0, count = activeLevels.length; i < count; i++)
		{
			var tmpLevel = activeLevels[i];
			if(levelNumber === tmpLevel.level)
			{
				return tmpLevel;
			}
		}
		return false;
	},

	selectLevel: function(level, cancelPrompts)
	{
		if(level)
		{
			this.setupPreviousLevel();

			var activePack = this.activePack;

			game.setStageLevelController(activePack.controller);

			/* we want to select the level and reset the
			level object to setup the scoring */
			this.currentLevel = level;
			activePack.setupLevel(level, cancelPrompts);
			game.play();
		}
	},

	setupPreviousLevel: function()
	{
		if(this.currentLevel && this.lastSelectedLevel !== this.currentLevel)
		{
			this.lastSelectedLevel = this.currentLevel;
		}
	},

	unlockNextLevel: function()
	{
		var nextLevel = this.getNextLevel();
		if(nextLevel)
		{
			nextLevel.unlock();
		}
	},

	isNextLevelLocked: function()
	{
		var nextLevel = this.getNextLevel();
		if(nextLevel)
		{
			return nextLevel.locked;
		}
		return true;
	},

	retryLevel: function()
	{
		if(this.currentLevel)
		{
			this.selectLevel(this.currentLevel, true);
		}
	},

	getNextLevel: function()
	{
		var activeLevels = this.activeLevels,
		index = (this.currentLevel)? activeLevels.indexOf(this.currentLevel) : 0;
		var nextLevelIndex = (index < activeLevels.length - 1)? ++index : 0;
		return activeLevels[nextLevelIndex];
	},

	selectNextLevel: function()
	{
		var nextLevel = this.getNextLevel();
		if(nextLevel)
		{
			this.selectLevel(nextLevel);
		}
	},

	levelSummary: function()
	{
		this.activePack.levelSummary();
	},

	getPreviousLevel: function()
	{
		var activeLevels = this.activeLevels,
		index = (this.currentLevel)? activeLevels.indexOf(this.currentLevel) : 0;
		var previousLevelIndex = (index > 0)? --index : activeLevels.length - 1;
		return activeLevels[previousLevelIndex];
	},

	selectPreviousLevel: function()
	{
		var previousLevel = this.getPreviousLevel();
		if(previousLevel)
		{
			this.selectLevel(previousLevel);
		}
	}
};