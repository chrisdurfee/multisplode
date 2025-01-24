/**
 * @type {number} ARC
 */
export const ARC: number;
/**
 * Device
 *
 * This will create a device that will be used
 * in the game.
 *
 * @export
 * @class Device
 */
export class Device {
    /**
     * Creates an instance of Device.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {string} color
     * @param {number} [multiplier]
     * @constructor
     */
    constructor(tmpX: number, tmpY: number, color: string, multiplier?: number);
    /**
     * @type {object} position
     */
    position: object;
    /**
     * @type {number} size
     */
    size: number;
    /**
     * @type {string} fillColor
     */
    fillColor: string;
    /**
     * @type {string} audio
     */
    audio: string;
    /**
     * @type {number} maxSize
     */
    maxSize: number;
    /**
     * @type {number} multiplier
     */
    multiplier: number;
    /**
     * @type {string} type
     */
    type: string;
    /**
     * @type {boolean} explosive
     */
    explosive: boolean;
    /**
     * This will check to remove the device.
     *
     * @returns {boolean}
     */
    checkToRemove(): boolean;
    /**
     * This will cache device.
     *
     * @returns {void}
     */
    cachePath(): void;
    lineSize: number;
    totalSize: number;
    half: number;
    cache: any;
    /**
     * This will draw the device.
     *
     * @param {object} ctx
     * @returns {void}
     */
    draw(ctx: object): void;
}
