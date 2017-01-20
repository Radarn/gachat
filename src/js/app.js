'use strict';

angular.module('gachat', ['ui.router', 'ngFileUpload']);

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
$templateCache.put('chat.html','<h3>\n  <span>Chat with other gamers!</span>\n</h3>\n<div class="row">\n  <div class="col s8">\n    <strong>Message</strong>\n  </div>\n  <div class="col s1 offset-s3">\n    <strong>Date</strong>\n  </div>\n</div>\n<div class="row">\n  <div class="chat-box col s12">\n    <div class="row message-border" ng-repeat="message in $ctrl.messages">\n      <div class="col s8">\n        <strong><em>{{message.user}}</em> :</strong>\n        {{message.message}}\n      </div>\n      <div class="col s2 offset-s2 right-align">\n        {{$ctrl.stripDate(message.date)}}\n      </div>\n      <br>\n    </div>\n  </div>\n</div>\n<div class="row">\n  <div class="input-field col s12 ">\n    <textarea ng-model="$ctrl.chatMessage.newMessage" id="icon_prefix2" class="materialize-textarea"></textarea>\n    <label for="icon_prefix2">Message text</label>\n  </div>\n</div>\n<button ng-click="$ctrl.sendMessage()"class="btn waves-effect waves-light" type="submit" name="action">Send message\n    <i class="material-icons right">send</i>\n</button>\n');
$templateCache.put('home.html','<h1>Logged in as: <a ui-sref="profile">{{$ctrl.userName}}</a></h1>\n<div class="row home-menu">\n\t<div class="col s3">\n      \t<a ng-href="#/chat/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      \t<p>Counter-Strike: Global Offensive</p>\n\t</div>\n    <div class="col s3">\n  \t\t<a ng-href="#/chat/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n        <p>Dota 2</p>\n    </div>\n\n    <div class="col s3">\n  \t\t<a ng-href="#/chat/leagueoflegends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n  \t\t<p>League of Legends</p>\n      </div>\n     <div class="col s3">\n  \t\t<a ng-href="#/chat/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n  \t\t<p>Overwatch</p>\n\t</div>\n</div>\n');
$templateCache.put('login.html','<div class="row">\n      <form class="col s6 offset-s4" ng-submit="$ctrl.onSubmit()">\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.credentials.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.credentials.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <div class="row">\n              <button class="btn waves-effect waves-light" type="submit" name="action">Log in\n                  <i class="material-icons right">send</i>\n              </button>\n            </form>\n            <a class="btn waves-effect waves-light" name="action" href="#/signup">Create new user\n                  <i class="material-icons right">send</i>\n            </a>\n          </div>\n</div>\n');
$templateCache.put('navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n              <li><a href="#/about">About</a></li>\n              <li><a href="#"> {{$ctrl.userName}}</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('profile.edit.html','  <div class="row edit-profile">\n    <div class="file-field input-field col s12" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n      accept="image/*">\n        <div class="btn">\n          <span>File</span>\n          <input type="file">\n        </div>\n        <div class="file-path-wrapper">\n          <input class="file-path validate" type="text">\n        </div>\n    </div>\n  </div>\n  <button ng-click="$ctrl.upload(e, $ctrl.user.file)" class="btn waves-effect waves-light" type="submit" name="action">Upload Photo</button>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <input id="textarea-email" type="text" class="validate" ng-model="$ctrl.user.newEmail">\n      <label for="textarea-email">Email</label>\n      <button ng-click="$ctrl.updateEmail()" class="btn waves-effect waves-light" type="submit" name="action">Update Email Adress</button>\n      </div>\n    </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s10">\n      <textarea id="textarea-bio" class="materialize-textarea" length="120" ng-model="$ctrl.user.bio"></textarea>\n      <label for="textarea-bio">Your bio</label>\n    </div>\n  </div>\n  <button ng-click="$ctrl.updateBio()" class="btn waves-effect waves-light" type="submit" name="action">Update Bio</button>\n  </div>\n');
$templateCache.put('profile.html','<div class="row profile">\n  <div class="col s3 offset-s3">\n    <a class="btn waves-effect waves-light btn-large" type="submit" name="action"\n      ui-sref="edit">Edit Profile</a>\n    </div>\n    <div class="col s3">\n      <button class="btn waves-effect waves-light btn-large red darken-1" type="submit" name="action"\n      ng-click="$ctrl.deleteProfile()">Delete Profile\n            <i class="material-icons right">send</i>\n      </button>\n    </div>\n</div>\n');
$templateCache.put('signup.html','<div class="row">\n      <form class="col s6 offset-s4" ng-submit="$ctrl.onSubmit()">\n            <h3>Create new user</h3>\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.credentials.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.credentials.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <button class="btn waves-effect waves-light" type="submit" name="action">Register\n                  <i class="material-icons right">send</i>\n            </button>\n      </form>\n</div>\n');
$templateCache.put('partials/navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n            <li><a ui-sref="profile">Profile</a></li>\n            <li><a href="#/about">About</a></li>\n            <li><a ng-click="$ctrl.logout()">Logout</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');}]);
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

	.controller('LoginCtrl', ['$location',
	 	'AuthenticationService', function($location, AuthenticationService) {
		const $ctrl = this;
		console.log("this is LoginCtrl ctrl");

		$ctrl.onSubmit = onSubmit;

		activate();

		function activate() {
			$ctrl.credentials = {
				email : "",
				password: ""
			}
		}

		function onSubmit() {
      AuthenticationService
      .login($ctrl.credentials)
      .error((err) => {
        alert(err);
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

	.controller('NavCtrl', ['$state', 'AuthenticationService', '$location', function($state, AuthenticationService, $location) {
		const $ctrl = this;

		console.log("this is NavCtrl");
		// TEMPLATE IS NOT CONNECTED TO CONTROLLER ERROR!
		$ctrl.getUser = getUser;
		$ctrl.logout = logout;

		activate();

		function activate() {
			$ctrl.loggedIn = false;
		}

		function getUser() {
			$ctrl.userData = localStorage.getItem('User-Data')
			//JSON.stringify(eval("(" + userData + ")"))
			$ctrl.userData = JSON.parse($ctrl.userData)
			$ctrl.userName = $ctrl.userData.data.email;
			console.log($ctrl.loggedIn);
			$ctrl.loggedIn = true;

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

		$ctrl.upload = upload;
		$ctrl.deleteProfile = deleteProfile;
		$ctrl.updateEmail = updateEmail;
		$ctrl.updateBio = updateBio;

		console.log("this is ProfileCtrl");

		activate();

		function activate() {
			if (!AuthenticationService.getToken()) {
				$location.path('logIn');
			} else {
				$ctrl.user = AuthenticationService.currentUser();
				$ctrl.email = $ctrl.user.email;
			}
		}

		function upload(e, file) {
			console.log("file", file)
			if(file) {
				Upload.upload({
					url: `http://localhost:8000/api/profile/edit`,
					method: 'POST',
					data: {email: $ctrl.email},
					file: file
				}).progress((evt) => {
					console.log("firing");
				}).success((data) => {
					console.log("Success");
				}).error((error) => {
					console.log("Error")
					console.log(error);
				})
			}
		}
		// THIS NEED TO BE RE WRITTES. NEW ENDPOINT. PARAMS
		function deleteProfile() {
			const result = confirm("Are you sure that you want to delete your account?")
			if (result) {
				let currentUser = {
					data: $ctrl.email,
					url: `/api/profile/edit`
				}
				HttpFactory.delete(currentUser).then((res) => {
					alert("Your account was successfully deleted");
					localStorage.removeItem('User-Data');
					$location.url(['/login']);
				});
			}
		}

		function updateEmail() {
			console.log("updating email adress")
			console.log("EMAIL", $ctrl.email)
			const request = {
				url: '/api/profile/updateEmail',
				data: $ctrl.user
			}

			HttpFactory.post(request).then((res) => {
				console.log(res)
			});
		}

		function updateBio() {
			console.log("updating bio")
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
			$ctrl.credentials = {
				email : "",
				password: ""
			}
		}

		function onSubmit() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2NoYXQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbG9naW4uY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL25hdmJhci5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcHJvZmlsZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXIuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvY2hlY2stdXNlci5kaXJlY3RpdmUuanMiLCJzZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic2VydmljZXMvaHR0cC5mYWN0b3J5LmpzIiwic2VydmljZXMvc2VydmVyQ29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFFBQVEsT0FBTyxVQUFVLENBQUMsYUFBYTtBQUN2QztBQ0hBOztBQUVBLFFBQVEsT0FBTzs7Q0FFZCxnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O0lBRWpELG1CQUFtQixVQUFVOztJQUU3Qjs7OztTQUlLLE1BQU0sVUFBVTtZQUNiLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFNBQVM7WUFDWixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjO1lBQ2QsUUFBUTtjQUNOLFFBQVE7Ozs7U0FJYixNQUFNLFFBQVE7WUFDWCxLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sV0FBVztVQUNoQixhQUFhO1VBQ2IsWUFBWTtVQUNaLGNBQWM7OztTQUdmLE1BQU0sUUFBUTtVQUNiLGFBQWE7VUFDYixZQUFZO1VBQ1osY0FBYzs7OztT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U0FBUyxRQUFRO2dCQUNqQixLQUFLLE9BQU8sZUFBZSxRQUFROzs7O1FBSTNDLFNBQVMsS0FBSyxRQUFRO1lBQ2xCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLE1BQU0sUUFBUTtnQkFDZCxLQUFLLE9BQU8sZUFBZSxRQUFROzs7O1FBSTNDLFNBQVMsUUFBUSxRQUFRO1lBQ3JCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLE1BQU0sUUFBUTtnQkFDZCxLQUFLLE9BQU8sZUFBZSxRQUFROzs7O0tBSTlDO0FDeERMLENBQUMsV0FBVztJQUNSOztJQUVBO1NBQ0ssT0FBTztTQUNQLFFBQVEsVUFBVTs7OztJQUl2QixTQUFTLFVBQVU7UUFDZixJQUFJLFVBQVU7WUFDVixlQUFlOzs7UUFHbkIsT0FBTzs7S0FFViIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnLCBbJ3VpLnJvdXRlcicsICduZ0ZpbGVVcGxvYWQnXSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcblxuICAgICAgICAvLyBIT01FIFNUQVRFUyBBTkQgTkVTVEVEIFZJRVdTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAuc3RhdGUoJ3NpZ25VcCcsIHtcbiAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzaWdudXAuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnbG9nSW4nLCB7XG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnLFxuICAgICAgICAgICAgYWNjZXNzOiB7XG4gICAgICAgICAgICAgIGlzRnJlZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgIHVybDogJy9ob21lJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaG9tZS5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoYm9hcmRDdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnY2hhdCcsIHtcbiAgICAgICAgICAgIHVybDogJy9jaGF0LzpnYW1lTmFtZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NoYXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhdEN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdwcm9maWxlJywge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJvZmlsZS5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUN0cmwnLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnZWRpdCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUuZWRpdC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUN0cmwnLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC8vIEFCT1VUIFBBR0UgQU5EIE1VTFRJUExFIE5BTUVEIFZJRVdTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAuc3RhdGUoJ2Fib3V0Jywge1xuICAgICAgICAgICAgdXJsOiAnL2Fib3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYWJvdXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFib3V0IGNvbnRyb2xsZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHskdGVtcGxhdGVDYWNoZS5wdXQoJ2Fib3V0Lmh0bWwnLCc8aDE+QWJvdXQ8L2gxPicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdjaGF0Lmh0bWwnLCc8aDM+XFxuICA8c3Bhbj5DaGF0IHdpdGggb3RoZXIgZ2FtZXJzITwvc3Bhbj5cXG48L2gzPlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wgczhcIj5cXG4gICAgPHN0cm9uZz5NZXNzYWdlPC9zdHJvbmc+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wgczEgb2Zmc2V0LXMzXCI+XFxuICAgIDxzdHJvbmc+RGF0ZTwvc3Ryb25nPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgPGRpdiBjbGFzcz1cImNoYXQtYm94IGNvbCBzMTJcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvdyBtZXNzYWdlLWJvcmRlclwiIG5nLXJlcGVhdD1cIm1lc3NhZ2UgaW4gJGN0cmwubWVzc2FnZXNcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgICAgICA8c3Ryb25nPjxlbT57e21lc3NhZ2UudXNlcn19PC9lbT4gOjwvc3Ryb25nPlxcbiAgICAgICAge3ttZXNzYWdlLm1lc3NhZ2V9fVxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczIgb2Zmc2V0LXMyIHJpZ2h0LWFsaWduXCI+XFxuICAgICAgICB7eyRjdHJsLnN0cmlwRGF0ZShtZXNzYWdlLmRhdGUpfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8YnI+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTIgXCI+XFxuICAgIDx0ZXh0YXJlYSBuZy1tb2RlbD1cIiRjdHJsLmNoYXRNZXNzYWdlLm5ld01lc3NhZ2VcIiBpZD1cImljb25fcHJlZml4MlwiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWFcIj48L3RleHRhcmVhPlxcbiAgICA8bGFiZWwgZm9yPVwiaWNvbl9wcmVmaXgyXCI+TWVzc2FnZSB0ZXh0PC9sYWJlbD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxidXR0b24gbmctY2xpY2s9XCIkY3RybC5zZW5kTWVzc2FnZSgpXCJjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlNlbmQgbWVzc2FnZVxcbiAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG48L2J1dHRvbj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnaG9tZS5odG1sJywnPGgxPkxvZ2dlZCBpbiBhczogPGEgdWktc3JlZj1cInByb2ZpbGVcIj57eyRjdHJsLnVzZXJOYW1lfX08L2E+PC9oMT5cXG48ZGl2IGNsYXNzPVwicm93IGhvbWUtbWVudVwiPlxcblxcdDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gICAgICBcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L2NvdW50ZXItc3RyaWtlOmdsb2JhbC1vZmZlbnNpdmVcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2NzZ28uanBnXCI+PC9hPlxcbiAgICAgIFxcdDxwPkNvdW50ZXItU3RyaWtlOiBHbG9iYWwgT2ZmZW5zaXZlPC9wPlxcblxcdDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICBcXHRcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L2RvdGEyXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9kb3RhMi5wbmdcIj48L2E+XFxuICAgICAgICA8cD5Eb3RhIDI8L3A+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICBcXHRcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L2xlYWd1ZW9mbGVnZW5kc1wiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvbG9sLmpwZWdcIj48L2E+XFxuICBcXHRcXHQ8cD5MZWFndWUgb2YgTGVnZW5kczwvcD5cXG4gICAgICA8L2Rpdj5cXG4gICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gIFxcdFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvb3ZlcndhdGNoXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9vdmVyd2F0Y2guanBnXCI+PC9hPlxcbiAgXFx0XFx0PHA+T3ZlcndhdGNoPC9wPlxcblxcdDwvZGl2PlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdsb2dpbi5odG1sJywnPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxmb3JtIGNsYXNzPVwiY29sIHM2IG9mZnNldC1zNFwiIG5nLXN1Ym1pdD1cIiRjdHJsLm9uU3VibWl0KClcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwuY3JlZGVudGlhbHMuZW1haWxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwuY3JlZGVudGlhbHMucGFzc3dvcmRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5Mb2cgaW5cXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDwvZm9ybT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiBuYW1lPVwiYWN0aW9uXCIgaHJlZj1cIiMvc2lnbnVwXCI+Q3JlYXRlIG5ldyB1c2VyXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmF2YmFyLmh0bWwnLCc8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnJhbmQtbG9nb1wiPkdhY2hhdDwvYT5cXG5cXG4gICAgICAgIDx1bCBpZD1cIm5hdi1tb2JpbGVcIiBjbGFzcz1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+IHt7JGN0cmwudXNlck5hbWV9fTwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncHJvZmlsZS5lZGl0Lmh0bWwnLCcgIDxkaXYgY2xhc3M9XCJyb3cgZWRpdC1wcm9maWxlXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJmaWxlLWZpZWxkIGlucHV0LWZpZWxkIGNvbCBzMTJcIiBuZ2Ytc2VsZWN0IG5nLW1vZGVsPVwiJGN0cmwudXNlci5maWxlXCIgbmFtZT1cImZpbGVcIiBuZ2YtcGF0dGVybj1cIlxcJ2ltYWdlLypcXCdcIlxcbiAgICAgIGFjY2VwdD1cImltYWdlLypcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cXG4gICAgICAgICAgPHNwYW4+RmlsZTwvc3Bhbj5cXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXBhdGgtd3JhcHBlclwiPlxcbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmaWxlLXBhdGggdmFsaWRhdGVcIiB0eXBlPVwidGV4dFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwudXBsb2FkKGUsICRjdHJsLnVzZXIuZmlsZSlcIiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlVwbG9hZCBQaG90bzwvYnV0dG9uPlxcblxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgIDxpbnB1dCBpZD1cInRleHRhcmVhLWVtYWlsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC51c2VyLm5ld0VtYWlsXCI+XFxuICAgICAgPGxhYmVsIGZvcj1cInRleHRhcmVhLWVtYWlsXCI+RW1haWw8L2xhYmVsPlxcbiAgICAgIDxidXR0b24gbmctY2xpY2s9XCIkY3RybC51cGRhdGVFbWFpbCgpXCIgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGRhdGUgRW1haWwgQWRyZXNzPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMFwiPlxcbiAgICAgIDx0ZXh0YXJlYSBpZD1cInRleHRhcmVhLWJpb1wiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWFcIiBsZW5ndGg9XCIxMjBcIiBuZy1tb2RlbD1cIiRjdHJsLnVzZXIuYmlvXCI+PC90ZXh0YXJlYT5cXG4gICAgICA8bGFiZWwgZm9yPVwidGV4dGFyZWEtYmlvXCI+WW91ciBiaW88L2xhYmVsPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cIiRjdHJsLnVwZGF0ZUJpbygpXCIgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGRhdGUgQmlvPC9idXR0b24+XFxuICA8L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncHJvZmlsZS5odG1sJywnPGRpdiBjbGFzcz1cInJvdyBwcm9maWxlXCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHMzIG9mZnNldC1zM1wiPlxcbiAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuLWxhcmdlXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIlxcbiAgICAgIHVpLXNyZWY9XCJlZGl0XCI+RWRpdCBQcm9maWxlPC9hPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0bi1sYXJnZSByZWQgZGFya2VuLTFcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiXFxuICAgICAgbmctY2xpY2s9XCIkY3RybC5kZWxldGVQcm9maWxlKClcIj5EZWxldGUgUHJvZmlsZVxcbiAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2lnbnVwLmh0bWwnLCc8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgPGZvcm0gY2xhc3M9XCJjb2wgczYgb2Zmc2V0LXM0XCIgbmctc3VibWl0PVwiJGN0cmwub25TdWJtaXQoKVwiPlxcbiAgICAgICAgICAgIDxoMz5DcmVhdGUgbmV3IHVzZXI8L2gzPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiRW1haWxcIiBpZD1cImVtYWlsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5lbWFpbFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsIEFkcmVzczwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5wYXNzd29yZFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlJlZ2lzdGVyXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9mb3JtPlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwYXJ0aWFscy9uYXZiYXIuaHRtbCcsJzxuYXY+XFxuICAgIDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJicmFuZC1sb2dvXCI+R2FjaGF0PC9hPlxcbiAgICAgICAgPHVsIGlkPVwibmF2LW1vYmlsZVwiIGNsYXNzPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cXG4gICAgICAgICAgICA8bGk+PGEgdWktc3JlZj1cInByb2ZpbGVcIj5Qcm9maWxlPC9hPjwvbGk+XFxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjL2Fib3V0XCI+QWJvdXQ8L2E+PC9saT5cXG4gICAgICAgICAgICA8bGk+PGEgbmctY2xpY2s9XCIkY3RybC5sb2dvdXQoKVwiPkxvZ291dDwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTt9XSk7IiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdDaGF0Q3RybCcsIFsnSHR0cEZhY3RvcnknLCAnJHN0YXRlJywgJyRsb2NhdGlvbicsXG5cdCBcdCdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbihIdHRwRmFjdG9yeSwgJHN0YXRlLCAkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xuICAgIGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBDaGF0Q3RybFwiKTtcblxuXHRcdCRjdHJsLnNlbmRNZXNzYWdlID0gc2VuZE1lc3NhZ2U7XG5cdFx0JGN0cmwuZ2V0QWxsTWVzc2FnZXMgPSBnZXRBbGxNZXNzYWdlcztcblx0XHQkY3RybC5zdHJpcERhdGUgPSBzdHJpcERhdGU7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5tZXNzYWdlcyA9IFwiXCI7XG5cdFx0XHQkY3RybC5jdXJyZW50VXJsID0gJHN0YXRlLnBhcmFtcy5nYW1lTmFtZTtcblx0XHRcdGlmICghQXV0aGVudGljYXRpb25TZXJ2aWNlLmdldFRva2VuKCkpIHtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJ2xvZ0luJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC51c2VyTmFtZSA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpLmVtYWlsO1xuXHRcdFx0XHRnZXRBbGxNZXNzYWdlcygpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XG5cdFx0XHQkY3RybC5jaGF0TWVzc2FnZS50eXBlID0gJGN0cmwuY3VycmVudFVybDtcblx0XHRcdCRjdHJsLmNoYXRNZXNzYWdlLnVzZXIgPSAkY3RybC51c2VyTmFtZTtcblx0XHRcdGNvbnNvbGUubG9nKCRjdHJsLmNoYXRNZXNzYWdlKTtcblx0XHRcdGxldCBuZXdNZXNzYWdlID0ge1xuXHRcdFx0XHRkYXRhOiAkY3RybC5jaGF0TWVzc2FnZSxcblx0XHRcdFx0dXJsOiBgL2FwaS9tZXNzYWdlcy8keyRjdHJsLmN1cnJlbnRVcmx9YFxuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkucG9zdChuZXdNZXNzYWdlKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0JGN0cmwuZ2V0QWxsTWVzc2FnZXMoKTtcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0QWxsTWVzc2FnZXMoKSB7XG5cdFx0XHRsZXQgZ2V0TWVzc2FnZXMgPSB7XG5cdFx0XHRcdHVybDogYC9hcGkvbWVzc2FnZXMvJHskY3RybC5jdXJyZW50VXJsfWBcblx0XHRcdH1cblx0XHRcdEh0dHBGYWN0b3J5LmdldChnZXRNZXNzYWdlcykudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdCRjdHJsLm1lc3NhZ2VzID0gcmVzLmRhdGE7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCRjdHJsLm1lc3NhZ2VzKTtcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc3RyaXBEYXRlKGRhdGUpIHtcblx0XHRcdHJldHVybiBkYXRlLnN1YnN0cmluZygwLDEwKTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignRGFzaGJvYXJkQ3RybCcsIFsnJHN0YXRlJywgJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsICckbG9jYXRpb24nLFxuXHRcdGZ1bmN0aW9uKCRzdGF0ZSwgQXV0aGVudGljYXRpb25TZXJ2aWNlLCAkbG9jYXRpb24pIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgRGFzaGJvYXJkQ3RybFwiKTtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdGlmICghQXV0aGVudGljYXRpb25TZXJ2aWNlLmdldFRva2VuKCkpIHtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJ2xvZ0luJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC51c2VyTmFtZSA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpLmVtYWlsO1xuXHRcdFx0fVxuXHRcdH1cblx0fV0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignTG9naW5DdHJsJywgWyckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIExvZ2luQ3RybCBjdHJsXCIpO1xuXG5cdFx0JGN0cmwub25TdWJtaXQgPSBvblN1Ym1pdDtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLmNyZWRlbnRpYWxzID0ge1xuXHRcdFx0XHRlbWFpbCA6IFwiXCIsXG5cdFx0XHRcdHBhc3N3b3JkOiBcIlwiXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gb25TdWJtaXQoKSB7XG4gICAgICBBdXRoZW50aWNhdGlvblNlcnZpY2VcbiAgICAgIC5sb2dpbigkY3RybC5jcmVkZW50aWFscylcbiAgICAgIC5lcnJvcigoZXJyKSA9PiB7XG4gICAgICAgIGFsZXJ0KGVycik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkxPR0dFRCBJTlwiKVxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnaG9tZScpO1xuICAgICAgfSk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ05hdkN0cmwnLCBbJyRzdGF0ZScsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHN0YXRlLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsICRsb2NhdGlvbikge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBOYXZDdHJsXCIpO1xuXHRcdC8vIFRFTVBMQVRFIElTIE5PVCBDT05ORUNURUQgVE8gQ09OVFJPTExFUiBFUlJPUiFcblx0XHQkY3RybC5nZXRVc2VyID0gZ2V0VXNlcjtcblx0XHQkY3RybC5sb2dvdXQgPSBsb2dvdXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFVzZXIoKSB7XG5cdFx0XHQkY3RybC51c2VyRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLURhdGEnKVxuXHRcdFx0Ly9KU09OLnN0cmluZ2lmeShldmFsKFwiKFwiICsgdXNlckRhdGEgKyBcIilcIikpXG5cdFx0XHQkY3RybC51c2VyRGF0YSA9IEpTT04ucGFyc2UoJGN0cmwudXNlckRhdGEpXG5cdFx0XHQkY3RybC51c2VyTmFtZSA9ICRjdHJsLnVzZXJEYXRhLmRhdGEuZW1haWw7XG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC5sb2dnZWRJbik7XG5cdFx0XHQkY3RybC5sb2dnZWRJbiA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBsb2dvdXQoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkxPR09VVFwiKTtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcblx0XHRcdCRsb2NhdGlvbi51cmwoWycvJ10pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdQcm9maWxlQ3RybCcsIFsnVXBsb2FkJywgJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsICckaHR0cCcsICckbG9jYXRpb24nLCAnSHR0cEZhY3RvcnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihVcGxvYWQsIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgJGh0dHAsICRsb2NhdGlvbiwgSHR0cEZhY3RvcnkpIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHQkY3RybC51cGxvYWQgPSB1cGxvYWQ7XG5cdFx0JGN0cmwuZGVsZXRlUHJvZmlsZSA9IGRlbGV0ZVByb2ZpbGU7XG5cdFx0JGN0cmwudXBkYXRlRW1haWwgPSB1cGRhdGVFbWFpbDtcblx0XHQkY3RybC51cGRhdGVCaW8gPSB1cGRhdGVCaW87XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgUHJvZmlsZUN0cmxcIik7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlciA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpO1xuXHRcdFx0XHQkY3RybC5lbWFpbCA9ICRjdHJsLnVzZXIuZW1haWw7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBsb2FkKGUsIGZpbGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiZmlsZVwiLCBmaWxlKVxuXHRcdFx0aWYoZmlsZSkge1xuXHRcdFx0XHRVcGxvYWQudXBsb2FkKHtcblx0XHRcdFx0XHR1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3Byb2ZpbGUvZWRpdGAsXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdFx0ZGF0YToge2VtYWlsOiAkY3RybC5lbWFpbH0sXG5cdFx0XHRcdFx0ZmlsZTogZmlsZVxuXHRcdFx0XHR9KS5wcm9ncmVzcygoZXZ0KSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJmaXJpbmdcIik7XG5cdFx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIik7XG5cdFx0XHRcdH0pLmVycm9yKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3JcIilcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIFRISVMgTkVFRCBUTyBCRSBSRSBXUklUVEVTLiBORVcgRU5EUE9JTlQuIFBBUkFNU1xuXHRcdGZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHlvdXIgYWNjb3VudD9cIilcblx0XHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdFx0bGV0IGN1cnJlbnRVc2VyID0ge1xuXHRcdFx0XHRcdGRhdGE6ICRjdHJsLmVtYWlsLFxuXHRcdFx0XHRcdHVybDogYC9hcGkvcHJvZmlsZS9lZGl0YFxuXHRcdFx0XHR9XG5cdFx0XHRcdEh0dHBGYWN0b3J5LmRlbGV0ZShjdXJyZW50VXNlcikudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdFx0YWxlcnQoXCJZb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBkZWxldGVkXCIpO1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcblx0XHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2xvZ2luJ10pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVFbWFpbCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwidXBkYXRpbmcgZW1haWwgYWRyZXNzXCIpXG5cdFx0XHRjb25zb2xlLmxvZyhcIkVNQUlMXCIsICRjdHJsLmVtYWlsKVxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0dXJsOiAnL2FwaS9wcm9maWxlL3VwZGF0ZUVtYWlsJyxcblx0XHRcdFx0ZGF0YTogJGN0cmwudXNlclxuXHRcdFx0fVxuXG5cdFx0XHRIdHRwRmFjdG9yeS5wb3N0KHJlcXVlc3QpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMpXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVCaW8oKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcInVwZGF0aW5nIGJpb1wiKVxuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbJyRzdGF0ZScsICdIdHRwRmFjdG9yeScsICckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oJHN0YXRlLCBIdHRwRmFjdG9yeSwgJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcblxuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBSZWdpc3RlckN0cmwgY3RybFwiKTtcblxuXHRcdCRjdHJsLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5jcmVkZW50aWFscyA9IHtcblx0XHRcdFx0ZW1haWwgOiBcIlwiLFxuXHRcdFx0XHRwYXNzd29yZDogXCJcIlxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uU3VibWl0KCkge1xuXHRcdFx0QXV0aGVudGljYXRpb25TZXJ2aWNlXG5cdFx0XHQucmVnaXN0ZXIoJGN0cmwuY3JlZGVudGlhbHMpXG5cdFx0XHQuZXJyb3IoKGVycikgPT4ge1xuXHRcdFx0XHRcdGFsZXJ0KGVycik7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2xvZ2luJ10pXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG4gIC5kaXJlY3RpdmUoJ2NoZWNrVXNlcicsIFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAndXNlclNydicsXG4gICAgZnVuY3Rpb24gKCRyb290LCAkbG9jLCB1c2VyU3J2KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgICAgJHJvb3QuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGUsIGN1cnIsIHByZXYpe1xuICAgICAgICAgICAgaWYgKCFwcmV2LmFjY2Vzcy5pc0ZyZWUgJiYgIXVzZXJTcnYuaXNMb2dnZWQpIHtcbiAgICAgICAgICAgICAgLy8gcmVsb2FkIHRoZSBsb2dpbiByb3V0ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICogSU1QT1JUQU5UOlxuICAgICAgICAgICAgKiBJdCdzIG5vdCBkaWZmaWN1bHQgdG8gZm9vbCB0aGUgcHJldmlvdXMgY29udHJvbCxcbiAgICAgICAgICAgICogc28gaXQncyByZWFsbHkgSU1QT1JUQU5UIHRvIHJlcGVhdCBzZXJ2ZXIgc2lkZVxuICAgICAgICAgICAgKiB0aGUgc2FtZSBjb250cm9sIGJlZm9yZSBzZW5kaW5nIGJhY2sgcmVzZXJ2ZWQgZGF0YS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLnNlcnZpY2UoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIHNlcnZpY2UpO1xuXG4gICAgc2VydmljZS4kaW5qZWN0ID0gWydIdHRwRmFjdG9yeScsICckd2luZG93J107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBzZXJ2aWNlKEh0dHBGYWN0b3J5LCAkd2luZG93KSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBzYXZlVG9rZW46IHNhdmVUb2tlbixcbiAgICAgICAgICAgIGdldFRva2VuOiBnZXRUb2tlbixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgaXNMb2dnZWRJbjogaXNMb2dnZWRJbixcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyOiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVUb2tlbih0b2tlbikge1xuICAgICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddID0gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZVsnVXNlci1EYXRhJ107XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICBsZXQgcGF5bG9hZDtcblxuICAgICAgICAgIGlmKHRva2VuKXtcbiAgICAgICAgICAgIHBheWxvYWQgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgcGF5bG9hZCA9ICR3aW5kb3cuYXRvYihwYXlsb2FkKTtcbiAgICAgICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5leHAgPiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBjdXJyZW50VXNlcigpIHtcbiAgICAgICAgICBpZihpc0xvZ2dlZEluKCkpe1xuICAgICAgICAgICAgdmFyIHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgIHBheWxvYWQgPSAkd2luZG93LmF0b2IocGF5bG9hZCk7XG4gICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGVtYWlsIDogcGF5bG9hZC5lbWFpbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3Rlcih1c2VyKSB7XG4gICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VycycsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBIdHRwRmFjdG9yeS5wb3N0KHVzZXJJbmZvKS5zdWNjZXNzKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNhdmVUb2tlbihyZXMudG9rZW4pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW4odXNlcikge1xuICAgICAgICAgIGxldCB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gSHR0cEZhY3RvcnkucG9zdCh1c2VySW5mbykuc3VjY2VzcygocmVzKSA9PiB7XG4gICAgICAgICAgICBzYXZlVG9rZW4ocmVzLnRva2VuKTtcbiAgICAgICAgfSk7XG59O1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnSHR0cEZhY3RvcnknLCBmYWN0b3J5KTtcblxuICAgIGZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnQ29uZmlnJ107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KCRodHRwLCBDb25maWcpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIHB1dDogcHV0LFxuICAgICAgICAgICAgcG9zdDogcG9zdCxcbiAgICAgICAgICAgIGRlbGV0ZTogX2RlbGV0ZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogb3B0aW9ucy5jYWNoZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jYWNoZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG9wdGlvbnMua2luZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1dChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGVsZXRlKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5zZXJ2aWNlKCdDb25maWcnLCBTZXJ2aWNlKTtcblxuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gU2VydmljZSgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICAnQVBJX0JBU0VfVVJMJzonaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
