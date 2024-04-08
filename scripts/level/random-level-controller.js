"use strict";

var RandomLevelController = function(level)
{
	LevelController.call(this, level);
};

LevelController.extend(
{
	constructor: RandomLevelController,

	draw: function(ctx, stage)
	{
		var currentLevel = this.level;

		//primary explosions
		Devices.draw(ctx);
		//particle sparks
		Sparks.draw(ctx);

		//particles
		var particleArray = Particles.getAll();
		var particleCount = particleArray.length;
		var particleIndex = particleCount - 1;
		if(particleCount > 0)
		{
			var activeDevices = Devices.getAll();
			var activeDeviceLength = activeDevices.length;
			var activeDeviceIndex = activeDeviceLength - 1;
			do
			{
				var particle = particleArray[particleIndex];
				var collided = false;
				var deviceIndex = activeDeviceIndex;
				if(activeDeviceLength > 0)
				{
					/* this will check each particle to see
					ifithas collided with a device */
					do
					{
						var device = activeDevices[deviceIndex];
						if(particle.hasCollided(device) === true)
						{
							collided = true;
							switch(device.type)
							{
								case 'gravityField':
									device.orbitParticle(particle);
									break;
								default:
									particleCount--;
									//remove destroyed particles
									Particles.remove(particle);

									//after touch
									/*if(currentLevel.scoreNumber >= currentLevel.afterTouch)
									{
										currentLevel.afterTouchReady = 'yes';
									}*/

									var pos = particle.position;
									/* this will add a new device for the particle
									that has been destroyed, including sparks from the
									explosion, and the newpoints from the destruction */
									this.createDevice(pos.x, pos.y, particle.fillColor, particle.multiplier);
									this.createPoints(pos.x - 55, pos.y - 35, particle.value);
							}
							break;
						}
					} while(deviceIndex--);
				}

				/* we dont want to move the particle if the particle
				is interacting with a device */
				if(collided === false)
				{
					particle.move();
				}

				particle.draw(ctx);

			} while(particleIndex--);
		}

		/*if(settings.graphics === 'high')
		{
			points.draw(ctx);
		}*/

		//end the level
		var stop = this.isComplete(particleCount);
		if(stop === true)
		{
			/* this will stop drawing and go to the summary panel */
			game.levelSummary();
		}
		return stop;
	}
});
