/**
 * Stage
 *
 * This will handle the game stage.
 *
 * @class
 */
export class Stage {
    /**
     * This will set up the game stage.
     *
     * @param {number} targetWidth
     * @param {number} targetHeight
     * @param {object} game
     */
    constructor(targetWidth: number, targetHeight: number, game: object);
    game: any;
    targetSize: any;
    size: any;
    fps: number;
    canvas: any;
    context: any;
    levelController: any;
    mouse: any;
    /**
     * @type {number|null} animationId
     */
    animationId: number | null;
    buffer: Buffer;
    /**
     * This will set up the game stage.
     *
     * @returns {void}
     */
    setup(): void;
    drawBind: any;
    /**
     * This will set up the canvas.
     *
     * @param {object} canvas
     * @returns {void}
     */
    setCanvas(canvas: object): void;
    /**
     * This will set up the events for the game.
     *
     * @returns {void}
     */
    setupEvents(): void;
    addEvent: () => void;
    removeEvent: () => void;
    /**
     * This will set up the mouse events.
     *
     * @returns {void}
     */
    setupMouse(): void;
    /**
     * This will interact with the stage.
     *
     * @param {number} mouseX
     * @param {number} mouseY
     * @returns {void}
     */
    interact(mouseX: number, mouseY: number): void;
    /**
     * This will get the interaction position.
     *
     * @param {object} e
     * @returns {array}
     */
    getInteractPositions(e: object): any[];
    /**
     * This will get the event position.
     *
     * @param {object} e
     * @returns {void}
     */
    getEventPosition(e: object): void;
    /**
     * This will get the mouse position.
     *
     * @param {object} e
     * @returns {void}
     */
    mousePosition(e: object): void;
    /**
     * This will handle the mouse down event.
     *
     * @param {object} e
     * @returns {void}
     */
    mouseDown(e: object): void;
    /**
     * This will handle the mouse up event.
     *
     * @returns {void}
     */
    mouseUp(): void;
    /**
     * This will get the container size.
     *
     * @returns {object}
     */
    getContainerSize(): object;
    canvasBoundBox: any;
    /**
     * This will resize the canvas.
     *
     * @returns {void}
     */
    resize(): void;
    scaleRatio: number;
    /**
     * This will scale the canvas.
     *
     * @param {object} containerSize
     * @param {object} canvas
     * @returns {void}
     */
    scale(containerSize: object, canvas: object): void;
    /**
     * This will draw the game.
     *
     * @returns {void}
     */
    draw(): void;
    /**
     * This will render from the buffer.
     *
     * @param {number} width
     * @param {number} height
     * @param {object} backBuffer
     * @returns {void}
     */
    renderFromBuffer(width: number, height: number, backBuffer: object): void;
    /**
     * This will start drawing.
     *
     * @returns {void}
     */
    startDraw(): void;
    /**
     * This will stop drawing.
     *
     * @returns {void}
     */
    stopDraw(): void;
    /**
     * This will set up the buffer.
     *
     * @returns {void}
     */
    setupBuffer(): void;
}
import { Buffer } from './buffer.js';
