import { Cache } from '../cache.js';

export class Point
{
	constructor(tmpX, tmpY, value)
	{
		this.number = (typeof Point.number === 'undefined')? Point.number = 0 : (++Point.number);
		this.id = this.number;

		this.position = { x: tmpX, y: tmpY };
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

	move()
	{
		this.distance += this.speed;
		this.position.y -= (this.distance);
	}

	changeAlpha()
	{
		this.opacity -= 0.05;
	}

	cachePath()
	{
		if(!Points.cache[this.value])
		{
			let self = this;
			let height = 40;
			let width = 60;

			const callBack = (ctx) =>
			{
				ctx.font = self.size + "px titillium";
				ctx.fillStyle = self.fillColor;
				ctx.fillText(self.text, width / 2, height / 2);
			};
			this.cache = Points.cache[this.value] = Cache.add(callBack, width, height);
		}
		else
		{
			this.cache = Points.cache[this.value];
		}
	}

	draw(ctx)
	{
		let x = MathUtil.round(this.position.x),
		y = MathUtil.round(this.position.y);

		let opacity = 1 - this.distance / this.maxDistance;
		ctx.save();
		ctx.globalAlpha = opacity;
		ctx.drawImage(this.cache, x, y);
		ctx.restore();
	}
}