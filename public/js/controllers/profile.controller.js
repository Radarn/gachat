'use strict';
(function() {

	angular.module('gachat')

	.controller('ProfileCtrl', ['Upload', 'AuthenticationService', '$http', '$location', 'HttpFactory',
                          function(Upload, AuthenticationService, $http, $location, HttpFactory) {
		const $ctrl = this;

		$ctrl.uploadProfilePicture = uploadProfilePicture;
		$ctrl.deleteProfile = deleteProfile;
		$ctrl.updateEmail = updateEmail;
		$ctrl.updateBio = updateBio;
		$ctrl.getImage = getImage;

		console.log("this is ProfileCtrl");

		activate();

		function activate() {
			if (!AuthenticationService.getToken()) {
				$location.path('logIn');
			} else {
				$ctrl.user = AuthenticationService.currentUser();
				$ctrl.email = $ctrl.user.email;
				$ctrl.bioLength = true;
				$ctrl.uploadSuccess;
				$ctrl.bioUpdateSuccess;
				$ctrl.emailUpdateSuccess;
				/*$ctrl.credentials = {
					bio: '',

				}*/
				getImage()
			}
		}

		function uploadProfilePicture(e, file) {
			console.log("file", file)
			if(file) {
				Upload.upload({
					url: `http://localhost:8000/api/profile/uploadPhoto`,
					method: 'POST',
					data: {email: $ctrl.email},
					file: file
				}).progress((evt) => {
					console.log("firing");
				}).success((data) => {
					console.log("success")
					$ctrl.uploadSuccess = true;
				}).error((error) => {
					$ctrl.uploadSuccess = false;
					console.log("error")
				})
			}
		}

		function getImage() {
			console.log($ctrl.email)
			console.log("get image")
			const request = {
				url: `/api/profile/getImage/${$ctrl.email}`
			}

			HttpFactory.get(request).then((res) => {
				if (res.data.image) {
					$ctrl.imageUrl = res.data.image;
					$ctrl.imageUrl = `../../..${$ctrl.imageUrl}`
				}
			});
		}

		function deleteProfile() {
			//const result = confirm("Are you sure that you want to delete your account?")
			console.log("deleteing")
			const request = {
				url: `/api/profile/delete/${$ctrl.email}`
			}
			HttpFactory.delete(request).then((res) => {
				alert("Your account was successfully deleted");
				localStorage.removeItem('User-Data');
				$location.url(['/login']);
			});
		}

		function updateEmail() {
			const request = {
				url: '/api/profile/updateEmail',
				data: $ctrl.user
			}

			HttpFactory.post(request).then((res) => {
				console.log(res)
				if (res.data.newEmail === true) {
					$ctrl.emailUpdateSuccess = true;
				} else {
					$ctrl.emailUpdateSuccess = false;
				}
			});
		}

		function updateBio() {
			$ctrl.bioLength = false;
			if ($ctrl.user.bio) {
				const request = {
					url: '/api/profile/updateBio',
					data: $ctrl.user
				}

				HttpFactory.post(request).then((res) => {
					if (res.data.bio) {
						console.log("success")
						$ctrl.bioUpdateSuccess = true;
					} else {
						$ctrl.bioUpdateSuccess = false;
					}
				});
			}
		}

	}]);
}());
