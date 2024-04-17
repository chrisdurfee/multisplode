import { base, Builder } from "@base-framework/base";
import { AppShell } from "./components/shell/app-shell.js";
import { Configs } from "./configs.js";

let fullscreen = false;

/**
 * This will show the fullscreen.
 *
 * @returns {void}
 */
const showFullscreen = () =>
{
	if (fullscreen !== false)
	{
		return;
	}

	fullscreen = true;

	let element = document.body;
	if(element.requestFullscreen)
	{
		element.requestFullscreen();
	}
	else if(element.mozRequestFullScreen)
	{
		element.mozRequestFullScreen();
	}
	else if(element.webkitRequestFullscreen)
	{
		element.webkitRequestFullscreen();
	}
	else if(element.msRequestFullscreen)
	{
		element.msRequestFullscreen();
	}
};

/**
 * This will lock the orientation.
 *
 * @returns {void}
 */
const lockOrientation = () =>
{
	if (!screen)
	{
		return;
	}

	const orientation = screen.orientation;
	if (orientation && typeof orientation.lock === 'function')
	{
		try {
			orientation.lock('landscape').then((result) => {}, (err) => {});
		}
		catch (e)
		{
			console.log(e);
		}
	}
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
		this.setupRouter();
		this.setupAppShell();
		//showFullscreen();
		//lockOrientation();
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
	 * This will setup the app shell.
	 *
	 * @protected
	 * @returns {void}
	 */
	setupAppShell()
	{
		const main = AppShell();
		Builder.render(main, document.body);
	}
}