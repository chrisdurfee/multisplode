import { Div } from '@base-framework/atoms';
import { Page } from '../pages/page.js';

/**
 * GravityFieldPage
 *
 * This will create the gravity field page.
 *
 * @returns {object}
 */
export const GravityFieldPage = () => (
	new Page([
		Div({ class: 'prompt-panel' }, [
			Div({ class: 'touch-slider', id: 'gravity-field-step-panel' }, [
				Div({ class: 'step' }, [
					Div({ class: 'content' }, [
						Object({ data: 'images/gravity-field.svg', type: 'image/svg+xml' }),
						Div({ class: 'title-enhance' }, 'Gravity Doesn\'t Suck'),
						Div('You can now use gravity to your advantage. Gravity fields attract particles and lock them into orbit until the gravity field becomes too weak and the particles are released.')
					])
				])
			])
		])
	])
);