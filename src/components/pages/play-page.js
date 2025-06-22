import { A, Article, Canvas, Div, Section, Span } from "@base-framework/atoms";
import { Progress } from "../organisms/progress.js";
import { Touches } from "../organisms/touches.js";
import { Page } from "./page.js";

/**
 * This will setup the play page.
 *
 * @returns {void}
 */
function beforeSetup()
{
	// @ts-ignore
	this.game.startGame();

	// @ts-ignore
	const currentLevel = this.game.getCurrentLevel();
	this.data = currentLevel.data;
}

/**
 * This will set up the level class name.
 */
function afterSetup()
{
	const currentLevel = this.game.getCurrentLevel();
	this.panel.classList.add(currentLevel.levelClass);
}

/**
 * This will destroy the play page.
 *
 * @returns {void}
 */
function beforeDestroy()
{
	this.game.stopStage();
}

/**
 * PlayPage
 *
 * This will create the play page.
 *
 * @param {object} props
 * @returns {object}
 */
export const PlayPage = ({ game }) => (
	new Page({ game, beforeSetup, afterSetup, beforeDestroy }, [
		Section({ class: 'play-container' }, [
			Div({ class: 'play-panel' }, [
				Div({ class: 'fade-layer' }, [
					Canvas({ id: 'portal', cache: 'portal', class: 'main-canvas', onCreated(ele)
						{
							game.setCanvas(ele);

							/**
							 * This will resize the canvas when it's visible.
							 */
							const DELAY = 1;
							window.setTimeout(() =>
							{
								game.setupStage();
								game.startStage();
							}, DELAY);
						}
					})
				])
			]),

			Div({ class: 'play-level-container' }, [
				Div({ class: 'level-guide fadeIn' }, [
					Article({ class: 'options-container' }, [
						Div({ class: 'top-container' }, [
							Section({ class: 'option-group' }, [
								A({ class: 'bttn circle bttn-pause', href: '/play/paused' }, [
									Div({ class: 'content' }, [
										Span(),
										Span()
									])
								])
							]),

							Section({ class: 'option-group level-number' }, [
								Div({ id: 'levelNumber', class: 'value title-text' }, '[[number]]'),
								Div({ class: 'label title-text' }, 'Level')
							])
						]),

						Div({ class: 'lower-container' }, [
							Section({ class: 'option-group level-progress' }, [
								Div({ id: 'levelProgress', class: 'value progress title-text' }, [
									Div({ id: 'levelMinimum', class: 'progress-number value title-text' }, '[[remaining]]'),
									new Progress({ game })
								]),
								Div({ class: 'label title-text' }, 'Progress')
							]),
							new Touches({
								cache: 'touches',
								game
							})
						])
					])
				]),
				Div({ id: 'fps', class: 'fps' })
			])
		])
	])
);