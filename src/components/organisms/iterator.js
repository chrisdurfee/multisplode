export class Iterator
{
    constructor(options, callBack)
    {
        this.options = options;
        this.callBack = callBack;
        this.selection = null;
    }

    get(index)
    {
        const options = this.options;
        return options[index] || false;
    }

    getSelectedIndex()
    {
        return (typeof this.selectedIndex !== 'undefined')? this.selectedIndex : 0;
    }

    next()
    {
        let selectedIndex = this.getSelectedIndex();
        const index = (selectedIndex < this.options.length - 1)? ++selectedIndex : 0;
        return this.select(index);
    }

    previous()
    {
        let selectedIndex = this.getSelectedIndex();
        const index = (selectedIndex > 0)? --selectedIndex : this.options.length - 1;
        return this.select(index);
    }

    select(index)
    {
        const option = this.get(index);
        if (option !== false)
        {
            this.selection = option;
            this.selectedIndex = index;

            if (this.callBack)
            {
                this.callBack(option);
            }
        }
        return option;
    }

    selectOption(option)
    {
        const index = this.options.indexOf(option);
        if (index > -1)
        {
            option = this.select(index);
        }
        return option;
    }
}