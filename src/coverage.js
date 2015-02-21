(function () {
    'use strict';

	function buildCall(id) {
		return {
			type: 'ExpressionStatement',
			expression: {
				type: 'CallExpression',
				callee: {
					type: 'Identifier',
					name: '__touch'
				},
				arguments: [{
					type: 'Literal',
					value: id,
					raw: id + ''
				}]
			}
		};
	}

	var idCounter = 0;
	var mapping = new Map();

	function insert(node, parent) {
		if (node.type === 'Program' || node.type === 'BlockStatement') {

			var newBody = [];
			node.body.forEach(function (statement) {
				newBody.push(statement);

				if (statement.type !== 'IfStatement' && statement.type !== 'ForStatement') {
					newBody.push(buildCall(idCounter));

					mapping.set(idCounter, {
						line: statement.loc.start.line,
						range: statement.range
					});
					idCounter++;
				}
			});

			node.body = newBody;
		}
	}

    function instrument(originalSource) {
		var parsed = esprima.parse(originalSource, { range: true, loc: true });

		estraverse.traverse(parsed, {
			enter: insert
		});

		var prelude = [
			'window.__touched = new Set();',
			'var __touch = Set.prototype.add.bind(__touched);'
		].join('\n');

		return {
			source: prelude + '\n\n' + escodegen.generate(parsed),
			mapping: mapping
		};
    }

    window.coverage = {
        instrument: instrument
    }
})();