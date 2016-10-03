'use strict';
(function() {

	angular.module('gachat')

	.controller('DashboardCtrl', ['$state', 'AuthenticationFactory', '$location', function($state, AuthenticationFactory, $location) {
		var $ctrl = this;
		
		console.log("this is DashboardCtrl ctrl");

		$ctrl.getUser = getUser;
		
		activate();

		function activate() {
			
		}

		function getUser() {
			//AuthenticationFactory.getCurrentUser()
		}
		
	}]);
}());