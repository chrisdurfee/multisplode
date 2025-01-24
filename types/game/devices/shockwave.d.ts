/**
 * ShockWave
 *
 * This will create a shock wave device.
 *
 * @extends Device
 */
export class ShockWave extends Device {
    /**
     * This will create a shock wave device.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {string} color
     * @param {number} multiplier
     */
    constructor(tmpX: number, tmpY: number, color: string, multiplier: number);
    /**
     * This will update the size of the shock wave.
     *
     * @returns {void}
     */
    updateSize(): void;
    waveScale: number;
    /**
     * This will get the wave scale and max size from the current level.
     *
     * @returns {void}
     */
    getWaveScale(): void;
}
import { Device } from './device.js';
