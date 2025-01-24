importScripts('./worker/cache-controller.js', './worker/service.js');

/**
 * This is the name of the app and the version. This is used to
 * create the cache name.
 *
 * @const
 * @type {string} appName
 */
const APP_NAME = 'multisplode',

/**
 * This is the version of the app. This is used to create the cache
 *
 * @const
 * @type {string} version
 */
version = '0.0.20';

/**
 * This will add these files to cache. Add any files you want to
 * cache here. As files are fetched, they will be added to the cache.
 *
 * @const
 * @type {Array<string>} DEFAULT_FILES
 */
const DEFAULT_FILES =
[
	'./',
	'./index.html'
];

/**
 * This will set up the service worker controller with
 * the app name and the files to cache.
 */
const appNameId = `${APP_NAME}-${version}`;
const service = new Service(appNameId, DEFAULT_FILES);
