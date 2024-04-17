import { MathUtil } from '../math-util.js';
import { SparkParticle } from './spark-particle.js';

/**
 * This will get the spark count.
 *
 * @returns {number}
 */
const getSparkCount = () =>
{
	let count = 20;
	switch (Settings.graphics)
	{
		case 'low':
			count = 12;
			break;
		case 'high':
			count = 30;
			break;
	}
	return count;
};

/**
 * Spark
 *
 * This class will create a new instance of the spark.
 *
 * @class
 */
export class Spark
{
	/**
	 * This will create a new instance of the spark.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {string} color
	 */
	constructor(x, y, color)
	{
		this.particleNumber = getSparkCount();

		this.x = x;
		this.y = y;
		this.color = color;

		this.radius = 0;
		this.maxRadius = 30;
		this.speed = 20;

		this.particles = [];
		this.removed = [];
		this.setupParticles();
	}

	/**
	 * This will setup the particles.
	 *
	 * @returns {void}
	 */
	setupParticles()
	{
		const particleNumber = this.particleNumber,
		distance = (360 / particleNumber);

		for (let i = 0; i <= particleNumber; i++)
		{
			/* this will add equal distance between particles */
			let particleAngle = (distance * i);

			/* this will randomly placeparticles */
			//let particleAngle = Math.random() * 360;
			this.addParticle(particleAngle);
		}

		this.radiusRate = (this.maxRadius / this.speed);
	}

	radiusRate = null;

	/**
	 * This will add a particle.
	 *
	 * @param {number} angle
	 */
	addParticle(angle)
	{
		const particle = new SparkParticle(this.x, this.y, angle, this.color, this.maxRadius, this.speed);
		this.particles.push(particle);
	}

	checkToRemove()
	{
		return (this.radius >= this.maxRadius);
	}

	updateRadius()
	{
		let radius = this.radius;
		radius += this.radiusRate;
		radius = MathUtil.round(radius);
	}

	draw(ctx)
	{
		this.updateRadius();

		const particleArray = this.particles;
		for (let i = particleArray.length - 1; i >= 0; i--)
		{
			let part = particleArray[i];
			if (part.draw(ctx) === false)
			{
				particleArray.splice(i, 1);
				let removed = this.removed;
				removed[removed.length] = part;
			}
		}
	}
}