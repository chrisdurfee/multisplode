/**
 * Toggle
 *
 * This will create a toggle.
 *
 * @class
 */
export class Toggle extends Component {
    /**
     * This will render the toggle.
     *
     * @returns {object}
     */
    render(): object;
    /**
     * This will check if the checkbox is checked.
     *
     * @param {object} e
     * @returns {boolean}
     */
    isChecked(e: object): boolean;
    /**
     * This will set the checked state of the checkbox.
     *
     * @returns {void}
     */
    change(): void;
    checked: boolean;
    /**
     * This will toggle the checkbox.
     *
     * @returns {void}
     */
    toggle(): void;
}
import { Component } from "@base-framework/base";
