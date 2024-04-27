import { Objects } from "@base-framework/base";
import { Data } from "../../components/data.js";
import { Timer } from "../../components/organisms/timer.js";
import { Prompts } from '../../components/prompts/prompts.js';
import { Sounds } from '../../game/sounds.js';
import { Devices } from '../devices/devices.js';
import { MathUtil } from "../math-util.js";
import { Messages } from '../messages.js';
import { Particles } from '../particles/particles.js';
import { Points } from '../points/points.js';
import { Sparks } from '../sparks/sparks.js';
import { Utilities } from '../utilities.js';

/**
 * LevelController
 *
 * This will manage the level.
 *
 * @class LevelController
 */
export class LevelController
{
	/**
	 * @member {object|null} level
	 */
	level = null;

	/**
	 * This will setup the level.
	 *
	 * @param {boolean} cancelPrompts
	 * @returns {void}
	 */
	setLevel(cancelPrompts)
	{
		this.reset();
		this.setupParticles();

		/* this will save the level as the last played
		level */
		const level = this.level;
		Data.set('lastLevel', level);

		/* we renderthe prompt last because it can allow
		the prompt to stop the game play */
		if (cancelPrompts !== true)
		{
			const promptId = level.promptId;
			if (promptId)
			{
				this.showPrompt(promptId);
			}
		}
	}

	/**
	 * This will show the prompt.
	 *
	 * @param {string} promptId
	 * @returns {void}
	 */
	showPrompt(promptId)
	{
		const DURATION = 50;
		const timer = new Timer(DURATION, () => Prompts.showPrompt(promptId));
		timer.start();
	}

	/**
	 * This will change the level.
	 *
	 * @param {object} level
	 * @returns {void}
	 */
	changeLevel(level)
	{
		this.level = level;
	}

	/**
	 * This will interact with the level.
	 *
	 * @param {number} mouseX
	 * @param {number} mouseY
	 */
	interact(mouseX, mouseY)
	{
		const currentLevel = this.level;
		if (currentLevel)
		{
			//if the touch count is less than limit
			if (currentLevel.touch < currentLevel.touchLimit)
			{
				/* this will update the touch count and get the
				current device type to create the new device */
				const touch = currentLevel.updateTouch();
				Devices.add(mouseX, mouseY, 'rgba(255,255,255,.9)', 1, touch.type);
			}
		}
	}

	/**
	 * This will create a device.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {string} color
	 * @param {number} multiplier
	 * @returns {void}
	 */
	createDevice(x, y, color, multiplier)
	{
		Devices.add(x, y, color, multiplier);
		this.createSparks(x, y, color);
	}

	/**
	 * This will create sparks.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {string} color
	 * @returns {void}
	 */
	createSparks(x, y, color)
	{
		Sparks.add(x, y, color);
	}

	/**
	 * This will create points.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} value
	 * @returns {void}
	 */
	createPoints(x, y, value)
	{
		const currentLevel = this.level;
		if (currentLevel)
		{
			/*if(settings.graphics === 'high')
			{
				points.add(x, y, value);
			}*/

			//update destoyed number and points
			currentLevel.updateScore(1, value);
		}
	}

	/**
	 * This will get a random number from a range.
	 *
	 * @param {number} from
	 * @param {number} to
	 * @returns {number}
	 */
	randomFromTo(from, to)
	{
		return MathUtil.floor(Math.random() * (to - from + 1) + from);
	}

