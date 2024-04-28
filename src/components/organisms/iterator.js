/**
 * Iterator
 *
 * This class will handle the iteration of options.
 *
 * @class
 */
export class Iterator
{
    /**
     * This will set up the iterator.
     *
     * @param {array} options
     * @param {function} callBack
     */
    constructor(options, callBack)
    {
        this.options = options;
        this.callBack = callBack;
        this.selection = null;
    }

    /**
     * This will get the option.
     *
     * @param {number} index
     * @returns {object|boolean}
     */
    get(index)
    {
        const options = this.options;
        return options[index] || false;
    }

    /**
     * This will get the selected index.
     *
     * @returns {number}
     */
    getSelectedIndex()
    {
        return (typeof this.selectedIndex !== 'undefined')? this.selectedIndex : 0;
    }

    /**
     * This will get the next option.
     *
     * @returns {*}
     */
    next()
    {
        let selectedIndex = this.getSelectedIndex();
        const index = (selectedIndex < this.options.length - 1)? ++selectedIndex : 0;
        return this.select(index);
    }

    /**
     * This will get the previous option.
     *
     * @returns {*}
     */
    previous()
    {
        let selectedIndex = this.getSelectedIndex();
        const index = (selectedIndex > 0)? --selectedIndex : this.options.length - 1;
        return this.select(index);
    }

    /**
     * This will select the option.
     *
     * @param {number} index
     * @returns {object}
     */
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

    /**
     * This will select the option.
     *
     * @param {object} option
     * @returns {object}
     */
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