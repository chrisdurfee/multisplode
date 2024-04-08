"use strict";

/* 
	levels 
	
	this is the level controller for all levels. this will 
	setup and load all levels and settings. this will store 
	the level options and the current selectedlevel 
*/ 
var LevelPack = function(controller)
{ 
	this.label = ''; 
	this.controller = controller; 
}; 

Class.extend(
{
	constructor: LevelPack, 
	
	levels: [ 
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
	], 
	
	setupLevels: function()
	{ 
		var lastLevelPanelClass = ''; 
		
		var gameLevels = []; 
		var levels = this.levels; 
		
		for(var i = 0, count = levels.length; i < count; i++)
		{ 
			var settings = levels[i], 
			levelPanelClass = (typeof settings[7] !== 'undefined')? settings[7] : lastLevelPanelClass; 
			
			if(levelPanelClass !== lastLevelPanelClass) 
			{ 
				lastLevelPanelClass = levelPanelClass; 
			}
			
			gameLevels.push(this.createLevel(i + 1, settings, levelPanelClass)); 
		}
		return gameLevels; 
	}, 
	
	createLevel: function(number, settings, levelPanelClass)
	{ 
		var gameLevel = new Level(number, settings[0], settings[1], settings[2], settings[3], settings[4], settings[5], settings[6], levelPanelClass); 
		gameLevel.setup();
		return gameLevel; 
	}, 
	
	changeLevel: function(level)
	{ 
		this.controller.changeLevel(level); 
	}, 
	
	setupLevel: function(level, cancelPrompts)
	{ 
		this.changeLevel(level); 
		this.controller.setupLevel(cancelPrompts); 
	}, 
	
	levelSummary: function()
	{ 
		this.controller.getSummary(); 
	}
}); 