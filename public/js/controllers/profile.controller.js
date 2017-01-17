'use strict';
(function() {

	angular.module('gachat')

	.controller('ProfileCtrl', ['Upload', 'AuthenticationService', '$http', '$location', 'HttpFactory',
                          function(Upload, AuthenticationService, $http, $location, HttpFactory) {
		const $ctrl = this;

		$ctrl.upload = upload;
		$ctrl.deleteProfile = deleteProfile;

		console.log("this is ProfileCtrl");

		activate();

		function activate() {
			$ctrl.userName = AuthenticationService.currentUser().email;
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
