import { Spark } from './spark.js';

/**
 * Sparks
 *
 * This class will create a new instance of the sparks.
 */
export const Sparks =
{
	sparks: [],
	removed: [],

	maxRadius: 5,
	speed: 10,

	/**
	 * This will reset the sparks.
	 *
	 * @returns {void}
	 */
	reset()
	{
		this.sparks = [];
		this.removed = [];
	},

	/**
	 * This will add a new spark.
	 *
	 * @param {number} tmpX
	 * @param {number} tmpY
	 * @param {string} color
	 * @returns {void}
	 */
	add(tmpX, tmpY, color)
	{
		const group = new Spark(tmpX, tmpY, color);
		this.sparks.push(group);
	},

	/**
	 * This will remove the spark.
	 *
	 * @param {object} spark
	 */
	remove(spark)
	{
		const sparksArray = this.sparks,
		index = sparksArray.indexOf(spark);
		if (index > -1)
		{
			sparksArray.splice(index, 1);
			/* we need to add to the removed array to
			delay the gc durring gameplay */
			let removed = this.removed;
			removed[removed.length] = spark;
		}
	},

	/**
	 * This will update the radius of the spark.
	 *
	 * @param {object} group
	 */
	updateRadius(group)
	{
		const remove = group.checkToRemove();
		if (remove == false)
		{
			group.radius += group.radiusRate;
		}
		else
		{
			this.remove(group);
		}
	},

	/**
	 * This will draw the sparks.
	 *
	 * @param {object} ctx
	 */
	draw(ctx)
	{
		const sparksArray = this.sparks;
		for (let i = sparksArray.length - 1; i >= 0; i--)
		{
			let group = sparksArray[i];
			if (group)
			{
				group.draw(ctx);
				this.updateRadius(group);
			}
		}
	}
};