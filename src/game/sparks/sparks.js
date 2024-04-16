import { Spark } from './spark.js';

export const Sparks =
{
	sparks: [],
	removed: [],

	maxRadius: 5,
	speed: 10,

	reset()
	{
		this.sparks = [];
		this.removed = [];
	},

	add(tmpX, tmpY, color)
	{
		let group = new Spark(tmpX, tmpY, color);
		let sparks = this.sparks;
		sparks[sparks.length] = group;
	},

	remove(spark)
	{
		let sparksArray = this.sparks,
		index = sparksArray.indexOf(spark);
		if(index > -1)
		{
			sparksArray.splice(index, 1);
			/* we need to add to the removed array to
			delay the gc durring gameplay */
			let removed = this.removed;
			removed[removed.length] = spark;
		}
	},

	updateRadius(group)
	{
		let remove = group.checkToRemove();
		if(remove == false)
		{
			group.radius += group.radiusRate;
		}
		else
		{
			this.remove(group);
		}
	},

	draw(ctx)
	{
		let sparksArray = this.sparks;
		for(let i = sparksArray.length - 1; i >= 0; i--)
		{
			let group = sparksArray[i];
			if(group)
			{
				group.draw(ctx);
				this.updateRadius(group);
			}
		}
	}
};