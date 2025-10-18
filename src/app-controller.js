import { Builder, router } from "@base-framework/base";
import { OrientationPrompt } from "./components/prompts/orientation-prompt.js";
import { AppShell } from "./components/shell/app-shell.js";
import { Configs } from "./configs.js";
import { Game } from "./game/game.js";

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
		this.setupOrientationPrompt();
		this.setupService();
		this.setupRouter();
		this.setupAppShell();
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
			return;
		}

		const sw = navigator.serviceWorker;
		sw.register('./sw.js', {
			scope: './'
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
		this.router = router;

		/**
		 * This will add the configs router settings
		 * to the router.
		 */
		const { baseUrl, title } = Configs.router;
		router.setup(baseUrl, title);

		/**
		 * This will set up the game to always route to home when starting.
		 */
		router.navigate('/');
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

	/**
	 * Check if running in an iframe (e.g., AdSense preview)
	 *
	 * @protected
	 * @returns {boolean}
	 */
	isInIframe()
	{
		try
		{
			return window.self !== window.top;
		}
		catch (e)
		{
			return true;
		}
	}

	/**
	 * This will setup the orientation prompt.
	 *
	 * @protected
	 * @returns {void}
	 */
	setupOrientationPrompt()
	{
		// Skip orientation prompt in iframes (e.g., AdSense preview)
		// This allows preview tools to see the full game interface
		if (this.isInIframe())
		{
			return;
		}

		const prompt = OrientationPrompt();
		if (window.matchMedia("(orientation: portrait)").matches)
		{
			prompt.open();
		}

		window.matchMedia("(orientation: portrait)").addEventListener("change", (e) =>
		{
			const portrait = e.matches;
			if (portrait)
			{
				prompt.open();
				return;
			}

			prompt.close();
		});
	}
}