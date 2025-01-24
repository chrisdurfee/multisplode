/**
 * Spark
 *
 * This class will create a new instance of the spark.
 *
 * @class
 */
export class Spark {
    /**
     * This will create a new instance of the spark.
     *
     * @param {number} x
     * @param {number} y
     * @param {string} color
     */
    constructor(x: number, y: number, color: string);
    particleNumber: number;
    x: number;
    y: number;
    color: string;
    radius: number;
    maxRadius: number;
    speed: number;
    particles: any[];
    removed: any[];
    /**
     * This will setup the particles.
     *
     * @returns {void}
     */
    setupParticles(): void;
    radiusRate: any;
    /**
     * This will add a particle.
     *
     * @param {number} angle
     */
    addParticle(angle: number): void;
    checkToRemove(): boolean;
    updateRadius(): void;
    draw(ctx: any): void;
}
