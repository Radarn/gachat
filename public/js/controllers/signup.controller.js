'use strict';
(function() {

	angular.module('gachat')

	.controller('SignUpCtrl', ['$state', 'HttpFactory', function($state, HttpFactory) {
		var $ctrl = this;
		console.log("this is SignUpCtrl ctrl");

		$ctrl.createUser = createUser;

		activate();

		function activate() {
			
		}

		function createUser() {
			var newUser = {
				data: $ctrl.newUser,
				url: "/api/polls/"
			}
			console.log(`Success! ${$ctrl.newUser}`)
			HttpFactory.post($ctrl.newUser).then(function(res) {

			});
		}

	}]);
}());