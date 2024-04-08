"use strict";

var Spark = function(x, y, color)
{
	var count = 20;
	switch(Settings.graphics)
	{
		case 'low':
			count = 12;
			break;
		case 'high':
			count = 30;
			break;
	}
	this.particleNumber = count;

	this.x = x;
	this.y = y;
	this.color = color;

	this.radius = 0;
	this.maxRadius = 30;
	this.speed = 20;

	this.particles = [];
	this.removed = [];
	this.setupParticles();
};

Spark.prototype =
{
	setupParticles: function()
	{
		var particleNumber = this.particleNumber,
		distance = (360 / particleNumber);

		for(var i = 0; i <= particleNumber; i++)
		{
			/* this will add equal distance between particles */
			var particleAngle = (distance * i);

			/* this will randomly placeparticles */
			//var particleAngle = Math.random() * 360;
			this.addParticle(particleAngle);
		}

		this.radiusRate = (this.maxRadius / this.speed);
	},

	radiusRate: null,

	addParticle: function(angle)
	{
		var particleObj = new SparkParticle(this.x, this.y, angle, this.color, this.maxRadius, this.speed);
		var particles = this.particles;
		particles[particles.length] = particleObj;
	},

	checkToRemove: function()
	{
		var remove = false;
		if(this.radius >= this.maxRadius)
		{
			remove = true;
		}
		return remove;
	},

	updateRadius: function()
	{
		var radius = this.radius;
		radius += this.radiusRate;
		radius = math.round(radius);
	},

	draw: function(ctx)
	{
		this.updateRadius();
		var particleArray = this.particles;
		for(var i = particleArray.length - 1; i >= 0; i--)
		{
			var part = particleArray[i];
			if(part.draw(ctx) === false)
			{
				particleArray.splice(i, 1);
				var removed = this.removed;
				removed[removed.length] = part;
			}
		}
	}
};

var SparkParticle = function(x, y, angle, color, maxRadius, speed)
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
};

SparkParticle.prototype =
{
	constructor: SparkParticle,

	updatePosition: function()
	{
		var position = math.getPositionByAngle(this.angle, this.speed);
		var currentPosition = this.position;
		currentPosition.x += position.x;
		currentPosition.y += position.y;

		this.updateSize();
	},

	updateSize: function()
	{
		this.size -= .5;
	},

	cachePath: function()
	{
		var self = this;
		var size = this.totalSize = (this.size * 2);
		this.half = this.totalSize / 2;

		var callBack = function(ctx)
		{
			var position = size / 2;
			ctx.globalAlpha = 0.7;
			ctx.beginPath();
			ctx.arc(position, position, size, 0, self.arc, true);
			ctx.fillStyle = self.fillColor;
			ctx.fill();
			ctx.globalAlpha = 1;
		};
		this.cache = Cache.add(callBack, size, size);
	},

	arc: (Math.PI * 2),

	draw: function(ctx)
	{
		this.updatePosition();

		/* this will block any spark particle that
		is too small to draw */
		if(this.size < 0.001)
		{
			return false;
		}

		var pos = this.position;
		var scale = this.size / this.maxSize;
		ctx.save();
		ctx.translate(pos.x, pos.y);
		ctx.scale(scale, scale);
		ctx.drawImage(this.cache, -this.half, -this.half);
		ctx.restore();
	}
};

var Sparks =
{
	sparks: [],
	removed: [],

	maxRadius: 5,
	speed: 10,

	reset: function()
	{
		this.sparks = [];
		this.removed = [];
	},

	add: function(tmpX, tmpY, color)
	{
		var group = new Spark(tmpX, tmpY, color);
		var sparks = this.sparks;
		sparks[sparks.length] = group;
	},

	remove: function(spark)
	{
		var sparksArray = this.sparks,
		index = sparksArray.indexOf(spark);
		if(index > -1)
		{
			sparksArray.splice(index, 1);
			/* we need to add to the removed array to
			delay the gc durring gameplay */
			var removed = this.removed;
			removed[removed.length] = spark;
		}
	},

	updateRadius: function(group)
	{
		var remove = group.checkToRemove();
		if(remove == false)
		{
			group.radius += group.radiusRate;
		}
		else
		{
			this.remove(group);
		}
	},

	draw: function(ctx)
	{
		var sparksArray = this.sparks;
		for(var i = sparksArray.length - 1; i >= 0; i--)
		{
			var group = sparksArray[i];
			if(group)
			{
				group.draw(ctx);
				this.updateRadius(group);
			}
		}
	}
};