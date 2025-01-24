/**
 * LevelController
 *
 * This will manage the level.
 *
 * @class LevelController
 */
export class LevelController {
    /**
     * @member {object|null} level
     */
    level: any;
    /**
     * This will setup the level.
     *
     * @param {boolean} cancelPrompts
     * @returns {void}
     */
    setLevel(cancelPrompts: boolean): void;
    /**
     * This will show the prompt.
     *
     * @param {string} promptId
     * @returns {void}
     */
    showPrompt(promptId: string): void;
    /**
     * This will change the level.
     *
     * @param {object} level
     * @returns {void}
     */
    changeLevel(level: object): void;
    /**
     * This will interact with the level.
     *
     * @param {number} mouseX
     * @param {number} mouseY
     * @returns {void}
     */
    interact(mouseX: number, mouseY: number): void;
    /**
     * This will create a device.
     *
     * @param {number} x
     * @param {number} y
     * @param {string} color
     * @param {boolean} [multiplier]
     * @returns {void}
     */
    createDevice(x: number, y: number, color: string, multiplier?: boolean): void;
    /**
     * This will create sparks.
     *
     * @param {number} x
     * @param {number} y
     * @param {string} color
     * @returns {void}
     */
    createSparks(x: number, y: number, color: string): void;
    /**
     * This will create points.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} value
     * @returns {void}
     */
    createPoints(x: number, y: number, value: number): void;
    /**
     * This will get a random number from a range.
     *
     * @param {number} from
     * @param {number} to
     * @returns {number}
     */
    randomFromTo(from: number, to: number): number;
    /**
     * This will reset the level.
     *
     * @returns {void}
     */
    reset(): void;
    blowEm: boolean;
    startDelay: any;
    isAtLimit: boolean;
    delay: number;
    /**
     * This will draw the level.
     *
     * @param {object} ctx
     * @param {object} stage
     * @returns {void}
     */
    draw(ctx: object, stage: object): void;
    /**
     * This will set up the particles.
     *
     * @returns {void}
     */
    setupParticles(): void;
    blowEmDelay: number;
    blowEmExtend: number;
    playContainer: any;
    /**
     * This will check to destroy all particles.
     *
     * @returns {void}
     */
    checkToBlowEm(): void;
    originalDelay: number;
    /**
     * This will setup the complete delay.
     *
     * @returns {Date}
     */
    setupCompleteDelay(): Date;
    /**
     * This will check if the level is complete.
     *
     * @param {number} particleCount
     * @returns {boolean}
     */
    checkLevelComplete(particleCount: number): boolean;
    /**
     * This will check if the level is complete.
     *
     * @param {number} particleCount
     * @returns {boolean}
     */
    isComplete(particleCount: number): boolean;
    /**
     * This will destroy all particles.
     *
     * @returns {void}
     */
    destroyAllParticles(): void;
}
