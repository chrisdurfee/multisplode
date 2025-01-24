export namespace animate {
    namespace animating {
        let objects: any[];
        /**
         * This will add an animation.
         *
         * @param {object} object
         * @param {string} className
         * @param {number} timer
         */
        function add(object: object, className: string, timer: number): void;
        /**
         * This will remove an animation from an element.
         *
         * @param {object} object
         * @param {string|number} removeClass
         */
        function remove(object: object, removeClass: string | number): void;
        /**
         * This will stop an animation timer.
         * @param {object} animation
         */
        function stopTimer(animation: object): void;
        /**
         * This will check if the element is animating.
         * @param {object} obj
         * @returns {array}
         */
        function checkAnimating(obj: object): any[];
        /**
         * This will stop previous animations still animating.
         * @param {object} obj
         */
        function stopPreviousAnimations(obj: object): void;
        /**
         * This will reset the objects.
         */
        function reset(): void;
    }
    /**
     * This will create an animation.
     *
     * @param {object} obj
     * @param {string} animationClass
     * @param {number} duration
     * @param {function} callBack
     * @param {function} endCallBack
     * @returns {void}
     */
    function create(obj: object, animationClass: string, duration: number, callBack: Function, endCallBack: Function): void;
    /**
     * This will add an animation then hide the element.
     *
     * @param {object} object
     * @param {string} animationClass
     * @param {number} duration
     * @param {function} endCallBack
     * @returns {void}
     */
    function hide(object: object, animationClass: string, duration: number, endCallBack: Function): void;
    /**
     * This will add an animation then show the element.
     *
     * @param {object} object
     * @param {string} animationClass
     * @param {number} duration
     * @param {function} endCallBack
     */
    function show(object: object, animationClass: string, duration: number, endCallBack: Function): void;
    /**
     * This will add an animation to the element.
     *
     * @param {object} object
     * @param {string} animationClass
     * @param {number} duration
     * @param {function} endCallBack
     */
    function set(object: object, animationClass: string, duration: number, endCallBack: Function): void;
}
