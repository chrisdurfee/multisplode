importScripts('./src/worker/cache-controller.js', './src/worker/service.js');

const appName = 'multisplode',
version = '0.0.10';

const files =
[
	'./',
	'./index.html',
	'./scripts/app.js',
	'./css/base.css'
];

const appNameId = appName + '-v' + version;
const service = new Service(appNameId, files);
