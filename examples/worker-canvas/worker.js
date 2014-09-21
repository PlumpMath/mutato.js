'use strict';

importScripts('canvas-emitter.js');

self.postMessage({
	type: 'idle'
});

self.onmessage = function (ev) {
	var data = ev.data;

	if (data.type === 'eval') {
		try {
			// the eval may run forever and there's no way of telling it
			// the master will kill this worker if it does not respond within a second or so
			var fun = new Function(data.text);
			var ret = fun();
			self.postMessage({
				type: 'return',
				value: ret
			});
		} catch (e) {
			self.postMessage({
				type: 'exception',
				value: e
			});
		}
	}
};