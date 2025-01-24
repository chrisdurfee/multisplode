/**
 * Buffer
 *
 * This class will create a buffer canvas.
 *
 * @class Buffer
 */
export class Buffer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    /**
     * This will setup our buffer canvas.
     *
     * @returns {void}
     */
    setup(): void;
    /**
     * This will create our buffer canvas.
     *
     * @returns {void}
     */
    createBufferCanvas(): void;
    /**
     * This will resize our buffer canvas.
     *
     * @param {object} size
     * @returns {void}
     */
    resize(size: object): void;
}
