/**
 * GameAudio
 *
 * This will render the game audio.
 *
 * @class
 */
export class GameAudio extends Component {
    /**
     * This will render the music.
     *
     * @returns {object}
     */
    render(): object;
    /**
     * This will get the file path.
     *
     * @returns {string}
     */
    getFilePath(): string;
    /**
     * This will chnage the music.
     *
     * @param {string} fileName
     * @returns {void}
     */
    change(fileName: string): void;
    fileName: any;
    /**
     * This will setup the states.
     *
     * @returns {object}
     */
    setupStates(): object;
    /**
     * This will start the music.
     *
     * @returns {void}
     */
    start(): void;
    /**
     * This will stop the music.
     *
     * @returns {void}
     */
    stop(): void;
}
import { Component } from "@base-framework/base";
