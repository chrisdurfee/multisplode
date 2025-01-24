/**
 * Level
 *
 * This will create a level.
 *
 * @class
 */
export class Level {
    /**
     * This will create a level.
     *
     * @param {number} number
     * @param {*} devices
     * @param {number} minimumNumber
     * @param {number} afterTouchNumber
     * @param {number} quantity
     * @param {number} waveScale
     * @param {number} waveMaxSize
     * @param {string} promptId
     * @param {string} levelClass
     */
    constructor(number: number, devices: any, minimumNumber: number, afterTouchNumber: number, quantity: number, waveScale: number, waveMaxSize: number, promptId: string, levelClass: string);
    number: number;
    touch: number;
    touchLimit: number;
    devices: {};
    minimum: number;
    afterTouch: number;
    afterTouchReady: string;
    particles: any;
    waveScale: number;
    waveMaxSize: number;
    remaining: number;
    passed: boolean;
    currentNumber: number;
    scoreNumber: number;
    scorePoints: number;
    highScorePoints: number;
    highScoreNumber: number;
    originalDelay: any;
    /**
     * @type {function} updateTouchCallBack
     */
    updateTouchCallBack: Function;
    promptId: string;
    levelClass: string;
    bestTime: string;
    locked: boolean;
    /**
     * This will set the data.
     *
     * @returns {void}
     */
    setData(): void;
    data: Data;
    /**
     * This will set the data values.
     *
     * @returns {void}
     */
    setDataValues(): void;
    /**
     * Thi swill setup the level.
     *
     * @returns {void}
     */
    setup(): void;
    /**
     * This will setup the devices.
     *
     * @param {*} devices
     */
    setupDevices(devices: any): void;
    /**
     * This will setup the particle count.
     *
     * @param {number} quantity
     */
    setupParticleCount(quantity: number): void;
    quantity: number;
    /**
     * This will reset the level.
     *
     * @returns {void}
     */
    reset(): void;
    /**
     * @memeber {boolean} blowEm
     */
    isAtLimit: boolean;
    blowEm: boolean;
    startDelay: any;
    delay: any;
    /**
     * This will update the touch.
     *
     * @returns {void}
     */
    updateTouch(): void;
    /**
     * This will set the update touch callback.
     *
     * @param {function} callback
     * @returns {void}
     */
    setUpdateTouchCallBack(callback: Function): void;
    /**
     * This will check if the touch is at the limit.
     *
     * @return {void}
     */
    isAtTouchLimit(): void;
    /**
     * This will update the high score.
     */
    updateHighScore(): void;
    /**
     * This will update the score.
     *
     * @param {number} number
     * @param {number} points
     */
    updateScore(number: number, points: number): void;
    timerUi: any;
    timerUiDelay: number;
    updateUiByTimer(): void;
    /**
     * This will update the remaining.
     */
    updateRemaining(): void;
    /**
     * This will update the points.
     *
     * @param {number} points
     */
    updatePoints(points: number): void;
    /**
     * This will update the number.
     *
     * @param {number} number
     */
    updateNumber(number: number): void;
    updatePlayUi(): void;
    /**
     * This will update the best time.
     *
     * @param {string} time
     */
    updateBestTime(time: string): void;
    /**
     * This will update from the data.
     */
    updateFromData(): void;
    /**
     * This will save the data to local storage.
     */
    saveToData(): void;
    /**
     * This will unlock the level.
     */
    unlock(): void;
}
import { Data } from "@base-framework/base";
