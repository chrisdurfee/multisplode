import { base, Builder } from "@base-framework/base";
import { AppShell } from "./components/shell/app-shell.js";
import { Configs } from "./configs.js";
import { Game } from "./game/game.js";

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
	if (!screen || !screen.orientation || typeof screen.orientation.lock !== 'function')
	{
        return;
    }

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
 * AppController
 *
 * This will setup the main app controller.
 *
 * @class
 */
export class AppController
{
	/**
	 * @member {object} router
	 */
	router = null;

	/**
	 * @member {object} appShell
	 */
	appShell = null;

	/**
	 * This will setup the main controller.
	 */
	constructor()
	{
		/**
		 * We want to show the fullscreen and lock the orientation
		 * when the game starts.
		 */
		showFullscreen();
		lockOrientation();

		this.setupRouter();
		this.setupAppShell();
		this.setupService();
	}

	/**
	 * This will setup the service worker.
	 *
	 * @protected
	 * @returns {void}
	 */
	setupService()
	{
		// service workers can only work on secure connections
		const protocol = window.location.protocol.replace(':', '');
		if (!('serviceWorker' in navigator) || protocol === 'http')
		{
			return false;
		}

		const sw = navigator.serviceWorker;
		sw.register('/sw.js', {
			scope: '/'
		}).then((serviceWorker) =>
		{

		});
	}

	/**
	 * This will setup the router.
	 *
	 * @protected
	 * @returns {void}
	 */
	setupRouter()
	{
		const { baseUrl, title } = Configs.router;
		const router = this.router = base.router;
		router.setup(baseUrl, title);

		/**
		 * This will set up the game to always route to home when starting.
		 */
		router.navigate('/home');
	}

	/**
	 * This will navigate to the uri.
	 *
	 * @param {string} uri
	 * @param {object} [data]
	 * @param {boolean} [replace=false]
	 * @returns {void}
	 */
	navigate(uri, data, replace)
	{
		this.router.navigate(uri, data, replace);
	}

	/**
	 * This will setup the game.
	 *
	 * @protected
	 */
	setupGame()
	{
		const size = Configs.size;
		const game = new Game(size.width, size.height, this);
		game.setup();
		return game;
	}

	/**
	 * This will setup the app shell.
	 *
	 * @protected
	 * @returns {void}
	 */
	setupAppShell()
	{
		const main = AppShell({
			game: this.setupGame()
		});
		Builder.render(main, document.body);
	}
}