(function () {
	'use strict';

	var app = angular.module('app', []);

	var data = {
		text: ''
	};

	var canvas = document.getElementById('can');
	canvasListener.setup(canvas);

	app.controller('TextController', ['$scope', '$http', function ($scope, $http) {
		$scope.data = data;

		function getSample(name) {
			$http.get('samples/' + name + '.js').then(function (response) {
				data.text = response.data;
				canvasListener.exec(data.text);
			});
		}

		$scope.mutate = function () {
			data.text = mutato.mutate(data.text, mutato.numberMutator);
			canvasListener.exec(data.text);
		};

		$scope.reset = function () {
			getSample('sample1');
		};

		$scope.exec = function () {
			canvasListener.exec(data.text);
		};

		getSample('sample1');
	}]);
})();