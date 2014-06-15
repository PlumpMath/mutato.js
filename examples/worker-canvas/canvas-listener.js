(function () {
	'use strict';

	var con2d;

	var messageHandler = function (ev) {
		var data = ev.data;

		if (data.method === 'message') {
			console.log.apply(console, data.args);
		} else if (data.method) {
			con2d[data.method].apply(con2d, data.args);
		} else {
			con2d[data.property] = data.value;
		}
	};

	function setup(canvas) {
		con2d = canvas.getContext('2d');
		seal.setMessageHandler(messageHandler);
	}

	function exec(text) {
		con2d.clearStyle = 'white';
		con2d.clearRect(0, 0, con2d.canvas.width, con2d.canvas.height);

		seal.exec(text);
	}

	window.canvasListener = window.canvasListener || {};
	window.canvasListener.setup = setup;
	window.canvasListener.exec = exec;
})();