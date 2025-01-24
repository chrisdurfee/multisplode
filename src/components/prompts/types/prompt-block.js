import { Dialog, Div, Section } from "@base-framework/atoms";
import { Prompt } from "./prompt.js";

/**
 * This will create a prompt container.
 *
 * @param {object} props
 * @returns {object}
 */
export const PromptContainer = ({ class: className, click, children }) => (
	Dialog({ class: `prompt-panel ${className}`, click }, [
		...children
	])
);

/**
 * PromptStartUp
 *
 * This will create the startup prompt.
 *
 * @class
 */
export class PromptBlock extends Prompt
{
	/**
	 * This will render the modal component.
	 *
	 * @returns {object}
	 */
	render()
	{
		return PromptContainer(
		{
			// @ts-ignore
			class: this.class,
			children: [
				Div({ class: 'touch-slider'}, [
					Div({ class: 'step'}, [
						Section(this.children)
					])
				])
			]
		});
	}
}