import { SparkParticle } from './sparkParticle.js';

export class Spark
{
	constructor(x, y, color)
	{
		let count = 20;
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
	}

	setupParticles()
	{
		let particleNumber = this.particleNumber,
		distance = (360 / particleNumber);

		for(let i = 0; i <= particleNumber; i++)
		{
			/* this will add equal distance between particles */
			let particleAngle = (distance * i);

			/* this will randomly placeparticles */
			//let particleAngle = Math.random() * 360;
			this.addParticle(particleAngle);
		}

		this.radiusRate = (this.maxRadius / this.speed);
	}

	radiusRate = null;

	addParticle(angle)
	{
		let particleObj = new SparkParticle(this.x, this.y, angle, this.color, this.maxRadius, this.speed);
		let particles = this.particles;
		particles[particles.length] = particleObj;
	}

	checkToRemove()
	{
		let remove = false;
		if(this.radius >= this.maxRadius)
		{
			remove = true;
		}
		return remove;
	}

	updateRadius()
	{
		let radius = this.radius;
		radius += this.radiusRate;
		radius = math.round(radius);
	}

	draw(ctx)
	{
		this.updateRadius();
		let particleArray = this.particles;
		for(let i = particleArray.length - 1; i >= 0; i--)
		{
			let part = particleArray[i];
			if(part.draw(ctx) === false)
			{
				particleArray.splice(i, 1);
				let removed = this.removed;
				removed[removed.length] = part;
			}
		}
	}
}