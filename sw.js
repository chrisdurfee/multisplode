importScripts('./worker/cache-controller.js', './worker/service.js');

const appName = 'multisplode',
version = '0.0.12';

const files =
[
	'./',
	'./index.html',
	'./css/import-file.css'
];

const appNameId = appName + '-v' + version;
const service = new Service(appNameId, files);
