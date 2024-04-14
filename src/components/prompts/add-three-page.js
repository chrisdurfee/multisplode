import { Div, Section } from '@base-framework/atoms';
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
			Div({ class: 'touch-slider', id: 'add-three-step-panel' }, [
				Section({ class: 'step' }, [
					Div({ class: 'content' }, [
						Object({ data: 'images/three-more.svg', type: 'image/svg+xml' }),
						Header({ class: 'title-enhance' }, [
							H2('Three Is More Fun')
						]),
						Div({}, 'You can now use three explosions at anytime to maximize the destruction.')
					])
				])
			])
		])
	])
);

<div id="add-three-panel" class="prompt-panel startup-panel">
        	<article id="add-three-step-panel" class="touch-slider">
                <section id="prompt-3a" class="step">
                	<div class="content">
                    	<object type="image/svg+xml" data="images/three-more.svg">
                        </object>
                        <header>
                            <h2 class="title-enhance">Three Is More Fun</h2>
                        </header>
                        <p>You can now use three explosions at anytime to maximize the destruction.</p>
                    </div>
                </section>
            </article>
        </div>