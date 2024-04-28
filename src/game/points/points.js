import { MathUtil } from '../math-util.js';
import { Point } from './point.js';

/**
 * Points
 *
 * This class will create a new instance of the points.
 */
export const Points =
{
	gamePoints: [],
	removed: [],

	/**
	 * This will reset the points.
	 *
	 * @returns {void}
	 */
	reset()
	{
		this.gamePoints = [];
		this.removed = [];
	},

	/**
	 * This will get all the points.
	 *
	 * @returns {array}
	 */
	getAll()
	{
		return this.gamePoints;
	},

	/**
	 * This will add a new point.
	 *
	 * @param {number} tmpX
	 * @param {number} tmpY
	 * @param {number} value
	 * @returns {object}
	 */
	add(tmpX, tmpY, value)
	{
		const pointObj = new Point(tmpX, tmpY, value);
		this.gamePoints.push(pointObj);
		return pointObj;
	},

	/**
	 * This will remove the point.
	 *
	 * @param {object} point
	 */
	remove(point)
	{
		const gamePoints = this.gamePoints,
		index = gamePoints.indexOf(point);
		if (index > -1)
		{
			gamePoints.splice(index, 1);
			/* we need to add to the removed array to
			delay the gc durring gameplay */
			this.removed[this.removed.length] = point;
		}
	},

	/**
	 * This will draw the points.
	 *
	 * @param {object} ctx
	 */
	draw(ctx)
	{
		ctx.beginPath();

		const gamePoints = this.gamePoints;
		for (let i = (gamePoints.length - 1); i >= 0; i--)
		{
			let pointText = gamePoints[i];
			if (MathUtil.round(pointText.distance) >= pointText.maxDistance)
			{
				//remove object from points array
				this.remove(pointText);
			}
			else
			{
				pointText.move();
				pointText.draw(ctx);
			}
		}
		//ctx.globalAlpha = 0;
		ctx.closePath();
	}
};