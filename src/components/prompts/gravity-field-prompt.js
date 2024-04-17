import { Div, Img } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * GravityFieldPage
 *
 * This will create the gravity field page.
 *
 * @returns {object}
 */
export const GravityFieldPage = () => (
	new Prompt({ class: 'startup-panel' }, [
		Div({ class: 'content' }, [
			Img({ data: 'images/gravity-field.svg', type: 'image/svg+xml' }),
			Div({ class: 'title-enhance' }, 'Gravity Doesn\'t Suck'),
			Div('You can now use gravity to your advantage. Gravity fields attract particles and lock them into orbit until the gravity field becomes too weak and the particles are released.')
		])
	])
);