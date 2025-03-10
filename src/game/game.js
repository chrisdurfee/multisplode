import { Prompts } from '../components/prompts/prompts.js';
import { Levels } from './level/levels.js';
import { RandomLevelPack } from './level/packs/random/random-level-pack.js';
import { Settings } from './settings.js';
import { Stage } from './stage.js';

let fullscreen = false;

/**
 * This will show the fullscreen.
 *
 * @returns {void}
 */
const showFullscreen = () =>
{
	if (fullscreen)
	{
        return;
    }

    fullscreen = true;
    const element = document.body;

    const fullscreenMethods = [
        'requestFullscreen',
        'mozRequestFullScreen',
        'webkitRequestFullscreen',
        'msRequestFullscreen'
    ];

    for (const method of fullscreenMethods)
	{
        if (element[method])
		{
            element[method]().catch(e => console.error(`Failed to enable fullscreen mode: ${e.message}`));
            break;
        }
    }
};

/**
 * This will lock the orientation.
 *
 * @returns {void}
 */
const lockOrientation = () =>
{
	// @ts-ignore
	if (!screen || !screen.orientation || typeof screen.orientation.lock !== 'function')
	{
        return;
    }

	// @ts-ignore
    screen.orientation.lock('landscape').then(() =>
	{
        console.log('Orientation locked successfully.');
    })
	.catch(e =>
	{
        console.error(`Failed to lock orientation: ${e.message}`);
    });
};

/**
 * Game
 *
 * This will manage the game.
 *
 * @class Game
 */
export class Game
{
	/**
	 * This will set up the stage.
	 *
	 * @param {number} width
	 * @param {number} height
	 * @param {object} app
	 */
	constructor(width, height, app)
	{
		this.stage = new Stage(width, height, this);
		this.app = app;

		Levels.setGame(this);
		Prompts.setGame(this);
		Prompts.setup();
	}

	/**
	 * This will get the current level.
	 *
	 * @returns {object|null}
	 */
	getCurrentLevel()
	{
		return Levels.currentLevel;
	}

	/**
	 * This will set up the canvas.
	 *
	 * @param {object} canvas
	 */
	setCanvas(canvas)
	{
		this.stage.setCanvas(canvas);
	}

	/**
	 * This will set up the game.
	 *
	 * @returns {void}
	 */
	setup()
	{
		/* we want to setup the levels and select primary
		level and show our splash screen */
		this.setupLevels();
	}

	/**
	 * This will set up the stage.
	 *
	 * @returns {void}
	 */
	setupStage()
	{
		this.stage.setup();
	}

	/**
	 * This will set up the level packs.
	 *
	 * @returns {void}
	 */
	setupLevelPacks()
	{
		const LevelPacks = [
			new RandomLevelPack(this)
		];

		LevelPacks.forEach((pack) => {
			Levels.addLevelPack(pack);
		});
	}

	/**
	 * This will change the stage level controller.
	 *
	 * @param {object} controller
	 * @returns {void}
	 */
	setStageLevelController(controller)
	{
		this.stage.levelController = controller;
	}

	/**
	 * This will setup the levels.
	 *
	 * @returns {void}
	 */
	setupLevels()
	{
		this.setupLevelPacks();
		/* we want to setup the levels and select primary
		level and show our splash screen */
		Levels.setup();
	}

	/**
	 * This will start the game.
	 *
	 * @returns {void}
	 */
	startGame()
	{
		/**
		 * We want to show the fullscreen and lock the orientation
		 * when the game starts.
		 */
		//showFullscreen();
		lockOrientation();

		Levels.selectPrimaryLevel();
		this.app.navigate('/play');

		Settings.song = 'play-loop.mp3';
	}

	/**
	 * This will start the game.
	 *
	 * @returns {void}
	 */
	play()
	{
		/**
		 * This will reset the page to help with next, previous, and retry.
		 */
		this.app.navigate('/');

		/**
		 * This will select the music start the game.
		 */
		this.app.navigate('/play');
		Settings.song = 'play-loop.mp3';
		this.startStage();
	}

	/**
	 * This will resume the game.
	 *
	 * @returns {void}
	 */
	resume()
	{
		this.app.navigate('/play');
		this.startStage();

		Settings.song = 'play-loop.mp3';
	}

	/**
	 * This will pause the game.
	 *
	 * @returns {void}
	 */
	pause()
	{
		this.stopStage();
	}

	/**
	 * This will retry the level.
	 *
	 * @returns {void}
	 */
	retryLevel()
	{
		Levels.retryLevel();
		this.play();
	}

	/**
	 * This will select the level.
	 *
	 * @param {object} level
	 * @returns {void}
	 */
	selectLevel(level)
	{
		Levels.selectLevel(level);
		this.play();
	}

	/**
	 * This will select the newxt level.
	 *
	 * @returns {void}
	 */
	nextLevel()
	{
		Levels.selectNextLevel();
		this.play();
	}

	/**
	 * This will select the previous level.
	 *
	 * @returns {void}
	 */
	previousLevel()
	{
		Levels.selectPreviousLevel();
		this.play();
	}

	/**
	 * This will reset the current level.
	 *
	 * @returns {void}
	 */
	resetCurrentLevel()
	{
		this.retryLevel();
	}

	/**
	 * This will navigate to the level summary.
	 *
	 * @returns {void}
	 */
	levelSummary()
	{
		this.stopStage();
		Settings.song = 'summary-slow-loop.mp3';

		this.app.navigate('/play/level-summary');
	}

	/**
	 * This will start drawing the stage.
	 *
	 * @returns {void}
	 */
	startDraw()
	{
		this.stage.startDraw();
	}

	/**
	 * This will stop drawing the stage.
	 *
	 * @returns {void}
	 */
	stopDraw()
	{
		this.stage.stopDraw();
	}

	/**
	 * This will start the stage.
	 *
	 * @returns {void}
	 */
	startStage()
	{
		const stage = this.stage;
		stage.addEvent();
		stage.startDraw();
	}

	/**
	 * This will stop the stage.
	 *
	 * @returns {void}
	 */
	stopStage()
	{
		const stage = this.stage;
		stage.removeEvent();
		stage.stopDraw();
	}
}