	/**
	 * This will reset the level.
	 */
	reset()
	{
		const level = this.level;
		level.reset();

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

	/**
	 * This will draw the level.
	 *
	 * @param {object} ctx
	 * @param {object} stage
	 * @returns {void}
	 */
	draw(ctx, stage)
	{

	}

	/**
	 * This will set up the particles.
	 *
	 * @returns {void}
	 */
	setupParticles()
	{
		this.reset();

		const level = this.level;
		const levelParticles = level.particles;
		if (levelParticles && typeof levelParticles === 'object')
		{
			for (let type in levelParticles)
			{
				if (Objects.hasOwnProp(levelParticles, type))
				{
					const count = levelParticles[type];
					for (let i = 0; i < count; i++)
					{
						Particles.add(type);
					}
				}
			}
		}
		else
		{
			for (let i = 0, count = level.quantity; i < count; i++)
			{
				Particles.add();
			}
		}
	}

	/**
	 * This will get the summary message.
	 *
	 * @returns {void}
	 */
	getSummaryMessage()
	{
		let type;
		const level = this.level;
		if (level.scorePoints > level.highScorePoints && level.scoreNumber >= level.minimum)
		{
			type = 'great';
		}
		else if (level.scoreNumber >= level.minimum)
		{
			type = 'good';
		}
		else if (level.scoreNumber >= level.minimum - 4 && level.scoreNumber <= level.minimum - 1)
		{
			type = 'close';
		}
		else if (level.scoreNumber == 0)
		{
			type = 'awful';
		}
		else if (level.scoreNumber <= MathUtil.round(level.minimum * 0.25))
		{
			type = 'bad';
		}

		if (type)
		{
			this.showMessage(type);
		}
	}

	/**
	 * This will show a message.
	 *
	 * @param {string} type
	 * @returns {void}
	 */
	showMessage(type)
	{
		const DURATION = 500;
		const timer = new Timer(DURATION, () => Messages.getRandomMessage(type));
		timer.start();
	}

	/**
	 * This will get the summary.
	 *
	 * @returns {void}
	 */
	getSummary()
	{
		this.getSummaryMessage();

		const level = this.level;
		/* this will check to update thelevel high score */
		level.updateHighScore(level.scoreNumber, level.scorePoints);
	}

	blowEmDelay = 200;
	blowEm = false;
	blowEmExtend = 500;
	playContainer = null;

	/**
	 * This will check to destroy all particles.
	 *
	 * @returns {void}
	 */
	checkToBlowEm()
	{
		const level = this.level;
		if (level.scoreNumber >= level.minimum)
		{
			this.destroyAllParticles();
			this.delay += this.blowEmExtend;

			if (this.playContainer === null)
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

	/**
	 * This will setup the complete delay.
	 *
	 * @returns {Date}
	 */
	setupCompleteDelay()
	{
		this.startDelay = this.startDelay || new Date();
		return this.startDelay;
	}

	/**
	 * This will check if the level is complete.
	 *
	 * @param {number} particleCount
	 * @returns {boolean}
	 */
	checkLevelComplete(particleCount)
	{
		if ((this.level.isAtLimit === true && Devices.getExplosivesCount() < 1) || particleCount < 1)
		{
			const startTimer = this.setupCompleteDelay();
			const timePassed = new Date() - startTimer;
			if (this.blowEm === false && timePassed >= this.blowEmDelay)
			{
				this.checkToBlowEm();
			}
			else if (timePassed >= this.delay)
			{
				Particles.reset();
				return true;
			}
		}
		return false;
	}

	/**
	 * This will check if the level is complete.
	 *
	 * @param {number} particleCount
	 * @returns {boolean}
	 */
	isComplete(particleCount)
	{
		return this.checkLevelComplete(particleCount);
	}

	/**
	 * This will destroy all particles.
	 *
	 * @returns {void}
	 */
	destroyAllParticles()
	{
		const particleArray = Particles.getAll();
		const particleCount = particleArray.length;
		if (particleArray)
		{
			for (let i = particleCount - 1; i >= 0; i--)
			{
				const particle = particleArray[i];
				//remove destroyed particles
				Particles.remove(particle);

				/* this will add a new device for the particle
				that has been destroyed, including sparks from the
				explosion, and the newpoints from the destruction */
				this.createDevice(particle.position.x, particle.position.y, particle.fillColor);
			}
		}
	}
}
