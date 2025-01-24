export namespace Sparks {
    let sparks: any[];
    let removed: any[];
    let maxRadius: number;
    let speed: number;
    /**
     * This will reset the sparks.
     *
     * @returns {void}
     */
    function reset(): void;
    /**
     * This will add a new spark.
     *
     * @param {number} tmpX
     * @param {number} tmpY
     * @param {string} color
     * @returns {void}
     */
    function add(tmpX: number, tmpY: number, color: string): void;
    /**
     * This will remove the spark.
     *
     * @param {object} spark
     */
    function remove(spark: object): void;
    /**
     * This will update the radius of the spark.
     *
     * @param {object} group
     */
    function updateRadius(group: object): void;
    /**
     * This will draw the sparks.
     *
     * @param {object} ctx
     */
    function draw(ctx: object): void;
}
