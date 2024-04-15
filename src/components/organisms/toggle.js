import { Checkbox, Div, Label } from "@base-framework/atoms";
import { Component } from "@base-framework/base";

export class Toggle extends Component
{
    render()
    {
        const checkboxId = this.getId('checkbox');
        return Div( { class: 'data-toggle-panel' }, [
            Checkbox({ id: checkboxId, cache: 'checkbox', class: 'toggle', change: this.change.bind(this), checked: this.checked }),
            Label({ class: 'toggle-bttn', htmlFor: checkboxId })
        ]);
    }

    isChecked(e)
    {
        return this.checkbox.checked;
    }

    change()
    {
        this.checked = this.isChecked();
        if (this.callBack)
        {
            this.callBack(this.checked);
        }
    }

    toggle()
    {
        const checked = this.isChecked();
        this.checkbox.checked = !checked;
    }
}