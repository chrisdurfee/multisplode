import { Devices } from '../../../devices/devices.js';
import { Particles } from '../../../particles/particles.js';
import { Points } from '../../../points/points.js';
import { Settings } from '../../../settings.js';
import { Sparks } from '../../../sparks/sparks.js';
import { LevelController } from '../../level-controller.js';

/**
 * RandomLevelController
 *
 * This will create a random level controller.
 *
 * @class
 */
export class RandomLevelController extends LevelController
{
	/**
	 * This will draw the level.
	 *
	 * @param {object} ctx
	 * @param {object} stage
	 * @returns {boolean}
	 */
	draw(ctx, stage)
	{
		//primary explosions
		Devices.draw(ctx);

		//particle sparks
		Sparks.draw(ctx);

		//particles
		const particleArray = Particles.getAll();
		let particleCount = particleArray.length;
		if (particleCount > 0)
		{
			let particleIndex = particleCount - 1;
			const activeDevices = Devices.getAll();
			const activeDeviceLength = activeDevices.length;
			const activeDeviceIndex = activeDeviceLength - 1;
			do
			{
				const particle = particleArray[particleIndex];
				let collided = false;
				let deviceIndex = activeDeviceIndex;
				if (activeDeviceLength > 0)
				{
					/* this will check each particle to see
					if it has collided with a device */
					do
					{
						const device = activeDevices[deviceIndex];
						if (particle.hasCollided(device) === true)
						{
							let pos;
							collided = true;
							switch (device.type)
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

									pos = particle.position;
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

				/* we don't want to move the particle if the particle
				is interacting with a device */
				if (collided === false)
				{
					particle.move();
				}

				particle.draw(ctx);

			} while (particleIndex--);
		}

		if (Settings.graphics === 'high')
		{
			Points.draw(ctx);
		}

		//end the level
		return this.isComplete(particleCount);
	}
}
