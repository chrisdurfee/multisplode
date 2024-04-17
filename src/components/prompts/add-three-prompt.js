import { Div, H2, Header } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * AddThreePrompt
 *
 * This will create the add three prompt.
 *
 * @returns {object}
 */
export const AddThreePrompt = () => (
	new Prompt({ class: 'startup-panel' }, [
		Div({ class: 'content' }, [
			Object({ data: 'images/three-more.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Three Is More Fun')
			]),
			Div('You can now use three explosions at anytime to maximize the destruction.')
		])
	])
);