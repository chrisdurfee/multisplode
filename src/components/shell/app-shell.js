import { Div, Main } from '@base-framework/atoms';
import { Atom } from '@base-framework/base';
import { GameAudio } from '../organisms/game-audio.js';
import { LevelPage } from '../pages/level-page.js';
import { LevelSummaryPage } from '../pages/level-summary-page.js';
import { PausePage } from '../pages/pause-page.js';
import { SettingsPage } from '../pages/settings-page.js';
import { Routes } from './routes.js';

/**
 * This will create the app container.
 *
 * @param {object} props
 * @param {array} children
 * @returns {object}
 */
const AppContainer = Atom((props, children) =>
{
	return Main({ class: 'main-game-container', ...props }, children);
});

/**
 * This will create the active panel container.
 *
 * @param {object} props
 * @param {array} children
 * @returns {object}
 */
const ActivePanelContainer = Atom((props, children) =>
{
	return {
		class: 'main-container',
		...props,
		children
	};
});

/**
 * AppShell
 *
 * This will create the app shell.
 *
 * @param {object} props
 * @returns {object}
 */
export const AppShell = (props) => (
	AppContainer([
		ActivePanelContainer({
			cache: 'mainBody',
			switch: Routes(props)
		}),
		Div({ class: 'overlay-container', route: [
			{
				uri: '/settings',
				component: SettingsPage(props)
			},
			{
				uri: '/levels',
				component: LevelPage(props)
			},
			{
				uri: '/play/paused',
				component: PausePage(props)
			},
			{
				uri: '/play/level-summary',
				component: LevelSummaryPage(props)
			}
		] }),
		new GameAudio({ cache: 'soundFx', class: 'sound', fileName: 'title.mp3' })
	])
);