import { Checkbox, Div, Label } from "@base-framework/atoms";
import { Component } from "@base-framework/base";

/**
 * Toggle
 *
 * This will create a toggle.
 *
 * @class
 */
export class Toggle extends Component
{
    /**
     * This will render the toggle.
     *
     * @returns {object}
     */
    render()
    {
        const checkboxId = this.getId('checkbox');
        return Div( { class: 'data-toggle-panel' }, [
            Checkbox({ id: checkboxId, cache: 'checkbox', class: 'toggle', change: this.change.bind(this), checked: this.checked }),
            Label({ class: 'toggle-bttn', htmlFor: checkboxId })
        ]);
    }

    /**
     * This will check if the checkbox is checked.
     *
     * @param {object} e
     * @returns {boolean}
     */
    isChecked(e)
    {
        // @ts-ignore
        return this.checkbox.checked;
    }

    /**
     * This will set the checked state of the checkbox.
     *
     * @returns {void}
     */
    change()
    {
        this.checked = this.isChecked();

        // @ts-ignore
        if (this.callBack)
        {
            // @ts-ignore
            this.callBack(this.checked);
        }
    }

    /**
     * This will toggle the checkbox.
     *
     * @returns {void}
     */
    toggle()
    {
        const checked = this.isChecked();

        // @ts-ignore
        this.checkbox.checked = !checked;
    }
}