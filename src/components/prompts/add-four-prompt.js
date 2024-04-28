import { Div, H2, Header, Img, P } from '@base-framework/atoms';
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
			Img({ src: 'images/four-more.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Four Is More')
			]),
			P('You can now use four explosions at anytime to maximize the destruction.')
		])
	])
);