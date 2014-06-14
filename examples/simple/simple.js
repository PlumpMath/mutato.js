(function () {
	'use strict';

	console.log('mutato.js\n=========\n');

	var originalSource = [
		'for (var i = 0; i < 10; i++) {',
		'  console.log(i);',
		'}'
	].join('\n');

	console.log('Original source: \n', originalSource);
	console.log('---------\n');

	var newSource = originalSource;

	// applying some mutation operators on the source
	newSource = mutato.mutate(newSource, mutato.numberMutator);
	newSource = mutato.mutate(newSource, mutato.duplicatorMutator);
	// not running the comparatorMutator as it can result in an infinite loop

	console.log('New, mutated source: \n', newSource);
	console.log('---------\n');

	eval(newSource);
})();