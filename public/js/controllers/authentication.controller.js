'use strict';
(function() {

	angular.module('gachat')

	.controller('AuthenticationCtrl', ['$state', 'HttpFactory', '$location', function($state, HttpFactory, $location) {
		var $ctrl = this;
		console.log("this is AuthenticationCtrl ctrl");

		$ctrl.createUser = createUser;
		$ctrl.logUserIn = logUserIn;

		activate();

		function activate() {
			//$ctrl.loggedIn;
		}

		if (localStorage['User-data']) {

		}

		function logUserIn() {
			$ctrl.userLogIn = {
				data: $ctrl.logIn,
				url: "/api/user/login"
			}
			
			HttpFactory.post($ctrl.userLogIn).then(function(res) {
				if (res.data._id) {
					
					localStorage.setItem('User-Data', JSON.stringify(res));
					$location.url(['/home'])
				} else {
					alert("Wrong information! Please try again")
					let input = document.getElementsByTagName('input');
					for (let i = 0; i < input.length; i++) {
						input[i].value = "";
					}
					//$ctrl.loggedIn = false;
				}
			});
		}

		function createUser() {
			var newUser = {
				data: $ctrl.newUser,
				url: "/api/users"
			}
			console.log(`${$ctrl.newUser}`)
			HttpFactory.post(newUser).then(function(res) {
				console.log(res.data);
				
				$location.url(['/home'])
			});
		}

	}]);
}());