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
			Img({ src: 'images/double-trouble.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Double The Trouble')
			]),
			P('You can now use two explosions at anytime to maximize the destruction.')
		])
	])
);