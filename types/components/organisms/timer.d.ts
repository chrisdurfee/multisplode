/**
 * Timer
 *
 * This class will handle the timer.
 *
 * @class
 */
export class Timer {
    /**
     * This will set up the duration.
     *
     * @param {number} duration - The duration of the timer.
     * @param {function} callBack - The callback function to call when the timer is done.
     */
    constructor(duration: number, callBack: Function);
    timer: number;
    duration: number;
    callback: Function;
    /**
     * This will set up the timer.
     *
     * @returns {void}
     */
    setupTimer(): void;
    /**
     * This will start the timer.
     *
     * @returns {void}
     */
    start(): void;
    /**
     * This will stop the timer.
     *
     * @returns {void}
     */
    stop(): void;
    /**
     * This will call the callback.
     *
     * @returns {void}
     */
    callCallback(): void;
}
