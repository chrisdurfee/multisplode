import { Acticle, Div, H2, Header, Section } from '@base-framework/atoms';
import { Page } from '../pages/page.js';

/**
 * AddThreePage
 *
 * This will create the add three page.
 *
 * @returns {object}
 */
export const AddThreePage = () => (
	new Page([
		Div({ class: 'prompt-panel startup-panel' }, [
			Acticle({ class: 'touch-slider', id: 'add-three-step-panel' }, [
				Section({ class: 'step' }, [
					Div({ class: 'content' }, [
						Object({ data: 'images/three-more.svg', type: 'image/svg+xml' }),
						Header({ class: 'title-enhance' }, [
							H2('Three Is More Fun')
						]),
						Div('You can now use three explosions at anytime to maximize the destruction.')
					])
				])
			])
		])
	])
);