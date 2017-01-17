'use strict';
(function() {

	angular.module('gachat')

	.controller('NavCtrl', ['$state', 'AuthenticationService', '$location', function($state, AuthenticationService, $location) {
		const $ctrl = this;

		console.log("this is NavCtrl");
		// TEMPLATE IS NOT CONNECTED TO CONTROLLER ERROR!
		$ctrl.getUser = getUser;
		$ctrl.logout = logout;

		activate();

		function activate() {
			$ctrl.loggedIn = false;
		}

		function getUser() {
			$ctrl.userData = localStorage.getItem('User-Data')
			//JSON.stringify(eval("(" + userData + ")"))
			$ctrl.userData = JSON.parse($ctrl.userData)
			$ctrl.userName = $ctrl.userData.data.email;
			console.log($ctrl.loggedIn);
			$ctrl.loggedIn = true;

		}

		function logout() {
			console.log("LOGOUT");
			localStorage.removeItem('User-Data');
			$location.url(['/']);
		}

	}]);
}());
