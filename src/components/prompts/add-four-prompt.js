import { Div, H2, Header } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * AddFourPrompt
 *
 * This will create the add four prompt.
 *
 * @param {object} props
 * @returns {object}
 */
export const AddFourPrompt = (props) => (
	new Prompt({ class: 'startup-panel', ...props }, [
		Div({ class: 'content' }, [
			Object({ data: 'images/four-more.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Four Is More')
			]),
			Div('You can now use four explosions at anytime to maximize the destruction.')
		])
	])
);