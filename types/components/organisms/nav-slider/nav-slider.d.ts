/**
 * NavSlider
 *
 * This will create the nav slider.
 *
 * @class
 */
export class NavSlider extends Component {
    viewNumber: any;
    optionsArray: any;
    selection: any;
    index: number;
    moveX: any;
    startX: number;
    contact: boolean;
    /**
     * This will render the touch slider.
     *
     * @returns {object}
     */
    render(): object;
    /**
     * This will get the events.
     *
     * @returns {object}
     */
    getEvents(): object;
    setupEvents(): any[][];
    /**
     * This will select the first step.
     *
     * @returns {void}
     */
    selectPrimaryStep(): void;
    reset(): void;
    getParentWidth(): void;
    parentWidth: any;
    /**
     * This will get the steps.
     *
     * @returns {void}
     */
    getOptions(): void;
    moveToSelectedElement(element: any): void;
    moveToSelectedOption(option: any): void;
    moveToSelectedIndex(index: any): void;
    selectOptionByIndex(index: any): boolean;
    getOptionByElement(element: any): any;
    selectPrimaryOption(): void;
    selectOption(option: any, cancelCallBack: any): void;
    updateSelectOption(selection: any): void;
    resize(): void;
    getEventX(e: any): number;
    start(e: any): void;
    move(e: any): boolean;
    posX: number;
    moveContainer(number: any): void;
    checkSelectedElement(): void;
    moveToElement(element: any): void;
    getElementOffset(element: any): {
        x: any;
        y: any;
        width: any;
        height: any;
    };
    contains(element: any, x: any, y: any): boolean;
    end(e: any): void;
}
import { Component } from "@base-framework/base";
