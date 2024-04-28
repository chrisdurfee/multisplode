import { Div, H2, Header, Img, P } from '@base-framework/atoms';
import { PromptStartUp } from './types/prompt-startup.js';

/**
 * PulseParticlePrompt
 *
 * This will create the pulse particle prompt.
 *
 * @param {object} props
 * @returns {object}
 */
export const PulseParticlePrompt = (props) => (
	new PromptStartUp({ class: 'startup-panel', ...props }, [
		Div({ class: 'content' }, [
			Img({ src: 'images/complete-challenge.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Pulse Particles')
			]),
			P('The pulse particle is pure white and packs a punch. It causes 1.5X destruction and double the points.')
		])
	])
);