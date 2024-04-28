import { Div, H2, Header, Img, P } from '@base-framework/atoms';
import { PromptStartUp } from './types/prompt-startup.js';

/**
 * StartupPrompt
 *
 * This will create the startup prompt.
 *
 * @param {object} props
 * @returns {object}
 */
export const StartupPrompt = (props) => (
	new PromptStartUp({ class: 'startup-panel', ...props }, [
		Div({ class: 'content' }, [
			Img({ src: 'images/destroy-particles.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Destroy The Particles'),
			]),
			P('Touch the screen to create an explosion. Particles that hit explosions will also explode creating chains.')
		]),
		Div({ class: 'content' }, [
			Img({ src: 'images/complete-challenge.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Complete The Challenge'),
			]),
			P('Beat the level minimum to continue. As the levels go on the explosions will get smaller increasing the difficulty.')
		]),
		Div({ class: 'content' }, [
			Img({ src: 'images/unlock-explosions.svg', type: 'image/svg+xml' }),
			Header({ class: 'title-enhance' }, [
				H2('Unlock Multiple Explosions'),
			]),
			P('As the levels progress they will require more than just one explosion to complete the challenge.')
		])
	])
);