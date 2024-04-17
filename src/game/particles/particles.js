import { Particle } from './particle.js';
import { PulseParticle } from './pulse-particle.js';

/**
 * @type {object} ParticleTypes
 */
const ParticleTypes = {
	Particle,
	PulseParticle
};

/**
 * Particles
 *
 * This will handle the particles.
 */
export const Particles =
{
	particles: [],
	removed: [],

	/**
	 * This will reset the particles.
	 *
	 * @returns {void}
	 */
	reset()
	{
		this.particles = [];
		this.removed = [];
	},

	/**
	 * This will get all the particles.
	 *
	 * @returns {array}
	 */
	getAll()
	{
		return this.particles;
	},

	/**
	 * This will add a new particle.
	 *
	 * @param {string} type
	 * @param {object} settings
	 * @returns {object}
	 */
	add(type, settings)
	{
		type = type || 'Particle';
		const ParticleType = ParticleTypes[type];
		const partical = new ParticleType(settings);

		this.particles.push(partical);
		return partical;
	},

	/**
	 * This will remove the particle.
	 *
	 * @param {object} partical
	 */
	remove(partical)
	{
		const index = this.particles.indexOf(partical);
		if (index < 1)
		{
			return;
		}

		this.particles.splice(index, 1);

		/* we need to addto the removed array to
		delay the gc durring gameplay */
		this.removed.push(partical);
	}
};