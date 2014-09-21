(function () {
	'use strict';

	var makeSeal = function (_messageHandler) {
		var idle = true;
		var messageHandler = _messageHandler;
		var worker = getWorker();
		var MAX_RESPONSE_TIME = 200;

		function getWorker() {
			var worker = new Worker('worker.js');

			worker.addEventListener('message', function (ev) {
				var data = ev.data;

				if (data.type === 'idle' || data.type === 'return' || data.type === 'exception') {
					idle = true;
				}

				messageHandler(data);
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

		return {
			setMessageHandler: setMessageHandler,
			exec: exec
		};
	};

	window.makeSeal = makeSeal;
})();