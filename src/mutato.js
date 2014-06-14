(function () {
	'use strict';

	// use some RNG

	var mutato = {};

	function traverse(visitor) {
		return function traverse(tree) {
			if (Array.isArray(tree)) {
				tree.forEach(function (element) {
					visitor(element);
					traverse(element);
				});
			} else if (tree && typeof tree === 'object') {
				Object.keys(tree).forEach(function (key) {
					visitor(tree[key]);
					traverse(tree[key]);
				});
			}
		}
	}

	mutato.numberMutator = function (node) {
		if (node && node.type === 'Literal' && typeof node.value === 'number') {
			node.value += Math.round(Math.random()) * 2 - 1;
			node.value = Math.max(0, node.value);
			node.raw = '' + node.value;
		}
	};

	var alternateComparator = {
		'>': '>=',
		'>=': '>',
		'<': '<=',
		'<=': '<',
		'===': '!==',
		'!==': '===',
		'==': '!=',
		'!=': '=='
	};
	mutato.comparatorMutator = function (node) {
		if (node && node.type === 'BinaryExpression' && alternateComparator[node.operator]) {
			if (Math.random() < 0.1) {
				node.operator = alternateComparator[node.operator];
			}
		}
	};

	mutato.eraserMutator = function (node) {
		if (node && node.type === 'BlockStatement' && node.body.length) {
			if (Math.random() < 0.1) {
				var index = Math.floor(Math.random() * node.body.length);
				node.body.splice(index, 1);
			}
		}
	};

	mutato.duplicatorMutator = function (node) {
		if (node && node.type === 'BlockStatement' && node.body.length) {
			if (Math.random() < 0.1) {
				var index = Math.floor(Math.random() * node.body.length);
				// there's probably no need for deep cloning
				node.body.splice(index, 0, node.body[index]);
			}
		}
	};

	mutato.mutate = function (originalSource, mutator) {
		var parsed = esprima.parse(originalSource);

		traverse(mutator)(parsed);

		var newCode = escodegen.generate(parsed);

		return newCode;
	};

	window.mutato = mutato;
})();