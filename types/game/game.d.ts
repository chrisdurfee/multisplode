/**
 * Game
 *
 * This will manage the game.
 *
 * @class Game
 */
export class Game {
    /**
     * This will set up the stage.
     *
     * @param {number} width
     * @param {number} height
     * @param {object} app
     */
    constructor(width: number, height: number, app: object);
    stage: Stage;
    app: any;
    /**
     * @type {boolean}
     */
    hasSetup: boolean;
    /**
     * This will get the current level.
     *
     * @returns {object|null}
     */
    getCurrentLevel(): object | null;
    /**
     * This will set up the canvas.
     *
     * @param {object} canvas
     */
    setCanvas(canvas: object): void;
    /**
     * This will set up the game.
     *
     * @returns {void}
     */
    setup(): void;
    /**
     * This will set up the stage.
     *
     * @returns {void}
     */
    setupStage(): void;
    /**
     * This will set up the level packs.
     *
     * @returns {void}
     */
    setupLevelPacks(): void;
    /**
     * This will change the stage level controller.
     *
     * @param {object} controller
     * @returns {void}
     */
    setStageLevelController(controller: object): void;
    /**
     * This will setup the levels.
     *
     * @returns {void}
     */
    setupLevels(): void;
    /**
     * This will start the game.
     *
     * @returns {void}
     */
    startGame(): void;
    /**
     * This will start the game.
     *
     * @returns {void}
     */
    play(): void;
    /**
     * This will resume the game.
     *
     * @returns {void}
     */
    resume(): void;
    /**
     * This will pause the game.
     *
     * @returns {void}
     */
    pause(): void;
    /**
     * This will retry the level.
     *
     * @returns {void}
     */
    retryLevel(): void;
    /**
     * This will select the level.
     *
     * @param {object} level
     * @returns {void}
     */
    selectLevel(level: object): void;
    /**
     * This will select the newxt level.
     *
     * @returns {void}
     */
    nextLevel(): void;
    /**
     * This will select the previous level.
     *
     * @returns {void}
     */
    previousLevel(): void;
    /**
     * This will reset the current level.
     *
     * @returns {void}
     */
    resetCurrentLevel(): void;
    /**
     * This will navigate to the level summary.
     *
     * @returns {void}
     */
    levelSummary(): void;
    /**
     * This will start drawing the stage.
     *
     * @returns {void}
     */
    startDraw(): void;
    /**
     * This will stop drawing the stage.
     *
     * @returns {void}
     */
    stopDraw(): void;
    /**
     * This will start the stage.
     *
     * @returns {void}
     */
    startStage(): void;
    /**
     * This will stop the stage.
     *
     * @returns {void}
     */
    stopStage(): void;
}
import { Stage } from './stage.js';
