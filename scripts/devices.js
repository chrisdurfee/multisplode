"use strict";

var Devices =
{
	devices: [],
	removed: [],

	reset: function()
	{
		this.explosives = 0;
		this.devices = [];
		this.removed = [];
	},

	explosives: 0,

	getExplosivesCount: function()
	{
		return this.explosives;
	},

	getAll:function()
	{
		return this.devices;
	},

	add: function(tmpX, tmpY, color, multiplier, type)
	{
		type = type || 'ShockWave';
		var device = new window[type](tmpX, tmpY, color, multiplier);
		if(device.explosive === true)
		{
			this.explosives++;
		}

		//sounds.add(device.audio, type);
		var devices = this.devices;
		devices[devices.length] = (device);
		return device;
	},

	remove: function(device)
	{
		var devices = this.devices,
		index = devices.indexOf(device);
		if(index > -1)
		{
			devices.splice(index, 1);
			/* we need to add to the removed array to
			delay the gc durring gameplay */
			var removed = this.removed;
			removed[removed.length] = device;
		}
	},

	draw: function(ctx)
	{
		ctx.globalCompositeOperation = 'lighter';
		var devices = this.devices;
		for(var i = (devices.length - 1); i >= 0; i--)
		{
			var device = devices[i];
			if(device.checkToRemove() === true)
			{
				if(device.explosive === true)
				{
					this.explosives--;
				}
				//remove object from wave array
				this.remove(device);
			}
			else
			{
				//update explosion position
				device.draw(ctx);
			}
		}
		ctx.globalCompositeOperation = 0;
	}
};

