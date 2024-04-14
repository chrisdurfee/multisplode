import { HomePage } from '../pages/home-page.js';
import { LevelSummaryPage } from '../pages/level-summary-page.js';
import { PlayPage } from '../pages/play-page.js';

/**
 * This will create a route object.
 *
 * @param {string} uri
 * @param {function} component
 * @param {string} [title]
 * @return {object}
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
 * @return {array}
 */
export const Routes = () => [
	Route('/', HomePage(), 'EXPLORE'),
	Route('/play', PlayPage(), 'Play'),
	Route('/level-summary', LevelSummaryPage(), 'Level Summary')
];