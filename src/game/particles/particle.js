import { Configs } from "../../configs.js";
import { Cache } from "../cache.js";
import { ARC, MathUtil } from "../math-util.js";

/**
 * This will get a random color.
 *
 * @param {number} limit
 * @returns {string}
 */
const getRandomColor = (limit) =>
{
	limit = (typeof limit !== 'number')? 7 : limit;
	let number = MathUtil.floor(Math.random() * 7);
	let color = '';
	switch(number)
	{
		case 0:
			/* bright red */
			color = '#F9322D';
			break;
		case 1:
			/* pink */
			color = '#FF397F';
			break;
		case 2:
			/* purple */
			color = '#D541B7';
			break;
		case 3:
			/* orange */
			color = '#FF8931';
			break;
		case 4:
			/* yellow */
			color = '#F9F95D';
			break;
		case 5:
			/* aqua */
			color = '#21F8B6';
			break;
		case 6:
			/* cyan */
			color = '#26CFCE';
			break;
		case 7:
			/* blue */
			color = '#3153CB';
			break;
	}
	return color;
};

/**
 * @type {number} lastParticleNumber
 */
let lastParticleNumber = 0;

/**
 * @type {function} fromRandom
 */
const fromRandom = MathUtil.randomFromTo;

/**
 * @type {number} DEFAULT_SPEED
 */
const DEFAULT_SPEED = (1000 / 60);

/**
 * Particle
 *
 * This class will create a new instance of the particle.
 *
 * @class
 */
export class Particle
{
	/**
	 * This will create a new instance of the particle.
	 *
	 * @param {object} customSettings
	 */
	constructor(customSettings)
	{
		this.type = 'particle';
		this.value = 10;
		this.multiplier = 1;

		this.setup(customSettings);
	}

	/**
	 * This will initialize the particle.
	 *
	 * @returns {void}
	 */
	init()
	{
		this.number = (++lastParticleNumber);
		this.id = this.number;
	}

	/**
	 * This will get the default settings.
	 *
	 * @returns {object}
	 */
	getDefaultSettings()
	{
		const gameSize = Configs.size;

		const minSize = 0.005,
		maxSize = 0.008,
		speed = (gameSize.width  * 0.12 / DEFAULT_SPEED),
		size = fromRandom(gameSize.width * minSize, gameSize.width * maxSize),
		fullSize = size * 2;

		return {
			size,

			position:
			{
				x: fromRandom(size + 3, gameSize.width - fullSize - 3),
				y: fromRandom(size + 3, gameSize.height - fullSize - 3)
			},

			fillColor: getRandomColor(),
			stroke: fromRandom( 3, 5),
			direction: fromRandom(-10, 10),
			angle: fromRandom(0, 360),
			speed: fromRandom( speed / 1.8, speed)
		};
	}

	/**
	 * This will setup the particle.
	 *
	 * @param {object} customSettings
	 * @param {boolean} cache
	 * @returns {void}
	 */
	setup(customSettings, cache)
	{
		cache = (cache !== false);

		let settings = this.getDefaultSettings();
		if (customSettings && typeof customSettings === 'object')
		{
			settings = Object.assign(settings, customSettings);
		}

		this.size = settings.size;
		this.fullSize = this.size * 2;
		this.position = settings.position;

		this.fillColor = settings.fillColor;
		this.stroke = settings.stroke;

		this.direction = settings.direction;
		this.speed = settings.speed;
		this.angle = settings.angle;

		if (cache)
		{
			this.cachePath();
		}
	}

	/**
	 * This will move the particle.
	 *
	 * @returns {void}
	 */
	move()
	{
		this.updateByAngle();
	}

	/**
	 * This will update the particle by angle.
	 *
	 * @returns {void}
	 */
	updateByAngle()
	{
		this.updatePosition();
	}

	/**
	 * This will update the position of the particle.
	 *
	 * @returns {void}
	 */
	updateAngle()
	{
		const angle = MathUtil.updateOrbitAngle(this.angle, this.speed);
		this.angle = (angle);
	}

	/**
	 * This will check if the particle has collided with the wall.
	 *
	 * @param {object} size
	 * @returns {void}
	 */
	checkWall(size)
	{
		const position = this.position;
		if (position.x + this.size >= size.width || position.x <= this.size)
		{
			this.angle = 180 - this.angle;
		}

		if(position.y + this.size >= size.height || position.y <= this.size)
		{
			this.angle = 360 - this.angle;
		}
	}

	/**
	 * This will update the position of the particle.
	 *
	 * @returns {void}
	 */
	updatePosition()
	{
		const size = Configs.size;

		const position = MathUtil.getPositionByAngle(this.angle, this.speed);
		const round = MathUtil.round;
		const curPos = this.position;
		curPos.x = round(curPos.x + position.x);
		curPos.y = round(curPos.y + position.y);

		this.checkWall(size);
	}

	/**
	 * This will cache the path of the particle.
	 *
	 * @returns {void}
	 */
	cachePath()
	{
		const size = Math.ceil(this.size * 2);
		const callBack = (ctx) =>
		{
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, this.size, 0, ARC, true);
			ctx.fillStyle = this.fillColor;
			ctx.fill();
		};
		this.cache = Cache.add(callBack, size, size);
	}

	/**
	 * This will check if the particle has collided with the device.
	 *
	 * @param {object} device
	 * @returns {boolean}
	 */
	hasCollided(device)
	{
		const position = this.position;
		let S = position.x - device.position.x,
		D = position.y - device.position.y,
		F = device.size + this.size;
		//return true or false
		return (S * S + D * D <= F * F);
	}

	/**
	 * This will draw the particle.
	 *
	 * @param {object} ctx
	 * @returns {void}
	 */
	draw(ctx)
	{
		ctx.drawImage(this.cache, this.position.x - this.size, this.position.y - this.size);
	}
}