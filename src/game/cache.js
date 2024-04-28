/**
 * Cache
 *
 * This will cache an image to a canvas element.
 *
 * @type {object} Cache
 */
export const Cache =
{
	/**
	 * Thi will cache an image to a canvas element.
	 *
	 * @param {function} callBack
	 * @param {number} width
	 * @param {number} height
	 * @returns {object}
	 */
	add(callBack, width, height)
	{
		const canvas = this.createCacheCanvas(width, height);
		const ctx = canvas.getContext("2d");
		if (typeof callBack === 'function')
		{
			callBack(ctx);
		}
		return canvas;
	},

	/**
	 * This will create a canvas element.
	 *
	 * @param {number} width
	 * @param {number} height
	 * @returns {object}
	 */
	createCacheCanvas(width, height)
	{
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}
};