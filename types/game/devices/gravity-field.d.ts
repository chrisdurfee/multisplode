/**
 * GravityField
 *
 * This will create a gravity field.
 *
 * @class
 */
export class GravityField extends Device {
    /**
     * This will create a gravity field.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {string} color
     * @param {number} multiplier
     */
    constructor(tmpX: number, tmpY: number, color: string, multiplier: number);
    gravity: number;
    startTime: any;
    time: number;
    delta: number;
    /**
     * This will get the start time.
     *
     * @returns {object}
     */
    getStartTime(): object;
    /**
     * This will update the particle position.
     *
     * @param {object} particle
     * @returns {void}
     */
    updateParticlePosition(particle: object): void;
    /**
     * This will get the orbit angle.
     *
     * @param {object} particle
     * @returns {number}
     */
    getOrbitAngle(particle: object): number;
    /**
     * This will orbit the particle.
     *
     * @param {object} particle
     * @returns {void}
     */
    orbitParticle(particle: object): void;
    /**
     * This will get the max size.
     *
     * @returns {void}
     */
    getMaxSize(): void;
    orbitLimit: number;
}
import { Device } from './device.js';
