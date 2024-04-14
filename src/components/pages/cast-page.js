import { Article, Br, Div, H1, H2, P, Span } from '@base-framework/atoms';
import { MainSection } from "../atoms/atoms.js";
import { ScrollPage } from "./scroll-page.js";

/**
 * This will create the actor.
 *
 * @param {object} props
 * @returns {object}
 */
export const Actor = (props) => (
	Div({ id: props.firstName, class: `cast-container ${props.class}` }, [
		Article({ class: 'cast-bio-container' }, [
			H1([
				Span(props.firstName),
				Br(),
				Span(props.lastName)
			]),
			H2('Cast'),
			P(props.text)
		])
	])
);

/**
 * @type {array} Cast
 */
const Cast = [
	{
		firstName: 'Ryan',
		lastName: 'Reynolds',
		text: 'Rory "Roy" Adams, American, system engineer',
		class: 'first'
	},
	{
		firstName: 'Rebecca',
		lastName: 'Ferguson',
		text: 'Dr. Miranda North, British, Quarantine officer',
		class: 'second'
	},
	{
		firstName: 'Jake',
		lastName: 'Gyllenhaal',
		text: 'Dr. David Jordan, American, senior medical officer',
		class: 'third'
	}
];

/**
 * CastPage
 *
 * This will create the cast panel.
 *
 * @returns {object}
 */
export const CastPage = () => (
	new ScrollPage([
		MainSection({ class: 'cast-panel', map: [ Cast, Actor] })
	])
);