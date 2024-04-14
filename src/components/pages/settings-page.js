import { A, Article, Button, Div, Header, Label, Section, Span } from "@base-framework/atoms";
import { ControlPage } from "../organisms/touch-slider/control-page.js";
import { TouchSlider } from "../organisms/touch-slider/touch-slider.js";

/**
 * This will select by step.
 * @param {number} index
 * @returns {void}
 */
function selectByStep(index)
{
	if (this.nav)
	{
		this.nav.moveToSelectedIndex(index);
	}
}

/**
 * SettingsPage
 *
 * This will create the settings panel.
 *
 * @returns {object}
 */
export const SettingsPage = () => (
	new ControlPage([
		Article({ class: 'control-sub-panel settings-container overlay-panel open' }, [
			Section({ class: 'home-sub-panel settings-panel' }, [
				Div({ class: 'panel-top-button-container floatUpZBounce'}, [
					A({ class: 'bttn circle close', href: '/home' }, [
						Div({ class: 'content' }, [
							Span(),
							Span()
						])
					])
				]),
				Header({ class: 'title-container' }),
				Div({ class: 'main-step-container' }, [
					new TouchSlider({
						cache: 'touch',
						callBackFn: selectByStep,
						items: [
							Div({ class: 'content settings-sub-panel audio-container' }, [
								Header({ class: 'title-text' }, 'Audio'),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Music'),
									Div({ id: 'music-toggle', class: 'value-container' })
								]),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Sound fx'),
									Div({ id: 'sound-fx-toggle', class: 'value-container' })
								])
							]),
							Div({ class: 'content settings-sub-panel audio-container' }, [
								Header({ class: 'title-text' }, 'Video'),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Graphics'),
									Div({ class: 'value-container' }, [
										Button({ id: 'graphics-previous', type: 'button', class: 'value-button arrow prev' }),
										Button({ id: 'graphics', type: 'button', class: 'value-button' }),
										Button({ id: 'graphics-next', type: 'button', class: 'value-button arrow next' })
									])
								])
							]),
							Div({ class: 'content settings-sub-panel about-container' }, [
								Header({ class: 'title-text' }, 'Credits'),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Programming'),
									Div({ class: 'value-container' }, 'Chris Durfee')
								]),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Graphic Design'),
									Div({ class: 'value-container' }, 'Chelsea Durfee')
								]),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Music & Sound'),
									Div({ class: 'value-container' }, 'Chris Durfee')
								])
							])
						]
					})
				])
			])
		])
	])
);