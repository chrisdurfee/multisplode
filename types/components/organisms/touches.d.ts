/**
 * Touches
 *
 * This will create the touch icons.
 *
 * @class
 */
export class Touches extends Component {
    /**
     * This will set up the data.
     *
     * @returns {object}
     */
    beforeSetup(): object;
    level: any;
    /**
     * This will render the touch icons.
     *
     * @returns {object}
     */
    render(): object;
    /**
     * This will set up the touch icons.
     *
     * @returns {object}
     */
    setupTouches(): object;
    /**
     * This will select a touch icon.
     *
     * @returns {object}
     */
    select(): object;
    /**
     * This will reset the touch icons.
     *
     * @returns {void}
     */
    reset(): void;
    limit: number;
    current: number;
}
import { Component } from "@base-framework/base";
