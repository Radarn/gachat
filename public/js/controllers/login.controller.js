(function() {

	angular.module('gachat')

	.controller('LoginCtrl', ['$state', '$location',
	 	'AuthenticationService', function($state, $location, AuthenticationService) {
		const $ctrl = this;
		console.log("this is LoginCtrl ctrl");

		$ctrl.onSubmit = onSubmit;

		activate();

		function activate() {
			$ctrl.user = AuthenticationService.currentUser();
			if ($ctrl.user) {
				$location.path('home');
			}
			$ctrl.currentStateName = $state.current.name;
			$ctrl.password = true;
			$ctrl.credentials = {
				email : "",
				password: ""
			}
		}

		function onSubmit() {
      AuthenticationService
      .login($ctrl.credentials)
      .error((err) => {
				$ctrl.password = false
      })
      .then(() => {
				console.log("LOGGED IN")
        $location.path('home');
      });
		}

	}]);
}());
