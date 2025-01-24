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
		// @ts-ignore
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
		// @ts-ignore
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
				// @ts-ignore
				Div({ class: 'title left dark' }, this.title),
				// @ts-ignore
				Div({ class: 'description center dark' }, this.description)
			])
		]);
	}

	/**
	 * This will set up the timet that will close the flash panel.
	 */
	afterSetup()
	{
		// @ts-ignore
		this.timer = setTimeout(() => this.destroy(), this.duration);
	}

	/**
	 * This will create the flash panel.
	 */
	start(containr)
	{
		Builder.render(this, containr);
	}
}