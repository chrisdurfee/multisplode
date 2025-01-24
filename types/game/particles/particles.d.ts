export namespace Particles {
    let particles: any[];
    let removed: any[];
    /**
     * This will reset the particles.
     *
     * @returns {void}
     */
    function reset(): void;
    /**
     * This will get all the particles.
     *
     * @returns {array}
     */
    function getAll(): any[];
    /**
     * This will add a new particle.
     *
     * @param {string} [type]
     * @param {object} [settings]
     * @returns {object}
     */
    function add(type?: string, settings?: object): object;
    /**
     * This will remove the particle.
     *
     * @param {object} partical
     */
    function remove(partical: object): void;
}
