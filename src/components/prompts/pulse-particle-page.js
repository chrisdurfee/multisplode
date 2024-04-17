import { Div, H2, Header, Img } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * PulseParticlePage
 *
 * This will create the pulse particle page.
 *
 * @returns {object}
 */
export const PulseParticlePage = () => (
	new Prompt({ class: 'startup-panel' }, [
		Div({ class: 'content' }, [
			Img({ data: 'images/complete-challenge.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Pulse Particles')
			]),
			Div('The pulse particle is pure white and packs a punch. It causes 1.5X destruction and double the points.')
		])
	])
);