import { Level } from './level.js';

export class LevelPack
{
	constructor(controller)
	{
		this.label = '';
		this.controller = controller;
	}

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

	setupLevels()
	{
		let lastLevelPanelClass = '';

		let gameLevels = [];
		let levels = this.levels;

		for(let i = 0, count = levels.length; i < count; i++)
		{
			let settings = levels[i],
			levelPanelClass = (typeof settings[7] !== 'undefined')? settings[7] : lastLevelPanelClass;

			if(levelPanelClass !== lastLevelPanelClass)
			{
				lastLevelPanelClass = levelPanelClass;
			}

			gameLevels.push(this.createLevel(i + 1, settings, levelPanelClass));
		}
		return gameLevels;
	}

	createLevel(number, settings, levelPanelClass)
	{
		let gameLevel = new Level(number, settings[0], settings[1], settings[2], settings[3], settings[4], settings[5], settings[6], levelPanelClass);
		gameLevel.setup();
		return gameLevel;
	}

	changeLevel(level)
	{
		this.controller.changeLevel(level);
	}

	setupLevel(level, cancelPrompts)
	{
		this.changeLevel(level);
		this.controller.setupLevel(cancelPrompts);
	}

	levelSummary()
	{
		this.controller.getSummary();
	}
}