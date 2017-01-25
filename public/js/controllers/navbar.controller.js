'use strict';
(function() {

	angular.module('gachat')

	.controller('NavCtrl', ['$scope', '$state', 'AuthenticationService', '$location', function($scope, $state, AuthenticationService, $location) {
		const $ctrl = this;

		console.log("this is NavCtrl");

		$ctrl.logout = logout;

		activate();

		function activate() {
			console.log("nav", AuthenticationService.currentUser())
			/*if (!AuthenticationService.currentUser()) {
				$ctrl.loggedIn = false;
			} else {
				$ctrl.loggedIn = true;
			}*/
		}

		function logout() {
			console.log("LOGOUT");
			localStorage.removeItem('User-Data');
			$location.url(['/']);
		}

	}]);
}());
