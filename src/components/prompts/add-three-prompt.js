import { Div, H2, Header, Img, P } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * AddThreePrompt
 *
 * This will create the add three prompt.
 *
 * @param {object} props
 * @returns {object}
 */
export const AddThreePrompt = (props) => (
	new Prompt({ class: 'startup-panel', ...props }, [
		Div({ class: 'content' }, [
			Img({ src: 'images/three-more.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Three Is More Fun')
			]),
			P('You can now use three explosions at anytime to maximize the destruction.')
		])
	])
);