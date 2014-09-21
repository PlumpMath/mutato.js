(function () {
	'use strict';

	var con2d, seal;

	var messageHandler = function (data) {
		if (data.method === 'message') {
			console.log.apply(console, data.args);
		} else if (data.method) {
			con2d[data.method].apply(con2d, data.args);
		} else if (data.property) {
			con2d[data.property] = data.value;
		}
	};

	var setup = function (canvas) {
		con2d = canvas.getContext('2d');
		seal = makeSeal();
		seal.setMessageHandler(messageHandler);
	};

	var exec = function (text) {
		con2d.clearStyle = 'white';
		con2d.clearRect(0, 0, con2d.canvas.width, con2d.canvas.height);

		seal.exec(text);
	};

	window.canvasListener = window.canvasListener || {};
	window.canvasListener.setup = setup;
	window.canvasListener.exec = exec;
})();