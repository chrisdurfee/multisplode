import { Div, Img, P } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * GravityFieldPrompt
 *
 * This will create the gravity field prompt.
 *
 * @param {object} props
 * @returns {object}
 */
export const GravityFieldPrompt = (props) => (
	new Prompt({ class: 'startup-panel', ...props }, [
		Div({ class: 'content' }, [
			Img({ src: 'images/gravity-field.svg', type: 'image/svg+xml' }),
			Div({ class: 'title-enhance' }, 'Gravity Doesn\'t Suck'),
			P('You can now use gravity to your advantage. Gravity fields attract particles and lock them into orbit until the gravity field becomes too weak and the particles are released.')
		])
	])
);