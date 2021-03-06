angular
	.module('AnyoneCanAutomate', ['ngMaterial'])
	.controller('ExtensionCtrl', function ($scope, AutomateCommunicator) {

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			console.log('asdf');
		}; // Implemented elsewhere.
		xhr.open("GET", "localhost:3000/writeFile", true);
		xhr.send();

		$scope.actionsList = [];

		$scope.startLogging = function () {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					from: 'popup',
					subject: 'start'
				});
			});
		};

		$scope.stopLogging = function () {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					from: 'popup',
					subject: 'stop'
				}, function (response) {
					AutomateCommunicator.setActionsList(response);
				});
			});
		};
	})
	.factory('AutomateCommunicator', [
		function () {
			var actionsList;

			var AutomateCommunicator = {
				setActionsList: function (actions) {
					actionsList = actions;
				},

				getActionsList: function () {
					return actionsList;
				}
			}

			return AutomateCommunicator;
		}
	]);
