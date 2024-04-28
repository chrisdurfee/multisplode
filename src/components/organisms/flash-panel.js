import { Button, Div, Footer, Header, Span } from "@base-framework/atoms";
import { Builder, Component } from "@base-framework/base";

/**
 * FlashPanel
 *
 * This will create a flash panel.
 *
 * @class
 */
export class FlashPanel extends Component
{
	/**
	 * This will set up the duration.
	 *
	 * @return {void}
	 */
	onCreated()
	{
		this.duration ??= 4000;
		this.timer = null;
	}

	/**
	 * This will render the flash panel.
	 *
	 * @returns {object}
	 */
	render()
	{
		return Div({ class: `flash-panel dropInBounce ${this.type}` }, [
			Footer({ class: 'button-container' }, [
				Button({ class: 'bttn circle close', onclick: () => this.destroy() }, [
					Div({ class: 'content' }, [
						Span(),
						Span()
					])
				])
			]),
			Div({ class: 'icon-container' }),
			Header({ class: 'title-container' }, [
				Div({ class: 'title left dark' }, this.title),
				Div({ class: 'description center dark' }, this.description)
			])
		]);
	}

	/**
	 * This will set up the timet that will close the flash panel.
	 */
	afterSetup()
	{
		//this.timer = setTimeout(() => this.destroy(), this.duration);
	}

	/**
	 * This will create the flash panel.
	 */
	start()
	{
		Builder.render(this, document.body);
	}
}