import { State } from '@base-framework/base';

/**
 * This will set up the settings state.
 *
 * @type {object} Settings
 */
export const Settings = State.add('settings');

/**
 * This will set up teh staorage id for the settings
 * to save to the local storage.
 *
 * @type {string} storageId
 */
const storageId = 'settings';
Settings.setKey(storageId);

/**
 * This will resume the settings or set the default
 * settings if there are none.
 *
 * @type {object} defaultSettings
 */
const defaultSettings =
{
	audio: false,
	music: false,
	graphics: 'medium',
	song: 'title.mp3'
};
Settings.resume(defaultSettings);