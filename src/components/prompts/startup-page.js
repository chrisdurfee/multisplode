import { Article, Div, H2, Header, Img, Section } from '@base-framework/atoms';
import { Page } from '../pages/page.js';

/**
 * StartupPage
 *
 * This will create the startup page.
 *
 * @returns {object}
 */
export const StartupPage = () => (
	new Page([
		Div({ class: 'prompt-panel startup-panel' }, [
			Article({ class: 'touch-slider step-container', id: 'startup-step-panel' }, [
				Section({ class: 'step', id: 'prompt-1a' }, [
					Div({ class: 'content' }, [
						Img({ data: 'images/destroy-particles.svg', type: 'image/svg+xml' }),
						Header({ class: 'title-enhance' }, [
							H2('Destroy The Particles'),
						]),
						P('Touch the screen to create an explosion. Particles that hit explosions will also explode creating chains.')
					])
				]),
				Section({ class: 'step', id: 'prompt-1b' }, [
					Div({ class: 'content' }, [
						Img({ data: 'images/complete-challenge.svg', type: 'image/svg+xml' }),
						Header({ class: 'title-enhance' }, [
							H2('Complete The Challenge'),
						]),
						P('Beat the level minimum to continue. As the levels go on the explosions will get smaller increasing the difficulty.')
					])
				]),
				Section({ class: 'step', id: 'prompt-1c' }, [
					Div({ class: 'content' }, [
						Img({ data: 'images/unlock-explosions.svg', type: 'image/svg+xml' }),
						Header({ class: 'title-enhance' }, [
							H2('Unlock Multiple Explosions'),
						]),
						P('As the levels progress they will require more than just one explosion to complete the challenge.')
					])
				])
			])
		])
	])
);