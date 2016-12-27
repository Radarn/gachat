'use strict';
(function() {

	angular.module('gachat')

	.controller('EditProfileCtrl', ['Upload', '$state', '$http', '$location',
                          function(Upload, $state, $http, $location) {
		const $ctrl = this;

		$ctrl.upload = upload;
		$ctrl.checkForUser = checkForUser;

		console.log("this is EditProfileCtrl");

		activate();

		function activate() {
			checkForUser();
			$ctrl.user = JSON.parse(localStorage['User-Data']) || undefined;
		}

		function checkForUser() {
			if (localStorage['User-Data']) {
				$ctrl.loggedIn = true;
				let userJsonObj = JSON.parse(localStorage.getItem('User-Data'))
				$ctrl.currentUserName = userJsonObj.data.email;
			} else {
				$ctrl.loggedIn = false;
				$location.url(['/']);
			}
		}

		function upload(e, file) {
			console.log("FIRING");
			e.preventDefault();
			console.log(e, file);
			if(file) {
				Upload.upload({
					url: '/profile/edit',
					method: 'POST',
					data: $ctrl.user._id
				}).progress((evt) => {
					console.log("firing");
				}).success((data) => {
					console.log("Success");
				}).error((error) => {
					console.log(error);
				})
			}
		}

	}]);
}());
