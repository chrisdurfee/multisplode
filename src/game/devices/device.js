import { MathUtil } from "../math-util.js";

/**
 * @type {number} ARC
 */
export const ARC = MathUtil.arc;

/**
 * This will create a position object.
 *
 * @param {number} x
 * @param {number} y
 * @returns {object}
 */
const Position = (x, y) => ({ x: MathUtil.round(x), y: MathUtil.round(y) });

/**
 * Device
 *
 * This will create a device that will be used
 * in the game.
 *
 * @export
 * @class Device
 */
export class Device
{
    /**
     * Creates an instance of Device.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {string} color
     * @param {boolean} [multiplier]
     * @constructor
     */
    constructor(tmpX, tmpY, color, multiplier)
    {
        this.position = Position(tmpX, tmpY);
        this.size = 0;
        this.fillColor = color;
        this.audio = 'sound/collisions/collision-1a.mp3';
        this.multiplier = multiplier || 1;

        this.type = 'device';
        this.explosive = false;

        this.cachePath();
    }

    /**
     * This will check to remove the device.
     *
     * @returns {boolean}
     */
    checkToRemove()
    {
        return false;
    }

    /**
     * This will cache device.
     *
     * @returns {void}
     */
    cachePath()
    {
        const maxSize = this.maxSize,
        lineWidth = this.lineSize = maxSize / 10;
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

            ctx.globalAlpha = 0.5;

            ctx.beginPath();
            ctx.arc(position, position, maxSize * 0.3, 0, ARC, true);
            ctx.fillStyle = this.fillColor;
            ctx.fill();

            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(position, position, maxSize * 0.6, 0, ARC, true);
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
        const x = this.position.x,
        y = this.position.y;

        const scale = this.size / this.maxSize;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.drawImage(this.cache, -this.half, -this.half);
        ctx.restore();
    }
}