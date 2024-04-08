"use strict";

var math = {

	/* this will return a random number
	 within the from and to numbers */
	randomFromTo: function(start, end, roundNumber)
	{
		roundNumber = (typeof roundNumber !== 'undefined')? true : roundNumber;
		var mth = Math;
		if(roundNumber)
		{
			return mth.floor(mth.random() * (end - start + 1) + start);
		}
		else
		{
			return mth.random() * (end - start + 1) + start;
		}
	},

	checkCircluarCollision: function(aX, aY, aRadius, bX, bY, bRadius)
	{
		var dX = aX - bX;
		var dY = aY - bY;

		var distance = (dX*dX + dY*dY);
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
	getOrbitPosition: function(centerX, centerY, angle, radius)
	{
		var mth = Math;
		return {
			x: centerX + mth.cos(angle) * radius,
			y: centerY + mth.sin(angle) * radius
		};
	},

	updateOrbitAngle: function(angle, speed, clockWize)
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

	getBezierCurve: function(p0, p1, p2, p3, time)
	{
		var t = time;

		var cx = 3 (p1.x - p0.x),
		bx = 3 (p2.x - p1.x) - cx,
		ax = p3.x - p0.x - cx - bx,
		cy = 3 (p1.y - p0.y),
		by = 3 (p2.y - p1.y),
		ay = p3.y - p0.y - cy - by;

		var xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
		var yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;
	},

	spiral: function(radius, speed)
	{
		return radius + speed;
	},

	degreesPI: 180 / Math.PI,

	getDegrees: function(radians)
	{
		var degrees = radians * this.degreesPI;
		return degrees;
	},

	radiansPI: Math.PI / 180,

	getRadians: function(degrees)
	{
		var radians = degrees * this.radiansPI;
		return radians;
	},

	getSlope: function(aX, aY, bX, bY)
	{
		var x = aX - bX,
		y = aY - bY;

		var slope = y / x;
		return slope;
	},

	getAngle: function(aX, aY, bX, bY)
	{
		/* this will get our angle */
		var positionX = aX - bX;
		var positionY = aY - bY;

		//angle in radians
		var radians = Math.atan2(positionY, positionX);
		/* angle in degrees */
		return this.getDegrees(radians);
	},

	/* this will use a vector to calculate the next postion.
	@param (int) angle = the anglein degrees
	@param (mixed) magnitude = the object magnitude */
	getPositionByAngle: function(angle, magnitude)
	{
		var mth = Math;
		var radians = this.getRadians(angle);
		return {
			x: mth.cos(radians) * magnitude,
			y: mth.sin(radians) * magnitude
		};
	},

	/* this will get the distance between two points.
	@param (int) aX = the starting x position
	@param (int) aY = the starting y position
	@param (int) bX = the ending x position
	@param (int) bX = the ending y position */
	getDistance: function(aX, aY, bX, bY)
	{
		var dx = aX - bX;
		var dy = aY - bY;

		var distance = Math.sqrt(dx*dx + dy*dy);
		return distance;
	},

	/* this will get the next position for an animation
	by getting the distance between two points and using
	the speed to tge the next position.
	@param (int) aX = the starting x position
	@param (int) aY = the starting y position
	@param (int) bX = the ending x position
	@param (int) bX = the ending y position
	@param (mixed) speed = the object speed
	*/
	getNextPosition: function(aX, aY, bX, bY, speed)
	{
		var distance = this.getDistance(aX, aY, bX, bY);
		var moves = this.getMovementBySpeed(distance, speed);

		return {
			x: (bX - aX) / moves,
			y: (bY - aY) / moves
		};
	},

	getMovementBySpeed: function(distance, speed)
	{
		var moves = distance / speed;
		return moves;
	},

	round: function(number)
	{
		return ~~ (0.5 + number);
	},

	floor: function(number)
	{
		return ~~number;
	}
};