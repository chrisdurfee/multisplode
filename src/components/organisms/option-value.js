import { Button, Div } from "@base-framework/atoms";
import { Component } from "@base-framework/base";
import { Iterator } from "./iterator.js";

/**
 * OptionValue
 *
 * This will render the option value.
 *
 * @class
 */
export class OptionValue extends Component
{
    /**
     * This will set up the iterator.
     *
     * @returns {void}
     */
    onCreated()
    {
        this.iterator = new Iterator(this.options, this.change.bind(this));
        this.iterator.selectOption(this.data[this.dataProp]);
    }

    /**
     * This will render the value container.
     *
     * @returns {object}
     */
    render()
    {
        return Div({ class: 'value-container' }, [
            Button({ class: 'value-button arrow prev', click: this.previous.bind(this) }),
            Button({ class: 'value-button', click: this.next.bind(this) }, '[[' + this.dataProp + ']]'),
            Button({ class: 'value-button arrow next', click: this.next.bind(this)})
        ]);
    }

    /**
     * This will change the option.
     *
     * @param {string} option
     * @returns {void}
     */
    change(option)
    {
        this.data.set(this.dataProp, option);
        this.data.store();
    }

    /**
     * This will t=go to the next option.
     *
     * @returns {void}
     */
    next()
    {
        this.iterator.next();
    }

    /**
     * This will go to the previous option.
     *
     * @returns {void}
     */
    previous()
    {
        this.iterator.previous();
    }
}