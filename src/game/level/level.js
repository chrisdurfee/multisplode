import { Data, Objects } from "@base-framework/base";

/**
 * Level
 *
 * This will create a level.
 *
 * @class
 */
export class Level
{
	/**
	 *
	 * @param {number} number
	 * @param {*} devices
	 * @param {number} minimumNumber
	 * @param {number} afterTouchNumber
	 * @param {number} quantity
	 * @param {number} waveScale
	 * @param {number} waveMaxSize
	 * @param {string} promptId
	 * @param {string} levelClass
	 */
	constructor(number, devices, minimumNumber, afterTouchNumber, quantity, waveScale, waveMaxSize, promptId, levelClass)
	{
		this.number = number;
		this.touch = 0;
		this.touchLimit = 0;

		this.devices = [];
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
	}

	/**
	 * Thi swill setup the level.
	 */
	setup()
	{
		this.updateFromData();
		this.reset();

		if (this.number === 1)
		{
			this.unlock();
		}
	}

	/**
	 * This will setup the devices.
	 *
	 * @param {*} devices
	 */
	setupDevices(devices)
	{
		if (typeof devices !== 'object')
		{
			this.devices = {'ShockWave': devices };
			this.touchLimit = devices;
			return;
		}

		this.touchLimit = 0;
		for (let i = 0, count = devices.length; i < count; i++)
		{
			let device = devices[i];
			let type = 'ShockWave';
			switch (i)
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

	/**
	 * This will setup the particle count.
	 *
	 * @param {number} quantity
	 */
	setupParticleCount(quantity)
	{
		if (typeof quantity !== 'object')
		{
			this.quantity = quantity;
			return;
		}

		this.particles = quantity;
		let totalCount = 0;
		for (let type in quantity)
		{
			if (Objects.hasOwnProp(quantity, type))
			{
				totalCount += quantity[type];
			}
		}
		this.quantity = totalCount;
	}

	/**
	 * This will reset the level.
	 *
	 * @returns {void}
	 */
	reset()
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
	}

	/**
	 * This will update the touch.
	 *
	 * @returns {void}
	 */
	updateTouch()
	{
		this.touch++;
		let option = UI.updateTouchUi();
		this.isAtTouchLimit();
		return option;
	}

	/**
	 * @memeber {boolean} blowEm
	 */
	isAtLimit = false;

	/**
	 * This will check if the touch is at the limit.
	 *
	 * @return {void}
	 */
	isAtTouchLimit()
	{
		if (this.touch === this.touchLimit)
		{
			this.isAtLimit = true;
		}
	}

	/**
	 * This will update the high score.
	 *
	 * @param {number} number
	 * @param {number} points
	 */
	updateHighScore(number, points)
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
	}

	/**
	 * This will update the score.
	 *
	 * @param {number} number
	 * @param {number} points
	 */
	updateScore(number, points)
	{
		this.updatePoints(points);
		this.updateNumber(number);

		this.updateUiByTimer();
	}

	timerUi = null;
	timerUiDelay = 150;

	updateUiByTimer()
	{
		if(this.timerUi === null)
		{
			let self = this;
			this.timerUi = window.setTimeout(function()
			{
				self.updateMinimumUi();
				self.updatePlayUi();
				self.timerUi = null;
			}, this.timerUiDelay);
		}
	}

	currentNumber = 0;

	updateMinimumUi()
	{
		let remaining = (this.minimum - this.scoreNumber);
		if(remaining !== this.currentNumber)
		{
			this.currentNumber = remaining;
			remaining = (remaining > 0)? remaining : 0;
			UI.updateLevelMin(remaining);
		}
	}

	updatePoints(points)
	{
		this.scorePoints += points;
	}

	updateNumber(number)
	{
		this.scoreNumber += number;
	}

	updatePlayUi()
	{
		UI.updatePlayUi(this);
	}

	updateBestTime(time)
	{
		this.bestTime = time;
		this.saveToData();
	}

	dataLabel = 'level-';

	updateFromData()
	{
		let levelData = Data.get(this.dataLabel + this.number);
		if(levelData)
		{
			this.locked = levelData.locked;
			this.highScorePoints = levelData.highScorePoints;
			this.highScoreNumber = levelData.highScoreNumber;

			this.bestTime = levelData.bestTime;
		}
	}

	saveToData()
	{
		let levelData =
		{
			locked: this.locked,
			highScorePoints: this.highScorePoints,
			highScoreNumber: this.highScoreNumber
		};
		Data.set(this.dataLabel + this.number, levelData);
	}

	unlock()
	{
		if(this.locked === true)
		{
			this.locked = false;
			this.saveToData();
		}
	}
}