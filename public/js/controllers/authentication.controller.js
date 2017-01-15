'use strict';
(function() {

	angular.module('gachat')

	.controller('AuthenticationCtrl', ['$state', 'HttpFactory', '$location', function($state, HttpFactory, $location) {
		const $ctrl = this;
		console.log("this is AuthenticationCtrl ctrl");

		$ctrl.createUser = createUser;
		$ctrl.logUserIn = logUserIn;
		$ctrl.checkForUser = checkForUser;
		$ctrl.createCookie = createCookie;

		activate();
		function activate() {
			$ctrl.loggedIn = false;
			$ctrl.currentUrl = $state.current.url;
			if ($ctrl.currentUrl !== '/signup') {
				checkForUser();
			}
		}

		function checkForUser() {
			if (localStorage['User-Data']) {
				$ctrl.loggedIn = true;
				let userJsonObj = JSON.parse(localStorage.getItem('User-Data'))
				$ctrl.currentUserName = userJsonObj.data.email;
				$location.url(['/home']);
			} else {
				$ctrl.loggedIn = false;
				$location.url(['/']);
			}
		}

		function logUserIn() {
			$ctrl.userLogIn = {
				data: $ctrl.logIn,
				url: '/api/user/login'
			}

			HttpFactory.post($ctrl.userLogIn).then((res) => {
				if (res.data._id) {
					$ctrl.loggedIn = true;
					localStorage.setItem('User-Data', JSON.stringify(res));
					createCookie();
					$location.url(['/home'])
				} else {
					alert("Wrong information! Please try again")
					let input = document.getElementsByTagName('input');
					for (let i = 0; i < input.length; i++) {
						input[i].value = "";
					}
					$ctrl.loggedIn = false;
				}
			});
		}

		function createCookie() {
			let cookieInfo = {
				url: '/api/cookie'
			}
			HttpFactory.get(cookieInfo).then((res) => {
				console.log('cookie response', res);
				console.log(document.cookie);
			});
		}

		function createUser() {
			let newUser = {
				data: $ctrl.newUser,
				url: "/api/users"
			}
			console.log(`${$ctrl.newUser}`)
			HttpFactory.post(newUser).then((res) => {
				console.log(res.data);

				$location.url(['/login'])
			});
		}

	}]);
}());
