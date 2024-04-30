import { Div, Img, P } from '@base-framework/atoms';
import { PromptBlock } from './types/prompt-block.js';

/**
 * OrientationPrompt
 *
 * This will create the orientation prompt.
 *
 * @param {object} props
 * @returns {object}
 */
export const OrientationPrompt = (props) => (
	new PromptBlock({ ...props, class: 'orientation-panel' }, [
		Div({ class: 'content' }, [
			Img({ src: 'images/multisplode.svg', type: 'image/svg+xml' }),
			Div({ class: 'title-enhance' }, 'Landscape Orientation Needed'),
			P('Please rotate your device to landscape mode to play the game.')
		])
	])
);