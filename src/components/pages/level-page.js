import { Article, Button, Div, Section, Span } from "../atoms/atoms.js";
import { Page } from "./page.js";

/**
 * LevelPage
 *
 * This will create the level panel.
 *
 * @returns {object}
 */
export const LevelPage = () => (
	new Page([
		Article({ class: 'control-sub-panel level-select-container overlay-panel' }, [
			Section({ class: 'home-sub-panel level-select-panel' }, [
				Div({ class: 'panel-top-button-container floatUpZBounce'}, [
					Button({ class: 'bttn circle close', click: () => game.toggleLevelSelect() }, [
						Div({ class: 'content' }, [
							Span(),
							Span()
						])
					])
				]),
				Header({ id: 'level-select-nav-container', class: 'title-container' }),
				Div({ class: 'main-step-container' }, [
					Article({ id: 'level-select-step-panel', class: 'touch-slider step-container' }, [
						Section({ id: 'level_select_panel', class: 'step select-panel' })
					])
				])
			])
		])
	])
);