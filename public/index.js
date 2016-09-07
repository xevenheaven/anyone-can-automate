angular
	.module('AnyoneCanAutomate', ['ngMaterial'])
	.controller('AutomaterCtrl', function ($scope, $sce, $http, $window) {

		/**
		 * Controls whether each panel is collapsed or not.
		 */
		$scope.isCollapsed = true;

		/**
		 * Placeholder for action type dropdown.
		 */
		$scope.selectedOption = 'Select';

		/**
		 * Dummy list of actions.
		 * TODO Get actual list from chrome extension.
		 */
		$scope.actionsList = [
			{
				name: 'Action 1',
				class: '.some class'
			},
			{
				name: 'Action 2',
				id: 'some id'
			}
		];

		/**
		 * METHOD
		 * Handle the change in action type per action.
		 */
		$scope.selectOption = function (type, action) {
			action.actionType = type;
			action.expectedVal = null;
			action.isAdded = false;

			if (type === 'colour') {
				$scope.selectedOption = 'Colour';
				action.expectedVal = '#FFFFFF';
			} else if (type === 'text') {
				$scope.selectedOption = 'Text';
			} else if (type === 'visible') {
				$scope.selectedOption = 'Visibility';
				action.expectedVal = 'Yes';
				action.isAdded = true;
			} else {
				$scope.selectedOption = null;
			}
		};

		/**
		 * METHOD
		 * Gets the expected value per action.
		 */
		$scope.getValue = function (action) {
			if (action.expectedVal) {
				action.isAdded = true;
			} else {
				action.isAdded = false;
			}
		};

		$scope.generateCode = function () {
			console.log($scope.actionsList);
			var payload = {};
			payload.uri = "some uri alskdfhalskjdf";
			payload.actions = $scope.actionsList.filter(function (item) {
				return item.isAdded;
			});
		
			$http.post('/generateViewTest', JSON.stringify(payload)).then(function() {
					$window.open('/download');
			});
			
		}
	});
