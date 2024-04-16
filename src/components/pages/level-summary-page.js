import { A, Div, Section } from "@base-framework/atoms";
import { Page } from "./page.js";

/**
 * LevelSummaryPage
 *
 * This will create the level summary panel.
 *
 * @returns {object}
 */
export const LevelSummaryPage = () => (
	new Page([
		Div({ class: 'level-summary-container overlay-panel floatDownZ' }, [
			Div({ class: 'panel-top-button-container' }, [
				A({ class: 'bttn circle bttn-home', href: '/home' }, [
					Div({ class: 'content' })
				]),
			]),
			// Article({ class: 'summary-col-container' }, [
			// 	Section({ class: 'col marketing-container', id: 'summary-ad-banner-container' }),
			// ]),
			Section({ class: 'col data-container' }, [
				Div({ class: 'level-summary' }, [
					Div({ class: 'row' }, [
						Div({ class: 'level-number-container pullDown' }, [
							Div({ id: 'summaryLevelNumber', class: 'level-number title-text' }),
							Div({ class: 'level-label title-text' }, 'Level')
						]),
						Div({ id: 'summaryLevelStatus', class: 'level-status title-enhance' }),
						Div({ class: 'destroyed-summary' }, [
							Div({ class: 'destroyed' }, [
								Div({ class: 'label title-text' }, 'Particle Total'),
								Div({ id: 'summaryLevelParticles', class: 'value' }, '0'),
								Div({ class: 'label title-text' }, 'Destroyed'),
								Div({ id: 'summaryLevelDestroyed', class: 'value' }, '0'),
							])
						])
					]),
					Div({ class: 'row' }, [
						Div({ class: 'score-container' }, [
							Div({ class: 'score-panel' }, [
								Div({ class: 'col' }, [
									Div({ class: 'data underline' }, [
										Div({ id: 'summaryLevelMinium', class: 'value title-text' }),
										Div({ class: 'label title-enhance' }, 'Minimum'),
									])
								]),
								Div({ class: 'col' }, [
									Div({ class: 'data circle level-score' }, [
										Div({ class: 'content' }, [
											Div({ id: 'summaryLevelPoints', class: 'value title-text' }),
											Div({ class: 'label title-enhance' }, 'Level Score'),
										])
									])
								]),
								Div({ class: 'col' }, [
									Div({ class: 'data high-score underline' }, [
										Div({ id: 'summaryHighScorePoints', class: 'value title-text' }),
										Div({ class: 'label title-enhance' }, 'Highest Score'),
									])
								])
							])
						])
					]),
					Div({ class: 'row summary-button-container' }, [
						Div({ class: 'summary-buttons' }, [
							Div({ class: 'col' }, [
								Section({ class: 'option-group', id: 'previous_level' }, [
									Div({ class: 'bttn circle bttn-prev', click: () => game.previousLevel() }, [
										Div({ class: 'content' })
									]),
									Div({ class: 'label title-text' }, 'Previous')
								]),
							]),
							Div({ class: 'col' }, [
								Section({ class: 'option-group', id: 'retry_level' }, [
									Div({ class: 'bttn circle bttn-retry', click: () => game.retryLevel() }, [
										Div({ class: 'content' })
									]),
									Div({ class: 'label title-text' }, 'Retry')
								]),
							]),
							Div({ class: 'col' }, [
								Section({ class: 'option-group', id: 'next_level' }, [
									Div({ class: 'bttn circle bttn-next', click: () => game.nextLevel() }, [
										Div({ class: 'content' })
									]),
									Div({ class: 'label title-text' }, 'Next')
								])
							])
						])
					])
				])
			])
		])
	])
);