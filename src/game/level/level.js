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

		this.devices = {};
		this.setupDevices(devices);
		this.minimum = minimumNumber;

		this.afterTouch = afterTouchNumber;
		this.afterTouchReady = 'no';

		this.particles = null;
		this.setupParticleCount(quantity);
		this.waveScale = waveScale;
		this.waveMaxSize = waveMaxSize;

		this.remaining = minimumNumber;
		this.currentNumber = 0;
		this.scoreNumber = 0;
		this.scorePoints = 0;
		this.highScorePoints = 0;
		this.highScoreNumber = 0;

		/**
		 * @type {function} updateTouchCallBack
		 */
		this.updateTouchCallBack = null;

		this.promptId = promptId;
		this.levelClass = levelClass;

		this.bestTime = '';

		this.locked = true;
		this.setData();
	}

	/**
	 * This will set the data.
	 */
	setData()
	{
		this.data = new Data({
			number: this.number,
			locked: this.locked,
			minimum: this.minimum,
			remaining: this.remaining,
			scoreNumber: this.scoreNumber,
			scorePoints: this.scorePoints,
			highScorePoints: this.highScorePoints,
			highScoreNumber: this.highScoreNumber,
			bestTime: this.bestTime,
			devices: this.devices
		});
		this.data.setKey('level-' + this.number);

		this.data.resume();
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
			this.devices = { 'ShockWave': devices };
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

		const option = this.updateTouchCallBack();
		this.isAtTouchLimit();
		return option;
	}

	/**
	 * This will set the update touch callback.
	 *
	 * @param {function} callback
	 * @returns {void}
	 */
	setUpdateTouchCallBack(callback)
	{
		this.updateTouchCallBack = callback;
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
		if (number > this.highScoreNumber)
		{
			this.highScoreNumber = number;
		}

		if (points > this.highScorePoints)
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
		if (this.timerUi === null)
		{
			this.timerUi = window.setTimeout(() =>
			{
				this.updateRemaining();
				this.updatePlayUi();
				this.timerUi = null;
			}, this.timerUiDelay);
		}
	}

	/**
	 * This will update the remaining.
	 */
	updateRemaining()
	{
		let remaining = (this.minimum - this.scoreNumber);
		if (remaining !== this.currentNumber)
		{
			this.currentNumber = remaining;
			remaining = (remaining > 0)? remaining : 0;
			this.data.set('remaining', remaining);
		}
	}

	/**
	 * This will update the points.
	 *
	 * @param {number} points
	 */
	updatePoints(points)
	{
		this.scorePoints += points;
	}

	/**
	 * This will update the number.
	 *
	 * @param {number} number
	 */
	updateNumber(number)
	{
		this.scoreNumber += number;
	}

	updatePlayUi()
	{
		this.data.set({
			scoreNumber: this.scoreNumber,
			scorePoints: this.scorePoints
		});
	}

	/**
	 * This will update the best time.
	 *
	 * @param {string} time
	 */
	updateBestTime(time)
	{
		this.bestTime = time;
		this.data.bestTime = time;
		this.data.store();
	}

	/**
	 * This will update from the data.
	 */
	updateFromData()
	{
		const levelData = this.data;
		if (levelData)
		{
			this.locked = levelData.locked;
			this.highScorePoints = levelData.highScorePoints;
			this.highScoreNumber = levelData.highScoreNumber;
			this.bestTime = levelData.bestTime;
		}
	}

	/**
	 * This will save the data to local storage.
	 */
	saveToData()
	{
		const levelData =
		{
			locked: this.locked,
			highScorePoints: this.highScorePoints,
			highScoreNumber: this.highScoreNumber
		};
		this.data.set(levelData);
		this.data.store();
	}

	/**
	 * This will unlock the level.
	 */
	unlock()
	{
		if (this.locked === true)
		{
			this.locked = false;
			this.saveToData();
		}
	}
}