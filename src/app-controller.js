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
		 * Only navigate to home if we're at the root path.
		 * If we're at any other path (like /play from a direct link or 404 redirect),
		 * let the router handle it naturally by not calling navigate().
		 * The Base Framework router will automatically route to the current URL.
		 */
		const currentPath = window.location.pathname;
		const isRootPath = currentPath === '/' || currentPath === baseUrl || currentPath === '';

		// Log for debugging (can be removed after testing)
		console.log('Router setup - Current path:', currentPath, 'Is root:', isRootPath);

		if (isRootPath)
		{
			router.navigate('/');
		}
		// If not root, the router will automatically handle the current path
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