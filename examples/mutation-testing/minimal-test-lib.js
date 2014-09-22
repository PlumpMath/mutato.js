(function () {
	'use strict';

	var makeMint = function () {
		var running = false;
		var groups = {};
		var results = {};
		var activeGroupName;
		var callback = null;

		var run = function () {
			running = true;

			Object.keys(groups).forEach(function (key) {
				activeGroupName = key;
				groups[key]();
			});

			running = false;
			report(groups);
		};

		var group = function (name, thunk) {
			if (running) { return; }
			groups[name] = thunk;
			results[name] =  {};
			return instance;
		};

		var equals = function (actual, expected, message) {
			if (!running) { return; }
			results[activeGroupName][message] = actual === expected;
		};

		var report = function (_callback) {
			callback = _callback;
		};

		var instance = {
			run: run,
			group: group,
			equals: equals,
			report: report,
			results: results
		};

		return instance;
	};

	self.makeMint = makeMint;
})();