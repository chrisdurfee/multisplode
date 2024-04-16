import { Particle } from './particle.js';
import { PulseParticle } from './pulse-particle.js';

/**
 * @type {object} ParticleTypes
 */
const ParticleTypes = {
	Particle,
	PulseParticle
};

export const Particles =
{
	particles: [],
	removed: [],

	reset()
	{
		this.particles = [];
		this.removed = [];
	},

	getAll()
	{
		return this.particles;
	},

	add(type, settings)
	{
		type = type || 'Particle';
		const ParticleType = ParticleTypes[type];
		const partical = new ParticleType(settings);

		this.particles.push(partical);
		return partical;
	},

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