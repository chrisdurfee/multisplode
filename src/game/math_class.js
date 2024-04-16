
export const math =
{

	/* this will return a random number
	 within the from and to numbers */
	randomFromTo(start, end, roundNumber)
	{
		roundNumber = (typeof roundNumber !== 'undefined')? true : roundNumber;
		let mth = Math;
		if(roundNumber)
		{
			return mth.floor(mth.random() * (end - start + 1) + start);
		}
		else
		{
			return mth.random() * (end - start + 1) + start;
		}
	},

	checkCircluarCollision(aX, aY, aRadius, bX, bY, bRadius)
	{
		let dX = aX - bX;
		let dY = aY - bY;

		let distance = (dX*dX + dY*dY);
		if(distance <= (aRadius + bRadius) * (aRadius + bRadius))
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	/* this will get the next position of an orbiting object */
	getOrbitPosition(centerX, centerY, angle, radius)
	{
		let mth = Math;
		return {
			x: centerX + mth.cos(angle) * radius,
			y: centerY + mth.sin(angle) * radius
		};
	},

	updateOrbitAngle(angle, speed, clockWize)
	{
		clockWize = (typeof clockWize === 'undefined')? true : clockWize;
		if(clockWize)
		{
			return angle + speed;
		}
		else
		{
			return angle - speed;
		}
	},

	getBezierCurve(p0, p1, p2, p3, time)
	{
		let t = time;

		let cx = 3 (p1.x - p0.x),
		bx = 3 (p2.x - p1.x) - cx,
		ax = p3.x - p0.x - cx - bx,
		cy = 3 (p1.y - p0.y),
		by = 3 (p2.y - p1.y),
		ay = p3.y - p0.y - cy - by;

		let xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
		let yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;
	},

	spiral(radius, speed)
	{
		return radius + speed;
	},

	degreesPI: 180 / Math.PI,

	getDegrees(radians)
	{
		let degrees = radians * this.degreesPI;
		return degrees;
	},

	radiansPI: Math.PI / 180,

	getRadians(degrees)
	{
		let radians = degrees * this.radiansPI;
		return radians;
	},

	getSlope(aX, aY, bX, bY)
	{
		let x = aX - bX,
		y = aY - bY;

		let slope = y / x;
		return slope;
	},

	getAngle(aX, aY, bX, bY)
	{
		/* this will get our angle */
		let positionX = aX - bX;
		let positionY = aY - bY;

		//angle in radians
		let radians = Math.atan2(positionY, positionX);
		/* angle in degrees */
		return this.getDegrees(radians);
	},

	getPositionByAngle(angle, magnitude)
	{
		let mth = Math;
		let radians = this.getRadians(angle);
		return {
			x: mth.cos(radians) * magnitude,
			y: mth.sin(radians) * magnitude
		};
	},

	getDistance(aX, aY, bX, bY)
	{
		let dx = aX - bX;
		let dy = aY - bY;

		let distance = Math.sqrt(dx*dx + dy*dy);
		return distance;
	},

	getNextPosition(aX, aY, bX, bY, speed)
	{
		let distance = this.getDistance(aX, aY, bX, bY);
		let moves = this.getMovementBySpeed(distance, speed);

		return {
			x: (bX - aX) / moves,
			y: (bY - aY) / moves
		};
	},

	getMovementBySpeed(distance, speed)
	{
		let moves = distance / speed;
		return moves;
	},

	round(number)
	{
		return ~~ (0.5 + number);
	},

	floor(number)
	{
		return ~~number;
	}
};