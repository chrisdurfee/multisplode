import { A, Article, Canvas, Div, Section, Span } from "@base-framework/atoms";
import { Progress } from "../organisms/progress.js";
import { Touches } from "../organisms/touches.js";
import { Page } from "./page.js";

function afterSetup()
{
	const progressBar = document.getElementById('progress-line');
	this.progress = new Progress(progressBar);
}

/**
 * PlayPage
 *
 * This will create the play page.
 *
 * @returns {object}
 */
export const PlayPage = () => (
	new Page( { afterSetup }, [
		Section({ class: 'play-container first [[levelClass]]' }, [
			Div({ class: 'play-panel' }, [
				Div({ class: 'fade-layer' }, [
					Canvas({ id: 'portal', cache: 'portal', class: 'main-canvas' })
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
									Div({ class: 'progress-bar', html: `<svg id="level-progress-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.2 83.6" width="83px" height="83px">
									<style>
									  .progress-bg{opacity:0.2;fill:#FFFFFF;stroke-width:0px;enable-background:new ;} .progress{fill:none;stroke:#FF4881;stroke-width:4;stroke-miterlimit:10;}
									</style>
									<path class="progress-bg" d="M74.7 21L62.2 8.5C50.9-2.8 32.3-2.8 21 8.5L8.5 21c-11.3 11.3-11.3 29.9 0 41.2L21 74.7C32.3 86 50.9 86 62.2 74.7l12.5-12.5C86 50.9 86 32.3 74.7 21zm-3.3 39.1L60.1 71.4c-10.2 10.2-26.9 10.2-37.1 0L11.8 60.1C1.6 49.9 1.6 33.2 11.8 23L23 11.8c10.2-10.2 26.9-10.2 37.1 0L71.4 23c10.2 10.2 10.2 26.9 0 37.1z"/>
									<path id="progress-line" class="progress" d="M60.82 72.582c-10.606 10.605-27.968 10.605-38.572 0L10.603 60.834c-10.605-10.605-10.605-27.967 0-38.57l11.644-11.645C32.852.013 50.214.013 60.817 10.62l11.75 11.643c10.604 10.605 10.604 27.967 0 38.57l-11.748 11.75"/>
								  </svg>` })
									// Svg({ id: 'level-progress-image', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 83.2 83.6', width: '83px', height: '83px' }, [
									// 	Style('.progress-bg{opacity:0.2;fill:#FFFFFF;stroke-width:0px;enable-background:new ;} .progress{fill:none;stroke:#FF4881;stroke-width:4;stroke-miterlimit:10;}'),
									// 	Path({ class: 'progress-bg', d: 'M74.7 21L62.2 8.5C50.9-2.8 32.3-2.8 21 8.5L8.5 21c-11.3 11.3-11.3 29.9 0 41.2L21 74.7C32.3 86 50.9 86 62.2 74.7l12.5-12.5C86 50.9 86 32.3 74.7 21zm-3.3 39.1L60.1 71.4c-10.2 10.2-26.9 10.2-37.1 0L11.8 60.1C1.6 49.9 1.6 33.2 11.8 23L23 11.8c10.2-10.2 26.9-10.2 37.1 0L71.4 23c10.2 10.2 10.2 26.9 0 37.1z' }),
									// 	Path({ id: 'progress-line', class: 'progress', d: 'M60.82 72.582c-10.606 10.605-27.968 10.605-38.572 0L10.603 60.834c-10.605-10.605-10.605-27.967 0-38.57l11.644-11.645C32.852.013 50.214.013 60.817 10.62l11.75 11.643c10.604 10.605 10.604 27.967 0 38.57l-11.748 11.75' }),
									// ]),
								]),
								Div({ class: 'label title-text' }, 'Progress')
							]),
							new Touches({
								cache: 'touches',
								//deveice: game.activeLevel.deveices
							})
						])
					])
				]),
				Div({ id: 'fps', class: 'fps' })
			])
		])
	])
);