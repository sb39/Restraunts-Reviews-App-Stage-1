if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(function() {
		console.log('caching successfull');
	})
	.catch(function() {
		console.log('caching unsuccessfull');
	});
}