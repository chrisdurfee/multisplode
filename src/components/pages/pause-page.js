import { A, Article, Button, Div, Section } from "@base-framework/atoms";
import { Settings } from '../../game/settings.js';
import { Page } from "./page.js";

function afterSetup()
{
	this.game.stopStage();

	Settings.song = 'summary-loop.mp3';
}

/**
 * PausePage
 *
 * This will create the pause panel.
 *
 * @param {object} props
 * @returns {object}
 */
export const PausePage = ({ game }) => (
	new Page({ game, afterSetup }, [
		Div({ class: 'control-sub-panel pause-container overlay-panel' }, [
			Div({ class: 'pause-panel floatDownZ' }, [
				Button({ class: 'play circle', click: () => game.resume() }, [
					Div({ class: 'content' })
				]),
			]),
			Article({ class: 'options-container fadeIn' }, [
				Section({ class: 'option-group' }, [
					A({ class: 'bttn circle bttn-home', href: '/' }, [
						Div({ class: 'content' })
					]),
					Div({ class: 'label title-text' }, 'Home')
				]),
				Section({ class: 'option-group' }, [
					A({ class: 'bttn circle bttn-levels', href: '/levels' }, [
						Div({ class: 'content' })
					]),
					Div({ class: 'label title-text' }, 'Levels')
				]),
				Section({ class: 'option-group' }, [
					Div({ class: 'bttn circle bttn-retry', click: () => game.retryLevel() }, [
						Div({ class: 'content' })
					]),
					Div({ class: 'label title-text' }, 'Retry')
				])
			])
		])
	])
);