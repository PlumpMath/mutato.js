(function () {
	'use strict';

	var idle = true;
	var worker = getWorker();
	var messageHandler;
	var MAX_RESPONSE_TIME = 200;

	function getWorker() {
		var worker = new Worker('worker.js');

		worker.addEventListener('message', function (ev) {
			var data = ev.data;

			if (data.type === 'idle' || data.type === 'return' || data.type === 'exception') {
				console.log('Worker idle');
				idle = true;
			}

			messageHandler(ev);
		}, false);

		return worker;
	}

	function checkResponse() {
		if (!idle) {
			console.warn('Terminating non-responding worker');
			worker.terminate();
			worker = getWorker();
		}
	}

	function setMessageHandler(handler) {
		messageHandler = handler;
	}

	function exec(text) {
		if (idle) {
			idle = false;
			worker.postMessage({
				type: 'eval',
				text: text
			});
			setTimeout(checkResponse, MAX_RESPONSE_TIME);
		}
	}

	window.seal = {
		setMessageHandler: setMessageHandler,
		exec: exec
	};
})();