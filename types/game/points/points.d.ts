export namespace Points {
    let gamePoints: any[];
    let removed: any[];
    /**
     * This will reset the points.
     *
     * @returns {void}
     */
    function reset(): void;
    /**
     * This will get all the points.
     *
     * @returns {array}
     */
    function getAll(): any[];
    /**
     * This will add a new point.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {number} value
     * @returns {object}
     */
    function add(tmpX: number, tmpY: number, value: number): object;
    /**
     * This will remove the point.
     *
     * @param {object} point
     */
    function remove(point: object): void;
    /**
     * This will draw the points.
     *
     * @param {object} ctx
     */
    function draw(ctx: object): void;
}
