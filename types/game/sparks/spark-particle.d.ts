/**
 * SParkParticle
 *
 * This class will create a new instance of the spark particle.
 *
 * @class
 */
export class SparkParticle {
    /**
     * This will create a new instance of the spark particle.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} angle
     * @param {string} color
     * @param {number} maxRadius
     * @param {number} speed
     */
    constructor(x: number, y: number, angle: number, color: string, maxRadius: number, speed: number);
    position: {
        x: number;
        y: number;
    };
    angle: number;
    size: any;
    maxSize: any;
    fillColor: string;
    stroke: string;
    type: string;
    speed: any;
    /**
     * This will update the position of the spark particle.
     *
     * @returns {void}
     */
    updatePosition(): void;
    /**
     * This will update the size of the spark particle.
     *
     * @returns {void}
     */
    updateSize(): void;
    /**
     * This will cache the path of the spark particle.
     *
     * @returns {void}
     */
    cachePath(): void;
    totalSize: number;
    half: number;
    cache: any;
    /**
     * This will draw the spark particle.
     *
     * @param {object} ctx
     * @returns {boolean}
     */
    draw(ctx: object): boolean;
}
