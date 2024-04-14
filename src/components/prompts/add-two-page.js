import { Div } from '@base-framework/atoms';
import { Page } from '../pages/page.js';

/**
 * AddTwoPage
 *
 * This will create the add two page.
 *
 * @returns {object}
 */
export const AddTwoPage = () => (
	new Page([
		Div({ class: 'prompt-panel startup-panel' }, [
			Div({ class: 'touch-slider', id: 'gravity-field-step-panel' }, [
				Div({ class: 'step', id: 'prompt-1a' }, [
					Div({ class: 'content' }, [
						Object({ data: 'images/gravity-field.svg', type: 'image/svg+xml' }),
						Header({ class: 'title-enhance' }, [
							H2('Gravity Field')
						]),
						Div('You can now use a gravity field to manipulate the direction of the explosions.')
					])
				])
			])
		])
	])
);