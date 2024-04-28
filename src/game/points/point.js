import { Cache } from '../cache.js';
import { MathUtil } from '../math-util.js';

/**
 * @type {object} PointCache
 */
const PointCache = {};

/**
 * This will create a position object.
 *
 * @param {number} x
 * @param {number} y
 * @returns {object}
 */
const Position = (x, y) => ({ x, y });

/**
 * @type {number} LastNumber
 */
let LastNumber = 0;

/**
 * Point
 *
 * This class will create a new instance of the point.
 *
 * @class
 */
export class Point
{
	/**
	 * This will create a new instance of the point.
	 *
	 * @param {number} tmpX
	 * @param {number} tmpY
	 * @param {number} value
	 */
	constructor(tmpX, tmpY, value)
	{
		this.number = (++LastNumber);
		this.id = this.number;

		this.position = Position(tmpX, tmpY);
		this.size = 20;

		this.fillColor = '#FFFFFF';
		this.opacity = 1;
		this.text = '+' + value;
		this.value = value;
		this.distance = 0;
		this.maxDistance = 3;

		this.speed = .06;

		this.cachePath();
	}

	/**
	 * This will move the point.
	 *
	 * @returns {void}
	 */
	move()
	{
		this.distance += this.speed;
		this.position.y -= (this.distance);
	}

	/**
	 * This will change the alpha.
	 *
	 * @returns {void}
	 */
	changeAlpha()
	{
		this.opacity -= 0.05;
	}

	/**
	 * This will cache the path.
	 *
	 * @returns {void}
	 */
	cachePath()
	{
		if (PointCache[this.value])
		{
			this.cache = PointCache[this.value];
			return;
		}

		const height = 40;
		const width = 60;

		const callBack = (ctx) =>
		{
			ctx.font = this.size + "px titillium";
			ctx.fillStyle = this.fillColor;
			ctx.fillText(this.text, width / 2, height / 2);
		};
		this.cache = PointCache[this.value] = Cache.add(callBack, width, height);
	}

	/**
	 * This will draw the point.
	 *
	 * @param {object} ctx
	 */
	draw(ctx)
	{
		const x = MathUtil.round(this.position.x),
		y = MathUtil.round(this.position.y);

		const opacity = 1 - this.distance / this.maxDistance;
		ctx.save();
		ctx.globalAlpha = opacity;
		ctx.drawImage(this.cache, x, y);
		ctx.restore();
	}
}