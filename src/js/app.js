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
$templateCache.put('chat.html','<div class="group-chat">\n  <div class="container">\n\n<h3 class="grey-text text-lighten-5">\n  <span>Chat with other gamers!</span>\n</h3>\n<div class="row">\n  <div class="col s8">\n    <strong class="grey-text text-lighten-5">Message</strong>\n  </div>\n  <div class="col s1 offset-s3 grey-text text-lighten-5">\n    <strong>Date</strong>\n  </div>\n</div>\n<div class="row">\n  <div class="chat-box col s12">\n    <div class="row message-border" ng-repeat="message in $ctrl.messages">\n      <div class="col s8">\n        <strong class="grey-text text-lighten-5"><em>{{message.user}}</em> :</strong>\n        <span class="grey-text text-lighten-5">{{message.message}}</span>\n      </div>\n      <div class="col s2 offset-s2 right-align grey-text text-lighten-5">\n        {{$ctrl.stripDate(message.date)}}\n      </div>\n      <br>\n    </div>\n  </div>\n</div>\n<div class="row">\n  <div class="input-field col s12 ">\n    <textarea ng-model="$ctrl.chatMessage.newMessage" id="icon_prefix2" class="materialize-textarea grey-text text-lighten-5"></textarea>\n    <label for="icon_prefix2">Message text</label>\n  </div>\n</div>\n<button ng-click="$ctrl.sendMessage()"class="btn waves-effect waves-light" type="submit" name="action">Send message\n    <i class="material-icons right">send</i>\n</button>\n</div>\n</div>\n');
$templateCache.put('home.html','<div class="home-menu">\n\t<div class="container">\n\t\t<h1><span class="grey-text text-lighten-5">Logged in as:</span> <a ui-sref="profile" class="cyan-text user-name">{{$ctrl.userName}}</a></h1>\n\t\t<div class="row">\n\t\t\t<div class="col s3">\n\t\t\t\t<div class="card hoverable">\n\t\t      <div class="card-image">\n\t\t      \t<a ng-href="#/chat/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n\t\t      </div>\n\t\t      <div class="card-content">\n\t\t        <p>Counter-Strike: Global Offensive</p>\n\t\t      </div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t    <div class="col s3">\n\t\t\t\t\t<div class="card hoverable">\n\t\t        <div class="card-image">\n\t\t        \t<a ng-href="#/chat/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n\t\t        </div>\n\t\t        <div class="card-content">\n\t\t          <p>Dota 2</p>\n\t\t        </div>\n\t\t\t\t\t</div>\n\t\t    </div>\n\t\t    <div class="col s3">\n\t\t\t\t\t<div class="card hoverable">\n\t\t        <div class="card-image">\n\t\t        \t<a ng-href="#/chat/leagueoflegends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n\t\t        </div>\n\t\t        <div class="card-content">\n\t\t          <p>League of Legends</p>\n\t\t        </div>\n\t\t\t\t\t</div>\n\t\t    </div>\n\t\t     <div class="col s3">\n\t\t\t\t\t <div class="card hoverable">\n\t\t         <div class="card-image">\n\t\t         \t<a ng-href="#/chat/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n\t\t         </div>\n\t\t         <div class="card-content">\n\t\t           <p>Overwatch</p>\n\t\t         </div>\n\t\t \t\t\t</div>\n\t\t\t\t </div>\n\t\t</div>\n\t</div>\n</div>\n');
$templateCache.put('login.html','<div class="login">\n  <div class="container">\n    <div class="row">\n      <form name="loginForm" class="col s6 offset-s4 login-form" ng-submit="$ctrl.onSubmit()" required>\n        <h4 class="user-login grey-text text-lighten-5">Log in</h4>\n          <div class="row">\n            <div class="input-field col s8">\n                <input id="email" name="email" type="email" class="validate grey-text text-lighten-5"\n                  ng-model="$ctrl.credentials.email" required>\n                <label for="email">Email Adress</label>\n                <div ng-messages="loginForm.email.$error">\n                  <div ng-if="loginForm.email.$dirty">\n                    <div ng-message="required" class="red-text darken-1">This field is required</div>\n                    <div ng-message="email" class="red-text darken-1">Your email address is invalid</div>\n                  </div>\n                </div>\n            </div>\n          </div>\n          <div class="row">\n            <div class="input-field col s8">\n              <input name="password" class="validate grey-text text-lighten-5" id="password" type="text"\n                class="validate" ng-model="$ctrl.credentials.password" required>\n              <label for="password">Password</label>\n              <div ng-messages="loginForm.password.$error">\n                <div ng-if="$ctrl.password === false">\n                  <div class="red-text darken-1">Wrong password or email</div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="row btn-container">\n            <button class="btn waves-effect waves-light" type="submit" name="action">Log in\n              <i class="material-icons right">send</i>\n            </button>\n          </form>\n          <a class="btn waves-effect waves-light" name="action" href="#/signup">Create new user\n            <i class="material-icons right">send</i>\n          </a>\n          </div>\n      </div>\n  </div>\n</div>\n');
$templateCache.put('navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n              <li><a href="#/about">About</a></li>\n              <li><a href="#"> {{$ctrl.userName}}</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('profile.edit.html','<div class="edit-profile">\n  <div class="container">\n    <div class="row">\n    <a class="back-btn" name="action"\n      ui-sref="profile">Back to Profile Page</a>\n    </div>\n  <form name="editProfilePictureForm" ng-submit="$ctrl.uploadProfilePicture(e, $ctrl.user.file)">\n    <div class="row edit-profile-field">\n      <div class="file-field input-field col s12 edit-profile-field" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n        accept="image/*">\n          <div class="btn">\n            <span>File</span>\n            <input type="file">\n          </div>\n          <div class="file-path-wrapper">\n            <input class="file-path validate grey-text text-lighten-5" type="text">\n      </div>\n      <div ng-if="$ctrl.uploadSuccess === true">\n        <p class="green-text darken-1 upload-message">Your profile picture was successfully updated!</p>\n      </div>\n      <div ng-if="$ctrl.uploadSuccess === false">\n        <p class="red-text darken-1 upload-message">Error! Your profile picture was not updated!</p>\n      </div>\n    </div>\n    <button class="btn waves-effect waves-light" type="submit" name="action">Upload Photo</button>\n    <br/>\n      <i class="display-block margin-top-10 grey-text text-lighten-5">Recommended values for height and width are Minimum 200px and Maximum 280px. If your profile picture is not in line with the recommended values\n        your profile picture will be transformed into poor quality.\n      into poor quality</i>\n    </div>\n  </form>\n  <form name="editEmailForm" ng-submit="$ctrl.updateEmail()">\n    <div class="row edit-profile-field">\n      <div class="input-field col s12">\n        <input id="textarea-email" name="email" type="email" class="validate grey-text text-lighten-5" ng-model="$ctrl.user.newEmail">\n        <label for="textarea-email">Email</label>\n        <div ng-messages="editEmailForm.email.$error"></div>\n        <div ng-if="$ctrl.emailUpdateSuccess === true">\n          <p class="green-text darken-1 upload-message">Your email was successfully updated!<p>\n        </div>\n        <div ng-if="$ctrl.emailUpdateSuccess === false">\n          <p class="green-text darken-1 upload-message">Error! Your email was not updated!<p>\n        </div>\n        <button class="btn waves-effect waves-light" type="submit" name="action">Update Email Adress</button>\n        </div>\n      </div>\n    </form>\n    <form name="editBioForm" ng-submit="$ctrl.updateBio()">\n      <div class="row edit-profile-field">\n        <div class="input-field col s12">\n          <textarea id="textarea-bio" name="bio" class="materialize-textarea grey-text text-lighten-5" length="120"\n            ng-model="$ctrl.user.bio" ng-minlength="50" ng-maxlength="1000"></textarea>\n          <label for="textarea-bio">Your bio</label>\n          <div ng-messages="editBioForm.bio.$error">\n            <div ng-if="$ctrl.bioLength === false">\n              <div ng-message="minlength" class="red-text darken-1">Bio is too short. Minimum characters allowed is 50</div>\n              <div ng-message="maxlength" class="red-text darken-1">Bio is too long. Minimum characters allowed is 1000</div>\n            </div>\n          </div>\n          <div ng-if="$ctrl.bioUpdateSuccess === true">\n            <p class="green-text darken-1 upload-message">Your bio was successfully updated!<p>\n          </div>\n          <div ng-if="$ctrl.bioUpdateSuccess === false">\n            <p class="red-text darken-1 upload-message">Error! Your bio was not updated!<p>\n          </div>\n          <button class="btn waves-effect waves-light" type="submit" name="action">Update Bio</button>\n        </div>\n      </div>\n    </form>\n</div>\n</div>\n');
$templateCache.put('profile.html','<div class="profile">\n  <div class="profile-info-box">\n  <div ng-if="$ctrl.imageUrl">\n    <div class="row profile-picture-container">\n        <img class="responsive-img profile-picture" ng-src="{{$ctrl.imageUrl}}" rel="image" />\n  </div>\n  </div>\n  <div class="row">\n    <div class="col s2 offset-s4">\n      <a class="btn waves-effect waves-light btn-large edit-profile-btn" name="action"\n        ui-sref="edit">Edit Profile\n        <i class="material-icons left">mode_edit</i>\n      </a>\n      </div>\n      <div class="col s3">\n        <button class="btn waves-effect waves-light btn-large red darken-1" type="submit" name="action"\n        ng-click="$ctrl.deleteProfile()">Delete Profile\n              <i class="material-icons left">delete</i>\n        </button>\n      </div>\n  </div>\n</div>\n</div>\n</div>\n');
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
				$ctrl.chatMessage.newMessage = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2NoYXQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbG9naW4uY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL25hdmJhci5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcHJvZmlsZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXIuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvY2hlY2stdXNlci5kaXJlY3RpdmUuanMiLCJzZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic2VydmljZXMvaHR0cC5mYWN0b3J5LmpzIiwic2VydmljZXMvc2VydmVyQ29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFFBQVEsT0FBTyxVQUFVLENBQUMsYUFBYSxnQkFBZ0I7QUFDdkQ7QUNIQTs7QUFFQSxRQUFRLE9BQU87O0NBRWQsZ0RBQU8sU0FBUyxnQkFBZ0Isb0JBQW9COztJQUVqRCxtQkFBbUIsVUFBVTs7SUFFN0I7Ozs7U0FJSyxNQUFNLFVBQVU7WUFDYixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxTQUFTO1lBQ1osS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYztZQUNkLFFBQVE7Y0FDTixRQUFROzs7O1NBSWIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sUUFBUTtZQUNYLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFdBQVc7VUFDaEIsYUFBYTtVQUNiLFlBQVk7VUFDWixjQUFjOzs7U0FHZixNQUFNLFFBQVE7VUFDYixhQUFhO1VBQ2IsWUFBWTtVQUNaLGNB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VTtZQUNWLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtZQUNOLFFBQVE7OztRQUdaLE9BQU87O1FBRVAsU0FBUyxJQUFJLFNBQVM7WUFDbEIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsU0FBUyxRQUFRO2dCQUNqQixLQUFLLE9BQU8sZUFBZSxRQUFRO2dCQUNuQyxPQUFPLFFBQVEsVUFBVSxZQUFZLFFBQVEsUUFBUTtnQkFDckQsTUFBTSxRQUFRO2dCQUNkLFFBQVEsUUFBUTs7OztRQUl4QixTQUFTLElBQUksUUFBUTtZQUNqQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsU0FBUyxRQUFRO2dCQUNqQixLQUFLLE9BQU8sZUFBZSxRQUFROzs7O1FBSTNDLFNBQVMsS0FBSyxRQUFRO1lBQ2xCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLE1BQU0sUUFBUTtnQkFDZCxLQUFLLE9BQU8sZUFBZSxRQUFROzs7O1FBSTNDLFNBQVMsUUFBUSxRQUFRO1lBQ3JCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLE1BQU0sUUFBUTtnQkFDZCxLQUFLLE9BQU8sZUFBZSxRQUFROzs7O0tBSTlDO0FDeERMLENBQUMsV0FBVztJQUNSOztJQUVBO1NBQ0ssT0FBTztTQUNQLFFBQVEsVUFBVTs7OztJQUl2QixTQUFTLFVBQVU7UUFDZixJQUFJLFVBQVU7WUFDVixlQUFlOzs7UUFHbkIsT0FBTzs7S0FFViIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnLCBbJ3VpLnJvdXRlcicsICduZ0ZpbGVVcGxvYWQnLCAnbmdNZXNzYWdlcyddKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG5cbiAgICAkc3RhdGVQcm92aWRlclxuXG4gICAgICAgIC8vIEhPTUUgU1RBVEVTIEFORCBORVNURUQgVklFV1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIC5zdGF0ZSgnc2lnblVwJywge1xuICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NpZ251cC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdsb2dJbicsIHtcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCcsXG4gICAgICAgICAgICBhY2Nlc3M6IHtcbiAgICAgICAgICAgICAgaXNGcmVlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiAnL2hvbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZEN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdjaGF0Jywge1xuICAgICAgICAgICAgdXJsOiAnL2NoYXQvOmdhbWVOYW1lJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY2hhdC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGF0Q3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ3Byb2ZpbGUnLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9maWxlLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9maWxlQ3RybCcsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdlZGl0Jywge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJvZmlsZS5lZGl0Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9maWxlQ3RybCcsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gQUJPVVQgUEFHRSBBTkQgTVVMVElQTEUgTkFNRUQgVklFV1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC5zdGF0ZSgnYWJvdXQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvYWJvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWJvdXQgY29udHJvbGxlclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkgeyR0ZW1wbGF0ZUNhY2hlLnB1dCgnYWJvdXQuaHRtbCcsJzxoMT5BYm91dDwvaDE+Jyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2NoYXQuaHRtbCcsJzxkaXYgY2xhc3M9XCJncm91cC1jaGF0XCI+XFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuXFxuPGgzIGNsYXNzPVwiZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+XFxuICA8c3Bhbj5DaGF0IHdpdGggb3RoZXIgZ2FtZXJzITwvc3Bhbj5cXG48L2gzPlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wgczhcIj5cXG4gICAgPHN0cm9uZyBjbGFzcz1cImdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPk1lc3NhZ2U8L3N0cm9uZz5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cImNvbCBzMSBvZmZzZXQtczMgZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+XFxuICAgIDxzdHJvbmc+RGF0ZTwvc3Ryb25nPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgPGRpdiBjbGFzcz1cImNoYXQtYm94IGNvbCBzMTJcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvdyBtZXNzYWdlLWJvcmRlclwiIG5nLXJlcGVhdD1cIm1lc3NhZ2UgaW4gJGN0cmwubWVzc2FnZXNcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgICAgICA8c3Ryb25nIGNsYXNzPVwiZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+PGVtPnt7bWVzc2FnZS51c2VyfX08L2VtPiA6PC9zdHJvbmc+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cImdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPnt7bWVzc2FnZS5tZXNzYWdlfX08L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzMiBvZmZzZXQtczIgcmlnaHQtYWxpZ24gZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+XFxuICAgICAgICB7eyRjdHJsLnN0cmlwRGF0ZShtZXNzYWdlLmRhdGUpfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8YnI+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTIgXCI+XFxuICAgIDx0ZXh0YXJlYSBuZy1tb2RlbD1cIiRjdHJsLmNoYXRNZXNzYWdlLm5ld01lc3NhZ2VcIiBpZD1cImljb25fcHJlZml4MlwiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWEgZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+PC90ZXh0YXJlYT5cXG4gICAgPGxhYmVsIGZvcj1cImljb25fcHJlZml4MlwiPk1lc3NhZ2UgdGV4dDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwuc2VuZE1lc3NhZ2UoKVwiY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5TZW5kIG1lc3NhZ2VcXG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuPC9idXR0b24+XFxuPC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2hvbWUuaHRtbCcsJzxkaXYgY2xhc3M9XCJob21lLW1lbnVcIj5cXG5cXHQ8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuXFx0XFx0PGgxPjxzcGFuIGNsYXNzPVwiZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+TG9nZ2VkIGluIGFzOjwvc3Bhbj4gPGEgdWktc3JlZj1cInByb2ZpbGVcIiBjbGFzcz1cImN5YW4tdGV4dCB1c2VyLW5hbWVcIj57eyRjdHJsLnVzZXJOYW1lfX08L2E+PC9oMT5cXG5cXHRcXHQ8ZGl2IGNsYXNzPVwicm93XCI+XFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJjYXJkIGhvdmVyYWJsZVwiPlxcblxcdFxcdCAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWltYWdlXCI+XFxuXFx0XFx0ICAgICAgXFx0PGEgbmctaHJlZj1cIiMvY2hhdC9jb3VudGVyLXN0cmlrZTpnbG9iYWwtb2ZmZW5zaXZlXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9jc2dvLmpwZ1wiPjwvYT5cXG5cXHRcXHQgICAgICA8L2Rpdj5cXG5cXHRcXHQgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XFxuXFx0XFx0ICAgICAgICA8cD5Db3VudGVyLVN0cmlrZTogR2xvYmFsIE9mZmVuc2l2ZTwvcD5cXG5cXHRcXHQgICAgICA8L2Rpdj5cXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJjYXJkIGhvdmVyYWJsZVwiPlxcblxcdFxcdCAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cXG5cXHRcXHQgICAgICAgIFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvZG90YTJcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2RvdGEyLnBuZ1wiPjwvYT5cXG5cXHRcXHQgICAgICAgIDwvZGl2PlxcblxcdFxcdCAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxcblxcdFxcdCAgICAgICAgICA8cD5Eb3RhIDI8L3A+XFxuXFx0XFx0ICAgICAgICA8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPC9kaXY+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwiY2FyZCBob3ZlcmFibGVcIj5cXG5cXHRcXHQgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWltYWdlXCI+XFxuXFx0XFx0ICAgICAgICBcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L2xlYWd1ZW9mbGVnZW5kc1wiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvbG9sLmpwZWdcIj48L2E+XFxuXFx0XFx0ICAgICAgICA8L2Rpdj5cXG5cXHRcXHQgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cXG5cXHRcXHQgICAgICAgICAgPHA+TGVhZ3VlIG9mIExlZ2VuZHM8L3A+XFxuXFx0XFx0ICAgICAgICA8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPC9kaXY+XFxuXFx0XFx0ICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuXFx0XFx0XFx0XFx0XFx0IDxkaXYgY2xhc3M9XCJjYXJkIGhvdmVyYWJsZVwiPlxcblxcdFxcdCAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWltYWdlXCI+XFxuXFx0XFx0ICAgICAgICAgXFx0PGEgbmctaHJlZj1cIiMvY2hhdC9vdmVyd2F0Y2hcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL292ZXJ3YXRjaC5qcGdcIj48L2E+XFxuXFx0XFx0ICAgICAgICAgPC9kaXY+XFxuXFx0XFx0ICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxcblxcdFxcdCAgICAgICAgICAgPHA+T3ZlcndhdGNoPC9wPlxcblxcdFxcdCAgICAgICAgIDwvZGl2PlxcblxcdFxcdCBcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHQgPC9kaXY+XFxuXFx0XFx0PC9kaXY+XFxuXFx0PC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2xvZ2luLmh0bWwnLCc8ZGl2IGNsYXNzPVwibG9naW5cIj5cXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxmb3JtIG5hbWU9XCJsb2dpbkZvcm1cIiBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczQgbG9naW4tZm9ybVwiIG5nLXN1Ym1pdD1cIiRjdHJsLm9uU3VibWl0KClcIiByZXF1aXJlZD5cXG4gICAgICAgIDxoNCBjbGFzcz1cInVzZXItbG9naW4gZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+TG9nIGluPC9oND5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBjbGFzcz1cInZhbGlkYXRlIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiXFxuICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5lbWFpbFwiIHJlcXVpcmVkPlxcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2VzPVwibG9naW5Gb3JtLmVtYWlsLiRlcnJvclwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgbmctaWY9XCJsb2dpbkZvcm0uZW1haWwuJGRpcnR5XCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XCJyZXF1aXJlZFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XCJlbWFpbFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5Zb3VyIGVtYWlsIGFkZHJlc3MgaXMgaW52YWxpZDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cInBhc3N3b3JkXCIgY2xhc3M9XCJ2YWxpZGF0ZSBncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIiBpZD1cInBhc3N3b3JkXCIgdHlwZT1cInRleHRcIlxcbiAgICAgICAgICAgICAgICBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5wYXNzd29yZFwiIHJlcXVpcmVkPlxcbiAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlcz1cImxvZ2luRm9ybS5wYXNzd29yZC4kZXJyb3JcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cIiRjdHJsLnBhc3N3b3JkID09PSBmYWxzZVwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWQtdGV4dCBkYXJrZW4tMVwiPldyb25nIHBhc3N3b3JkIG9yIGVtYWlsPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGJ0bi1jb250YWluZXJcIj5cXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+TG9nIGluXFxuICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiBuYW1lPVwiYWN0aW9uXCIgaHJlZj1cIiMvc2lnbnVwXCI+Q3JlYXRlIG5ldyB1c2VyXFxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmF2YmFyLmh0bWwnLCc8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnJhbmQtbG9nb1wiPkdhY2hhdDwvYT5cXG5cXG4gICAgICAgIDx1bCBpZD1cIm5hdi1tb2JpbGVcIiBjbGFzcz1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+IHt7JGN0cmwudXNlck5hbWV9fTwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncHJvZmlsZS5lZGl0Lmh0bWwnLCc8ZGl2IGNsYXNzPVwiZWRpdC1wcm9maWxlXCI+XFxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgPGEgY2xhc3M9XCJiYWNrLWJ0blwiIG5hbWU9XCJhY3Rpb25cIlxcbiAgICAgIHVpLXNyZWY9XCJwcm9maWxlXCI+QmFjayB0byBQcm9maWxlIFBhZ2U8L2E+XFxuICAgIDwvZGl2PlxcbiAgPGZvcm0gbmFtZT1cImVkaXRQcm9maWxlUGljdHVyZUZvcm1cIiBuZy1zdWJtaXQ9XCIkY3RybC51cGxvYWRQcm9maWxlUGljdHVyZShlLCAkY3RybC51c2VyLmZpbGUpXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3cgZWRpdC1wcm9maWxlLWZpZWxkXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImZpbGUtZmllbGQgaW5wdXQtZmllbGQgY29sIHMxMiBlZGl0LXByb2ZpbGUtZmllbGRcIiBuZ2Ytc2VsZWN0IG5nLW1vZGVsPVwiJGN0cmwudXNlci5maWxlXCIgbmFtZT1cImZpbGVcIiBuZ2YtcGF0dGVybj1cIlxcJ2ltYWdlLypcXCdcIlxcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XFxuICAgICAgICAgICAgPHNwYW4+RmlsZTwvc3Bhbj5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXBhdGgtd3JhcHBlclwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZpbGUtcGF0aCB2YWxpZGF0ZSBncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIiB0eXBlPVwidGV4dFwiPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgbmctaWY9XCIkY3RybC51cGxvYWRTdWNjZXNzID09PSB0cnVlXCI+XFxuICAgICAgICA8cCBjbGFzcz1cImdyZWVuLXRleHQgZGFya2VuLTEgdXBsb2FkLW1lc3NhZ2VcIj5Zb3VyIHByb2ZpbGUgcGljdHVyZSB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQhPC9wPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgbmctaWY9XCIkY3RybC51cGxvYWRTdWNjZXNzID09PSBmYWxzZVwiPlxcbiAgICAgICAgPHAgY2xhc3M9XCJyZWQtdGV4dCBkYXJrZW4tMSB1cGxvYWQtbWVzc2FnZVwiPkVycm9yISBZb3VyIHByb2ZpbGUgcGljdHVyZSB3YXMgbm90IHVwZGF0ZWQhPC9wPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlVwbG9hZCBQaG90bzwvYnV0dG9uPlxcbiAgICA8YnIvPlxcbiAgICAgIDxpIGNsYXNzPVwiZGlzcGxheS1ibG9jayBtYXJnaW4tdG9wLTEwIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiPlJlY29tbWVuZGVkIHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCBhcmUgTWluaW11bSAyMDBweCBhbmQgTWF4aW11bSAyODBweC4gSWYgeW91ciBwcm9maWxlIHBpY3R1cmUgaXMgbm90IGluIGxpbmUgd2l0aCB0aGUgcmVjb21tZW5kZWQgdmFsdWVzXFxuICAgICAgICB5b3VyIHByb2ZpbGUgcGljdHVyZSB3aWxsIGJlIHRyYW5zZm9ybWVkIGludG8gcG9vciBxdWFsaXR5LlxcbiAgICAgIGludG8gcG9vciBxdWFsaXR5PC9pPlxcbiAgICA8L2Rpdj5cXG4gIDwvZm9ybT5cXG4gIDxmb3JtIG5hbWU9XCJlZGl0RW1haWxGb3JtXCIgbmctc3VibWl0PVwiJGN0cmwudXBkYXRlRW1haWwoKVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwicm93IGVkaXQtcHJvZmlsZS1maWVsZFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XFxuICAgICAgICA8aW5wdXQgaWQ9XCJ0ZXh0YXJlYS1lbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIGNsYXNzPVwidmFsaWRhdGUgZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCIgbmctbW9kZWw9XCIkY3RybC51c2VyLm5ld0VtYWlsXCI+XFxuICAgICAgICA8bGFiZWwgZm9yPVwidGV4dGFyZWEtZW1haWxcIj5FbWFpbDwvbGFiZWw+XFxuICAgICAgICA8ZGl2IG5nLW1lc3NhZ2VzPVwiZWRpdEVtYWlsRm9ybS5lbWFpbC4kZXJyb3JcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgbmctaWY9XCIkY3RybC5lbWFpbFVwZGF0ZVN1Y2Nlc3MgPT09IHRydWVcIj5cXG4gICAgICAgICAgPHAgY2xhc3M9XCJncmVlbi10ZXh0IGRhcmtlbi0xIHVwbG9hZC1tZXNzYWdlXCI+WW91ciBlbWFpbCB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQhPHA+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgbmctaWY9XCIkY3RybC5lbWFpbFVwZGF0ZVN1Y2Nlc3MgPT09IGZhbHNlXCI+XFxuICAgICAgICAgIDxwIGNsYXNzPVwiZ3JlZW4tdGV4dCBkYXJrZW4tMSB1cGxvYWQtbWVzc2FnZVwiPkVycm9yISBZb3VyIGVtYWlsIHdhcyBub3QgdXBkYXRlZCE8cD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlVwZGF0ZSBFbWFpbCBBZHJlc3M8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Zvcm0+XFxuICAgIDxmb3JtIG5hbWU9XCJlZGl0QmlvRm9ybVwiIG5nLXN1Ym1pdD1cIiRjdHJsLnVwZGF0ZUJpbygpXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBlZGl0LXByb2ZpbGUtZmllbGRcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XFxuICAgICAgICAgIDx0ZXh0YXJlYSBpZD1cInRleHRhcmVhLWJpb1wiIG5hbWU9XCJiaW9cIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhIGdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tNVwiIGxlbmd0aD1cIjEyMFwiXFxuICAgICAgICAgICAgbmctbW9kZWw9XCIkY3RybC51c2VyLmJpb1wiIG5nLW1pbmxlbmd0aD1cIjUwXCIgbmctbWF4bGVuZ3RoPVwiMTAwMFwiPjwvdGV4dGFyZWE+XFxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0ZXh0YXJlYS1iaW9cIj5Zb3VyIGJpbzwvbGFiZWw+XFxuICAgICAgICAgIDxkaXYgbmctbWVzc2FnZXM9XCJlZGl0QmlvRm9ybS5iaW8uJGVycm9yXCI+XFxuICAgICAgICAgICAgPGRpdiBuZy1pZj1cIiRjdHJsLmJpb0xlbmd0aCA9PT0gZmFsc2VcIj5cXG4gICAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZT1cIm1pbmxlbmd0aFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5CaW8gaXMgdG9vIHNob3J0LiBNaW5pbXVtIGNoYXJhY3RlcnMgYWxsb3dlZCBpcyA1MDwvZGl2PlxcbiAgICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlPVwibWF4bGVuZ3RoXCIgY2xhc3M9XCJyZWQtdGV4dCBkYXJrZW4tMVwiPkJpbyBpcyB0b28gbG9uZy4gTWluaW11bSBjaGFyYWN0ZXJzIGFsbG93ZWQgaXMgMTAwMDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBuZy1pZj1cIiRjdHJsLmJpb1VwZGF0ZVN1Y2Nlc3MgPT09IHRydWVcIj5cXG4gICAgICAgICAgICA8cCBjbGFzcz1cImdyZWVuLXRleHQgZGFya2VuLTEgdXBsb2FkLW1lc3NhZ2VcIj5Zb3VyIGJpbyB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQhPHA+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IG5nLWlmPVwiJGN0cmwuYmlvVXBkYXRlU3VjY2VzcyA9PT0gZmFsc2VcIj5cXG4gICAgICAgICAgICA8cCBjbGFzcz1cInJlZC10ZXh0IGRhcmtlbi0xIHVwbG9hZC1tZXNzYWdlXCI+RXJyb3IhIFlvdXIgYmlvIHdhcyBub3QgdXBkYXRlZCE8cD5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGRhdGUgQmlvPC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9mb3JtPlxcbjwvZGl2PlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwcm9maWxlLmh0bWwnLCc8ZGl2IGNsYXNzPVwicHJvZmlsZVwiPlxcbiAgPGRpdiBjbGFzcz1cInByb2ZpbGUtaW5mby1ib3hcIj5cXG4gIDxkaXYgbmctaWY9XCIkY3RybC5pbWFnZVVybFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwicm93IHByb2ZpbGUtcGljdHVyZS1jb250YWluZXJcIj5cXG4gICAgICAgIDxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZyBwcm9maWxlLXBpY3R1cmVcIiBuZy1zcmM9XCJ7eyRjdHJsLmltYWdlVXJsfX1cIiByZWw9XCJpbWFnZVwiIC8+XFxuICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMyIG9mZnNldC1zNFwiPlxcbiAgICAgIDxhIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG4tbGFyZ2UgZWRpdC1wcm9maWxlLWJ0blwiIG5hbWU9XCJhY3Rpb25cIlxcbiAgICAgICAgdWktc3JlZj1cImVkaXRcIj5FZGl0IFByb2ZpbGVcXG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbGVmdFwiPm1vZGVfZWRpdDwvaT5cXG4gICAgICA8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuLWxhcmdlIHJlZCBkYXJrZW4tMVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCJcXG4gICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlUHJvZmlsZSgpXCI+RGVsZXRlIFByb2ZpbGVcXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbGVmdFwiPmRlbGV0ZTwvaT5cXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3NpZ251cC5odG1sJywnPGRpdiBjbGFzcz1cInNpZ251cFwiPlxcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgPGZvcm0gbmFtZT1cInNpZ251cEZvcm1cIiBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczQgc2lnbnVwLWZvcm1cIiBuZy1zdWJtaXQ9XCIkY3RybC5vblN1Ym1pdCgpXCI+XFxuICAgICAgICA8aDQgY2xhc3M9XCJjcmVhdGUtbmV3LXVzZXIgZ3JleS10ZXh0IHRleHQtbGlnaHRlbi01XCI+Q3JlYXRlIG5ldyB1c2VyPC9oND5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwiZW1haWxcIiBpZD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgY2xhc3M9XCJ2YWxpZGF0ZSBncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIiBuZy1tb2RlbD1cIiRjdHJsLmNyZWRlbnRpYWxzLmVtYWlsXCIgcmVxdWlyZWQ+XFxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWwgQWRyZXNzPC9sYWJlbD5cXG4gICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2VzPVwic2lnbnVwRm9ybS5lbWFpbC4kZXJyb3JcIj5cXG4gICAgICAgICAgICAgIDxkaXYgbmctaWY9XCJzaWdudXBGb3JtLmVtYWlsLiRkaXJ0eVwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XCJyZXF1aXJlZFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkPC9kaXY+XFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgdHlwZT1cInRleHRcIlxcbiAgICAgICAgICAgICAgY2xhc3M9XCJ2YWxpZGF0ZSBncmV5LXRleHQgdGV4dC1saWdodGVuLTVcIiBuZy1tb2RlbD1cIiRjdHJsLmNyZWRlbnRpYWxzLnBhc3N3b3JkXCIgbmctbWlubGVuZ3RoPVwiNlwiIHJlcXVpcmVkPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cXG4gICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2VzPVwic2lnbnVwRm9ybS5wYXNzd29yZC4kZXJyb3JcIj5cXG4gICAgICAgICAgICAgIDxkaXYgbmctaWY9XCJzaWdudXBGb3JtLnBhc3N3b3JkLiRkaXJ0eVwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XCJyZXF1aXJlZFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZT1cIm1pbmxlbmd0aFwiIGNsYXNzPVwicmVkLXRleHQgZGFya2VuLTFcIj5QYXNzd29yZCBtdXN0IGJlIG92ZXIgNiBjaGFyYWN0ZXJzPC9kaXY+XFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgYnRuLWNvbnRhaW5lclwiPlxcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+UmVnaXN0ZXJcXG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Zvcm0+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3BhcnRpYWxzL25hdmJhci5odG1sJywnPG5hdiBjbGFzcz1cImN5YW4gZGFya2VuLTRcIj5cXG4gICAgPGRpdiBjbGFzcz1cIm5hdi13cmFwcGVyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxcbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJyYW5kLWxvZ29cIj5HYWNoYXQ8L2E+XFxuICAgICAgICA8dWwgaWQ9XCJuYXYtbW9iaWxlXCIgY2xhc3M9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxcbiAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgIDxsaT48YSB1aS1zcmVmPVwicHJvZmlsZVwiPlByb2ZpbGU8L2E+PC9saT5cXG4gICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgICAgIDxsaT48YSBuZy1jbGljaz1cIiRjdHJsLmxvZ291dCgpXCI+TG9nb3V0PC9hPjwvbGk+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTt9XSk7IiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdDaGF0Q3RybCcsIFsnSHR0cEZhY3RvcnknLCAnJHN0YXRlJywgJyRsb2NhdGlvbicsXG5cdCBcdCdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbihIdHRwRmFjdG9yeSwgJHN0YXRlLCAkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xuICAgIGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBDaGF0Q3RybFwiKTtcblxuXHRcdCRjdHJsLnNlbmRNZXNzYWdlID0gc2VuZE1lc3NhZ2U7XG5cdFx0JGN0cmwuZ2V0QWxsTWVzc2FnZXMgPSBnZXRBbGxNZXNzYWdlcztcblx0XHQkY3RybC5zdHJpcERhdGUgPSBzdHJpcERhdGU7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5tZXNzYWdlcyA9IFwiXCI7XG5cdFx0XHQkY3RybC5jdXJyZW50VXJsID0gJHN0YXRlLnBhcmFtcy5nYW1lTmFtZTtcblx0XHRcdGlmICghQXV0aGVudGljYXRpb25TZXJ2aWNlLmdldFRva2VuKCkpIHtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJ2xvZ0luJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC51c2VyTmFtZSA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpLmVtYWlsO1xuXHRcdFx0XHRnZXRBbGxNZXNzYWdlcygpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XG5cdFx0XHQkY3RybC5jaGF0TWVzc2FnZS50eXBlID0gJGN0cmwuY3VycmVudFVybDtcblx0XHRcdCRjdHJsLmNoYXRNZXNzYWdlLnVzZXIgPSAkY3RybC51c2VyTmFtZTtcblx0XHRcdGNvbnNvbGUubG9nKCRjdHJsLmNoYXRNZXNzYWdlKTtcblx0XHRcdGxldCBuZXdNZXNzYWdlID0ge1xuXHRcdFx0XHRkYXRhOiAkY3RybC5jaGF0TWVzc2FnZSxcblx0XHRcdFx0dXJsOiBgL2FwaS9tZXNzYWdlcy8keyRjdHJsLmN1cnJlbnRVcmx9YFxuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkucG9zdChuZXdNZXNzYWdlKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0JGN0cmwuY2hhdE1lc3NhZ2UubmV3TWVzc2FnZSA9ICcnO1xuXHRcdFx0XHQkY3RybC5nZXRBbGxNZXNzYWdlcygpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRBbGxNZXNzYWdlcygpIHtcblx0XHRcdGxldCBnZXRNZXNzYWdlcyA9IHtcblx0XHRcdFx0dXJsOiBgL2FwaS9tZXNzYWdlcy8keyRjdHJsLmN1cnJlbnRVcmx9YFxuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkuZ2V0KGdldE1lc3NhZ2VzKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0JGN0cmwubWVzc2FnZXMgPSByZXMuZGF0YTtcblx0XHRcdFx0Y29uc29sZS5sb2coJGN0cmwubWVzc2FnZXMpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzdHJpcERhdGUoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIGRhdGUuc3Vic3RyaW5nKDAsMTApO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgWyckc3RhdGUnLCAnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgJyRsb2NhdGlvbicsXG5cdFx0ZnVuY3Rpb24oJHN0YXRlLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsICRsb2NhdGlvbikge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBEYXNoYm9hcmRDdHJsXCIpO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0aWYgKCFBdXRoZW50aWNhdGlvblNlcnZpY2UuZ2V0VG9rZW4oKSkge1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnbG9nSW4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRjdHJsLnVzZXJOYW1lID0gQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCkuZW1haWw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBbJyRzdGF0ZScsICckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oJHN0YXRlLCAkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgTG9naW5DdHJsIGN0cmxcIik7XG5cblx0XHQkY3RybC5vblN1Ym1pdCA9IG9uU3VibWl0O1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0JGN0cmwudXNlciA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpO1xuXHRcdFx0aWYgKCRjdHJsLnVzZXIpIHtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJ2hvbWUnKTtcblx0XHRcdH1cblx0XHRcdCRjdHJsLmN1cnJlbnRTdGF0ZU5hbWUgPSAkc3RhdGUuY3VycmVudC5uYW1lO1xuXHRcdFx0JGN0cmwucGFzc3dvcmQgPSB0cnVlO1xuXHRcdFx0JGN0cmwuY3JlZGVudGlhbHMgPSB7XG5cdFx0XHRcdGVtYWlsIDogXCJcIixcblx0XHRcdFx0cGFzc3dvcmQ6IFwiXCJcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblN1Ym1pdCgpIHtcbiAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZVxuICAgICAgLmxvZ2luKCRjdHJsLmNyZWRlbnRpYWxzKVxuICAgICAgLmVycm9yKChlcnIpID0+IHtcblx0XHRcdFx0JGN0cmwucGFzc3dvcmQgPSBmYWxzZVxuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJMT0dHRUQgSU5cIilcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJ2hvbWUnKTtcbiAgICAgIH0pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdOYXZDdHJsJywgWyckc2NvcGUnLCAnJHN0YXRlJywgJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsICckbG9jYXRpb24nLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgQXV0aGVudGljYXRpb25TZXJ2aWNlLCAkbG9jYXRpb24pIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgTmF2Q3RybFwiKTtcblxuXHRcdCRjdHJsLmxvZ291dCA9IGxvZ291dDtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwibmF2XCIsIEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpKVxuXHRcdFx0LyppZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpKSB7XG5cdFx0XHRcdCRjdHJsLmxvZ2dlZEluID0gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IHRydWU7XG5cdFx0XHR9Ki9cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBsb2dvdXQoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkxPR09VVFwiKTtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcblx0XHRcdCRsb2NhdGlvbi51cmwoWycvJ10pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdQcm9maWxlQ3RybCcsIFsnVXBsb2FkJywgJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsICckaHR0cCcsICckbG9jYXRpb24nLCAnSHR0cEZhY3RvcnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihVcGxvYWQsIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgJGh0dHAsICRsb2NhdGlvbiwgSHR0cEZhY3RvcnkpIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHQkY3RybC51cGxvYWRQcm9maWxlUGljdHVyZSA9IHVwbG9hZFByb2ZpbGVQaWN0dXJlO1xuXHRcdCRjdHJsLmRlbGV0ZVByb2ZpbGUgPSBkZWxldGVQcm9maWxlO1xuXHRcdCRjdHJsLnVwZGF0ZUVtYWlsID0gdXBkYXRlRW1haWw7XG5cdFx0JGN0cmwudXBkYXRlQmlvID0gdXBkYXRlQmlvO1xuXHRcdCRjdHJsLmdldEltYWdlID0gZ2V0SW1hZ2U7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgUHJvZmlsZUN0cmxcIik7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlciA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpO1xuXHRcdFx0XHQkY3RybC5lbWFpbCA9ICRjdHJsLnVzZXIuZW1haWw7XG5cdFx0XHRcdCRjdHJsLmJpb0xlbmd0aCA9IHRydWU7XG5cdFx0XHRcdCRjdHJsLnVwbG9hZFN1Y2Nlc3M7XG5cdFx0XHRcdCRjdHJsLmJpb1VwZGF0ZVN1Y2Nlc3M7XG5cdFx0XHRcdCRjdHJsLmVtYWlsVXBkYXRlU3VjY2Vzcztcblx0XHRcdFx0LyokY3RybC5jcmVkZW50aWFscyA9IHtcblx0XHRcdFx0XHRiaW86ICcnLFxuXG5cdFx0XHRcdH0qL1xuXHRcdFx0XHRnZXRJbWFnZSgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBsb2FkUHJvZmlsZVBpY3R1cmUoZSwgZmlsZSkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJmaWxlXCIsIGZpbGUpXG5cdFx0XHRpZihmaWxlKSB7XG5cdFx0XHRcdFVwbG9hZC51cGxvYWQoe1xuXHRcdFx0XHRcdHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJvZmlsZS91cGxvYWRQaG90b2AsXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdFx0ZGF0YToge2VtYWlsOiAkY3RybC5lbWFpbH0sXG5cdFx0XHRcdFx0ZmlsZTogZmlsZVxuXHRcdFx0XHR9KS5wcm9ncmVzcygoZXZ0KSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJmaXJpbmdcIik7XG5cdFx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIilcblx0XHRcdFx0XHQkY3RybC51cGxvYWRTdWNjZXNzID0gdHJ1ZTtcblx0XHRcdFx0fSkuZXJyb3IoKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0JGN0cmwudXBsb2FkU3VjY2VzcyA9IGZhbHNlO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3JcIilcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRJbWFnZSgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCRjdHJsLmVtYWlsKVxuXHRcdFx0Y29uc29sZS5sb2coXCJnZXQgaW1hZ2VcIilcblx0XHRcdGNvbnN0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdHVybDogYC9hcGkvcHJvZmlsZS9nZXRJbWFnZS8keyRjdHJsLmVtYWlsfWBcblx0XHRcdH1cblxuXHRcdFx0SHR0cEZhY3RvcnkuZ2V0KHJlcXVlc3QpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRpZiAocmVzLmRhdGEuaW1hZ2UpIHtcblx0XHRcdFx0XHQkY3RybC5pbWFnZVVybCA9IHJlcy5kYXRhLmltYWdlO1xuXHRcdFx0XHRcdCRjdHJsLmltYWdlVXJsID0gYC4uLy4uLy4uJHskY3RybC5pbWFnZVVybH1gXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoKSB7XG5cdFx0XHQvL2NvbnN0IHJlc3VsdCA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgeW91ciBhY2NvdW50P1wiKVxuXHRcdFx0Y29uc29sZS5sb2coXCJkZWxldGVpbmdcIilcblx0XHRcdGNvbnN0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdHVybDogYC9hcGkvcHJvZmlsZS9kZWxldGUvJHskY3RybC5lbWFpbH1gXG5cdFx0XHR9XG5cdFx0XHRIdHRwRmFjdG9yeS5kZWxldGUocmVxdWVzdCkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdGFsZXJ0KFwiWW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgZGVsZXRlZFwiKTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItRGF0YScpO1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2xvZ2luJ10pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlRW1haWwoKSB7XG5cdFx0XHRjb25zdCByZXF1ZXN0ID0ge1xuXHRcdFx0XHR1cmw6ICcvYXBpL3Byb2ZpbGUvdXBkYXRlRW1haWwnLFxuXHRcdFx0XHRkYXRhOiAkY3RybC51c2VyXG5cdFx0XHR9XG5cblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QocmVxdWVzdCkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlcylcblx0XHRcdFx0aWYgKHJlcy5kYXRhLm5ld0VtYWlsID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0JGN0cmwuZW1haWxVcGRhdGVTdWNjZXNzID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkY3RybC5lbWFpbFVwZGF0ZVN1Y2Nlc3MgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlQmlvKCkge1xuXHRcdFx0JGN0cmwuYmlvTGVuZ3RoID0gZmFsc2U7XG5cdFx0XHRpZiAoJGN0cmwudXNlci5iaW8pIHtcblx0XHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHR1cmw6ICcvYXBpL3Byb2ZpbGUvdXBkYXRlQmlvJyxcblx0XHRcdFx0XHRkYXRhOiAkY3RybC51c2VyXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRIdHRwRmFjdG9yeS5wb3N0KHJlcXVlc3QpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRcdGlmIChyZXMuZGF0YS5iaW8pIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKVxuXHRcdFx0XHRcdFx0JGN0cmwuYmlvVXBkYXRlU3VjY2VzcyA9IHRydWU7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCRjdHJsLmJpb1VwZGF0ZVN1Y2Nlc3MgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbJyRzdGF0ZScsICdIdHRwRmFjdG9yeScsICckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oJHN0YXRlLCBIdHRwRmFjdG9yeSwgJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcblxuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBSZWdpc3RlckN0cmwgY3RybFwiKTtcblxuXHRcdCRjdHJsLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC51c2VyID0gQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCk7XG5cdFx0XHRpZiAoJGN0cmwudXNlcikge1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnaG9tZScpO1xuXHRcdFx0fVxuXHRcdFx0JGN0cmwuY3JlZGVudGlhbHMgPSB7XG5cdFx0XHRcdGVtYWlsIDogXCJcIixcblx0XHRcdFx0cGFzc3dvcmQ6IFwiXCJcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblN1Ym1pdCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCRjdHJsLmNyZWRlbnRpYWxzKVxuXHRcdFx0QXV0aGVudGljYXRpb25TZXJ2aWNlXG5cdFx0XHQucmVnaXN0ZXIoJGN0cmwuY3JlZGVudGlhbHMpXG5cdFx0XHQuZXJyb3IoKGVycikgPT4ge1xuXHRcdFx0XHRcdGFsZXJ0KGVycik7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2xvZ2luJ10pXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG4gIC5kaXJlY3RpdmUoJ2NoZWNrVXNlcicsIFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAndXNlclNydicsXG4gICAgZnVuY3Rpb24gKCRyb290LCAkbG9jLCB1c2VyU3J2KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgICAgJHJvb3QuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGUsIGN1cnIsIHByZXYpe1xuICAgICAgICAgICAgaWYgKCFwcmV2LmFjY2Vzcy5pc0ZyZWUgJiYgIXVzZXJTcnYuaXNMb2dnZWQpIHtcbiAgICAgICAgICAgICAgLy8gcmVsb2FkIHRoZSBsb2dpbiByb3V0ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICogSU1QT1JUQU5UOlxuICAgICAgICAgICAgKiBJdCdzIG5vdCBkaWZmaWN1bHQgdG8gZm9vbCB0aGUgcHJldmlvdXMgY29udHJvbCxcbiAgICAgICAgICAgICogc28gaXQncyByZWFsbHkgSU1QT1JUQU5UIHRvIHJlcGVhdCBzZXJ2ZXIgc2lkZVxuICAgICAgICAgICAgKiB0aGUgc2FtZSBjb250cm9sIGJlZm9yZSBzZW5kaW5nIGJhY2sgcmVzZXJ2ZWQgZGF0YS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLnNlcnZpY2UoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIHNlcnZpY2UpO1xuXG4gICAgc2VydmljZS4kaW5qZWN0ID0gWydIdHRwRmFjdG9yeScsICckd2luZG93J107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBzZXJ2aWNlKEh0dHBGYWN0b3J5LCAkd2luZG93KSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBzYXZlVG9rZW46IHNhdmVUb2tlbixcbiAgICAgICAgICAgIGdldFRva2VuOiBnZXRUb2tlbixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgaXNMb2dnZWRJbjogaXNMb2dnZWRJbixcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyOiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVUb2tlbih0b2tlbikge1xuICAgICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddID0gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZVsnVXNlci1EYXRhJ107XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICBsZXQgcGF5bG9hZDtcblxuICAgICAgICAgIGlmKHRva2VuKXtcbiAgICAgICAgICAgIHBheWxvYWQgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgcGF5bG9hZCA9ICR3aW5kb3cuYXRvYihwYXlsb2FkKTtcbiAgICAgICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5leHAgPiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBjdXJyZW50VXNlcigpIHtcbiAgICAgICAgICBpZihpc0xvZ2dlZEluKCkpe1xuICAgICAgICAgICAgdmFyIHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgIHBheWxvYWQgPSAkd2luZG93LmF0b2IocGF5bG9hZCk7XG4gICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGVtYWlsIDogcGF5bG9hZC5lbWFpbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3Rlcih1c2VyKSB7XG4gICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VycycsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBIdHRwRmFjdG9yeS5wb3N0KHVzZXJJbmZvKS5zdWNjZXNzKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNhdmVUb2tlbihyZXMudG9rZW4pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW4odXNlcikge1xuICAgICAgICAgIGxldCB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gSHR0cEZhY3RvcnkucG9zdCh1c2VySW5mbykuc3VjY2VzcygocmVzKSA9PiB7XG4gICAgICAgICAgICBzYXZlVG9rZW4ocmVzLnRva2VuKTtcbiAgICAgICAgfSk7XG59O1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnSHR0cEZhY3RvcnknLCBmYWN0b3J5KTtcblxuICAgIGZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnQ29uZmlnJ107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KCRodHRwLCBDb25maWcpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIHB1dDogcHV0LFxuICAgICAgICAgICAgcG9zdDogcG9zdCxcbiAgICAgICAgICAgIGRlbGV0ZTogX2RlbGV0ZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogb3B0aW9ucy5jYWNoZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jYWNoZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG9wdGlvbnMua2luZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1dChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGVsZXRlKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5zZXJ2aWNlKCdDb25maWcnLCBTZXJ2aWNlKTtcblxuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gU2VydmljZSgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICAnQVBJX0JBU0VfVVJMJzonaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
