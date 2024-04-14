import { Page } from '../../pages/page.js';
import { TouchSlider } from './touch-slider.js';

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
	 * This will add the touch slider.
	 *
	 * @returns {object}
	 */
	addTouchSlider()
	{
		return new TouchSlider({ cache: 'toouch', callBackFn: this.selectBySlide.bind(this), items: this.items})
	}

	/**
	 * This will add the nav slider.
	 *
	 * @param {array} items
	 * @returns {object}
	 */
	setupNav(items)
	{
		//return new NavSlider({ cache: 'nav', callBack: this.selectByNav.bind(this) , items });
	}

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