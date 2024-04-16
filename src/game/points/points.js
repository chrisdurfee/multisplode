import { Point } from './point.js';

export const Points =
{
	gamePoints: [],
	removed: [],
	cache: {},

	reset()
	{
		this.gamePoints = [];
		this.removed = [];
	},

	getAll()
	{
		return this.gamePoints;
	},

	add(tmpX, tmpY, value)
	{
		let pointObj = new Point(tmpX, tmpY, value);
		this.gamePoints[this.gamePoints.length] = pointObj;
		return pointObj;
	},

	remove(point)
	{
		let gamePoints = this.gamePoints,
		index = gamePoints.indexOf(point);
		if(index > -1)
		{
			gamePoints.splice(index, 1);
			/* we need to add to the removed array to
			delay the gc durring gameplay */
			this.removed[this.removed.length] = point;
		}
	},

	draw(ctx)
	{
		ctx.beginPath();
		let gamePoints = this.gamePoints;
		for(let i = (gamePoints.length - 1); i >= 0; i--)
		{
			let pointText = gamePoints[i];
			if(math.round(pointText.distance) >= pointText.maxDistance)
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