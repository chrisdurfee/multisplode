import { Particle } from './particle.js';

export class PulseParticle extends Particle
{
    constructor(customSettings)
    {
        super(customSettings);

        this.type = 'pulse';
        this.value = 20;
        this.multiplier = 1.5;

        let color = '#FFF';
        if(!customSettings)
        {
            customSettings = {};
        }

        customSettings.size = 8;
        customSettings.fillColor = color;

        this.setup(customSettings);
    }

    cachePath()
    {
        let self = this,
        size = this.size;
        let totalSize = size * 2;
        const callBack = (ctx) =>
        {
            let position = totalSize / 2;

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
}