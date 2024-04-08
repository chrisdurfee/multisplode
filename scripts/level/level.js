"use strict";

/*
	level

	this will create a new level object.
	@param (int) levelNumber = the number of the level
	@param (int) devices = the device types and limits
	@param (int) minimumNumber = the minimum number particles
	to destroy to move on
	@param (int) afterTouchNumber = the minimum before the
	after touch is active
	@param (int) quantity = thenumber of particles to create
	@param (int) waveScale = the speed the blast waves grow
	during the level
	@param (int) maxWaveSize = the biggest size a blast wave
	can become during the level
	@param [(bool)] locked = if the level is locked from player
*/
var Level = function(tmpLevel, devices, minimumNumber, afterTouchNumber, quantity, waveScale, waveMaxSize, promptId, levelClass)
{
	this.number = tmpLevel;
	this.touch = 0;

	this.devices = [];
	this.touchLimit = 0;
	this.setupDevices(devices);
	this.minimum = minimumNumber;

	this.scorePoints = 0;
	this.scoreNumber = 0;

	this.afterTouch = afterTouchNumber;
	this.afterTouchReady = 'no';

	this.particles = null;
	this.setupParticleCount(quantity);
	this.waveScale = waveScale;
	this.waveMaxSize = waveMaxSize;

	this.highScorePoints = 0;
	this.highScoreNumber = 0;

	this.promptId = promptId;
	this.levelClass = levelClass;

	this.bestTime = '';

	this.locked = true;
};

Class.extend(
{
	constructor: Level,

	setup: function()
	{
		this.updateFromData();
		this.reset();
		if(this.number === 1)
		{
			this.unlock();
		}
	},

	setupDevices: function(devices)
	{
		if(typeof devices !== 'object')
		{
			this.devices = {'ShockWave': devices };
			this.touchLimit = devices;
		}
		else
		{
			this.touchLimit = 0;
			for(var i = 0, count = devices.length; i < count; i++)
			{
				var device = devices[i];
				var type = 'ShockWave';
				switch(i)
				{
					case 0:
						type = 'ShockWave';
						break;
					case 1:
						type = 'GravityField';
						break;
				}
				this.touchLimit += device;
				this.devices[type] = device;
			}
		}
	},

	setupParticleCount: function(quantity)
	{
		if(typeof quantity === 'object')
		{
			this.particles = quantity;
			var totalCount = 0;
			for(var type in quantity)
			{
				if(quantity.hasOwnProperty(type))
				{
					totalCount += quantity[type];
				}
			}
			this.quantity = totalCount;
		}
		else
		{
			this.quantity = quantity;
		}
	},

	reset: function()
	{
		this.touch = 0;
		this.scoreNumber = 0;
		this.scorePoints = 0;
		this.currentNumber = 0;
		this.afterTouchReady = 'no';

		this.blowEm = false;
		this.startDelay = null;
		this.isAtLimit = false;

		this.delay = this.originalDelay;
	},

	updateTouch: function()
	{
		this.touch++;
		var option = UI.updateTouchUi();
		this.isAtTouchLimit();
		return option;
	},

	isAtLimit: false,

	isAtTouchLimit: function()
	{
		if(this.touch === this.touchLimit)
		{
			this.isAtLimit = true;
		}
	},

	updateHighScore: function(number, points)
	{
		if(number > this.highScoreNumber)
		{
			this.highScoreNumber = number;
		}

		if(points > this.highScorePoints)
		{
			this.highScorePoints = points;
		}
		this.saveToData();
	},

	updateScore: function(number, points)
	{
		this.updatePoints(points);
		this.updateNumber(number);

		this.updateUiByTimer();
	},

	timerUi: null,
	timerUiDelay: 150,

	updateUiByTimer: function()
	{
		if(this.timerUi === null)
		{
			var self = this;
			this.timerUi = window.setTimeout(function()
			{
				self.updateMinimumUi();
				self.updatePlayUi();
				self.timerUi = null;
			}, this.timerUiDelay);
		}
	},

	currentNumber: 0,

	updateMinimumUi: function()
	{
		var remaining = (this.minimum - this.scoreNumber);
		if(remaining !== this.currentNumber)
		{
			this.currentNumber = remaining;
			remaining = (remaining > 0)? remaining : 0;
			UI.updateLevelMin(remaining);
		}
	},

	updatePoints: function(points)
	{
		this.scorePoints += points;
	},

	updateNumber: function(number)
	{
		this.scoreNumber += number;
	},

	updatePlayUi: function()
	{
		UI.updatePlayUi(this);
	},

	updateBestTime: function(time)
	{
		this.bestTime = time;
		this.saveToData();
	},

	dataLabel: 'level-',

	updateFromData: function()
	{
		var levelData = Data.get(this.dataLabel + this.number);
		if(levelData)
		{
			this.locked = levelData.locked;
			this.highScorePoints = levelData.highScorePoints;
			this.highScoreNumber = levelData.highScoreNumber;

			this.bestTime = levelData.bestTime;
		}
	},

	saveToData: function()
	{
		var levelData =
		{
			locked: this.locked,
			highScorePoints: this.highScorePoints,
			highScoreNumber: this.highScoreNumber
		};
		Data.set(this.dataLabel + this.number, levelData);
	},

	unlock: function()
	{
		if(this.locked === true)
		{
			this.locked = false;
			this.saveToData();
		}
	}
});