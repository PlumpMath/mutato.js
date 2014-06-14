var con;

(function () {
	'use strict';

	function createMethod(object, name) {
		object[name] = function () {
			postMessage({
				method: name,
				args: Array.prototype.slice.call(arguments, 0)
			});
		}
	}

	function createAccessor(object, propertyName) {
		Object.defineProperty(object, propertyName, {
			set: function (value) {
				postMessage({
					property: propertyName,
					value: value
				});
			}
		});
	}

	con = {};

	createMethod(con, 'message');
	createMethod(con, 'beginPath');
	createMethod(con, 'lineTo');
	createMethod(con, 'moveTo');
	createMethod(con, 'fillRect');
	createMethod(con, 'strokeRect');

	createAccessor(con, 'fillStyle');
	createAccessor(con, 'strokeStyle');
})();