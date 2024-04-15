import { Button, Div } from "@base-framework/atoms";
import { Component, Data } from "@base-framework/base";
import { Data as Storage } from "../data.js";
import { Iterator } from "./iterator.js";

export class OptionValue extends Component
{
    onCreated()
    {
        this.iterator = new Iterator(this.options, this.change.bind(this));
    }

    render()
    {
        return Div({ class: 'value-container' }, [
            Button({ class: 'value-button arrow prev', click: this.previous.bind(this) }),
            Button({ class: 'value-button', click: this.next.bind(this) }, '[[option]]'),
            Button({ class: 'value-button arrow next', click: this.next.bind(this)})
        ]);
    }

    change(option)
    {
        this.data.option = option;
        Storage.set(this.dataProp, option);
    }

    setData()
    {
        return new Data({
            option: Storage.get(this.dataProp)
        });
    }

    next()
    {
        this.iterator.next();
    }

    previous()
    {
        this.iterator.previous();
    }
}