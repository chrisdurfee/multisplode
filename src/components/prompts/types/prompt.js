import { Dialog, Div, Span } from "@base-framework/atoms";
import { Builder, Component } from "@base-framework/base";

/**
 * This will create a prompt container.
 *
 * @param {object} props
 * @returns {object}
 */
export const PromptContainer = ({className, click, children}) => (
	Dialog({ class: `prompt-panel ${className}`, click }, [
		Div({ class: 'panel-top-button-container' }, [
			Div({ class: 'bttn circle close', click: (e, parent) => parent.close() }, [
				Div({ class: 'content' }, [
					Span(),
					Span()
				])
			])
		]),
		...children
	])
);

/**
 * Prompt
 *
 * This will create a prompt.
 *
 * @class
 */
export class Prompt extends Component
{
	/**
	 * @member {string} class
	 */
	class = '';

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
			class: this.class,
			click,
			children: this.children
		});
	}

	/**
	 * This will open the prompt.
	 *
	 * @returns {void}
	 */
	open()
	{
		Builder.render(this, document.body);
		this.panel.showModal();

		if (typeof this.activateCallBack === 'function')
		{
			this.activateCallBack();
		}
	}

	/**
	 * This will close the prompt.
	 *
	 * @returns {void}
	 */
	close()
	{
		this.panel.close();
		this.destroy();

		if (typeof this.deactivateCallBack === 'function')
		{
			this.deactivateCallBack();
		}
	}
}