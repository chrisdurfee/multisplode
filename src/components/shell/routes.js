import { HomePage } from '../pages/home-page.js';
import { LevelSummaryPage } from '../pages/level-summary-page.js';
import { PlayPage } from '../pages/play-page.js';

/**
 * This will create a route object.
 *
 * @param {string} uri
 * @param {function} component
 * @param {string} [title]
 * @returns {object}
 */
const Route = (uri, component, title) =>
{
	return {
		uri,
		component,
		title
	};
};

/**
 * This will get the routes.
 *
 * @param {object} props
 * @returns {array}
 */
export const Routes = (props) => [
	Route('/home/:overlay?', HomePage(props), 'Home'),
	Route('/play/:state?', PlayPage(props), 'Play'),
	Route('/level-summary', LevelSummaryPage(props), 'Level Summary')
];