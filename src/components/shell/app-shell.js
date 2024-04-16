import { Audio, Div, Main } from '@base-framework/atoms';
import { Atom } from '@base-framework/base';
import { LevelPage } from '../pages/level-page.js';
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
 * @returns {object}
 */
export const AppShell = () => (
	AppContainer([
		ActivePanelContainer({
			cache: 'mainBody',
			switch: Routes()
		}),
		Div({ class: 'overlay-container', route: [
			{
				uri: '/home/settings',
				component: SettingsPage()
			},
			{
				uri: '/home/levels',
				component: LevelPage()
			},
			{
				uri: '/play/paused',
				component: PausePage()
			}
		] }),
		Audio({ id: 'sound_fx', cache: 'soundFx', class: 'sound', src: 'sound/music/play-loop.mp3', loop: true })
	])
);