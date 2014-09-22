'use strict';

importScripts("minimal-test-lib.js");
importScripts("specs.js");

self.postMessage({
	type: 'idle'
});

self.onmessage = function (ev) {
	var data = ev.data;

	if (data.type === 'eval') {
		try {
			new Function(data.text)();
			var mint = self.getSpecs();
			mint.run();
			self.postMessage({
				type: 'return',
				result: mint.results
			});
		} catch (ex) {
			self.postMessage({
				type: 'exception',
				exception: ex
			});
		}
	}
};