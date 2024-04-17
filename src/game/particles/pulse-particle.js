import { ARC } from '../math-util.js';
import { Particle } from './particle.js';

/**
 * PulseParticle
 *
 * This class will create a new instance of the pulse particle.
 *
 * @class
 */
export class PulseParticle extends Particle
{
    /**
     * THi swill set up the pulse particle.
     *
     * @param {object} customSettings
     */
    constructor(customSettings)
    {
        super(customSettings);

        this.type = 'pulse';
        this.value = 20;
        this.multiplier = 1.5;

        if (!customSettings)
        {
            customSettings = {};
        }

        customSettings.size = 8;

        const color = '#FFF';
        customSettings.fillColor = color;

        this.setup(customSettings);
    }

    /**
     * This will cache the path.
     *
     * @returns {void}
     */
    cachePath()
    {
        const size = this.size;
        const totalSize = size * 2;
        const callBack = (ctx) =>
        {
            const position = totalSize / 2;

            ctx.beginPath();
            ctx.arc(position, position, size, 0, ARC, true);

            ctx.fillStyle = 'rgba(255,255,255,.4)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(position, position, size / 2, 0, ARC, true);
            ctx.fillStyle = this.fillColor;
            ctx.fill();
        };
        this.cache = Cache.add(callBack, totalSize, totalSize);
    }
}