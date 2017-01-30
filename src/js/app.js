'use strict';

angular.module('gachat', ['ui.router', 'ngFileUpload', 'ngMessages']);

'use strict';

angular.module('gachat')

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================

        .state('signUp', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'RegisterCtrl',
            controllerAs: '$ctrl'
        })

        .state('logIn', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl',
            controllerAs: '$ctrl',
            access: {
              isFree: true
            }
        })

        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'DashboardCtrl',
            controllerAs: '$ctrl'
        })

        .state('chat', {
            url: '/chat/:gameName',
            templateUrl: 'chat.html',
            controller: 'ChatCtrl',
            controllerAs: '$ctrl'
        })

        .state('profile', {
          templateUrl: 'profile.html',
          controller: 'ProfileCtrl',
          controllerAs: '$ctrl'
        })

        .state('edit', {
          templateUrl: 'profile.edit.html',
          controller: 'ProfileCtrl',
          controllerAs: '$ctrl'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'about.html',
            controller: function() {
                console.log("about controller");
            }
        })

}]);

angular.module('gachat').run(['$templateCache', function($templateCache) {$templateCache.put('about.html','<h1>About</h1>');
$templateCache.put('chat.html','<div class="group-chat grey darken-4">\n  <div class="container">\n\n<h3 class="grey-text text-lighten-5">\n  <span>Chat with other gamers!</span>\n</h3>\n<div class="row">\n  <div class="col s8">\n    <strong class="grey-text text-lighten-5">Message</strong>\n  </div>\n  <div class="col s1 offset-s3 grey-text text-lighten-5">\n    <strong>Date</strong>\n  </div>\n</div>\n<div class="row">\n  <div class="chat-box col s12">\n    <div class="row message-border" ng-repeat="message in $ctrl.messages">\n      <div class="col s8">\n        <strong class="grey-text text-lighten-5"><em>{{message.user}}</em> :</strong>\n        <span class="grey-text text-lighten-5">{{message.message}}</span>\n      </div>\n      <div class="col s2 offset-s2 right-align grey-text text-lighten-5">\n        {{$ctrl.stripDate(message.date)}}\n      </div>\n      <br>\n    </div>\n  </div>\n</div>\n<div class="row">\n  <div class="input-field col s12 ">\n    <textarea ng-model="$ctrl.chatMessage.newMessage" id="icon_prefix2" class="materialize-textarea grey-text text-lighten-5"></textarea>\n    <label for="icon_prefix2">Message text</label>\n  </div>\n</div>\n<button ng-click="$ctrl.sendMessage()"class="btn waves-effect waves-light" type="submit" name="action">Send message\n    <i class="material-icons right">send</i>\n</button>\n</div>\n</div>\n');
$templateCache.put('home.html','<div class="home-menu grey darken-4">\n\t<div class="container">\n\t\t<h1><span class="grey-text text-lighten-5">Logged in as:</span> <a ui-sref="profile" class="cyan-text user-name">{{$ctrl.userName}}</a></h1>\n\t\t<div class="row">\n\t\t\t<div class="col s3">\n\t\t\t\t<div class="card hoverable">\n\t\t      <div class="card-image">\n\t\t      \t<a ng-href="#/chat/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n\t\t      </div>\n\t\t      <div class="card-content">\n\t\t        <p>Counter-Strike: Global Offensive</p>\n\t\t      </div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t    <div class="col s3">\n\t\t\t\t\t<div class="card hoverable">\n\t\t        <div class="card-image">\n\t\t        \t<a ng-href="#/chat/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n\t\t        </div>\n\t\t        <div class="card-content">\n\t\t          <p>Dota 2</p>\n\t\t        </div>\n\t\t\t\t\t</div>\n\t\t    </div>\n\t\t    <div class="col s3">\n\t\t\t\t\t<div class="card hoverable">\n\t\t        <div class="card-image">\n\t\t        \t<a ng-href="#/chat/leagueoflegends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n\t\t        </div>\n\t\t        <div class="card-content">\n\t\t          <p>League of Legends</p>\n\t\t        </div>\n\t\t\t\t\t</div>\n\t\t    </div>\n\t\t     <div class="col s3">\n\t\t\t\t\t <div class="card hoverable">\n\t\t         <div class="card-image">\n\t\t         \t<a ng-href="#/chat/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n\t\t         </div>\n\t\t         <div class="card-content">\n\t\t           <p>Overwatch</p>\n\t\t         </div>\n\t\t \t\t\t</div>\n\t\t\t\t </div>\n\t\t</div>\n\t</div>\n</div>\n');
$templateCache.put('login.html','<div class="login">\n  <div class="container">\n    <div class="row">\n      <form name="loginForm" class="col s6 offset-s4 login-form" ng-submit="$ctrl.onSubmit()" required>\n        <h4 class="user-login grey-text text-lighten-5">Log in</h4>\n          <div class="row">\n            <div class="input-field col s8">\n                <input id="email" name="email" type="email" class="validate grey-text text-lighten-5"\n                  ng-model="$ctrl.credentials.email" required>\n                <label for="email">Email Adress</label>\n                <div ng-messages="loginForm.email.$error">\n                  <div ng-if="loginForm.email.$dirty">\n                    <div ng-message="required" class="red-text darken-1">This field is required</div>\n                    <div ng-message="email" class="red-text darken-1">Your email address is invalid</div>\n                  </div>\n                </div>\n            </div>\n          </div>\n          <div class="row">\n            <div class="input-field col s8">\n              <input name="password" class="validate grey-text text-lighten-5" id="password" type="text"\n                class="validate" ng-model="$ctrl.credentials.password" required>\n              <label for="password">Password</label>\n              <div ng-messages="loginForm.password.$error">\n                <div ng-if="$ctrl.password === false">\n                  <div class="red-text darken-1">Wrong password or email</div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="row btn-container">\n            <button class="btn waves-effect waves-light" type="submit" name="action">Log in\n              <i class="material-icons right">send</i>\n            </button>\n          </form>\n          <a class="btn waves-effect waves-light" name="action" href="#/signup">Create new user\n            <i class="material-icons right">send</i>\n          </a>\n          </div>\n      </div>\n  </div>\n</div>\n');
$templateCache.put('navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n              <li><a href="#/about">About</a></li>\n              <li><a href="#"> {{$ctrl.userName}}</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('profile.edit.html','<div class="edit-profile grey darken-4">\n  <div class="container">\n  <form name="editProfilePictureForm" ng-submit="$ctrl.uploadProfilePicture(e, $ctrl.user.file)">\n    <div class="row edit-profile-field">\n      <div class="file-field input-field col s12 edit-profile-field" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n        accept="image/*">\n          <div class="btn">\n            <span>File</span>\n            <input type="file">\n          </div>\n          <div class="file-path-wrapper">\n            <input class="file-path validate grey-text text-lighten-5" type="text">\n      </div>\n      <div ng-if="$ctrl.uploadSuccess === true">\n        <p class="green-text darken-1 upload-message">Your profile picture was successfully updated!</p>\n      </div>\n      <div ng-if="$ctrl.uploadSuccess === false">\n        <p class="red-text darken-1 upload-message">Error! Your profile picture was not updated!</p>\n      </div>\n    </div>\n    <button class="btn waves-effect waves-light" type="submit" name="action">Upload Photo</button>\n    <br/>\n      <i class="display-block margin-top-10 grey-text text-lighten-5">Recommended values for height and width are Minimum 200px and Maximum 280px. If your profile picture is not in line with the recommended values\n        your profile picture will be transformed into poor quality.\n      into poor quality</i>\n    </div>\n  </form>\n  <form name="editEmailForm" ng-submit="$ctrl.updateEmail()">\n    <div class="row edit-profile-field">\n      <div class="input-field col s12">\n        <input id="textarea-email" name="email" type="email" class="validate grey-text text-lighten-5" ng-model="$ctrl.user.newEmail">\n        <label for="textarea-email">Email</label>\n        <div ng-messages="editEmailForm.email.$error"></div>\n        <div ng-if="$ctrl.emailUpdateSuccess === true">\n          <p class="green-text darken-1 upload-message">Your email was successfully updated!<p>\n        </div>\n        <div ng-if="$ctrl.emailUpdateSuccess === false">\n          <p class="green-text darken-1 upload-message">Error! Your email was not updated!<p>\n        </div>\n        <button class="btn waves-effect waves-light" type="submit" name="action">Update Email Adress</button>\n        </div>\n      </div>\n    </form>\n    <form name="editBioForm" ng-submit="$ctrl.updateBio()">\n      <div class="row edit-profile-field">\n        <div class="input-field col s12">\n          <textarea id="textarea-bio" name="bio" class="materialize-textarea grey-text text-lighten-5" length="120"\n            ng-model="$ctrl.user.bio" ng-minlength="50" ng-maxlength="1000"></textarea>\n          <label for="textarea-bio">Your bio</label>\n          <div ng-messages="editBioForm.bio.$error">\n            <div ng-if="$ctrl.bioLength === false">\n              <div ng-message="minlength" class="red-text darken-1">Bio is too short. Minimum characters allowed is 50</div>\n              <div ng-message="maxlength" class="red-text darken-1">Bio is too long. Minimum characters allowed is 1000</div>\n            </div>\n          </div>\n          <div ng-if="$ctrl.bioUpdateSuccess === true">\n            <p class="green-text darken-1 upload-message">Your bio was successfully updated!<p>\n          </div>\n          <div ng-if="$ctrl.bioUpdateSuccess === false">\n            <p class="red-text darken-1 upload-message">Error! Your bio was not updated!<p>\n          </div>\n          <button class="btn waves-effect waves-light" type="submit" name="action">Update Bio</button>\n        </div>\n      </div>\n    </form>\n</div>\n</div>\n');
$templateCache.put('profile.html','<div class="profile grey darken-4">\n  <div class="profile-info-box">\n  <div ng-if="$ctrl.imageUrl">\n    <div class="row profile-picture-container">\n        <img class="responsive-img profile-picture" ng-src="{{$ctrl.imageUrl}}" rel="image" />\n  </div>\n  </div>\n  <div class="row">\n    <div class="col s2 offset-s4">\n      <a class="btn waves-effect waves-light btn-large" type="submit" name="action"\n        ui-sref="edit">Edit Profile</a>\n      </div>\n      <div class="col s3">\n        <button class="btn waves-effect waves-light btn-large red darken-1" type="submit" name="action"\n        ng-click="$ctrl.deleteProfile()">Delete Profile\n              <i class="material-icons right">send</i>\n        </button>\n      </div>\n  </div>\n</div>\n</div>\n</div>\n');
$templateCache.put('signup.html','<div class="signup">\n  <div class="container">\n    <div class="row">\n      <form name="signupForm" class="col s6 offset-s4 signup-form" ng-submit="$ctrl.onSubmit()">\n        <h4 class="create-new-user grey-text text-lighten-5">Create new user</h4>\n        <div class="row">\n          <div class="input-field col s8">\n            <input name="email" id="email" type="email" class="validate grey-text text-lighten-5" ng-model="$ctrl.credentials.email" required>\n            <label for="email">Email Adress</label>\n            <div ng-messages="signupForm.email.$error">\n              <div ng-if="signupForm.email.$dirty">\n                <div ng-message="required" class="red-text darken-1">This field is required</div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="row">\n          <div class="input-field col s8">\n            <input name="password" id="password" type="text"\n              class="validate grey-text text-lighten-5" ng-model="$ctrl.credentials.password" ng-minlength="6" required>\n            <label for="password">Password</label>\n            <div ng-messages="signupForm.password.$error">\n              <div ng-if="signupForm.password.$dirty">\n                <div ng-message="required" class="red-text darken-1">This field is required</div>\n                <div ng-message="minlength" class="red-text darken-1">Password must be over 6 characters</div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="row btn-container">\n          <button class="btn waves-effect waves-light" type="submit" name="action">Register\n            <i class="material-icons right">send</i>\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('partials/navbar.html','<nav class="cyan darken-4">\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n          <div>\n            <li><a ui-sref="profile">Profile</a></li>\n            <li><a href="#/about">About</a></li>\n            <li><a ng-click="$ctrl.logout()">Logout</a></li>\n          </div>\n        </ul>\n        </div>\n    </div>\n</nav>\n');}]);
'use strict';
(function() {

	angular.module('gachat')

	.controller('ChatCtrl', ['HttpFactory', '$state', '$location',
	 	'AuthenticationService', function(HttpFactory, $state, $location, AuthenticationService) {
    const $ctrl = this;

		console.log("this is ChatCtrl");

		$ctrl.sendMessage = sendMessage;
		$ctrl.getAllMessages = getAllMessages;
		$ctrl.stripDate = stripDate;

		activate();

		function activate() {
			$ctrl.messages = "";
			$ctrl.currentUrl = $state.params.gameName;
			if (!AuthenticationService.getToken()) {
				$location.path('logIn');
			} else {
				$ctrl.userName = AuthenticationService.currentUser().email;
				getAllMessages()
			}
		}

		function sendMessage() {
			$ctrl.chatMessage.type = $ctrl.currentUrl;
			$ctrl.chatMessage.user = $ctrl.userName;
			console.log($ctrl.chatMessage);
			let newMessage = {
				data: $ctrl.chatMessage,
				url: `/api/messages/${$ctrl.currentUrl}`
			}
			HttpFactory.post(newMessage).then((res) => {
				$ctrl.getAllMessages();
			})
		}

		function getAllMessages() {
			let getMessages = {
				url: `/api/messages/${$ctrl.currentUrl}`
			}
			HttpFactory.get(getMessages).then((res) => {
				$ctrl.messages = res.data;
				console.log($ctrl.messages);
			})
		}

		function stripDate(date) {
			return date.substring(0,10);
		}

	}]);
}());

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

'use strict';
(function() {

	angular.module('gachat')

	.controller('NavCtrl', ['$scope', '$state', 'AuthenticationService', '$location', function($scope, $state, AuthenticationService, $location) {
		const $ctrl = this;

		console.log("this is NavCtrl");

		$ctrl.logout = logout;

		activate();

		function activate() {
			console.log("nav", AuthenticationService.currentUser())
			/*if (!AuthenticationService.currentUser()) {
				$ctrl.loggedIn = false;
			} else {
				$ctrl.loggedIn = true;
			}*/
		}

		function logout() {
			console.log("LOGOUT");
			localStorage.removeItem('User-Data');
			$location.url(['/']);
		}

	}]);
}());

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

'use strict';
(function() {

	angular.module('gachat')

	.controller('RegisterCtrl', ['$state', 'HttpFactory', '$location',
	 	'AuthenticationService', function($state, HttpFactory, $location, AuthenticationService) {

		const $ctrl = this;

		console.log("this is RegisterCtrl ctrl");

		$ctrl.onSubmit = onSubmit;

		activate();

		function activate() {
			$ctrl.user = AuthenticationService.currentUser();
			if ($ctrl.user) {
				$location.path('home');
			}
			$ctrl.credentials = {
				email : "",
				password: ""
			}
		}

		function onSubmit() {
			console.log($ctrl.credentials)
			AuthenticationService
			.register($ctrl.credentials)
			.error((err) => {
					alert(err);
			})
			.then(() => {
				$location.url(['/login'])
			});
		}

	}]);
}());

(function() {
  'use strict';

  angular.module('gachat')

  .directive('checkUser', ['$rootScope', '$location', 'userSrv',
    function ($root, $loc, userSrv) {
      return {
        link: function (scope, elem, attrs, ctrl) {
          $root.$on('$routeChangeStart', function(e, curr, prev){
            if (!prev.access.isFree && !userSrv.isLogged) {
              // reload the login route
            }
            /*
            * IMPORTANT:
            * It's not difficult to fool the previous control,
            * so it's really IMPORTANT to repeat server side
            * the same control before sending back reserved data.
            */
          });
        }
      }
    }]);
}());

(function() {
    'use strict';

    angular
        .module('gachat')
        .service('AuthenticationService', service);

    service.$inject = ['HttpFactory', '$window'];

    /* @ngInject */
    function service(HttpFactory, $window) {
        const service = {
            saveToken: saveToken,
            getToken: getToken,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            register: register,
            login: login
        };

        return service;

        function saveToken(token) {
            $window.localStorage['User-Data'] = token;
        }

        function getToken() {
            return $window.localStorage['User-Data'];
        }

        function logout() {
            return $window.localStorage.removeItem('User-Data');
        }

        function isLoggedIn() {
          const token = getToken();
          let payload;

          if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
          } else {
            return false;
          }
        };

        function currentUser() {
          if(isLoggedIn()){
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
              email : payload.email
            };
          }
        }

        function register(user) {
          let userInfo = {
            url: '/api/users',
            data: user
          }
          return HttpFactory.post(userInfo).success((res) => {
            saveToken(res.token);
          });
        }

        function login(user) {
          let userInfo = {
              url: '/api/user/login',
              data: user
          }
          return HttpFactory.post(userInfo).success((res) => {
            saveToken(res.token);
        });
};
    }
})();

(function() {
    'use strict';

    angular
        .module('gachat')
        .factory('HttpFactory', factory);

    factory.$inject = ['$http', 'Config'];

    /* @ngInject */
    function factory($http, Config) {
        var service = {
            get: get,
            put: put,
            post: post,
            delete: _delete,
        };

        return service;

        function get(options) {
            return $http({
                method: 'GET',
                headers: options.headers,
                url: Config.API_BASE_URL + options.url,
                cache: options.cache !== undefined ? options.cache : false,
                kind: options.kind,
                params: options.params
            });
        }

        function put(options){
            return $http({
                method: 'PUT',
                data: options.data,
                headers: options.headers,
                url: Config.API_BASE_URL + options.url
            });
        }

        function post(options){
            return $http({
                method: 'POST',
                data: options.data,
                url: Config.API_BASE_URL + options.url
            });
        }

        function _delete(options){
            return $http({
                method: 'DELETE',
                data: options.data,
                url: Config.API_BASE_URL + options.url
            });
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('gachat')
        .service('Config', Service);


    /* @ngInject */
    function Service() {
        var service = {
            'API_BASE_URL':'http://localhost:8000',
        };

        return service;
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2NoYXQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbG9naW4uY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL25hdmJhci5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcHJvZmlsZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXIuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvY2hlY2stdXNlci5kaXJlY3RpdmUuanMiLCJzZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic2VydmljZXMvaHR0cC5mYWN0b3J5LmpzIiwic2VydmljZXMvc2VydmVyQ29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFFBQVEsT0FBTyxVQUFVLENBQUMsYUFBYSxnQkFBZ0I7QUFDdkQ7QUNIQTs7QUFFQSxRQUFRLE9BQU87O0NBRWQsZ0RBQU8sU0FBUyxnQkFBZ0Isb0JBQW9COztJQUVqRCxtQkFBbUIsVUFBVTs7SUFFN0I7Ozs7U0FJSyxNQUFNLFVBQVU7WUFDYixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxTQUFTO1lBQ1osS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYztZQUNkLFFBQVE7Y0FDTixRQUFROzs7O1NBSWIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sUUFBUTtZQUNYLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFdBQVc7VUFDaEIsYUFBYTtVQUNiLFlBQVk7VUFDWixjQUFjOzs7U0FHZixNQUFNLFFBQVE7VUFDYixhQUFhO1VBQ2IsWUFBWTtVQUNaLGNB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O1lBQ1YsS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sUUFBUTs7O1FBR1osT0FBTzs7UUFFUCxTQUFTLElBQUksU0FBUztZQUNsQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixTQUFTLFFBQVE7Z0JBQ2pCLEtBQUssT0FBTyxlQUFlLFFBQVE7Z0JBQ25DLE9BQU8sUUFBUSxVQUFVLFlBQVksUUFBUSxRQUFRO2dCQUNyRCxNQUFNLFFBQVE7Z0JBQ2QsUUFBUSxRQUFROzs7O1FBSXhCLFNBQVMsSUFBSSxRQUFRO1lBQ2pCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLE1BQU0sUUFBUTtnQkFDZCxTQUFTLFFBQVE7Z0JBQ2pCLEtBQUssT0FBTyxlQUFlLFFBQVE7Ozs7UUFJM0MsU0FBUyxLQUFLLFFBQVE7WUFDbEIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLEtBQUssT0FBTyxlQUFlLFFBQVE7Ozs7UUFJM0MsU0FBUyxRQUFRLFFBQVE7WUFDckIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLEtBQUssT0FBTyxlQUFlLFFBQVE7Ozs7S0FJOUM7QUN4REwsQ0FBQyxXQUFXO0lBQ1I7O0lBRUE7U0FDSyxPQUFPO1NBQ1AsUUFBUSxVQUFVOzs7O0lBSXZCLFNBQVMsVUFBVTtRQUNmLElBQUksVUFBVTtZQUNWLGVBQWU7OztRQUduQixPQUFPOztLQUVWIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcsIFsndWkucm91dGVyJywgJ25nRmlsZVVwbG9hZCcsICduZ01lc3NhZ2VzJ10pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG5cbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLnN0YXRlKCdzaWduVXAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2xvZ0luJywge1xuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcbiAgICAgICAgICAgIGFjY2Vzczoge1xuICAgICAgICAgICAgICBpc0ZyZWU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2NoYXQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvY2hhdC86Z2FtZU5hbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGF0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NoYXRDdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9maWxlLmVkaXQuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhYm91dCBjb250cm9sbGVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7JHRlbXBsYXRlQ2FjaGUucHV0KCdhYm91dC5odG1sJywnPGgxPkFib3V0PC9oMT4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnY2hhdC5odG1sJywnPGRpdiBjbGFzcz1cImdyb3VwLWNoYXQgZ3JleSBkYXJrZW4tNFwiPlxcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxcblxcbjxoMyBjbGFzcz1cImdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPlxcbiAgPHNwYW4+Q2hhdCB3aXRoIG90aGVyIGdhbWVycyE8L3NwYW4+XFxuPC9oMz5cXG48ZGl2IGNsYXNzPVwicm93XCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgIDxzdHJvbmcgY2xhc3M9XCJncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIj5NZXNzYWdlPC9zdHJvbmc+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wgczEgb2Zmc2V0LXMzIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPlxcbiAgICA8c3Ryb25nPkRhdGU8L3N0cm9uZz5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjaGF0LWJveCBjb2wgczEyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3cgbWVzc2FnZS1ib3JkZXJcIiBuZy1yZXBlYXQ9XCJtZXNzYWdlIGluICRjdHJsLm1lc3NhZ2VzXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzOFwiPlxcbiAgICAgICAgPHN0cm9uZyBjbGFzcz1cImdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPjxlbT57e21lc3NhZ2UudXNlcn19PC9lbT4gOjwvc3Ryb25nPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIj57e21lc3NhZ2UubWVzc2FnZX19PC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczIgb2Zmc2V0LXMyIHJpZ2h0LWFsaWduIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPlxcbiAgICAgICAge3skY3RybC5zdHJpcERhdGUobWVzc2FnZS5kYXRlKX19XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGJyPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyIFwiPlxcbiAgICA8dGV4dGFyZWEgbmctbW9kZWw9XCIkY3RybC5jaGF0TWVzc2FnZS5uZXdNZXNzYWdlXCIgaWQ9XCJpY29uX3ByZWZpeDJcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPjwvdGV4dGFyZWE+XFxuICAgIDxsYWJlbCBmb3I9XCJpY29uX3ByZWZpeDJcIj5NZXNzYWdlIHRleHQ8L2xhYmVsPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPGJ1dHRvbiBuZy1jbGljaz1cIiRjdHJsLnNlbmRNZXNzYWdlKClcImNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+U2VuZCBtZXNzYWdlXFxuICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbjwvYnV0dG9uPlxcbjwvZGl2PlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdob21lLmh0bWwnLCc8ZGl2IGNsYXNzPVwiaG9tZS1tZW51IGdyZXkgZGFya2VuLTRcIj5cXG5cXHQ8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuXFx0XFx0PGgxPjxzcGFuIGNsYXNzPVwiZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+TG9nZ2VkIGluIGFzOjwvc3Bhbj4gPGEgdWktc3JlZj1cInByb2ZpbGVcIiBjbGFzcz1cImN5YW4tdGV4dCB1c2VyLW5hbWVcIj57eyRjdHJsLnVzZXJOYW1lfX08L2E+PC9oMT5cXG5cXHRcXHQ8ZGl2IGNsYXNzPVwicm93XCI+XFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJjYXJkIGhvdmVyYWJsZVwiPlxcblxcdFxcdCAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWltYWdlXCI+XFxuXFx0XFx0ICAgICAgXFx0PGEgbmctaHJlZj1cIiMvY2hhdC9jb3VudGVyLXN0cmlrZTpnbG9iYWwtb2ZmZW5zaXZlXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9jc2dvLmpwZ1wiPjwvYT5cXG5cXHRcXHQgICAgICA8L2Rpdj5cXG5cXHRcXHQgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XFxuXFx0XFx0ICAgICAgICA8cD5Db3VudGVyLVN0cmlrZTogR2xvYmFsIE9mZmVuc2l2ZTwvcD5cXG5cXHRcXHQgICAgICA8L2Rpdj5cXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJjYXJkIGhvdmVyYWJsZVwiPlxcblxcdFxcdCAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cXG5cXHRcXHQgICAgICAgIFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvZG90YTJcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2RvdGEyLnBuZ1wiPjwvYT5cXG5cXHRcXHQgICAgICAgIDwvZGl2PlxcblxcdFxcdCAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxcblxcdFxcdCAgICAgICAgICA8cD5Eb3RhIDI8L3A+XFxuXFx0XFx0ICAgICAgICA8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPC9kaXY+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwiY2FyZCBob3ZlcmFibGVcIj5cXG5cXHRcXHQgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWltYWdlXCI+XFxuXFx0XFx0ICAgICAgICBcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L2xlYWd1ZW9mbGVnZW5kc1wiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvbG9sLmpwZWdcIj48L2E+XFxuXFx0XFx0ICAgICAgICA8L2Rpdj5cXG5cXHRcXHQgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cXG5cXHRcXHQgICAgICAgICAgPHA+TGVhZ3VlIG9mIExlZ2VuZHM8L3A+XFxuXFx0XFx0ICAgICAgICA8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPC9kaXY+XFxuXFx0XFx0ICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuXFx0XFx0XFx0XFx0XFx0IDxkaXYgY2xhc3M9XCJjYXJkIGhvdmVyYWJsZVwiPlxcblxcdFxcdCAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWltYWdlXCI+XFxuXFx0XFx0ICAgICAgICAgXFx0PGEgbmctaHJlZj1cIiMvY2hhdC9vdmVyd2F0Y2hcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL292ZXJ3YXRjaC5qcGdcIj48L2E+XFxuXFx0XFx0ICAgICAgICAgPC9kaXY+XFxuXFx0XFx0ICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxcblxcdFxcdCAgICAgICAgICAgPHA+T3ZlcndhdGNoPC9wPlxcblxcdFxcdCAgICAgICAgIDwvZGl2PlxcblxcdFxcdCBcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHQgPC9kaXY+XFxuXFx0XFx0PC9kaXY+XFxuXFx0PC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2xvZ2luLmh0bWwnLCc8ZGl2IGNsYXNzPVwibG9naW5cIj5cXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxmb3JtIG5hbWU9XCJsb2dpbkZvcm1cIiBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczQgbG9naW4tZm9ybVwiIG5nLXN1Ym1pdD1cIiRjdHJsLm9uU3VibWl0KClcIiByZXF1aXJlZD5cXG4gICAgICAgIDxoNCBjbGFzcz1cInVzZXItbG9naW4gZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+TG9nIGluPC9oND5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBjbGFzcz1cInZhbGlkYXRlIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiXFxuICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5lbWFpbFwiIHJlcXVpcmVkPlxcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2VzPVwibG9naW5Gb3JtLmVtYWlsLiRlcnJvclwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgbmctaWY9XCJsb2dpbkZvcm0uZW1haWwuJGRpcnR5XCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XCJyZXF1aXJlZFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XCJlbWFpbFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5Zb3VyIGVtYWlsIGFkZHJlc3MgaXMgaW52YWxpZDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cInBhc3N3b3JkXCIgY2xhc3M9XCJ2YWxpZGF0ZSBncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIiBpZD1cInBhc3N3b3JkXCIgdHlwZT1cInRleHRcIlxcbiAgICAgICAgICAgICAgICBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5wYXNzd29yZFwiIHJlcXVpcmVkPlxcbiAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlcz1cImxvZ2luRm9ybS5wYXNzd29yZC4kZXJyb3JcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cIiRjdHJsLnBhc3N3b3JkID09PSBmYWxzZVwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWQtdGV4dCBkYXJrZW4tMVwiPldyb25nIHBhc3N3b3JkIG9yIGVtYWlsPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGJ0bi1jb250YWluZXJcIj5cXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+TG9nIGluXFxuICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiBuYW1lPVwiYWN0aW9uXCIgaHJlZj1cIiMvc2lnbnVwXCI+Q3JlYXRlIG5ldyB1c2VyXFxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmF2YmFyLmh0bWwnLCc8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnJhbmQtbG9nb1wiPkdhY2hhdDwvYT5cXG5cXG4gICAgICAgIDx1bCBpZD1cIm5hdi1tb2JpbGVcIiBjbGFzcz1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+IHt7JGN0cmwudXNlck5hbWV9fTwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncHJvZmlsZS5lZGl0Lmh0bWwnLCc8ZGl2IGNsYXNzPVwiZWRpdC1wcm9maWxlIGdyZXkgZGFya2VuLTRcIj5cXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gIDxmb3JtIG5hbWU9XCJlZGl0UHJvZmlsZVBpY3R1cmVGb3JtXCIgbmctc3VibWl0PVwiJGN0cmwudXBsb2FkUHJvZmlsZVBpY3R1cmUoZSwgJGN0cmwudXNlci5maWxlKVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwicm93IGVkaXQtcHJvZmlsZS1maWVsZFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLWZpZWxkIGlucHV0LWZpZWxkIGNvbCBzMTIgZWRpdC1wcm9maWxlLWZpZWxkXCIgbmdmLXNlbGVjdCBuZy1tb2RlbD1cIiRjdHJsLnVzZXIuZmlsZVwiIG5hbWU9XCJmaWxlXCIgbmdmLXBhdHRlcm49XCJcXCdpbWFnZS8qXFwnXCJcXG4gICAgICAgIGFjY2VwdD1cImltYWdlLypcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0blwiPlxcbiAgICAgICAgICAgIDxzcGFuPkZpbGU8L3NwYW4+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsZS1wYXRoLXdyYXBwZXJcIj5cXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmaWxlLXBhdGggdmFsaWRhdGUgZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCIgdHlwZT1cInRleHRcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IG5nLWlmPVwiJGN0cmwudXBsb2FkU3VjY2VzcyA9PT0gdHJ1ZVwiPlxcbiAgICAgICAgPHAgY2xhc3M9XCJncmVlbi10ZXh0IGRhcmtlbi0xIHVwbG9hZC1tZXNzYWdlXCI+WW91ciBwcm9maWxlIHBpY3R1cmUgd2FzIHN1Y2Nlc3NmdWxseSB1cGRhdGVkITwvcD5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IG5nLWlmPVwiJGN0cmwudXBsb2FkU3VjY2VzcyA9PT0gZmFsc2VcIj5cXG4gICAgICAgIDxwIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTEgdXBsb2FkLW1lc3NhZ2VcIj5FcnJvciEgWW91ciBwcm9maWxlIHBpY3R1cmUgd2FzIG5vdCB1cGRhdGVkITwvcD5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGxvYWQgUGhvdG88L2J1dHRvbj5cXG4gICAgPGJyLz5cXG4gICAgICA8aSBjbGFzcz1cImRpc3BsYXktYmxvY2sgbWFyZ2luLXRvcC0xMCBncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIj5SZWNvbW1lbmRlZCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggYXJlIE1pbmltdW0gMjAwcHggYW5kIE1heGltdW0gMjgwcHguIElmIHlvdXIgcHJvZmlsZSBwaWN0dXJlIGlzIG5vdCBpbiBsaW5lIHdpdGggdGhlIHJlY29tbWVuZGVkIHZhbHVlc1xcbiAgICAgICAgeW91ciBwcm9maWxlIHBpY3R1cmUgd2lsbCBiZSB0cmFuc2Zvcm1lZCBpbnRvIHBvb3IgcXVhbGl0eS5cXG4gICAgICBpbnRvIHBvb3IgcXVhbGl0eTwvaT5cXG4gICAgPC9kaXY+XFxuICA8L2Zvcm0+XFxuICA8Zm9ybSBuYW1lPVwiZWRpdEVtYWlsRm9ybVwiIG5nLXN1Ym1pdD1cIiRjdHJsLnVwZGF0ZUVtYWlsKClcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvdyBlZGl0LXByb2ZpbGUtZmllbGRcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgICAgPGlucHV0IGlkPVwidGV4dGFyZWEtZW1haWxcIiBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBjbGFzcz1cInZhbGlkYXRlIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiIG5nLW1vZGVsPVwiJGN0cmwudXNlci5uZXdFbWFpbFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cInRleHRhcmVhLWVtYWlsXCI+RW1haWw8L2xhYmVsPlxcbiAgICAgICAgPGRpdiBuZy1tZXNzYWdlcz1cImVkaXRFbWFpbEZvcm0uZW1haWwuJGVycm9yXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IG5nLWlmPVwiJGN0cmwuZW1haWxVcGRhdGVTdWNjZXNzID09PSB0cnVlXCI+XFxuICAgICAgICAgIDxwIGNsYXNzPVwiZ3JlZW4tdGV4dCBkYXJrZW4tMSB1cGxvYWQtbWVzc2FnZVwiPllvdXIgZW1haWwgd2FzIHN1Y2Nlc3NmdWxseSB1cGRhdGVkITxwPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IG5nLWlmPVwiJGN0cmwuZW1haWxVcGRhdGVTdWNjZXNzID09PSBmYWxzZVwiPlxcbiAgICAgICAgICA8cCBjbGFzcz1cImdyZWVuLXRleHQgZGFya2VuLTEgdXBsb2FkLW1lc3NhZ2VcIj5FcnJvciEgWW91ciBlbWFpbCB3YXMgbm90IHVwZGF0ZWQhPHA+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGRhdGUgRW1haWwgQWRyZXNzPC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9mb3JtPlxcbiAgICA8Zm9ybSBuYW1lPVwiZWRpdEJpb0Zvcm1cIiBuZy1zdWJtaXQ9XCIkY3RybC51cGRhdGVCaW8oKVwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgZWRpdC1wcm9maWxlLWZpZWxkXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgICAgICA8dGV4dGFyZWEgaWQ9XCJ0ZXh0YXJlYS1iaW9cIiBuYW1lPVwiYmlvXCIgY2xhc3M9XCJtYXRlcmlhbGl6ZS10ZXh0YXJlYSBncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIiBsZW5ndGg9XCIxMjBcIlxcbiAgICAgICAgICAgIG5nLW1vZGVsPVwiJGN0cmwudXNlci5iaW9cIiBuZy1taW5sZW5ndGg9XCI1MFwiIG5nLW1heGxlbmd0aD1cIjEwMDBcIj48L3RleHRhcmVhPlxcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGV4dGFyZWEtYmlvXCI+WW91ciBiaW88L2xhYmVsPlxcbiAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2VzPVwiZWRpdEJpb0Zvcm0uYmlvLiRlcnJvclwiPlxcbiAgICAgICAgICAgIDxkaXYgbmctaWY9XCIkY3RybC5iaW9MZW5ndGggPT09IGZhbHNlXCI+XFxuICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XCJtaW5sZW5ndGhcIiBjbGFzcz1cInJlZC10ZXh0IGRhcmtlbi0xXCI+QmlvIGlzIHRvbyBzaG9ydC4gTWluaW11bSBjaGFyYWN0ZXJzIGFsbG93ZWQgaXMgNTA8L2Rpdj5cXG4gICAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZT1cIm1heGxlbmd0aFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5CaW8gaXMgdG9vIGxvbmcuIE1pbmltdW0gY2hhcmFjdGVycyBhbGxvd2VkIGlzIDEwMDA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgbmctaWY9XCIkY3RybC5iaW9VcGRhdGVTdWNjZXNzID09PSB0cnVlXCI+XFxuICAgICAgICAgICAgPHAgY2xhc3M9XCJncmVlbi10ZXh0IGRhcmtlbi0xIHVwbG9hZC1tZXNzYWdlXCI+WW91ciBiaW8gd2FzIHN1Y2Nlc3NmdWxseSB1cGRhdGVkITxwPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBuZy1pZj1cIiRjdHJsLmJpb1VwZGF0ZVN1Y2Nlc3MgPT09IGZhbHNlXCI+XFxuICAgICAgICAgICAgPHAgY2xhc3M9XCJyZWQtdGV4dCBkYXJrZW4tMSB1cGxvYWQtbWVzc2FnZVwiPkVycm9yISBZb3VyIGJpbyB3YXMgbm90IHVwZGF0ZWQhPHA+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+VXBkYXRlIEJpbzwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZm9ybT5cXG48L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncHJvZmlsZS5odG1sJywnPGRpdiBjbGFzcz1cInByb2ZpbGUgZ3JleSBkYXJrZW4tNFwiPlxcbiAgPGRpdiBjbGFzcz1cInByb2ZpbGUtaW5mby1ib3hcIj5cXG4gIDxkaXYgbmctaWY9XCIkY3RybC5pbWFnZVVybFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwicm93IHByb2ZpbGUtcGljdHVyZS1jb250YWluZXJcIj5cXG4gICAgICAgIDxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZyBwcm9maWxlLXBpY3R1cmVcIiBuZy1zcmM9XCJ7eyRjdHJsLmltYWdlVXJsfX1cIiByZWw9XCJpbWFnZVwiIC8+XFxuICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMyIG9mZnNldC1zNFwiPlxcbiAgICAgIDxhIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG4tbGFyZ2VcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiXFxuICAgICAgICB1aS1zcmVmPVwiZWRpdFwiPkVkaXQgUHJvZmlsZTwvYT5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG4tbGFyZ2UgcmVkIGRhcmtlbi0xXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIlxcbiAgICAgICAgbmctY2xpY2s9XCIkY3RybC5kZWxldGVQcm9maWxlKClcIj5EZWxldGUgUHJvZmlsZVxcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdzaWdudXAuaHRtbCcsJzxkaXYgY2xhc3M9XCJzaWdudXBcIj5cXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxmb3JtIG5hbWU9XCJzaWdudXBGb3JtXCIgY2xhc3M9XCJjb2wgczYgb2Zmc2V0LXM0IHNpZ251cC1mb3JtXCIgbmctc3VibWl0PVwiJGN0cmwub25TdWJtaXQoKVwiPlxcbiAgICAgICAgPGg0IGNsYXNzPVwiY3JlYXRlLW5ldy11c2VyIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPkNyZWF0ZSBuZXcgdXNlcjwvaDQ+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICA8aW5wdXQgbmFtZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIGNsYXNzPVwidmFsaWRhdGUgZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5lbWFpbFwiIHJlcXVpcmVkPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsIEFkcmVzczwvbGFiZWw+XFxuICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlcz1cInNpZ251cEZvcm0uZW1haWwuJGVycm9yXCI+XFxuICAgICAgICAgICAgICA8ZGl2IG5nLWlmPVwic2lnbnVwRm9ybS5lbWFpbC4kZGlydHlcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlPVwicmVxdWlyZWRcIiBjbGFzcz1cInJlZC10ZXh0IGRhcmtlbi0xXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZDwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICA8aW5wdXQgbmFtZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCJcXG4gICAgICAgICAgICAgIGNsYXNzPVwidmFsaWRhdGUgZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5wYXNzd29yZFwiIG5nLW1pbmxlbmd0aD1cIjZcIiByZXF1aXJlZD5cXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlcz1cInNpZ251cEZvcm0ucGFzc3dvcmQuJGVycm9yXCI+XFxuICAgICAgICAgICAgICA8ZGl2IG5nLWlmPVwic2lnbnVwRm9ybS5wYXNzd29yZC4kZGlydHlcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlPVwicmVxdWlyZWRcIiBjbGFzcz1cInJlZC10ZXh0IGRhcmtlbi0xXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XCJtaW5sZW5ndGhcIiBjbGFzcz1cInJlZC10ZXh0IGRhcmtlbi0xXCI+UGFzc3dvcmQgbXVzdCBiZSBvdmVyIDYgY2hhcmFjdGVyczwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGJ0bi1jb250YWluZXJcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlJlZ2lzdGVyXFxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9mb3JtPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwYXJ0aWFscy9uYXZiYXIuaHRtbCcsJzxuYXYgY2xhc3M9XCJjeWFuIGRhcmtlbi00XCI+XFxuICAgIDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJicmFuZC1sb2dvXCI+R2FjaGF0PC9hPlxcbiAgICAgICAgPHVsIGlkPVwibmF2LW1vYmlsZVwiIGNsYXNzPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8bGk+PGEgdWktc3JlZj1cInByb2ZpbGVcIj5Qcm9maWxlPC9hPjwvbGk+XFxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjL2Fib3V0XCI+QWJvdXQ8L2E+PC9saT5cXG4gICAgICAgICAgICA8bGk+PGEgbmctY2xpY2s9XCIkY3RybC5sb2dvdXQoKVwiPkxvZ291dDwvYT48L2xpPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9uYXY+XFxuJyk7fV0pOyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignQ2hhdEN0cmwnLCBbJ0h0dHBGYWN0b3J5JywgJyRzdGF0ZScsICckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oSHR0cEZhY3RvcnksICRzdGF0ZSwgJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcbiAgICBjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgQ2hhdEN0cmxcIik7XG5cblx0XHQkY3RybC5zZW5kTWVzc2FnZSA9IHNlbmRNZXNzYWdlO1xuXHRcdCRjdHJsLmdldEFsbE1lc3NhZ2VzID0gZ2V0QWxsTWVzc2FnZXM7XG5cdFx0JGN0cmwuc3RyaXBEYXRlID0gc3RyaXBEYXRlO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0JGN0cmwubWVzc2FnZXMgPSBcIlwiO1xuXHRcdFx0JGN0cmwuY3VycmVudFVybCA9ICRzdGF0ZS5wYXJhbXMuZ2FtZU5hbWU7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlck5hbWUgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKS5lbWFpbDtcblx0XHRcdFx0Z2V0QWxsTWVzc2FnZXMoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xuXHRcdFx0JGN0cmwuY2hhdE1lc3NhZ2UudHlwZSA9ICRjdHJsLmN1cnJlbnRVcmw7XG5cdFx0XHQkY3RybC5jaGF0TWVzc2FnZS51c2VyID0gJGN0cmwudXNlck5hbWU7XG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC5jaGF0TWVzc2FnZSk7XG5cdFx0XHRsZXQgbmV3TWVzc2FnZSA9IHtcblx0XHRcdFx0ZGF0YTogJGN0cmwuY2hhdE1lc3NhZ2UsXG5cdFx0XHRcdHVybDogYC9hcGkvbWVzc2FnZXMvJHskY3RybC5jdXJyZW50VXJsfWBcblx0XHRcdH1cblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QobmV3TWVzc2FnZSkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdCRjdHJsLmdldEFsbE1lc3NhZ2VzKCk7XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldEFsbE1lc3NhZ2VzKCkge1xuXHRcdFx0bGV0IGdldE1lc3NhZ2VzID0ge1xuXHRcdFx0XHR1cmw6IGAvYXBpL21lc3NhZ2VzLyR7JGN0cmwuY3VycmVudFVybH1gXG5cdFx0XHR9XG5cdFx0XHRIdHRwRmFjdG9yeS5nZXQoZ2V0TWVzc2FnZXMpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHQkY3RybC5tZXNzYWdlcyA9IHJlcy5kYXRhO1xuXHRcdFx0XHRjb25zb2xlLmxvZygkY3RybC5tZXNzYWdlcyk7XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHN0cmlwRGF0ZShkYXRlKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZS5zdWJzdHJpbmcoMCwxMCk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBbJyRzdGF0ZScsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnJGxvY2F0aW9uJyxcblx0XHRmdW5jdGlvbigkc3RhdGUsIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgJGxvY2F0aW9uKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIERhc2hib2FyZEN0cmxcIik7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlck5hbWUgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKS5lbWFpbDtcblx0XHRcdH1cblx0XHR9XG5cdH1dKTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIFsnJHN0YXRlJywgJyRsb2NhdGlvbicsXG5cdCBcdCdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigkc3RhdGUsICRsb2NhdGlvbiwgQXV0aGVudGljYXRpb25TZXJ2aWNlKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBMb2dpbkN0cmwgY3RybFwiKTtcblxuXHRcdCRjdHJsLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC51c2VyID0gQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCk7XG5cdFx0XHRpZiAoJGN0cmwudXNlcikge1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnaG9tZScpO1xuXHRcdFx0fVxuXHRcdFx0JGN0cmwuY3VycmVudFN0YXRlTmFtZSA9ICRzdGF0ZS5jdXJyZW50Lm5hbWU7XG5cdFx0XHQkY3RybC5wYXNzd29yZCA9IHRydWU7XG5cdFx0XHQkY3RybC5jcmVkZW50aWFscyA9IHtcblx0XHRcdFx0ZW1haWwgOiBcIlwiLFxuXHRcdFx0XHRwYXNzd29yZDogXCJcIlxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uU3VibWl0KCkge1xuICAgICAgQXV0aGVudGljYXRpb25TZXJ2aWNlXG4gICAgICAubG9naW4oJGN0cmwuY3JlZGVudGlhbHMpXG4gICAgICAuZXJyb3IoKGVycikgPT4ge1xuXHRcdFx0XHQkY3RybC5wYXNzd29yZCA9IGZhbHNlXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkxPR0dFRCBJTlwiKVxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnaG9tZScpO1xuICAgICAgfSk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ05hdkN0cmwnLCBbJyRzY29wZScsICckc3RhdGUnLCAnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsICRsb2NhdGlvbikge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBOYXZDdHJsXCIpO1xuXG5cdFx0JGN0cmwubG9nb3V0ID0gbG9nb3V0O1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJuYXZcIiwgQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCkpXG5cdFx0XHQvKmlmICghQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCkpIHtcblx0XHRcdFx0JGN0cmwubG9nZ2VkSW4gPSBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRjdHJsLmxvZ2dlZEluID0gdHJ1ZTtcblx0XHRcdH0qL1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGxvZ291dCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiTE9HT1VUXCIpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItRGF0YScpO1xuXHRcdFx0JGxvY2F0aW9uLnVybChbJy8nXSk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ1Byb2ZpbGVDdHJsJywgWydVcGxvYWQnLCAnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgJyRodHRwJywgJyRsb2NhdGlvbicsICdIdHRwRmFjdG9yeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKFVwbG9hZCwgQXV0aGVudGljYXRpb25TZXJ2aWNlLCAkaHR0cCwgJGxvY2F0aW9uLCBIdHRwRmFjdG9yeSkge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdCRjdHJsLnVwbG9hZFByb2ZpbGVQaWN0dXJlID0gdXBsb2FkUHJvZmlsZVBpY3R1cmU7XG5cdFx0JGN0cmwuZGVsZXRlUHJvZmlsZSA9IGRlbGV0ZVByb2ZpbGU7XG5cdFx0JGN0cmwudXBkYXRlRW1haWwgPSB1cGRhdGVFbWFpbDtcblx0XHQkY3RybC51cGRhdGVCaW8gPSB1cGRhdGVCaW87XG5cdFx0JGN0cmwuZ2V0SW1hZ2UgPSBnZXRJbWFnZTtcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBQcm9maWxlQ3RybFwiKTtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdGlmICghQXV0aGVudGljYXRpb25TZXJ2aWNlLmdldFRva2VuKCkpIHtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJ2xvZ0luJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC51c2VyID0gQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdCRjdHJsLmVtYWlsID0gJGN0cmwudXNlci5lbWFpbDtcblx0XHRcdFx0JGN0cmwuYmlvTGVuZ3RoID0gdHJ1ZTtcblx0XHRcdFx0JGN0cmwudXBsb2FkU3VjY2Vzcztcblx0XHRcdFx0JGN0cmwuYmlvVXBkYXRlU3VjY2Vzcztcblx0XHRcdFx0JGN0cmwuZW1haWxVcGRhdGVTdWNjZXNzO1xuXHRcdFx0XHQvKiRjdHJsLmNyZWRlbnRpYWxzID0ge1xuXHRcdFx0XHRcdGJpbzogJycsXG5cblx0XHRcdFx0fSovXG5cdFx0XHRcdGdldEltYWdlKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGxvYWRQcm9maWxlUGljdHVyZShlLCBmaWxlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImZpbGVcIiwgZmlsZSlcblx0XHRcdGlmKGZpbGUpIHtcblx0XHRcdFx0VXBsb2FkLnVwbG9hZCh7XG5cdFx0XHRcdFx0dXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9wcm9maWxlL3VwbG9hZFBob3RvYCxcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0XHRkYXRhOiB7ZW1haWw6ICRjdHJsLmVtYWlsfSxcblx0XHRcdFx0XHRmaWxlOiBmaWxlXG5cdFx0XHRcdH0pLnByb2dyZXNzKChldnQpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImZpcmluZ1wiKTtcblx0XHRcdFx0fSkuc3VjY2VzcygoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKVxuXHRcdFx0XHRcdCRjdHJsLnVwbG9hZFN1Y2Nlc3MgPSB0cnVlO1xuXHRcdFx0XHR9KS5lcnJvcigoZXJyb3IpID0+IHtcblx0XHRcdFx0XHQkY3RybC51cGxvYWRTdWNjZXNzID0gZmFsc2U7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJlcnJvclwiKVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldEltYWdlKCkge1xuXHRcdFx0Y29uc29sZS5sb2coJGN0cmwuZW1haWwpXG5cdFx0XHRjb25zb2xlLmxvZyhcImdldCBpbWFnZVwiKVxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0dXJsOiBgL2FwaS9wcm9maWxlL2dldEltYWdlLyR7JGN0cmwuZW1haWx9YFxuXHRcdFx0fVxuXG5cdFx0XHRIdHRwRmFjdG9yeS5nZXQocmVxdWVzdCkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdGlmIChyZXMuZGF0YS5pbWFnZSkge1xuXHRcdFx0XHRcdCRjdHJsLmltYWdlVXJsID0gcmVzLmRhdGEuaW1hZ2U7XG5cdFx0XHRcdFx0JGN0cmwuaW1hZ2VVcmwgPSBgLi4vLi4vLi4keyRjdHJsLmltYWdlVXJsfWBcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlUHJvZmlsZSgpIHtcblx0XHRcdC8vY29uc3QgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB0aGF0IHlvdSB3YW50IHRvIGRlbGV0ZSB5b3VyIGFjY291bnQ/XCIpXG5cdFx0XHRjb25zb2xlLmxvZyhcImRlbGV0ZWluZ1wiKVxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0dXJsOiBgL2FwaS9wcm9maWxlL2RlbGV0ZS8keyRjdHJsLmVtYWlsfWBcblx0XHRcdH1cblx0XHRcdEh0dHBGYWN0b3J5LmRlbGV0ZShyZXF1ZXN0KS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0YWxlcnQoXCJZb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBkZWxldGVkXCIpO1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG5cdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvbG9naW4nXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVFbWFpbCgpIHtcblx0XHRcdGNvbnN0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdHVybDogJy9hcGkvcHJvZmlsZS91cGRhdGVFbWFpbCcsXG5cdFx0XHRcdGRhdGE6ICRjdHJsLnVzZXJcblx0XHRcdH1cblxuXHRcdFx0SHR0cEZhY3RvcnkucG9zdChyZXF1ZXN0KS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzKVxuXHRcdFx0XHRpZiAocmVzLmRhdGEubmV3RW1haWwgPT09IHRydWUpIHtcblx0XHRcdFx0XHQkY3RybC5lbWFpbFVwZGF0ZVN1Y2Nlc3MgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRjdHJsLmVtYWlsVXBkYXRlU3VjY2VzcyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVCaW8oKSB7XG5cdFx0XHQkY3RybC5iaW9MZW5ndGggPSBmYWxzZTtcblx0XHRcdGlmICgkY3RybC51c2VyLmJpbykge1xuXHRcdFx0XHRjb25zdCByZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdHVybDogJy9hcGkvcHJvZmlsZS91cGRhdGVCaW8nLFxuXHRcdFx0XHRcdGRhdGE6ICRjdHJsLnVzZXJcblx0XHRcdFx0fVxuXG5cdFx0XHRcdEh0dHBGYWN0b3J5LnBvc3QocmVxdWVzdCkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHJlcy5kYXRhLmJpbykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzXCIpXG5cdFx0XHRcdFx0XHQkY3RybC5iaW9VcGRhdGVTdWNjZXNzID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JGN0cmwuYmlvVXBkYXRlU3VjY2VzcyA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsIFsnJHN0YXRlJywgJ0h0dHBGYWN0b3J5JywgJyRsb2NhdGlvbicsXG5cdCBcdCdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigkc3RhdGUsIEh0dHBGYWN0b3J5LCAkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xuXG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIFJlZ2lzdGVyQ3RybCBjdHJsXCIpO1xuXG5cdFx0JGN0cmwub25TdWJtaXQgPSBvblN1Ym1pdDtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLnVzZXIgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKTtcblx0XHRcdGlmICgkY3RybC51c2VyKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdob21lJyk7XG5cdFx0XHR9XG5cdFx0XHQkY3RybC5jcmVkZW50aWFscyA9IHtcblx0XHRcdFx0ZW1haWwgOiBcIlwiLFxuXHRcdFx0XHRwYXNzd29yZDogXCJcIlxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uU3VibWl0KCkge1xuXHRcdFx0Y29uc29sZS5sb2coJGN0cmwuY3JlZGVudGlhbHMpXG5cdFx0XHRBdXRoZW50aWNhdGlvblNlcnZpY2Vcblx0XHRcdC5yZWdpc3RlcigkY3RybC5jcmVkZW50aWFscylcblx0XHRcdC5lcnJvcigoZXJyKSA9PiB7XG5cdFx0XHRcdFx0YWxlcnQoZXJyKTtcblx0XHRcdH0pXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvbG9naW4nXSlcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cbiAgLmRpcmVjdGl2ZSgnY2hlY2tVc2VyJywgWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICd1c2VyU3J2JyxcbiAgICBmdW5jdGlvbiAoJHJvb3QsICRsb2MsIHVzZXJTcnYpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgICAkcm9vdC4kb24oJyRyb3V0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgY3VyciwgcHJldil7XG4gICAgICAgICAgICBpZiAoIXByZXYuYWNjZXNzLmlzRnJlZSAmJiAhdXNlclNydi5pc0xvZ2dlZCkge1xuICAgICAgICAgICAgICAvLyByZWxvYWQgdGhlIGxvZ2luIHJvdXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgKiBJTVBPUlRBTlQ6XG4gICAgICAgICAgICAqIEl0J3Mgbm90IGRpZmZpY3VsdCB0byBmb29sIHRoZSBwcmV2aW91cyBjb250cm9sLFxuICAgICAgICAgICAgKiBzbyBpdCdzIHJlYWxseSBJTVBPUlRBTlQgdG8gcmVwZWF0IHNlcnZlciBzaWRlXG4gICAgICAgICAgICAqIHRoZSBzYW1lIGNvbnRyb2wgYmVmb3JlIHNlbmRpbmcgYmFjayByZXNlcnZlZCBkYXRhLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuc2VydmljZSgnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgc2VydmljZSk7XG5cbiAgICBzZXJ2aWNlLiRpbmplY3QgPSBbJ0h0dHBGYWN0b3J5JywgJyR3aW5kb3cnXTtcblxuICAgIC8qIEBuZ0luamVjdCAqL1xuICAgIGZ1bmN0aW9uIHNlcnZpY2UoSHR0cEZhY3RvcnksICR3aW5kb3cpIHtcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IHtcbiAgICAgICAgICAgIHNhdmVUb2tlbjogc2F2ZVRva2VuLFxuICAgICAgICAgICAgZ2V0VG9rZW46IGdldFRva2VuLFxuICAgICAgICAgICAgbG9nb3V0OiBsb2dvdXQsXG4gICAgICAgICAgICBpc0xvZ2dlZEluOiBpc0xvZ2dlZEluLFxuICAgICAgICAgICAgY3VycmVudFVzZXI6IGN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgICAgICAgICAgbG9naW46IGxvZ2luXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG5cbiAgICAgICAgZnVuY3Rpb24gc2F2ZVRva2VuKHRva2VuKSB7XG4gICAgICAgICAgICAkd2luZG93LmxvY2FsU3RvcmFnZVsnVXNlci1EYXRhJ10gPSB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFRva2VuKCkge1xuICAgICAgICAgICAgcmV0dXJuICR3aW5kb3cubG9jYWxTdG9yYWdlWydVc2VyLURhdGEnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgICAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICAgICAgICAgIGxldCBwYXlsb2FkO1xuXG4gICAgICAgICAgaWYodG9rZW4pe1xuICAgICAgICAgICAgcGF5bG9hZCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICBwYXlsb2FkID0gJHdpbmRvdy5hdG9iKHBheWxvYWQpO1xuICAgICAgICAgICAgcGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXlsb2FkLmV4cCA+IERhdGUubm93KCkgLyAxMDAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGN1cnJlbnRVc2VyKCkge1xuICAgICAgICAgIGlmKGlzTG9nZ2VkSW4oKSl7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBnZXRUb2tlbigpO1xuICAgICAgICAgICAgdmFyIHBheWxvYWQgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgcGF5bG9hZCA9ICR3aW5kb3cuYXRvYihwYXlsb2FkKTtcbiAgICAgICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgZW1haWwgOiBwYXlsb2FkLmVtYWlsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKHVzZXIpIHtcbiAgICAgICAgICBsZXQgdXNlckluZm8gPSB7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL3VzZXJzJyxcbiAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIEh0dHBGYWN0b3J5LnBvc3QodXNlckluZm8pLnN1Y2Nlc3MoKHJlcykgPT4ge1xuICAgICAgICAgICAgc2F2ZVRva2VuKHJlcy50b2tlbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dpbih1c2VyKSB7XG4gICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgICB1cmw6ICcvYXBpL3VzZXIvbG9naW4nLFxuICAgICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBIdHRwRmFjdG9yeS5wb3N0KHVzZXJJbmZvKS5zdWNjZXNzKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNhdmVUb2tlbihyZXMudG9rZW4pO1xuICAgICAgICB9KTtcbn07XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5mYWN0b3J5KCdIdHRwRmFjdG9yeScsIGZhY3RvcnkpO1xuXG4gICAgZmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICdDb25maWcnXTtcblxuICAgIC8qIEBuZ0luamVjdCAqL1xuICAgIGZ1bmN0aW9uIGZhY3RvcnkoJGh0dHAsIENvbmZpZykge1xuICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldDogZ2V0LFxuICAgICAgICAgICAgcHV0OiBwdXQsXG4gICAgICAgICAgICBwb3N0OiBwb3N0LFxuICAgICAgICAgICAgZGVsZXRlOiBfZGVsZXRlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBvcHRpb25zLmNhY2hlICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNhY2hlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAga2luZDogb3B0aW9ucy5raW5kLFxuICAgICAgICAgICAgICAgIHBhcmFtczogb3B0aW9ucy5wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcHV0KG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgdXJsOiBDb25maWcuQVBJX0JBU0VfVVJMICsgb3B0aW9ucy51cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9zdChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9kZWxldGUob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLnNlcnZpY2UoJ0NvbmZpZycsIFNlcnZpY2UpO1xuXG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBTZXJ2aWNlKCkge1xuICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgICdBUElfQkFTRV9VUkwnOidodHRwOi8vbG9jYWxob3N0OjgwMDAnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
