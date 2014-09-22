(function () {
	'use strict';

	var add = function (a, b) {
		// ridiculous way of adding 2 positive numbers
		var result = 0;
		for (var i = 0; i < a; i++) {
			result++;
		}
		for (var i = 0; i < b; i++) {
			result++;
		}
		return result;
	};

	var mul = function (a, b) {
		// ridiculous way of multiplying 2 positive numbers
		var result = 0;
		for (var i = 0; i < a; i++) {
			result = add(result, b);
		}
		return result;
	};

	self.mm = self.mm || {};
	self.mm.add = add;
	self.mm.mul = mul;
})();