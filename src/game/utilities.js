/**
 * Utilities
 *
 * This will contain utility functions that can be used
 * throughout the game.
 */
export const Utilities =
{
	/**
	 * This will add an animation to an object and
	 * remove it after the duration has passed.
	 * @param {object} obj
	 * @param {string} animation
	 * @param {number} [duration]
	 * @returns {void}
	 */
	addAnimation(obj, animation, duration = 0)
	{
		if (!obj)
		{
			return;
		}

		const list = obj.classList;
		list.add(animation);
		window.setTimeout(() => list.remove(animation), duration);
	}
};