/**
 * Particle
 *
 * This class will create a new instance of the particle.
 *
 * @class
 */
export class Particle {
    /**
     * This will create a new instance of the particle.
     *
     * @param {object} customSettings
     */
    constructor(customSettings: object);
    type: string;
    value: number;
    multiplier: number;
    /**
     * This will initialize the particle.
     *
     * @returns {void}
     */
    init(): void;
    number: number;
    id: number;
    /**
     * This will get the default settings.
     *
     * @returns {object}
     */
    getDefaultSettings(): object;
    /**
     * This will setup the particle.
     *
     * @param {object} customSettings
     * @param {boolean} [cache]
     * @returns {void}
     */
    setup(customSettings: object, cache?: boolean): void;
    size: any;
    fullSize: number;
    position: any;
    fillColor: any;
    stroke: any;
    direction: any;
    speed: any;
    angle: any;
    /**
     * This will move the particle.
     *
     * @returns {void}
     */
    move(): void;
    /**
     * This will update the particle by angle.
     *
     * @returns {void}
     */
    updateByAngle(): void;
    /**
     * This will update the position of the particle.
     *
     * @returns {void}
     */
    updateAngle(): void;
    /**
     * This will check if the particle has collided with the wall.
     *
     * @param {object} size
     * @returns {void}
     */
    checkWall(size: object): void;
    /**
     * This will update the position of the particle.
     *
     * @returns {void}
     */
    updatePosition(): void;
    /**
     * This will cache the path of the particle.
     *
     * @returns {void}
     */
    cachePath(): void;
    cache: any;
    /**
     * This will check if the particle has collided with the device.
     *
     * @param {object} device
     * @returns {boolean}
     */
    hasCollided(device: object): boolean;
    /**
     * This will draw the particle.
     *
     * @param {object} ctx
     * @returns {void}
     */
    draw(ctx: object): void;
}
