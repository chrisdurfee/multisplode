import { Div, H2, Header, Img, P } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * AddTwoPrompt
 *
 * This will create the add two prompt.
 *
 * @param {object} props
 * @returns {object}
 */
export const AddTwoPrompt = (props) => (
	new Prompt({ class: 'startup-panel', ...props }, [
		Div({ class: 'content' }, [
			Img({ src: 'images/gravity-field.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Gravity Field')
			]),
			P('You can now use a gravity field to manipulate the direction of the explosions.')
		])
	])
);