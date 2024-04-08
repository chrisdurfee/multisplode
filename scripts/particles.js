"use strict";

/*
	particles

	this will create, store, track, and remove
	particles.
*/
var Particles =
{
	particles: [],
	removed: [],

	/* this will reset the object pools */
	reset: function()
	{
		this.particles = [];
		this.removed = [];
	},

	getAll:function()
	{
		return this.particles;
	},

	/* this will create a new particle to and add
	to the object pool.
	@param (string) type
	@param (object) settings
	@return (object) the new particle */
	add: function(type, settings)
	{
		type = type || 'Particle';
		var partical = new window[type](settings);
		var particles = this.particles;
		particles[particles.length] = partical;
		return partical;
	},

	remove: function(partical)
	{
		var particles = this.particles,
		index = particles.indexOf(partical);
		if(index > -1)
		{
			particles.splice(index, 1);
			/* we need to addto the removed array to
			delay the gc durring gameplay */
			var removed = this.removed;
			removed[removed.length] = partical;
		}
	}
};

var Particle = function(customSettings)
{
	this.init(Particle);
	this.type = 'particle';
	this.value = 10;
	this.multiplier = 1;

	this.setup(customSettings);
};

Class.extend(
{
	constructor: Particle,

	init: function(constructor)
	{
		this.number = (typeof constructor.number === 'undefined')? constructor.number = 0 : (++constructor.number);
		this.id = this.number;
	},

	getDefaultSettings: function()
	{
		var gameSize = game.stage.size;
		var fromRandom = math.randomFromTo;

		var minSize = 0.005,
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
	},

	setup: function(customSettings, cache)
	{
		cache = (cache !== false)? true : false;

		var settings = this.getDefaultSettings();
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
	},

	getRandomColor: function(limit)
	{
		limit = (typeof limit !== 'number')? 7 : limit;
		var number = math.floor(Math.random() * 7);
		var color = '';
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

	},

	move: function()
	{
		this.updateByAngle();
	},

	updateByAngle: function()
	{
		this.updatePosition();
	},

	updateAngle: function()
	{
		var angle = math.updateOrbitAngle(this.angle, this.speed);
		this.angle = (angle);
	},

	checkWall: function(size)
	{
		var position = this.position;
		if(position.x + this.size >= size.width || position.x <= this.size)
		{
			this.angle = 180 - this.angle;
		}

		if(position.y + this.size >= size.height || position.y <= this.size)
		{
			this.angle = 360 - this.angle;
		}
	},

	updatePosition: function()
	{
		var size = game.stage.size;

		var position = math.getPositionByAngle(this.angle, this.speed);
		var round = math.round;
		var curPos = this.position;
		curPos.x = round(curPos.x + position.x);
		curPos.y = round(curPos.y + position.y);

		this.checkWall(size);
	},

	arc: (Math.PI * 2),

	cachePath: function()
	{
		var self = this;
		var size = Math.ceil(this.size * 2);
		var callBack = function(ctx)
		{
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, self.size, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();
		};
		this.cache = Cache.add(callBack, size, size);
	},

	/* this will check if the particle has collided with a
	device.
	@param (object) particle = the particle
	@param (object) device
	@return (bool) true or false if collided */
	hasCollided: function(device)
	{
		var position = this.position;
		var S = position.x - device.position.x,
		D = position.y - device.position.y,
		F = device.size + this.size;
		//return true or false
		return (S * S + D * D <= F * F);
	},

	draw: function(ctx)
	{
		var pos = this.position;
		ctx.drawImage(this.cache, pos.x - this.size, pos.y - this.size);
	}
});

var PulseParticle = function(customSettings)
{
	this.init(PulseParticle);
	this.type = 'pulse';
	this.value = 20;
	this.multiplier = 1.5;

	var color = '#FFF';
	if(!customSettings)
	{
		customSettings = {};
	}

	customSettings.size = 8;
	customSettings.fillColor = color;

	this.setup(customSettings);
};

Particle.extend(
{
	constructor: PulseParticle,

	cachePath: function()
	{
		var self = this,
		size = this.size;
		var totalSize = size * 2;
		var callBack = function(ctx)
		{
			var position = totalSize / 2;

			ctx.beginPath();
			ctx.arc(position, position, size, 0, self.arc, true);

			ctx.fillStyle = 'rgba(255,255,255,.4)';
			ctx.fill();

			ctx.beginPath();
			ctx.arc(position, position, size / 2, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();
		};
		this.cache = Cache.add(callBack, totalSize, totalSize);
	}

});

