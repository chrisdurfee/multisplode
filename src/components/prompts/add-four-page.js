import { Acticle, Div, H2, Header, Section } from '@base-framework/atoms';
import { Page } from '../pages/page.js';

/**
 * AddFourPage
 *
 * This will create the add four page.
 *
 * @returns {object}
 */
export const AddFourPage = () => (
	new Page([
		Div({ class: 'prompt-panel startup-panel' }, [
			Acticle({ class: 'touch-slider', id: 'add-four-step-panel' }, [
				Section({ class: 'step' }, [
					Div({ class: 'content' }, [
						Object({ data: 'images/four-more.svg', type: 'image/svg+xml' }),
						Header({ class: 'title-enhance' }, [
							H2('Four Is More')
						]),
						Div('You can now use four explosions at anytime to maximize the destruction.')
					])
				])
			])
		])
	])
);