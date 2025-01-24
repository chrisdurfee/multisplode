/**
 * LevelPack
 *
 * This will create a level pack.
 *
 * @class
 */
export class LevelPack {
    /**
     * This will create a level pack.
     *
     * @param {object} game
     */
    constructor(game: object);
    /**
     * @type {object|null} controller
     */
    controller: object | null;
    label: string;
    game: any;
    /**
     * @type {array} levels
     */
    levels: any[];
    /**
     * This will setup the levels.
     *
     * @returns {array}
     */
    setupLevels(): any[];
    /**
     * This will create a level.
     *
     * @param {number} number
     * @param {array} settings
     * @param {string} levelPanelClass
     * @returns {object}
     */
    createLevel(number: number, settings: any[], levelPanelClass: string): object;
    /**
     * This will change the level.
     *
     * @param {object} level
     * @returns {void}
     */
    changeLevel(level: object): void;
    /**
     * This will setup the level.
     *
     * @param {number} level
     * @param {boolean} cancelPrompts
     * @returns {void}
     */
    setLevel(level: number, cancelPrompts: boolean): void;
    /**
     * This will get the summary.
     *
     * @returns {void}
     */
    levelSummary(): void;
}
