'use strict';
(function() {

	angular.module('gachat')

	.controller('DashboardCtrl', ['$state', 'AuthenticationService', '$location',
		function($state, AuthenticationService, $location) {
		const $ctrl = this;

		console.log("this is DashboardCtrl");

		activate();

		function activate() {
			if (!AuthenticationService.getToken()) {
				$location.path('logIn');
			} else {
				$ctrl.userName = AuthenticationService.currentUser().email;
			}
		}
	}]);
}());
