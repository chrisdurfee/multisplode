import { Acticle, Div, H2, Header, Section } from '@base-framework/atoms';
import { Page } from '../pages/page.js';

/**
 * PulseParticlePage
 *
 * This will create the pulse particle page.
 *
 * @returns {object}
 */
export const PulseParticlePage = () => (
	new Page([
		Div({ class: 'prompt-panel startup-panel' }, [
			Acticle({ class: 'touch-slider', id: 'add-four-step-panel' }, [
				Section({ class: 'step' }, [
					Div({ class: 'content' }, [
						Object({ data: 'images/complete-challenge.svg', type: 'image/svg+xml' }),
						Header({ class: 'title-enhance' }, [
							H2('Pulse Particles')
						]),
						Div('The pulse particle is pure white and packs a punch. It causes 1.5X destruction and double the points.')
					])
				])
			])
		])
	])
);