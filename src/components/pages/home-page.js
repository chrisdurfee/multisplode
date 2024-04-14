import { Article, Button, Div, Img, Li, Nav, Section, Ul } from '@base-framework/atoms';
import { Page } from './page.js';

/**
 * HomePage
 *
 * This will create the home page.
 *
 * @returns {object}
 */
export const HomePage = () => (
	new Page([
		Section({ class: 'main-home-panel loading overlay-panel' }, [
			Div({ class: 'background background-stars' }),
			Div({ class: 'panel-top-button-container'}, [
				Button({ class: 'bttn circle settings', click: () => game.toggleSettings() }, [
					Div({ class: 'content' })
				])
			]),
			Article({ class: 'main-home-menu' }, [
				Div({ class: 'row logo-container' }, [
					Div({ class: 'background background-mask' }),
					Div({ class: 'game-name-container' }, [
						Img({ src: 'images/multisplode.svg' })
					])
				]),
				Div({ class: 'row menu-container' }, [
					Section({ class: 'col main-menu-container clear' }, [
						Div({ class: 'game-menu-container' }, [
							Div({ class: 'main-nav-container' }, [
								Nav([
									Ul({ class: 'clear' }, [
										Li([
											Button({ type: 'button', class: 'bttn main-play title-text', click: () => game.startGame() }, 'Play')
										])
									])
								])
							])
						])
					])
				])
			])
		])
	])
);