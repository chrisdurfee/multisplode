/**
 * TouchSlider
 *
 * This will create the touch slider.
 *
 * @class
 */
export class TouchSlider extends Component {
    viewNumber: any;
    steps: any;
    index: any;
    stepWidth: any;
    /**
     * @member {object} slider
     */
    slider: any;
    minimum: number;
    moveX: any;
    startX: any;
    moveY: any;
    startY: any;
    contact: boolean;
    preventTouch: boolean;
    preventScroll: boolean;
    /**
     * This will render the touch slider.
     *
     * @returns {object}
     */
    render(): object;
    /**
     * This will setup the states.
     *
     * @returns {object}
     */
    setupStates(): object;
    /**
     * This will get the events.
     *
     * @returns {object}
     */
    getEvents(): object;
    /**
     * This will get the steps.
     *
     * @returns {void}
     */
    getSteps(): void;
    /**
     * This will move to the selected element.
     *
     * @param {object} element
     * @returns {void}
     */
    moveToSelectedElement(element: object): void;
    /**
     * This will move to the selected step.
     *
     * @param {object} step
     * @returns {void}
     */
    moveToSelectedStep(step: object): void;
    /**
     * This will move to the selected index.
     *
     * @param {number} index
     * @returns {void}
     */
    moveToSelectedIndex(index: number): void;
    /**
     * This will get a step by index.
     *
     * @param {number} index
     * @returns {boolean}
     */
    selectStepByIndex(index: number): boolean;
    /**
     * This will get the step by element.
     *
     * @param {object} element
     * @returns {object|boolean}
     */
    getStepByElement(element: object): object | boolean;
    /**
     * This will select the first step.
     *
     * @returns {void}
     */
    selectPrimaryStep(): void;
    /**
     * This will select the step.
     *
     * @param {object} step
     * @param {boolean} [cancelCallBack]
     * @returns {void}
     */
    selectStep(step: object, cancelCallBack?: boolean): void;
    /**
     * This will update the selected step.
     *
     * @param {object} selectedStep
     * @returns {void}
     */
    updateSelectStep(selectedStep: object): void;
    /**
     * This will get the step width.
     *
     * @returns {void}
     */
    getStepWidth(): void;
    /**
     * This will check if the panel can move.
     *
     * @member {boolean|null}
     */
    canMove: any;
    /**
     * This will check if the panel should move.
     *
     * @returns {boolean}
     */
    shouldMove(): boolean;
    /**
     * This will start the panel.
     *
     * @param {object} e
     * @returns {void}
     */
    start(e: object): void;
    /**
     * This will move the panel.
     *
     * @param {object} e
     * @returns {boolean|void}
     */
    move(e: object): boolean | void;
    /**
     * This will move the container.
     *
     * @param {number|string} number
     * @returns {void}
     */
    moveContainer(number: number | string): void;
    /**
     * This will end the touch event.
     *
     * @param {object} e
     * @returns {void}
     */
    end(e: object): void;
}
import { Component } from "@base-framework/base";
