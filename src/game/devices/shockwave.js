import { Cache } from '../cache.js';
import { Levels } from '../level/levels.js';
import { MathUtil } from '../math-util.js';
import { ARC, Device } from './device.js';

/**
 * @type {array} FILES
 */
const FILES =
[
    'collision-1a.mp3',
    'collision-1b.mp3',
    'collision-1c.mp3',
    'collision-1d.mp3'
];

/**
 * @type {number} FILE_LENGTH
 */
const FILE_LENGTH = FILES.length - 1;

/**
 * This will get a random sound.
 *
 * @returns {string}
 */
const getRandomSound = () =>
{
    const index = MathUtil.round(Math.random() * FILE_LENGTH);
    return FILES[index];
};

/**
 * ShockWave
 *
 * This will create a shock wave device.
 *
 * @extends Device
 */
export class ShockWave extends Device
{
    /**
     * This will create a shock wave device.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {string} color
     * @param {number} multiplier
     */
    constructor(tmpX, tmpY, color, multiplier)
    {
        super(tmpX, tmpY, color, multiplier);

        this.size = 0;

        /**
         * This will get a random sound file.
         */
        const file = getRandomSound();
        this.audio = `sound/collisions/${file}`;

        this.type = 'shockWave';
        this.explosive = true;

        /* this will get the current wave scale and cache
        the rate */
        this.getWaveScale();
        this.cachePath();
    }

    /**
     * This will update the size of the shock wave.
     *
     * @returns {void}
     */
    updateSize()
    {
        this.size += this.waveScale;
    }

    /**
     * This will check if the shock wave is ready to be removed.
     *
     * @returns {boolean}
     */
    checkToRemove()
    {
        return (this.size >= this.maxSize);
    }

    waveScale = 0;
    maxSize = 0;
    totalSize = 0;
    lineSize = 0;

    /**
     * This will get the wave scale and max size from the current level.
     *
     * @returns {void}
     */
    getWaveScale()
    {
        const currentLevel = Levels.currentLevel;
        if (currentLevel)
        {
            this.waveScale = currentLevel.waveScale;
            this.maxSize = currentLevel.waveMaxSize * this.multiplier;
        }
    }

    /**
     * This will cache the path of the shock wave.
     *
     * @returns {void}
     */
    cachePath()
    {
        const maxSize = this.maxSize,
        lineWidth = this.lineSize = maxSize / 10;
        const size = this.totalSize = (maxSize * 2) + (lineWidth * 2);
        this.half = this.totalSize / 2;

        const callBack = (ctx) =>
        {
            let position = size / 2;

            ctx.beginPath();
            ctx.arc(position, position, maxSize, 0, ARC, true);

            ctx.globalAlpha = 0.3;
            ctx.fillStyle = this.fillColor;
            ctx.fill();

            ctx.globalAlpha = 0.5;

            ctx.beginPath();
            ctx.arc(position, position, maxSize * .3, 0, ARC, true);
            ctx.fillStyle = this.fillColor;
            ctx.fill();

            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(position, position, maxSize * .6, 0, ARC, true);
            ctx.fillStyle = this.fillColor;
            ctx.fill();

            ctx.globalAlpha = 1;
        };
        this.cache = Cache.add(callBack, size, size);
    }

    /**
     * This will draw the shock wave.
     *
     * @param {object} ctx
     */
    draw(ctx)
    {
        this.updateSize();
        const scale = this.size / this.maxSize;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(scale, scale);
        ctx.drawImage(this.cache, -this.half, -this.half);
        ctx.restore();
    }
}