
import { Level } from '../../level.js';
import { LevelPack } from '../level-pack.js';
import { RandomLevelController } from './random-level-controller.js';

/**
 * RandomLevelPack
 *
 * This will create a random level pack.
 *
 * @class
 */
export class RandomLevelPack extends LevelPack
{
	/**
	 * @type {object|null} controller
	 */
	controller = new RandomLevelController();

	levels = [
		/*the order of the settings are:

			touchLimit,
			levelMinimum,
			levelAfterTouch,
			quantity,
			waveScale,
			waveMaxSize,
			prompt id,
		*/

		//level 1
		[1,28,40,40,1,65, 'StartupPrompt', 'first'],

		//level 2
		[1,40,50,50,1,62,false],

		//level 3
		[1,45,50,50,1,67,false],

		//level 4
		[1,53,57,57,1,60,false],

		//level 5
		[1,45,50,{ Particle: 49, PulseParticle: 1 },1,61,'PulseParticlePrompt'],

		//level 6
		[1,32,40,{ Particle: 39, PulseParticle: 1 },1,60, false],

		//level 7
		[[1,1],29,35,{ Particle: 34, PulseParticle: 1 },1,62, 'GravityFieldPrompt'],

		//level 8
		[[1,1],32,39,{ Particle: 38, PulseParticle: 1 },1,61,false],

		//level 9
		[[1,1],28,35,{ Particle: 34, PulseParticle: 1 },1,60,false],

		//level 10
		[[1,1],55,60,{ Particle: 59, PulseParticle: 1 },1,56,false],

		//level 11
		[[2,1],72,80,{ Particle: 79, PulseParticle: 1 },1,56, 'AddTwoPrompt', 'second'],

		//level 12
		[[2,1],63,70,{ Particle: 69, PulseParticle: 1 },1,56,false],

		//level 13
		[[2,1],64,70,{ Particle: 69, PulseParticle: 1 },1,54,false],

		//level 14
		[[1,2],67,72,{ Particle: 71, PulseParticle: 1 },1,53,false],

		//level 15
		[[2,1],52,60,{ Particle: 59, PulseParticle: 1 },1,52,false],

		//level 16
		[[2,1],60,65,{ Particle: 63, PulseParticle: 2 },1,52,false],

		//level 17
		[[1,2],48,56,{ Particle: 54, PulseParticle: 3 },1,50,false],

		//level 18
		[[2,1],46,52,{ Particle: 50, PulseParticle: 2 },1,50,false],

		//level 19
		[[1,2],50,55,{ Particle: 52, PulseParticle: 3 },1,50,false],

		//level 20
		[[2,1],30,48,{ Particle: 45, PulseParticle: 3 },1,48,false],

		//level 21
		[[3,1],40,50,{ Particle: 48, PulseParticle: 2 },1,50, 'AddThreePrompt', 'third'],

		//level 22
		[[2,2],40,55,{ Particle: 53, PulseParticle: 2 },1,49,false],

		//level 23
		[[3,1],58,63,{ Particle: 61, PulseParticle: 2 },1,49,false],

		//level 24
		[[1,3],62,68,{ Particle: 66, PulseParticle: 2 },1,49,false],

		//level 25
		[[2,2],65,70,{ Particle: 68, PulseParticle: 2 },1,47,false],

		//level 26
		[[3,1],25,38,{ Particle: 36, PulseParticle: 2 },1,47,false],

		//level 27
		[[3,1],40,48,{ Particle: 46, PulseParticle: 2 },1,47,false],

		//level 28
		[[2,2],32,45,{ Particle: 43, PulseParticle: 2 },1,45,false],

		//level 29
		[[3,1],50,55,{ Particle: 53, PulseParticle: 2 },1,45,false],

		//level 30
		[[4,1],52,60,{ Particle: 58, PulseParticle: 2 },1,45, 'AddFourPrompt'],

		//level 31
		[[3,2],52,65,{ Particle: 63, PulseParticle: 2 },1,42,false],

		//level 32
		[[3,2],60,68,{ Particle: 66, PulseParticle: 2 },1,42,false],

		//level 33
		[[4,1],70,79,{ Particle: 77, PulseParticle: 2 },1,42,false],

		//level 34
		[[4,1],56,64,{ Particle: 62, PulseParticle: 2 },1,44,false],

		//level 35
		[[2,3],48,55,{ Particle: 53, PulseParticle: 2 },1,44,false],

		//level 36
		[[4,1],46,54,{ Particle: 52, PulseParticle: 2 },1,44,false],

		//level 37
		[[3,2],62,68,{ Particle: 66, PulseParticle: 2 },1,42,false],

		//level 38
		[[3,2],46,50,{ Particle: 48, PulseParticle: 2 },1,42,false],

		//level 39
		[[3,2],50,55,{ Particle: 53, PulseParticle: 2 },1,42,false],

		//level 40
		[[4,1],44,48,{ Particle: 46, PulseParticle: 2 },1,40,false]
	];

	/**
	 * This will setup the levels.
	 *
	 * @param {number} number
	 * @param {array} settings
	 * @param {string} levelPanelClass
	 * @returns {object}
	 */
	createLevel(number, settings, levelPanelClass)
	{
		const gameLevel = new Level(number, settings[0], settings[1], settings[2], settings[3], settings[4], settings[5], settings[6], levelPanelClass);
		gameLevel.setup();
		return gameLevel;
	}
}