/**
 * Page
 *
 * This will create a base page.
 *
 * @class
 */
export class Page extends Component {
    /**
     * This will render the page.
     *
     * @returns {object}
     */
    render(): object;
    /**
     * This will be called every time the route
     * is activated.
     *
     * @param {object} params
     */
    update(params: object): void;
}
import { Component } from '@base-framework/base';
