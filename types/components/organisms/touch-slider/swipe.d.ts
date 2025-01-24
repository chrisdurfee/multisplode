/**
 * Swipe
 *
 * This is helper class to handle swipe events.
 *
 * @class
 */
export class Swipe {
    /**
     * This will get the event position.
     *
     * @param {object} e
     * @returns {object}
     */
    static getEventPosition(e: object): object;
    /**
     * This will calculate the swipe angle.
     *
     * @returns {number}
     */
    static calculateAngle(): number;
    /**
     * This will get the swipe direction.
     *
     * @param {number} angle
     * @returns {string}
     */
    static getSwipeDirection(angle: number): string;
    /**
     * This will check if the swipe is left or right.
     *
     * @returns {boolean}
     */
    static isLeftRight(): boolean;
}
