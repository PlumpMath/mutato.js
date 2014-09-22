(function () {
	'use strict';

	self.getSpecs = function () {
		var mint = makeMint();

		mint.group('add', function () {
			mint.equals(mm.add(0, 0), 0, '0 + 0 = 0');
			mint.equals(mm.add(0, 3), 3, '0 + 3 = 3');
			mint.equals(mm.add(6, 0), 6, '6 + 0 = 6');
			mint.equals(mm.add(10, 7), 17, 'adds 2 numbers together');
		}).group('mul', function () {
			mint.equals(mm.mul(0, 0), 0, '0 * 0 = 0');
			mint.equals(mm.mul(0, 3), 0, '0 * 3 = 0');
			mint.equals(mm.mul(6, 0), 0, '6 * 0 = 0');
			mint.equals(mm.mul(10, 7), 70, 'multiplies 2 numbers together');
		});

		return mint;
	};
})();