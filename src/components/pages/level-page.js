import { A, Article, Button, Div, Section, Span } from "@base-framework/atoms";
import { Levels } from "../../game/level/levels.js";
import { NavSlider } from "../organisms/nav-slider/nav-slider.js";
import { TouchSlider } from "../organisms/touch-slider/touch-slider.js";
import { Page } from "./page.js";

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
 * This will get the level class.
 *
 * @param {object} level
 * @returns {string}
 */
const getLevelClass = (level) =>
{
	let classList = (level.locked === false)? ' unlocked' : '';
	if (level === Levels.currentLevel)
	{
		classList += ' selected';
	}
	return 'bttn option circle fadeIn' + classList;
}

/**
 * This will create the level button.
 *
 * @param {object} props
 * @returns {object}
 */
const LevelButton = (props) =>
{
	const className = getLevelClass(props);
	return Button({ class: className, click: (e, { parent }) => !props.locked && parent.game.selectLevel(props) }, [
		Div({ class: 'content' }, String(props.number))
	]);
};

/**
 * LevelPage
 *
 * This will create the level panel.
 *
 * @param {object} props
 * @returns {object}
 */
export const LevelPage = ({ game }) => (
	new Page({ game }, [
		Article({ class: 'control-sub-panel level-select-container overlay-panel' }, [
			Section({ class: 'home-sub-panel level-select-panel' }, [
				Div({ class: 'panel-top-button-container floatUpZBounce'}, [
					A({ class: 'bttn circle close', href: '/' }, [
						Div({ class: 'content' }, [
							Span(),
							Span()
						])
					])
				]),
				new NavSlider({ cache: 'nav', callBackFn: selectByLink, items: ['Level Select'] }),
				Div({ class: 'main-step-container' }, [
					new TouchSlider({
						cache: 'touch',
						callBackFn: selectByStep,
						items: [
							Div({ class: 'content', map: [Levels.activeLevels, LevelButton] })
						]
					})
				])
			])
		])
	])
);