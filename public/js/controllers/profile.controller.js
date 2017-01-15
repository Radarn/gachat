'use strict';
(function() {

	angular.module('gachat')

	.controller('ProfileCtrl', ['Upload', '$state', '$http', '$location', 'HttpFactory',
                          function(Upload, $state, $http, $location, HttpFactory) {
		const $ctrl = this;

		$ctrl.upload = upload;
		$ctrl.checkForUser = checkForUser;
		$ctrl.deleteProfile = deleteProfile;

		console.log("this is EditProfileCtrl");

		activate();

		function activate() {
			console.log($state)
			$ctrl.user = JSON.parse(localStorage.getItem('User-Data')) || undefined;
			checkForUser();
		}

		function checkForUser() {
			if (localStorage['User-Data']) {
				$ctrl.loggedIn = true;
				//let userJsonObj = JSON.parse(localStorage.getItem('User-Data'))
				$ctrl.currentUserName = $ctrl.user.data.email;
			} else {
				$ctrl.loggedIn = false;
				$location.url(['/']);
			}
		}

		function upload(e, file) {
			console.log("FIRING");
			console.log(e, file);
			if(file) {
				Upload.upload({
					url: '/api/profile/edit',
					method: 'POST',
					data: $ctrl.user.data._id
				}).progress((evt) => {
					console.log("firing");
				}).success((data) => {
					console.log("Success");
				}).error((error) => {
					console.log(error);
				})
			}
		}

		function deleteProfile() {
			const result = confirm("Are you sure that you want to delete your account?")
			if (result) {
				const userId = $ctrl.user.data._id
				let currentUser = {
					data: $ctrl.user.data._id,
					url: `/api/profile/edit/${userId}`
				}
				HttpFactory.delete(currentUser).then((res) => {
					alert("Your account was successfully deleted");
					localStorage.removeItem('User-Data');
					$location.url(['/login']);
				});
			}
		}

	}]);
}());
