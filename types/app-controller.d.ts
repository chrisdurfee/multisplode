/**
 * AppController
 *
 * This will setup the main app controller.
 *
 * @class
 */
export class AppController {
    /**
     * @member {object} router
     */
    router: any;
    /**
     * @member {object} appShell
     */
    appShell: any;
    /**
     * This will setup the service worker.
     *
     * @protected
     * @returns {void}
     */
    protected setupService(): void;
    /**
     * This will setup the router.
     *
     * @protected
     * @returns {void}
     */
    protected setupRouter(): void;
    /**
     * This will navigate to the uri.
     *
     * @param {string} uri
     * @param {object} [data]
     * @param {boolean} [replace=false]
     * @returns {void}
     */
    navigate(uri: string, data?: object, replace?: boolean): void;
    /**
     * This will setup the game.
     *
     * @protected
     */
    protected setupGame(): Game;
    /**
     * This will setup the app shell.
     *
     * @protected
     * @returns {void}
     */
    protected setupAppShell(): void;
    /**
     * Check if running in an iframe (e.g., AdSense preview)
     *
     * @protected
     * @returns {boolean}
     */
    protected isInIframe(): boolean;
    /**
     * This will setup the orientation prompt.
     *
     * @protected
     * @returns {void}
     */
    protected setupOrientationPrompt(): void;
}
import { Game } from "./game/game.js";
