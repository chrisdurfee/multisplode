export class SparkParticle
{
	constructor(x, y, angle, color, maxRadius, speed)
	{
		this.position = { x: x, y: y};
		this.angle = angle;
		this.size = math.randomFromTo(4, 10);
		this.maxSize = this.size;
		this.fillColor = color;
		this.stroke = color;
		this.type = '';
		this.speed = math.randomFromTo( 1, 5);
		this.cachePath();
	}

	updatePosition()
	{
		let position = math.getPositionByAngle(this.angle, this.speed);
		let currentPosition = this.position;
		currentPosition.x += position.x;
		currentPosition.y += position.y;

		this.updateSize();
	}

	updateSize()
	{
		this.size -= .5;
	}

	cachePath()
	{
		let self = this;
		let size = this.totalSize = (this.size * 2);
		this.half = this.totalSize / 2;

		const callBack = (ctx) =>
		{
			let position = size / 2;
			ctx.globalAlpha = 0.7;
			ctx.beginPath();
			ctx.arc(position, position, size, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();
			ctx.globalAlpha = 1;
		};
		this.cache = Cache.add(callBack, size, size);
	}

	arc = (Math.PI * 2);

	draw(ctx)
	{
		this.updatePosition();

		/* this will block any spark particle that
		is too small to draw */
		if(this.size < 0.001)
		{
			return false;
		}

		let pos = this.position;
		let scale = this.size / this.maxSize;
		ctx.save();
		ctx.translate(pos.x, pos.y);
		ctx.scale(scale, scale);
		ctx.drawImage(this.cache, -this.half, -this.half);
		ctx.restore();
	}
}