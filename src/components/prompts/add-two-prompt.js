import { Div, H2, Header } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * AddTwoPrompt
 *
 * This will create the add two prompt.
 *
 * @returns {object}
 */
export const AddTwoPrompt = () => (
	new Prompt({ class: 'startup-panel' }, [
		Div({ class: 'prompt-panel startup-panel' }, [
			Div({ class: 'content' }, [
				Object({ data: 'images/gravity-field.svg', type: 'image/svg+xml' }),
				Header({ class: 'title-enhance' }, [
					H2('Gravity Field')
				]),
				Div('You can now use a gravity field to manipulate the direction of the explosions.')
			])
		])
	])
);