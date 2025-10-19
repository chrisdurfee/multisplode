/**
 * Service
 *
 * This will create a service worker that will cache files.
 *
 * @class Service
 */
class Service
{
    /**
	 * This will create a new service.
	 *
	 * @param {string} prefix
	 * @param {Array<string>} files
	 */
	constructor(prefix, files = [])
	{
		/**
		 * @member {CacheController} cache
		 */
		this.cache = new CacheController(prefix);

		/**
		 * @member {Array<string>} files
		 */
		this.files = files;

		this.addEvents();
	}

    /**
     * This will add events to the service worker.
     *
     * @return {void}
     */
	addEvents()
	{
		self.addEventListener('install', (e) =>
		{
			//self.skipWaiting();

			e.waitUntil(
				this.cache.addFiles(this.files)
			);
		});

		self.addEventListener('activate', (e) =>
		{
			e.waitUntil(
				this.cache.refresh().then(() =>
				{
					// return self.clients.matchAll({ includeUncontrolled: true }).then((clients) =>
					// {
					// 	clients.forEach((client) =>
					// 	{
					// 		client.postMessage({ action: 'reload' });
					// 	});
					// });
				})
			);

			return self.clients.claim();
		});

		self.addEventListener('message', (e) =>
		{
			if(e.data === 'delete')
			{
				this.cache.deleteFiles();
			}
		});

		self.addEventListener('fetch', (e) =>
		{
			if (e.request.method !== 'GET')
			{
				return false;
			}

			/**
			 * Prevent the service worker from handling the navigation requests.
			 */
			if (e.request.mode === 'navigate')
			{
				fetch(e.request).catch(() => {
					return caches.match('index.html');
				});
				return false;
			}

			/**
			 * Prevent the service worker from handling the CORS requests.
			 */
			if (e.request.mode === 'cors')
			{
				return false;
			}

			/**
			 * Prevent the service worker from handling the extension requests.
			 */
			if (e.request.url.startsWith('chrome-extension://'))
			{
				return;
			}

			const response = this.cache.fetchFile(e);
			e.respondWith(response);
		});
	}
}