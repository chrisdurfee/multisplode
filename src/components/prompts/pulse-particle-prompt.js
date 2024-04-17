import { Div, H2, Header, Img } from '@base-framework/atoms';
import { Prompt } from './types/prompt.js';

/**
 * PulseParticlePrompt
 *
 * This will create the pulse particle prompt.
 *
 * @returns {object}
 */
export const PulseParticlePrompt = () => (
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