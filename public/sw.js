importScripts('./worker/cache-controller.js', './worker/service.js');

const appName = 'multisplode',
version = '0.0.14';

const files =
[
	'./',
	'./index.html'
];

const appNameId = appName + '-v' + version;
const service = new Service(appNameId, files);
