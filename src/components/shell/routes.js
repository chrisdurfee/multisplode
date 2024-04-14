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
 * @returns {array}
 */
export const Routes = () => [
	Route('/', HomePage(), 'Home'),
	Route('/play', PlayPage(), 'Play'),
	Route('/level-summary', LevelSummaryPage(), 'Level Summary')
];