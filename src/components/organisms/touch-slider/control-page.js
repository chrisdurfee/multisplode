import { Page } from '../../pages/page.js';

/**
 * ControlPage
 *
 * This will create the control page.
 *
 * @class
 */
export class ControlPage extends Page
{
	/**
	 * This will select by nav.
	 *
	 * @param {number} index
	 */
	selectByNav(index)
	{
		if (this.touch)
		{
			this.touch.moveToSelectedIndex(index);
		}
	}
}