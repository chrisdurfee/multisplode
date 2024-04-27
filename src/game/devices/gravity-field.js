import { Cache } from '../cache.js';
import { Levels } from '../level/levels.js';
import { MathUtil } from '../math-util.js';
import { ARC, Device } from './device.js';

/**
 * GravityField
 *
 * This will create a gravity field.
 *
 * @class
 */
export class GravityField extends Device
{
    /**
     * This will create a gravity field.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {string} color
     * @param {boolean} multiplier
     */
    constructor(tmpX, tmpY, color, multiplier)
    {
        super(tmpX, tmpY, color, multiplier);

        this.audio = 'sound/collisions/collision-1a.mp3';

        this.gravity = (1 * this.multiplier);
        this.startTime = null;
        this.time = 8000;
        this.delta = 0;

        this.maxSize = 0;
        this.totalSize = 0;
        this.lineSize = 0;

        this.type = 'gravityField';

        /* this will get the size and cache
        the rate */
        this.getMaxSize();
        this.cachePath();
    }

    /**
     * This will check to remove the gravity field.
     *
     * @return {boolean}
     */
    checkToRemove()
    {
        const startTimer = this.getStartTime();
        this.delta = new Date() - startTimer;
        return (this.delta >= this.time);
    }

    /**
     * This will get the start time.
     *
     * @returns {object}
     */
    getStartTime()
    {
        this.startTime = this.startTime || new Date();
        return this.startTime;
    }

    /**
     * This will update the particle position.
     *
     * @param {object} particle
     * @returns {void}
     */
    updateParticlePosition(particle)
    {
        /* this will get the  current angle the particle
        is location from the center of the gravity field
        and apply the gravity to the distance */
        let position = this.position;
        let particlePosition = particle.position;
        const orbitDistance = MathUtil.distance(particlePosition, position) - this.gravity;
        let distance = orbitDistance - this.gravity;

        /* this will limit the oribit to stay a distance from the center */
        distance = distance > this.orbitLimit? distance : this.orbitLimit;

        const angle = MathUtil.updateOrbitAngle(this.getOrbitAngle(particle), particle.speed / this.size);
        position = MathUtil.getOrbitPosition(position.x, position.y, angle, distance);

        particlePosition.x = position.x;
        particlePosition.y = position.y;
    }

    /**
     * This will get the orbit angle.
     *
     * @param {object} particle
     * @returns {number}
     */
    getOrbitAngle(particle)
    {
        const position = this.position;
        const particlePosition = particle.position;
        const diffX = particlePosition.x - position.x;
        const diffY = particlePosition.y - position.y;
        return Math.atan2(diffY, diffX);
    }

    /**
     * This will orbit the particle.
     *
     * @param {object} particle
     * @returns {void}
     */
    orbitParticle(particle)
    {
        this.updateParticlePosition(particle);
    }

    /**
     * This will get the max size.
     *
     * @returns {void}
     */
    getMaxSize()
    {
        const currentLevel = Levels.currentLevel;
        if (currentLevel)
        {
            this.maxSize = currentLevel.waveMaxSize * this.multiplier;
            this.size = this.maxSize;

            this.orbitLimit = this.maxSize - (this.maxSize / 3);
        }
    }

    /**
     * This will cache device.
     *
     * @returns {void}
     */
    cachePath()
    {
        const maxSize = this.maxSize,
        lineWidth = this.lineSize = 2;
        const size = this.totalSize = (maxSize * 2) + (lineWidth * 2);
        this.half = this.totalSize / 2;

        /**
         * This will draw the device to be cached.
         *
         * @param {object} ctx
         * @returns {void}
         */
        const callBack = (ctx) =>
        {
            const position = size / 2;

            ctx.beginPath();
            ctx.arc(position, position, maxSize, 0, ARC, true);

            ctx.globalAlpha = 0.3;
            ctx.fillStyle = this.fillColor;
            ctx.fill();

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FFF';
            ctx.stroke();

            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(position, position, maxSize * 0.2, 0, ARC, true);
            ctx.fillStyle = this.fillColor;
            ctx.fill();

            ctx.globalAlpha = 1;
        };
        this.cache = Cache.add(callBack, size, size);
    }

    /**
     * This will draw the device.
     *
     * @param {object} ctx
     * @returns {void}
     */
    draw(ctx)
    {
       const opacity = 1 - this.delta / this.time;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.globalAlpha = opacity;
        ctx.drawImage(this.cache, -this.half, -this.half);
        ctx.restore();
    }
}