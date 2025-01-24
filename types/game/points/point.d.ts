/**
 * Point
 *
 * This class will create a new instance of the point.
 *
 * @class
 */
export class Point {
    /**
     * This will create a new instance of the point.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {number} value
     */
    constructor(tmpX: number, tmpY: number, value: number);
    number: number;
    id: number;
    position: any;
    size: number;
    fillColor: string;
    opacity: number;
    text: string;
    value: number;
    distance: number;
    maxDistance: number;
    speed: number;
    /**
     * This will move the point.
     *
     * @returns {void}
     */
    move(): void;
    /**
     * This will change the alpha.
     *
     * @returns {void}
     */
    changeAlpha(): void;
    /**
     * This will cache the path.
     *
     * @returns {void}
     */
    cachePath(): void;
    cache: any;
    /**
     * This will draw the point.
     *
     * @param {object} ctx
     */
    draw(ctx: object): void;
}
