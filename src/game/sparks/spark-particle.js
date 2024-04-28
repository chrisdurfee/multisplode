import { Cache } from '../cache.js';
import { ARC, MathUtil } from '../math-util.js';

/**
 * @type {number} MIN_SIZE
 */
const MIN_SIZE = 0.001;

/**
 * SParkParticle
 *
 * This class will create a new instance of the spark particle.
 *
 * @class
 */
export class SparkParticle
{
	/**
	 * This will create a new instance of the spark particle.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} angle
	 * @param {string} color
	 * @param {number} maxRadius
	 * @param {number} speed
	 */
	constructor(x, y, angle, color, maxRadius, speed)
	{
		this.position = { x: x, y: y};
		this.angle = angle;
		this.size = MathUtil.randomFromTo(4, 10);
		this.maxSize = this.size;
		this.fillColor = color;
		this.stroke = color;
		this.type = '';
		this.speed = MathUtil.randomFromTo( 1, 5);
		this.cachePath();
	}

	/**
	 * This will update the position of the spark particle.
	 *
	 * @returns {void}
	 */
	updatePosition()
	{
		const position = MathUtil.getPositionByAngle(this.angle, this.speed);
		const currentPosition = this.position;
		currentPosition.x += position.x;
		currentPosition.y += position.y;

		this.updateSize();
	}

	/**
	 * This will update the size of the spark particle.
	 *
	 * @returns {void}
	 */
	updateSize()
	{
		this.size -= .5;
	}

	/**
	 * This will cache the path of the spark particle.
	 *
	 * @returns {void}
	 */
	cachePath()
	{
		const size = this.totalSize = (this.size * 2);
		this.half = this.totalSize / 2;

		/**
		 * This will draw the spark particle.
		 *
		 * @param {object} ctx
		 */
		const callBack = (ctx) =>
		{
			const position = size / 2;
			ctx.globalAlpha = 0.7;
			ctx.beginPath();
			ctx.arc(position, position, size, 0, ARC, true);
			ctx.fillStyle = this.fillColor;
			ctx.fill();
			ctx.globalAlpha = 1;
		};
		this.cache = Cache.add(callBack, size, size);
	}

	/**
	 * This will draw the spark particle.
	 *
	 * @param {object} ctx
	 * @returns {boolean}
	 */
	draw(ctx)
	{
		this.updatePosition();

		/* this will block any spark particle that
		is too small to draw */
		if (this.size < MIN_SIZE)
		{
			return false;
		}

		const pos = this.position;
		const scale = this.size / this.maxSize;
		ctx.save();
		ctx.translate(pos.x, pos.y);
		ctx.scale(scale, scale);
		ctx.drawImage(this.cache, -this.half, -this.half);
		ctx.restore();
	}
}