"use strict";

var LevelController = function(level)
{ 
	this.level = level; 
}; 

Class.extend(
{
	constructor: LevelController, 
	
	setupLevel: function(cancelPrompts) 
	{ 
		this.reset(); 
		
		var level = this.level; 
		level.reset();
		UI.resetLevelUi(level);  
		
		this.setupParticles();  
		
		/* this will save the level as the last played 
		level */ 
		Data.set('lastLevel', level);   
		
		/* we renderthe prompt last because it can allow 
		the prompt to stop the game play */ 
		if(cancelPrompts !== true) 
		{ 
			var promptId = level.promptId; 
			if(promptId) 
			{ 
				window.setTimeout(function() 
				{ 
					Prompts.showPrompt(promptId); 
				}, 50); 
			} 
		}
	}, 
	
	changeLevel: function(level)
	{ 
		this.level = level; 
	}, 
	
	/* this will create a primary exlosion that will remove 
	a touch from the level touch count */ 
	interact: function(mouseX, mouseY)
	{ 
		var currentLevel = this.level; 
		if(currentLevel) 
		{
			//if the touch count is less than limit 
			if(currentLevel.touch < currentLevel.touchLimit)
			{ 
				/* this will update the touch count and get the 
				current device type to create the new device */ 
				var touch = currentLevel.updateTouch();
				Devices.add(mouseX, mouseY, 'rgba(255,255,255,.9)', 1, touch.type);     
			} 
		}
	}, 
	
	/* this will create a secondary explosion from a particle 
	colliding with a device. this will also add sparks 
	from particle being removed. 
	@param (number) x = the position x 
	@param (number) y = the position y 
	@param (string) color = the particle color */ 
	createDevice: function(x, y, color, multiplier)
	{ 
		Devices.add(x, y, color, multiplier); 
		this.createSparks(x, y, color);
	}, 
	
	/* this will create sparks from particle being removed. 
	@param (number) x = the position x 
	@param (number) y = the position y 
	@param (string) color = the particle color */
	createSparks: function(x, y, color)
	{ 
		Sparks.add(x, y, color);  
	}, 
	
	/* this will create points from particle being removed. 
	@param (number) x = the position x 
	@param (number) y = the position y 
	@param (number) value = the particle value */
	createPoints: function(x, y, value)
	{ 
		var currentLevel = this.level; 
		if(currentLevel) 
		{ 
			/*if(settings.graphics === 'high') 
			{ 
				points.add(x, y, value); 
			}*/ 
			
			//update destoyed number and points 
			currentLevel.updateScore(1, value);  
		} 
	},  
	
	//creat random number from set number range
	randomFromTo: function(from, to)
	{
	   return math.floor(Math.random() * (to - from + 1) + from);
	},
	
	/* this will reset all game objects */ 
	reset: function()
	{ 
		Sounds.reset(); 
		Particles.reset(); 
		Points.reset();  
		Devices.reset(); 
		Sparks.reset(); 
		
		this.blowEm = false; 
		this.startDelay = null; 
		this.isAtLimit = false; 
		
		this.delay = this.originalDelay;
	}, 
	
	draw: function(ctx, stage)
	{ 
		
	},
	 
	setupParticles: function() 
	{ 
		this.reset();  
		
		var level = this.level; 
		var levelParticles = level.particles;
		if(levelParticles && typeof levelParticles === 'object') 
		{ 
			for(var type in levelParticles) 
			{ 
				if(levelParticles.hasOwnProperty(type) === true)
				{ 
					var count = levelParticles[type]; 
					for(var i = 0; i < count; i++)
					{ 
						Particles.add(type);  
					}
				} 
			} 
		} 
		else 
		{ 
			for(var i = 0, count = level.quantity; i < count; i++)
			{ 
				Particles.add();  
			} 
		}
	}, 
	
	getSummaryMessage: function() 
	{ 
		var type, 
		level = this.level;  
		if(level.scorePoints > level.highScorePoints && level.scoreNumber >= level.minimum) 
		{ 
			type = 'great'; 
		} 
		else if(level.scoreNumber >= level.minimum) 
		{ 
			type = 'good'; 
		} 
		else if(level.scoreNumber >= level.minimum - 4 && level.scoreNumber <= level.minimum - 1) 
		{ 
			type = 'close'; 
		}
		else if(level.scoreNumber == 0) 
		{ 
			type = 'awful'; 
		} 
		else if(level.scoreNumber <= math.round(level.minimum * 0.25)) 
		{ 
			type = 'bad'; 
		}
		
		if(type) 
		{ 
			window.setTimeout(function() 
			{ 
				Messages.getRandomMessage(type); 
			}, 500); 
		} 
	}, 
	
	getSummary: function() 
	{ 
		this.getSummaryMessage(); 
			
		var level = this.level; 
		/* this will check to update thelevel high score */  
		level.updateHighScore(level.scoreNumber, level.scorePoints);  
		
		UI.updateSummary(level);  
	}, 
	
	blowEmDelay: 200, 
	blowEm: false, 
	blowEmExtend: 500, 
	playContainer: null, 
	
	checkToBlowEm: function() 
	{ 
		var level = this.level; 
		if(level.scoreNumber >= level.minimum) 
		{
			this.destroyAllParticles(); 
			this.delay += this.blowEmExtend; 
			
			if(this.playContainer === null) 
			{ 
				this.playContainer = document.getElementById('play-container'); 
			}
			Utilities.addAnimation(this.playContainer, 'shakePanel', 600);  
		} 
		this.blowEm = true; 
	}, 
	
	originalDelay: 1000, 
	delay: 1000, 
	startDelay: null,  
	
	setupCompleteDelay: function() 
	{ 
		this.startDelay = this.startDelay || new Date(); 
		return this.startDelay; 
	}, 
	
	checkLevelComplete: function(particleCount) 
	{ 
		if((this.level.isAtLimit === true && Devices.getExplosivesCount() < 1) || particleCount < 1) 
		{ 
			var startTimer = this.setupCompleteDelay(); 
			var timePassed = new Date() - startTimer; 
			if(this.blowEm === false && timePassed >= this.blowEmDelay) 
			{ 
				this.checkToBlowEm(); 
			} 
			else if(timePassed >= this.delay)
			{ 
				Particles.reset(); 
				return true; 
			}
		} 
		return false; 
	}, 
	
	isComplete: function(particleCount) 
	{ 
		return this.checkLevelComplete(particleCount); 
	}, 
	
	destroyAllParticles: function() 
	{ 
		var particleArray = Particles.getAll();  
		var particleCount = particleArray.length;
		if(particleArray) 
		{
			for(var i = particleCount - 1; i >= 0; i--)
			{ 
				var particle = particleArray[i];  
				//remove destroyed particles 
				Particles.remove(particle);    
				 
				var pos = particle.position; 
				/* this will add a new device for the particle 
				that has been destroyed, including sparks from the 
				explosion, and the newpoints from the destruction */ 
				this.createDevice(pos.x, pos.y, particle.fillColor); 
			}
		} 
	}
}); 
