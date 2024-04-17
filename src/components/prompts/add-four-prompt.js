import { Div, H2, Header } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * AddFourPage
 *
 * This will create the add four page.
 *
 * @returns {object}
 */
export const AddFourPage = () => (
	new Prompt({ class: 'startup-panel' }, [
		Div({ class: 'content' }, [
			Object({ data: 'images/four-more.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Four Is More')
			]),
			Div('You can now use four explosions at anytime to maximize the destruction.')
		])
	])
);