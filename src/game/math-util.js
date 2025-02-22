/**
 * @type {number} ARC
 */
export const ARC = (Math.PI * 2);

/**
 * @type {number} DEGREES_PI
 */
export const DEGREES_PI = 180 / Math.PI;

/**
 * @type {number} RADIANS_PI
 */
export const RADIANS_PI = Math.PI / 180;

/**
 * MathUtil
 *
 * This will add helper functions for MathUtil.
 *
 * @type {object} MathUtil
 */
export const MathUtil =
{
	/**
	 * This will get a random number from a range.
	 *
	 * @param {number} start
	 * @param {number} end
	 * @param {boolean} roundNumber
	 * @returns {number}
	 */
	randomFromTo(start, end, roundNumber)
	{
		roundNumber = (typeof roundNumber !== 'undefined')? true : roundNumber;
		if (roundNumber)
		{
			return this.floor(Math.random() * (end - start + 1) + start);
		}

		return Math.random() * (end - start + 1) + start;
	},

	/**
	 * @type {number} ARC
	 */
	arc: ARC,

	/**
	 * This will check if two circles collide.
	 *
	 * @param {number} aX
	 * @param {number} aY
	 * @param {number} aRadius
	 * @param {number} bX
	 * @param {number} bY
	 * @param {number} bRadius
	 * @returns {boolean}
	 */
	checkCircluarCollision(aX, aY, aRadius, bX, bY, bRadius)
	{
		const dX = aX - bX;
		const dY = aY - bY;

		const distance = (dX*dX + dY*dY);
		return (distance <= (aRadius + bRadius) * (aRadius + bRadius));
	},

	/**
	 * This will get the orbit position.
	 *
	 * @param {number} centerX
	 * @param {number} centerY
	 * @param {number} angle
	 * @param {number} radius
	 * @returns {object}
	 */
	getOrbitPosition(centerX, centerY, angle, radius)
	{
		return {
			x: centerX + Math.cos(angle) * radius,
			y: centerY + Math.sin(angle) * radius
		};
	},

	/**
	 * This will update the orbit angle.
	 *
	 * @param {number} angle
	 * @param {number} speed
	 * @param {boolean} clockWize
	 * @returns {number}
	 */
	updateOrbitAngle(angle, speed, clockWize)
	{
		clockWize = (typeof clockWize === 'undefined')? true : clockWize;
		if (clockWize)
		{
			return angle + speed;
		}

		return angle - speed;
	},

	spiral(radius, speed)
	{
		return radius + speed;
	},

	/**
	 * @type {number} degreesPI
	 */
	degreesPI: DEGREES_PI,

	/**
	 * This will get the degrees from radians.
	 *
	 * @param {number} radians
	 * @returns {number}
	 */
	getDegrees(radians)
	{
		return radians * DEGREES_PI;
	},

	/**
	 * @type {number} radiansPI
	 */
	radiansPI: RADIANS_PI,

	/**
	 * This will get the radians from degrees.
	 *
	 * @param {number} degrees
	 * @returns {number}
	 */
	getRadians(degrees)
	{
		return degrees * RADIANS_PI;
	},

	/**
	 * This will get the slope.
	 *
	 * @param {number} aX
	 * @param {number} aY
	 * @param {number} bX
	 * @param {number} bY
	 * @returns {number}
	 */
	getSlope(aX, aY, bX, bY)
	{
		const x = aX - bX,
		y = aY - bY;

		return y / x;
	},

	/**
	 * This will get the angle.
	 *
	 * @param {number} aX
	 * @param {number} aY
	 * @param {number} bX
	 * @param {number} bY
	 * @returns {number}
	 */
	getAngle(aX, aY, bX, bY)
	{
		/* this will get our angle */
		const positionX = aX - bX;
		const positionY = aY - bY;

		//angle in radians
		const radians = Math.atan2(positionY, positionX);
		/* angle in degrees */
		return this.getDegrees(radians);
	},

	/**
	 * This will get the position by angle.
	 *
	 * @param {number} angle
	 * @param {number} magnitude
	 * @returns {object}
	 */
	getPositionByAngle(angle, magnitude)
	{
		const radians = this.getRadians(angle);
		return {
			x: Math.cos(radians) * magnitude,
			y: Math.sin(radians) * magnitude
		};
	},

	/**
	 * This will get the distance.
	 *
	 * @param {number} aX
	 * @param {number} aY
	 * @param {number} bX
	 * @param {number} bY
	 * @returns {number}
	 */
	getDistance(aX, aY, bX, bY)
	{
		const dx = aX - bX;
		const dy = aY - bY;

		return Math.sqrt(dx*dx + dy*dy);
	},

	/**
	 * This will get the next position.
	 *
	 * @param {number} aX
	 * @param {number} aY
	 * @param {number} bX
	 * @param {number} bY
	 * @param {number} speed
	 * @returns {object}
	 */
	getNextPosition(aX, aY, bX, bY, speed)
	{
		const distance = this.getDistance(aX, aY, bX, bY);
		const moves = this.getMovementBySpeed(distance, speed);

		return {
			x: (bX - aX) / moves,
			y: (bY - aY) / moves
		};
	},

	/**
	 * This will get the distance.
	 *
	 * @param {object} p1
	 * @param {object} p2
	 * @returns {number}
	 */
	distance(p1, p2)
    {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    },

	/**
	 * This will get the movement by speed.
	 *
	 * @param {number} distance
	 * @param {number} speed
	 * @returns {number}
	 */
	getMovementBySpeed(distance, speed)
	{
		return distance / speed;
	},

	/**
	 * This will round a number.
	 *
	 * @param {number} number
	 * @returns {number}
	 */
	round(number)
	{
		return ~~ (0.5 + number);
	},

	/**
	 * This will floor a numnber.
	 *
	 * @param {number} number
	 * @returns {number}
	 */
	floor(number)
	{
		return ~~number;
	}
};