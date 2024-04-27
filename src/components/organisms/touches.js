import { Div, Section } from "@base-framework/atoms";
import { Component, Data } from "@base-framework/base";
import { Levels } from "../../game/level/levels";

/**
 * This will create a touch icon.
 *
 * @param {object} item
 * @param {number} index
 * @param {object} data
 * @returns {object}
 */
const Touch = (item, index, data) =>
{
    const type = item.type || 'Shockwave';
    return Div({
        class: 'touch-icon circle ' + type.toLowerCase(),
        onSet: [data, 'selected', { inactive: true}]
    });
};

/**
 * Touches
 *
 * This will create the touch icons.
 *
 * @class
 */
export class Touches extends Component
{
    /**
     * This will set up the data.
     *
     * @returns {object}
     */
    beforeSetup()
    {
        this.level = Levels.currentLevel;
        this.level.setUpdateTouchCallBack(() => this.select());

        this.data = new Data();
        this.reset();
    }

    /**
     * This will render the touch icons.
     *
     * @returns {object}
     */
    render()
    {
        return Section({ class: 'option-group level-touches' }, [
            Div({ id: 'levelTouches', cache: 'levelTouces', class: 'value touch-container title-text', for: ['touches', Touch] }),
            Div({ class: 'label title-text' }, 'Touches')
        ]);
    }

    /**
     * This will set up the touch icons.
     *
     * @returns {object}
     */
    setupTouches()
    {
        const devices = this.level.devices;
        const touches = [];
        for (let prop in devices)
        {
            const count = devices[prop];
            for (let i = 0; i < count; i++)
            {
                this.limit++;
                touches.push({
                    type: prop,
                    selected: false
                });
            }
        }

        return touches;
    }

    /**
     * This will select a touch icon.
     *
     * @returns {object}
     */
    select()
    {
        let selected = false;
        if (this.current >= 0)
        {
            const options = this.data.touches;
            const option = options[this.current];
            if (option.selected === false)
            {

                selected = option;
                option.selected = true;
                this.current--;
            }
        }
        return selected;
    }

    /**
     * This will reset the touch icons.
     *
     * @returns {void}
     */
    reset()
    {
        this.limit = 0;
        this.data.set('touches', this.setupTouches());
        this.current = this.limit - 1;
    }
}