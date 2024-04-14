import { AutoScroller } from '../organisms/auto-scroller.js';
import { Page } from "./page.js";

/**
 * ScrollPage
 *
 * This will create a scroll page.
 *
 * @class
 * @extends Page
 */
export class ScrollPage extends Page
{
	/**
	 * This will set up the auto scroller.
	 *
	 * @returns {void}
	 */
	setupAutoScroller()
	{
		const autoScroller = this.autoScroller = new AutoScroller('', this.panel);
		autoScroller.setup();
	}

	/**
	 * This will render the page.
	 *
	 * @returns {object}
	 */
	render()
	{
		const child = this.children[0];
		return child;
	}

	/**
	 * This will be called after the setup.
	 *
	 * @returns {void}
	 */
	afterSetup()
	{
		this.setupAutoScroller();
	}

	/**
	 * This will be called before the destroy.
	 *
	 * @returns {void}
	 */
	beforeDestroy()
	{
		this.autoScroller.remove();
	}
}