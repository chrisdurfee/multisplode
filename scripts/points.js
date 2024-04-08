"use strict";

var Points = 
{ 
	gamePoints: [], 
	removed: [], 
	cache: {}, 
	
	reset: function() 
	{ 
		this.gamePoints = []; 
		this.removed = []; 
	}, 
	
	getAll:function() 
	{ 
		return this.gamePoints; 
	},
	
	add: function(tmpX, tmpY, value)
	{ 
		var pointObj = new Point(tmpX, tmpY, value); 
		this.gamePoints[this.gamePoints.length] = pointObj; 
		return pointObj; 
	}, 
	
	remove: function(point)
	{ 
		var gamePoints = this.gamePoints, 
		index = gamePoints.indexOf(point); 
		if(index > -1) 
		{ 
			gamePoints.splice(index, 1); 
			/* we need to add to the removed array to 
			delay the gc durring gameplay */
			this.removed[this.removed.length] = point;
		}
	}, 
	
	draw: function(ctx) 
	{ 
		ctx.beginPath(); 
		var gamePoints = this.gamePoints; 
		for(var i = (gamePoints.length - 1); i >= 0; i--)
		{ 
			var pointText = gamePoints[i]; 
			if(math.round(pointText.distance) >= pointText.maxDistance)
			{ 
				//remove object from points array 
				this.remove(pointText); 
			}
			else
			{ 
				pointText.move(); 
				pointText.draw(ctx); 
			} 
		} 
		//ctx.globalAlpha = 0;
		ctx.closePath(); 
	}
}; 
		
var Point = function(tmpX, tmpY, value)
{ 
	this.number = (typeof Point.number === 'undefined')? Point.number = 0 : (++Point.number); 
	this.id = this.number; 
	
	this.position = { x: tmpX, y: tmpY }; 
	this.size = 20; 
	
	this.fillColor = '#FFFFFF'; 
	this.opacity = 1; 
	this.text = '+' + value; 
	this.value = value; 
	this.distance = 0;
	this.maxDistance = 3;   
	
	this.speed = .06;  
	
	this.cachePath(); 
}; 

Class.extend( 
{ 
	constructor: Point,   
	
	move: function()
	{ 
		this.distance += this.speed;  
		this.position.y -= (this.distance);  
	}, 
	
	changeAlpha: function()
	{ 
		this.opacity -= 0.05; 
	}, 
	
	cachePath: function() 
	{ 
		if(!Points.cache[this.value]) 
		{ 
			var self = this; 
			var height = 40; 
			var width = 60; 
			
			var callBack = function(ctx) 
			{ 
				ctx.font = self.size + "px titillium"; 
				ctx.fillStyle = self.fillColor;   
				ctx.fillText(self.text, width / 2, height / 2);
			}; 
			this.cache = Points.cache[this.value] = Cache.add(callBack, width, height); 
		} 
		else 
		{ 
			this.cache = Points.cache[this.value]; 
		}
	},
	
	draw: function(ctx) 
	{  
		var x = math.round(this.position.x), 
		y = math.round(this.position.y); 
		
		var opacity = 1 - this.distance / this.maxDistance;  
		ctx.save();  
		ctx.globalAlpha = opacity;
		ctx.drawImage(this.cache, x, y); 
		ctx.restore();
	}
}); 