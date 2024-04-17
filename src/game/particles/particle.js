export class Particle
{
	constructor(customSettings)
	{
		this.type = 'particle';
		this.value = 10;
		this.multiplier = 1;

		this.setup(customSettings);
	}

	init(constructor)
	{
		this.number = (typeof constructor.number === 'undefined')? constructor.number = 0 : (++constructor.number);
		this.id = this.number;
	}

	getDefaultSettings()
	{
		let gameSize = game.stage.size;
		let fromRandom = MathUtil.randomFromTo;

		let minSize = 0.005,
		maxSize = 0.008,
		speed = (gameSize.width  * 0.12 / (1000 / game.stage.fps)),
		size = fromRandom(gameSize.width * minSize, gameSize.width * maxSize),
		fullSize = size * 2;

		return {
			size: size,

			position:
			{
				x: fromRandom(size + 3, gameSize.width - fullSize - 3),
				y: fromRandom(size + 3, gameSize.height - fullSize - 3)
			},

			fillColor: this.getRandomColor(),
			stroke: fromRandom( 3, 5),
			direction: fromRandom(-10, 10),
			angle: fromRandom(0, 360),
			speed: fromRandom( speed / 1.8, speed)
		};
	}

	setup(customSettings, cache)
	{
		cache = (cache !== false)? true : false;

		let settings = this.getDefaultSettings();
		if(customSettings && typeof customSettings === 'object')
		{
			settings = Utilities.extendObject(settings, customSettings);
		}

		this.size = settings.size;
		this.fullSize = this.size * 2;
		this.position = settings.position;

		this.fillColor = settings.fillColor;
		this.stroke = settings.stroke;

		this.direction = settings.direction;
		this.speed = settings.speed;
		this.angle = settings.angle;

		if(cache)
		{
			this.cachePath();
		}
	}

	getRandomColor(limit)
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

	}

	move()
	{
		this.updateByAngle();
	}

	updateByAngle()
	{
		this.updatePosition();
	}

	updateAngle()
	{
		let angle = MathUtil.updateOrbitAngle(this.angle, this.speed);
		this.angle = (angle);
	}

	checkWall(size)
	{
		let position = this.position;
		if(position.x + this.size >= size.width || position.x <= this.size)
		{
			this.angle = 180 - this.angle;
		}

		if(position.y + this.size >= size.height || position.y <= this.size)
		{
			this.angle = 360 - this.angle;
		}
	}

	updatePosition()
	{
		let size = game.stage.size;

		let position = MathUtil.getPositionByAngle(this.angle, this.speed);
		let round = MathUtil.round;
		let curPos = this.position;
		curPos.x = round(curPos.x + position.x);
		curPos.y = round(curPos.y + position.y);

		this.checkWall(size);
	}

	arc = (Math.PI * 2);

	cachePath()
	{
		let self = this;
		let size = Math.ceil(this.size * 2);
		const callBack = (ctx) =>
		{
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, self.size, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();
		};
		this.cache = Cache.add(callBack, size, size);
	}

	hasCollided(device)
	{
		let position = this.position;
		let S = position.x - device.position.x,
		D = position.y - device.position.y,
		F = device.size + this.size;
		//return true or false
		return (S * S + D * D <= F * F);
	}

	draw(ctx)
	{
		let pos = this.position;
		ctx.drawImage(this.cache, pos.x - this.size, pos.y - this.size);
	}
}