/**
 * Iterator
 *
 * This class will handle the iteration of options.
 *
 * @class
 */
export class Iterator {
    /**
     * This will set up the iterator.
     *
     * @param {array} options
     * @param {function} callBack
     */
    constructor(options: any[], callBack: Function);
    options: any[];
    callBack: Function;
    selection: any;
    /**
     * This will get the option.
     *
     * @param {number} index
     * @returns {object|boolean}
     */
    get(index: number): object | boolean;
    /**
     * This will get the selected index.
     *
     * @returns {number}
     */
    getSelectedIndex(): number;
    /**
     * This will get the next option.
     *
     * @returns {*}
     */
    next(): any;
    /**
     * This will get the previous option.
     *
     * @returns {*}
     */
    previous(): any;
    /**
     * This will select the option.
     *
     * @param {number} index
     * @returns {object}
     */
    select(index: number): object;
    selectedIndex: number;
    /**
     * This will select the option.
     *
     * @param {object} option
     * @returns {object}
     */
    selectOption(option: object): object;
}
