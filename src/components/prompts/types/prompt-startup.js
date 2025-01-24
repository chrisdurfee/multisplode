import { TouchSlider } from '../../organisms/touch-slider/touch-slider.js';
import { Prompt, PromptContainer } from './prompt.js';

/**
 * PromptStartUp
 *
 * This will create the startup prompt.
 *
 * @class
 */
export class PromptStartUp extends Prompt
{
	/**
	 * This will render the modal component.
	 *
	 * @returns {object}
	 */
	render()
	{
		const click = (event) =>
		{
			if (event.target === this.panel)
			{
				this.close();
			}
		};

		return PromptContainer(
		{
			// @ts-ignore
			class: this.class,
			click,
			children: [
				new TouchSlider({
					cache: 'touch',
					items: this.children
				})
			]
		});
	}
}