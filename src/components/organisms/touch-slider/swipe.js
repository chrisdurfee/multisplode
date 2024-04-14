/**
 * Swipe
 *
 * This is helper class to handle swipe events.
 *
 * @class
 */
export class Swipe
{
	/**
	 * This will get the event position.
	 *
	 * @param {object} e
	 * @returns {object}
	 */
	static getEventPosition(e)
	{
		const position = {
			x: 0,
			y: 0
		};

		if (e)
		{
			const touches = e.touches;
			if (touches)
			{
				const touch = touches[0];
				position.x = touch.pageX;
				position.y = touch.pageY;
			}
			else
			{
				position.x = e.clientX || e.pageX;
				position.y = e.clientY || e.pageY;
			}
		}
		return position;
	}

	/**
	 * This will calculate the swipe angle.
	 *
	 * @returns {number}
	 */
    static calculateAngle()
	{
		const positionX = this.startX - this.moveX,
		positionY = this.moveY - this.startY;

		/* we need to get the distance */
		//let z = Math.round(Math.sqrt(Math.pow(positionX, 2) + Math.pow(positionY, 2)));
		//angle in radians
		const r = Math.atan2(positionY, positionX);

		//angle in degrees
		let swipeAngle = Math.round(r * 180 / Math.PI);
		if (swipeAngle < 0)
		{
			swipeAngle =  360 - Math.abs(swipeAngle);
		}
		return swipeAngle;
	}

	/**
	 * This will get the swipe direction.
	 *
	 * @param {number} angle
	 * @returns {string}
	 */
	static getSwipeDirection(angle)
	{
		let direction;
		if (angle <= 45 && angle >= 0)
		{
			direction = 'left';
		}
		else if (angle <= 360 && angle >= 315)
		{
			direction = 'left';
		}
		else if (angle >= 135 && angle <= 225)
		{
			direction = 'right';
		}
		else if (angle > 45 && angle < 135)
		{
			direction = 'down';
		}
		else
		{
			direction = 'up';
		}
		return direction;
	}

	/**
	 * This will check if the swipe is left or right.
	 *
	 * @returns {boolean}
	 */
	isLeftRight()
	{
		const angle = this.calculateAngle();
		const direction = this.getSwipeDirection(angle);
		return (direction === 'left' || direction === 'right');
	}
}