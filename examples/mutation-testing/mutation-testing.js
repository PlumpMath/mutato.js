(function () {
	'use strict';

	var app = angular.module('app', []);

	var data = {
		source: '',
		tests: '',
		result: ''
	};

	var mutate = function (code) {
		var mutant = code;
		mutant = mutato.mutate(mutant, mutato.comparatorMutator);
		mutant = mutato.mutate(mutant, mutato.numberMutator);
		mutant = mutato.mutate(mutant, mutato.duplicatorMutator);
		return mutant;
	};



	app.controller('TextController', ['$scope', '$http', function ($scope, $http) {
		$scope.data = data;

		var onResult = function (result) {
			data.result = result;
			$scope.$apply();
		};

		var messageHandler = function (data) {
			if (data.type !== 'return') { return; }

			var results = data.result;

			var stringedResult = '';
			Object.keys(results).forEach(function (groupName) {
				Object.keys(results[groupName]).forEach(function (message) {
					if (!results[groupName][message]) {
						stringedResult += 'Failed: ' + groupName + ' : ' + message + '\n';
					}
				});
			});
			stringedResult = stringedResult || 'All passed';
			onResult(stringedResult);
		};

		var seal = makeSeal(messageHandler);

		var getSample = function (fileName) {
			$http.get(fileName).then(function (response) {
				data.source = response.data;
				seal.exec(data.source);
			});
		};

		$scope.mutate = function () {
			data.source = mutate(data.source);
			seal.exec(data.source);
		};

		$scope.reset = function () {
			getSample('math-lib.js');
		};

		$scope.exec = function () {
			seal.exec(data.source);
		};


		getSample('math-lib.js');

		$http.get('specs.js').then(function (response) {
			data.tests = response.data;
		});
	}]);
})();