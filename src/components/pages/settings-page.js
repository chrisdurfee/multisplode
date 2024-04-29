import { A, Article, Div, Header, Label, Section, Span } from "@base-framework/atoms";
import { Settings } from "../../game/settings.js";
import { NavSlider } from "../organisms/nav-slider/nav-slider.js";
import { OptionValue } from "../organisms/option-value.js";
import { Toggle } from "../organisms/toggle.js";
import { ControlPage } from "../organisms/touch-slider/control-page.js";
import { TouchSlider } from "../organisms/touch-slider/touch-slider.js";

/**
 * This will select by step.
 *
 * @param {number} index
 * @returns {void}
 */
function selectByStep(index)
{
	if (this.parent.nav)
	{
		this.parent.nav.moveToSelectedIndex(index);
	}
}

/**
 * This will select by link.
 *
 * @param {number} index
 * @returns {void}
 */
function selectByLink(index)
{
	if (this.parent.touch)
	{
		this.parent.touch.moveToSelectedIndex(index);
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
					A({ class: 'bttn circle close', href: '/' }, [
						Div({ class: 'content' }, [
							Span(),
							Span()
						])
					])
				]),
				new NavSlider({ cache: 'nav', callBackFn: selectByLink, items: ['audio', 'video', 'about'] }),
				Div({ class: 'main-step-container' }, [
					new TouchSlider({
						cache: 'touch',
						callBackFn: selectByStep,
						items: [
							Div({ class: 'content settings-sub-panel audio-container' }, [
								Header({ class: 'title-text' }, 'Audio'),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Music'),
									Div({ class: 'value-container' }, [
										new Toggle({
											checked: Settings.music,
											callBack: (checked) =>
											{
												Settings.music = Boolean(checked);
												Settings.store();
											}
										})
									])
								]),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Sound fx'),
									Div({ class: 'value-container' }, [
										new Toggle({
											checked: Settings.audio,
											callBack: (checked) =>
											{
												Settings.audio = Boolean(checked);
												Settings.store();
											}
										})
									])
								])
							]),
							Div({ class: 'content settings-sub-panel audio-container' }, [
								Header({ class: 'title-text' }, 'Video'),
								Div({ class: 'row' }, [
									Label({ class: 'title' }, 'Graphics'),
									new OptionValue({ data: Settings, dataProp: 'graphics', options: ['low', 'medium', 'high'] })
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