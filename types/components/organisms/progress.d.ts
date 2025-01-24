/**
 * Progress
 *
 * This will create a progress bar.
 *
 * @class
 */
export class Progress extends Component {
    length: any;
    progress: any;
    /**
     * This will render the progress bar.
     *
     * @returns {object}
     */
    render(): object;
    /**
     * This will setup the progress bar.
     *
     * @returns {object}
     */
    afterSetup(): object;
    element: HTMLElement;
    /**
     * This will modify the transition of the element.
     *
     * @param {number} time
     * @returns {void}
     */
    modifyTransition(time: number): void;
    /**
     * This will update the element to show the
     * current progress by adding the current stroke.
     *
     * @param {number} number
     * @param {number} total
     * @returns {void}
     */
    update(number: number, total: number): void;
    /**
     * This will change the stroke offset of the element.
     *
     * @param {number} number
     * @returns {void}
     */
    changeStrokeOffset(number: number): void;
    /**
     * This will reset the progress bar.
     *
     * @returns {void}
     */
    reset(): void;
}
import { Component } from "@base-framework/base";