var Device = Class.extend(
{
	constructor: function(tmpX, tmpY, color, multiplier)
	{
		this.init(Device);

		this.position = { x: math.round(tmpX), y: math.round(tmpY) };
		this.size = 0;
		this.fillColor = color;
		this.audio = 'sound/collisions/collision-1a.mp3';
		this.multiplier = multiplier || 1;

		this.type = 'device';
		this.explosive = false;

		this.cachePath();
	},

	init: function(constructor)
	{
		this.number = (typeof constructor.number === 'undefined')? constructor.number = 0 : (++constructor.number);
		this.id = this.number;
	},

	checkToRemove: function()
	{
		return false;
	},

	arc: (Math.PI * 2),

	cachePath: function()
	{
		var self = this,
		maxSize = this.maxSize,
		lineWidth = this.lineSize = maxSize / 10;
		var size = this.totalSize = (maxSize * 2) + (lineWidth * 2);
		this.half = this.totalSize / 2;

		var callBack = function(ctx)
		{
			var position = size / 2;

			ctx.beginPath();
			ctx.arc(position, position, maxSize, 0, self.arc, true);

			ctx.globalAlpha = 0.3;
			ctx.fillStyle = self.fillColor;
			ctx.fill();

			ctx.globalAlpha = 0.5;

			ctx.beginPath();
			ctx.arc(position, position, maxSize * 0.3, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();

			ctx.globalAlpha = 0.7;
			ctx.beginPath();
			ctx.arc(position, position, maxSize * 0.6, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();

			ctx.globalAlpha = 1;
		};
		this.cache = Cache.add(callBack, size, size);
	},

	draw: function(ctx)
	{
		var x = this.position.x,
		y = this.position.y;

		var scale = this.size / this.maxSize;

		ctx.save();
		ctx.translate(x, y);
		ctx.scale(scale, scale);
		ctx.drawImage(this.cache, -this.half, -this.half);
		ctx.restore();
	}
});

var ShockWave = Device.extend(
{
	constructor: function(tmpX, tmpY, color, multiplier)
	{
		this.init(ShockWave);

		this.position = { x: math.round(tmpX), y: math.round(tmpY) };
		this.size = 0;
		this.fillColor = color;

		/*var files =
		[
			'collision-1a.mp3',
			'collision-1b.mp3',
			'collision-1c.mp3',
			'collision-1d.mp3'
		];
		var file = files[math.round(Math.random() * files.length - 1)];*/
		this.audio = 'sound/collisions/collision-1a.mp3';
		this.multiplier = multiplier || 1;

		this.type = 'shockWave';
		this.explosive = true;

		/* this will get the current wave scale and cache
		the rate */
		this.getWaveScale();
		this.cachePath();
	},

	/*increase shock wave size*/
	updateSize: function()
	{
		this.size += this.waveScale;
	},

	checkToRemove: function()
	{
		return (this.size >= this.maxSize);
	},

	waveScale: 0,
	maxSize: 0,
	totalSize: 0,
	lineSize: 0,

	getWaveScale: function()
	{
		var currentLevel = Levels.currentLevel;
		if(currentLevel)
		{
			this.waveScale = currentLevel.waveScale;
			this.maxSize = currentLevel.waveMaxSize * this.multiplier;
		}
	},

	cachePath: function()
	{
		var self = this,
		maxSize = this.maxSize,
		lineWidth = this.lineSize = maxSize / 10;
		var size = this.totalSize = (maxSize * 2) + (lineWidth * 2);
		this.half = this.totalSize / 2;

		var callBack = function(ctx)
		{
			var position = size / 2;

			ctx.beginPath();
			ctx.arc(position, position, maxSize, 0, self.arc, true);

			ctx.globalAlpha = 0.3;
			ctx.fillStyle = self.fillColor;
			ctx.fill();

			ctx.globalAlpha = 0.5;

			ctx.beginPath();
			ctx.arc(position, position, maxSize * .3, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();

			ctx.globalAlpha = 0.7;
			ctx.beginPath();
			ctx.arc(position, position, maxSize * .6, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();

			ctx.globalAlpha = 1;
		};
		this.cache = Cache.add(callBack, size, size);
	},

	draw: function(ctx)
	{
		var x = this.position.x,
		y = this.position.y;

		this.updateSize();

		var scale = this.size / this.maxSize;
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(scale, scale);
		ctx.drawImage(this.cache, -this.half, -this.half);
		ctx.restore();
	}
});

var GravityField = Device.extend(
{
	constructor: function(tmpX, tmpY, color, multiplier)
	{
		this.init(GravityField);

		this.position = { x: math.round(tmpX), y: math.round(tmpY) };
		this.size = 0;
		this.fillColor = color;
		this.audio = 'sound/collisions/collision-1a.mp3';
		this.multiplier = multiplier || 1;

		this.gravity = (1 * this.multiplier);
		this.startTime = null;
		this.time = 8000;
		this.delta = 0;

		this.type = 'gravityField';
		this.explosive = false;

		/* this will get the size and cache
		the rate */
		this.getMaxSize();
		this.cachePath();
	},

	checkToRemove: function()
	{
		var startTimer = this.getStartTime();
		this.delta = new Date() - startTimer;
		return (this.delta >= this.time)? true : false;
	},

	getStartTime: function()
	{
		this.startTime = this.startTime || new Date();
		return this.startTime;
	},

	updateParticlePosition: function(particle)
	{
		/* this will get the  current angle the particle
		is location from the center of the gravity field
		and apply the gravity to the distance */
		var position = this.position;
		var particlePosition = particle.position;
		var orbitDistance = this.distance(particlePosition, position) - this.gravity;
		var distance = orbitDistance - this.gravity;

		/* this will limit the oribit to stay a distance from the center */
		distance = distance > this.orbitLimit? distance : this.orbitLimit;

		var angle = math.updateOrbitAngle(this.getOrbitAngle(particle), particle.speed / this.size);
		position = math.getOrbitPosition(position.x, position.y, angle, distance);

		particlePosition.x = position.x;
		particlePosition.y = position.y;
	},

	getOrbitAngle: function(particle)
	{
		var position = this.position;
		var particlePosition = particle.position;
		var diffX = particlePosition.x - position.x;
		var diffY = particlePosition.y - position.y;
		return Math.atan2(diffY, diffX);
	},

	distance: function(p1, p2)
	{
		return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
	},

	orbitParticle: function(particle)
	{
		this.updateParticlePosition(particle);
	},

	maxSize: 0,
	totalSize: 0,
	lineSize: 0,

	getMaxSize: function()
	{
		var currentLevel = Levels.currentLevel;
		if(currentLevel)
		{
			this.maxSize = currentLevel.waveMaxSize * this.multiplier;
			this.size = this.maxSize;

			this.orbitLimit = this.maxSize - (this.maxSize / 3);
		}
	},

	cachePath: function()
	{
		var self = this,
		maxSize = this.maxSize,
		lineWidth = this.lineSize = 2;
		var size = this.totalSize = (maxSize * 2) + (lineWidth * 2);
		this.half = this.totalSize / 2;

		var callBack = function(ctx)
		{
			var position = size / 2;

			ctx.beginPath();
			ctx.arc(position, position, maxSize, 0, self.arc, true);

			ctx.globalAlpha = 0.3;
			ctx.fillStyle = self.fillColor;
			ctx.fill();

			ctx.lineWidth = 2;
			ctx.strokeStyle = '#FFF';
			ctx.stroke();

			ctx.globalAlpha = 0.7;
			ctx.beginPath();
			ctx.arc(position, position, maxSize * 0.2, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();

			ctx.globalAlpha = 1;
		};
		this.cache = Cache.add(callBack, size, size);
	},

	draw: function(ctx)
	{
		var x = this.position.x,
		y = this.position.y;

		var opacity = 1 - this.delta / this.time;

		ctx.save();
		ctx.translate(x, y);
		ctx.globalAlpha = opacity;
		ctx.drawImage(this.cache, -this.half, -this.half);
		ctx.restore();
	}
});