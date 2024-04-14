import { base, Builder } from "@base-framework/base";
import { AppShell } from "./components/shell/app-shell.js";
import { Configs } from "./configs.js";

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