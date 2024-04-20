import { A, Article, Div, Section } from "@base-framework/atoms";
import { Page } from "./page.js";

/**
 * PausePage
 *
 * This will create the pause panel.
 *
 * @param {object} props
 * @returns {object}
 */
export const PausePage = (props) => (
	new Page([
		Div({ class: 'control-sub-panel pause-container overlay-panel' }, [
			Div({ class: 'pause-panel floatDownZ' }, [
				A({ class: 'play circle', href: '/play' }, [
					Div({ class: 'content' })
				]),
			]),
			Article({ class: 'options-container fadeIn' }, [
				Section({ class: 'option-group' }, [
					A({ class: 'bttn circle bttn-home', href: '/home' }, [
						Div({ class: 'content' })
					]),
					Div({ class: 'label title-text' }, 'Home')
				]),
				Section({ class: 'option-group' }, [
					A({ class: 'bttn circle bttn-levels', href: '/home/levels' }, [
						Div({ class: 'content' })
					]),
					Div({ class: 'label title-text' }, 'Levels')
				]),
				Section({ class: 'option-group' }, [
					Div({ class: 'bttn circle bttn-retry', click: () => props.game.retryLevel() }, [
						Div({ class: 'content' })
					]),
					Div({ class: 'label title-text' }, 'Retry')
				])
			])
		])
	])
);