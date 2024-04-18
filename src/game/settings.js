import { State } from '@base-framework/base';

/**
 * This will set up the settings state.
 */
export const Settings = State.add('settings');

/**
 * This will set up teh staorage id for the settings
 * to save to the local storage.
 */
const storageId = 'settings';
Settings.setKey(storageId);

/**
 * This will resume the settings or set the default
 * settings if there are none.
 */
const defaultSettings =
{
	audio: false,
	music: false,
	graphics: 'medium'
};
Settings.resume(defaultSettings);