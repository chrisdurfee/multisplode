import { Button, Div } from "@base-framework/atoms";
import { Component, Data } from "@base-framework/base";
import { Data as Storage } from "../data.js";
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
            Button({ class: 'value-button', click: this.next.bind(this) }, '[[option]]'),
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
        this.data.option = option;
        Storage.set(this.dataProp, option);
    }

    /**
     * This will set the data.
     *
     * @returns {object}
     */
    setData()
    {
        return new Data({
            option: Storage.get(this.dataProp)
        });
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