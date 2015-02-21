(function () {
	'use strict';

	console.log('mutato.js\n=========\n');

	var originalSource = [
		'for (var i = 0; i < 10; i++) {',
		'  console.log(i);',
		'  i++;',
		'  if (i > 20) {',
		'    console.log("asd");',
		'  }',
		'}'
	].join('\n');

	console.log('Original source: \n', originalSource);
	console.log('---------\n');

	var result = coverage.instrument(originalSource);

	console.log('Instrumented source:');
	console.log(result.source);
	console.log('---------\n');

	console.log('Program execution');
	eval(result.source);
	console.log('---------\n');

	console.log('Lines touched:');
	window.__touched.forEach(function (value, key) {
		console.log(result.mapping.get(value).line);
	})
})();