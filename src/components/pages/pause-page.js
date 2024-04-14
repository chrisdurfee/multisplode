import { Article, Div, Section } from "../atoms/atoms.js";
import { Page } from "./page.js";

/**
 * PausePage
 *
 * This will create the pause panel.
 *
 * @returns {object}
 */
export const PausePage = () => (
	new Page([
		Section({ class: 'control-sub-panel pause-container overlay-panel' }, [
			Div({ class: 'pause-panel floatDownZ' }, [
				Div({ class: 'play circle', click: () => game.togglePause() }, [
					Div({ class: 'content' })
				]),
			]),
			Article({ class: 'options-container fadeIn' }, [
				Section({ class: 'option-group' }, [
					Div({ class: 'bttn circle bttn-home', click: () => game.showHomeMenu() }, [
						Div({ class: 'content' })
					]),
					Div({ class: 'label title-text' }, 'Home')
				]),
				Section({ class: 'option-group' }, [
					Div({ class: 'bttn circle bttn-levels', click: () => game.toggleLevelSelect() }, [
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