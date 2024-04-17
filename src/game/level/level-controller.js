
export class LevelController
{
	constructor(level)
	{
		this.level = level;
	}

	setupLevel(cancelPrompts)
	{
		this.reset();

		let level = this.level;
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
			let promptId = level.promptId;
			if(promptId)
			{
				window.setTimeout(function()
				{
					Prompts.showPrompt(promptId);
				}, 50);
			}
		}
	}

	changeLevel(level)
	{
		this.level = level;
	}

	/* this will create a primary exlosion that will remove
	a touch from the level touch count */
	interact(mouseX, mouseY)
	{
		let currentLevel = this.level;
		if(currentLevel)
		{
			//if the touch count is less than limit
			if(currentLevel.touch < currentLevel.touchLimit)
			{
				/* this will update the touch count and get the
				current device type to create the new device */
				let touch = currentLevel.updateTouch();
				Devices.add(mouseX, mouseY, 'rgba(255,255,255,.9)', 1, touch.type);
			}
		}
	}

	createDevice(x, y, color, multiplier)
	{
		Devices.add(x, y, color, multiplier);
		this.createSparks(x, y, color);
	}

	createSparks(x, y, color)
	{
		Sparks.add(x, y, color);
	}

	createPoints(x, y, value)
	{
		let currentLevel = this.level;
		if(currentLevel)
		{
			/*if(settings.graphics === 'high')
			{
				points.add(x, y, value);
			}*/

			//update destoyed number and points
			currentLevel.updateScore(1, value);
		}
	}

	//creat random number from set number range
	randomFromTo(from, to)
	{
	   return MathUtil.floor(Math.random() * (to - from + 1) + from);
	}

	/* this will reset all game objects */
	reset()
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
	}

	draw(ctx, stage)
	{

	}

	setupParticles()
	{
		this.reset();

		let level = this.level;
		let levelParticles = level.particles;
		if(levelParticles && typeof levelParticles === 'object')
		{
			for(let type in levelParticles)
			{
				if(levelParticles.hasOwnProperty(type) === true)
				{
					let count = levelParticles[type];
					for(let i = 0; i < count; i++)
					{
						Particles.add(type);
					}
				}
			}
		}
		else
		{
			for(let i = 0, count = level.quantity; i < count; i++)
			{
				Particles.add();
			}
		}
	}

	getSummaryMessage()
	{
		let type,
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
		else if(level.scoreNumber <= MathUtil.round(level.minimum * 0.25))
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
	}

	getSummary()
	{
		this.getSummaryMessage();

		let level = this.level;
		/* this will check to update thelevel high score */
		level.updateHighScore(level.scoreNumber, level.scorePoints);

		UI.updateSummary(level);
	}

	blowEmDelay = 200;
	blowEm = false;
	blowEmExtend = 500;
	playContainer = null;

	checkToBlowEm()
	{
		let level = this.level;
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
	}

	originalDelay= 1000;
	delay = 1000;
	startDelay = null;

	setupCompleteDelay()
	{
		this.startDelay = this.startDelay || new Date();
		return this.startDelay;
	}

	checkLevelComplete(particleCount)
	{
		if((this.level.isAtLimit === true && Devices.getExplosivesCount() < 1) || particleCount < 1)
		{
			let startTimer = this.setupCompleteDelay();
			let timePassed = new Date() - startTimer;
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
	}

	isComplete(particleCount)
	{
		return this.checkLevelComplete(particleCount);
	}

	destroyAllParticles()
	{
		let particleArray = Particles.getAll();
		let particleCount = particleArray.length;
		if(particleArray)
		{
			for(let i = particleCount - 1; i >= 0; i--)
			{
				let particle = particleArray[i];
				//remove destroyed particles
				Particles.remove(particle);

				let pos = particle.position;
				/* this will add a new device for the particle
				that has been destroyed, including sparks from the
				explosion, and the newpoints from the destruction */
				this.createDevice(pos.x, pos.y, particle.fillColor);
			}
		}
	}
}
