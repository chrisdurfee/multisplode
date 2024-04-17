import { Dialog, Div, Span } from "@base-framework/atoms";
import { Builder, Component } from "@base-framework/base";

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
	 * @member {string} className
	 */
	className = '';

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

		return Dialog({ class: `prompt-panel ${this.className}`, click }, [
				Div({ class: 'panel-top-button-container' }, [
					Div({ class: 'bttn circle close', click: this.display.bind(this) }, [
						Div({ class: 'content' }, [
							Span(),
							Span()
						])
					])
				]),
				...this.children
		]);
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
			this.activateCallBack.call();
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
			this.deactivateCallBack.call();
		}
	}
}