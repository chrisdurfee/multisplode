/**
 * OptionValue
 *
 * This will render the option value.
 *
 * @class
 */
export class OptionValue extends Component {
    iterator: Iterator;
    /**
     * This will render the value container.
     *
     * @returns {object}
     */
    render(): object;
    /**
     * This will change the option.
     *
     * @param {string} option
     * @returns {void}
     */
    change(option: string): void;
    /**
     * This will t=go to the next option.
     *
     * @returns {void}
     */
    next(): void;
    /**
     * This will go to the previous option.
     *
     * @returns {void}
     */
    previous(): void;
}
import { Component } from "@base-framework/base";
import { Iterator } from "./iterator.js";
