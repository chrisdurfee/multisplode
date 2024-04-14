import { Atom } from '@base-framework/base';
import { Routes } from './routes.js';

/**
 * This will create the app container.
 *
 * @param {object} props
 * @param {array} children
 * @return {object}
 */
const AppContainer = Atom((props, children) =>
{
	return Main({
		class: 'main-game-container',
		...props,
		children
	});
});

/**
 * This will create the active panel container.
 *
 * @param {object} props
 * @param {array} children
 * @return {object}
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
		Div( { class: 'overlay-container' }),
		Audio({ id: 'sound_fx', cache: 'soundFx', class: 'sound', src: 'public/sound/music/play-loop.mp3', loop: true })
	])
);