let staticCacheName = 'app-cache';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
                'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1203/1540.jpg70?access_token=pk.eyJ1Ijoic3JpamVldCIsImEiOiJjanBqZjQwYmYwNjZvM3dzZDdyczN5bG96In0.J57pV4l8ir_96gPM4BwYAA',
				'./',
				'./index.html',
				'./restaurant.html',
				'./css/styles.css',
				'./data/restaurants.json',
				'./js/dbhelper.js',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./js/sw_reg.js',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg',
				'./img/10.jpg',
				'./img/favicon_package_v0.16/apple-touch-icon.png',
				'./img/favicon_package_v0.16/favicon-32x32.png',
				'./img/favicon_package_v0.16/favicon-16x16.png',
				'./img/favicon_package_v0.16/site.webmanifest',
				'./img/favicon_package_v0.16/safari-pinned-tab.svg'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('app-') &&
						   cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			return response || fetch(event.request);
		})
	);
});
function update(request) {
	return caches.open(staticCacheName).then(function (cache) {
	  return fetch(request).then(function (response) {
		return cache.put(request, response.clone()).then(function () {
		  return response;
		});
	  });
	});
  }
  function refresh(response) {
	return self.clients.matchAll().then(function (clients) {
	  clients.forEach(function (client) {
		var message = {
		  type: 'refresh',
		  url: response.url,

		  eTag: response.headers.get('ETag')
		};
		client.postMessage(JSON.stringify(message));
	  });
	});
  }