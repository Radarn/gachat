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
$templateCache.put('chat.html','<h3>\n  <span>Chat with other gamers!</span>\n</h3>\n<div class="row">\n  <div class="col s8">\n    <strong>Message</strong>\n  </div>\n  <div class="col s1 offset-s3">\n    <strong>Date</strong>\n  </div>\n</div>\n<div class="row">\n  <div class="chat-box col s12">\n    <div class="row message-border" ng-repeat="message in $ctrl.messages">\n      <div class="col s8">\n        <strong><em>{{message.user}}</em> :</strong>\n        {{message.message}}\n      </div>\n      <div class="col s2 offset-s2 right-align">\n        {{$ctrl.stripDate(message.date)}}\n      </div>\n      <br>\n    </div>\n  </div>\n</div>\n<div class="row">\n  <div class="input-field col s12 ">\n    <textarea ng-model="$ctrl.chatMessage.newMessage" id="icon_prefix2" class="materialize-textarea"></textarea>\n    <label for="icon_prefix2">Message text</label>\n  </div>\n</div>\n<button ng-click="$ctrl.sendMessage()"class="btn waves-effect waves-light" type="submit" name="action">Send message\n    <i class="material-icons right">send</i>\n</button>\n');
$templateCache.put('home.html','<h1>Logged in as: <a ui-sref="profile">{{$ctrl.userName}}</a></h1>\n<div class="row home-menu">\n\t<div class="col s3">\n\t\t<div class="card hoverable">\n      <div class="card-image">\n      \t<a ng-href="#/chat/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      </div>\n      <div class="card-content">\n        <p>Counter-Strike: Global Offensive</p>\n      </div>\n\t\t</div>\n\t</div>\n    <div class="col s3">\n\t\t\t<div class="card hoverable">\n        <div class="card-image">\n        \t<a ng-href="#/chat/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n        </div>\n        <div class="card-content">\n          <p>Dota 2</p>\n        </div>\n\t\t\t</div>\n    </div>\n    <div class="col s3">\n\t\t\t<div class="card hoverable">\n        <div class="card-image">\n        \t<a ng-href="#/chat/leagueoflegends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n        </div>\n        <div class="card-content">\n          <p>League of Legends</p>\n        </div>\n\t\t\t</div>\n    </div>\n     <div class="col s3">\n\t\t\t <div class="card hoverable">\n         <div class="card-image">\n         \t<a ng-href="#/chat/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n         </div>\n         <div class="card-content">\n           <p>Overwatch</p>\n         </div>\n \t\t\t</div>\n\t\t </div>\n</div>\n');
$templateCache.put('login.html','<div class="row login">\n      <form class="col s6 offset-s4" ng-submit="$ctrl.onSubmit()">\n        <h4 class="user-login">Log in</h4>\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.credentials.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.credentials.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <div class="row">\n              <button class="btn waves-effect waves-light" type="submit" name="action">Log in\n                  <i class="material-icons right">send</i>\n              </button>\n            </form>\n            <a class="btn waves-effect waves-light" name="action" href="#/signup">Create new user\n                  <i class="material-icons right">send</i>\n            </a>\n          </div>\n</div>\n');
$templateCache.put('navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n              <li><a href="#/about">About</a></li>\n              <li><a href="#"> {{$ctrl.userName}}</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('profile.edit.html','<div class="edit-profile">\n\n  <div class="row edit-profile-field">\n    <div class="file-field input-field col s12 edit-profile-field" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n      accept="image/*">\n        <div class="btn">\n          <span>File</span>\n          <input type="file">\n        </div>\n        <div class="file-path-wrapper">\n          <input class="file-path validate" type="text">\n        </div>\n    </div>\n    <p>Recommended values for height and width are Minimum 200px and Maximum 280px. If your profile picture is not in line with the recommended values\n      your profile picture will be transformed into poor quality.\n    into poor quality</p>\n  </div>\n  <button ng-click="$ctrl.upload(e, $ctrl.user.file)" class="btn waves-effect waves-light" type="submit" name="action">Upload Photo</button>\n\n  <div class="row edit-profile-field">\n    <div class="input-field col s12">\n      <input id="textarea-email" type="text" class="validate" ng-model="$ctrl.user.newEmail">\n      <label for="textarea-email">Email</label>\n      <button ng-click="$ctrl.updateEmail()" class="btn waves-effect waves-light" type="submit" name="action">Update Email Adress</button>\n      </div>\n    </div>\n    </div>\n  </div>\n\n  <div class="row edit-profile-field">\n    <div class="input-field col s12">\n      <textarea id="textarea-bio" class="materialize-textarea" length="120" ng-model="$ctrl.user.bio"></textarea>\n      <label for="textarea-bio">Your bio</label>\n      <button ng-click="$ctrl.updateBio()" class="btn waves-effect waves-light" type="submit" name="action">Update Bio</button>\n    </div>\n  </div>\n  </div>\n</div>\n');
$templateCache.put('profile.html','<div class="profile">\n  <div ng-if="$ctrl.imageUrl.length > 0">\n    <div class="row profile-picture-container">\n        <img class="responsive-img profile-picture" ng-src="{{$ctrl.imageUrl}}" rel="image" />\n  </div>\n  </div>\n  <div class="row">\n    <div class="col s3 offset-s3">\n      <a class="btn waves-effect waves-light btn-large" type="submit" name="action"\n        ui-sref="edit">Edit Profile</a>\n      </div>\n      <div class="col s3">\n        <button class="btn waves-effect waves-light btn-large red darken-1" type="submit" name="action"\n        ng-click="$ctrl.deleteProfile()">Delete Profile\n              <i class="material-icons right">send</i>\n        </button>\n      </div>\n  </div>\n</div>\n');
$templateCache.put('signup.html','<div class="row signup">\n      <form class="col s6 offset-s4" ng-submit="$ctrl.onSubmit()">\n            <h4 class="create-new-user">Create new user</h4>\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.credentials.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.credentials.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <button class="btn waves-effect waves-light" type="submit" name="action">Register\n                  <i class="material-icons right">send</i>\n            </button>\n      </form>\n</div>\n');
$templateCache.put('partials/navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n          <div>\n            <li><a ui-sref="profile">Profile</a></li>\n            <li><a href="#/about">About</a></li>\n            <li><a ng-click="$ctrl.logout()">Logout</a></li>\n          </div>\n        </ul>\n        </div>\n    </div>\n</nav>\n');}]);
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

		$ctrl.upload = upload;
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
				$ctrl.imageUrl = '';
				getImage()
			}
		}

		function upload(e, file) {
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
					console.log("Success");
				}).error((error) => {
					console.log("Error")
					console.log(error);
				})
			}
		}

		function getImage() {
			console.log($ctrl.email)
			const request = {
				url: `/api/profile/getImage/${$ctrl.email}`
			}

			HttpFactory.get(request).then((res) => {
				$ctrl.imageUrl = res.data.image;
				$ctrl.imageUrl = `../../..${$ctrl.imageUrl}`
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
			const request = {
				url: '/api/profile/updateBio',
				data: $ctrl.user
			}

			HttpFactory.post(request).then((res) => {
				console.log(res)
			});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2NoYXQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbG9naW4uY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL25hdmJhci5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcHJvZmlsZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXIuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvY2hlY2stdXNlci5kaXJlY3RpdmUuanMiLCJzZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic2VydmljZXMvaHR0cC5mYWN0b3J5LmpzIiwic2VydmljZXMvc2VydmVyQ29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFFBQVEsT0FBTyxVQUFVLENBQUMsYUFBYSxnQkFBZ0I7QUFDdkQ7QUNIQTs7QUFFQSxRQUFRLE9BQU87O0NBRWQsZ0RBQU8sU0FBUyxnQkFBZ0Isb0JBQW9COztJQUVqRCxtQkFBbUIsVUFBVTs7SUFFN0I7Ozs7U0FJSyxNQUFNLFVBQVU7WUFDYixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxTQUFTO1lBQ1osS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYztZQUNkLFFBQVE7Y0FDTixRQUFROzs7O1NBSWIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sUUFBUTtZQUNYLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFdBQVc7VUFDaEIsYUFBYTtVQUNiLFlBQVk7VUFDWixjQUFjOzs7U0FHZixNQUFNLFFBQVE7VUFDYixhQUFhO1VBQ2IsWUFBWTtVQUNaLGNB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T0FBTyxlQUFlLFFBQVE7Z0JBQ25DLE9BQU8sUUFBUSxVQUFVLFlBQVksUUFBUSxRQUFRO2dCQUNyRCxNQUFNLFFBQVE7Z0JBQ2QsUUFBUSxRQUFROzs7O1FBSXhCLFNBQVMsSUFBSSxRQUFRO1lBQ2pCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLE1BQU0sUUFBUTtnQkFDZCxTQUFTLFFBQVE7Z0JBQ2pCLEtBQUssT0FBTyxlQUFlLFFBQVE7Ozs7UUFJM0MsU0FBUyxLQUFLLFFBQVE7WUFDbEIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLEtBQUssT0FBTyxlQUFlLFFBQVE7Ozs7UUFJM0MsU0FBUyxRQUFRLFFBQVE7WUFDckIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLEtBQUssT0FBTyxlQUFlLFFBQVE7Ozs7S0FJOUM7QUN4REwsQ0FBQyxXQUFXO0lBQ1I7O0lBRUE7U0FDSyxPQUFPO1NBQ1AsUUFBUSxVQUFVOzs7O0lBSXZCLFNBQVMsVUFBVTtRQUNmLElBQUksVUFBVTtZQUNWLGVBQWU7OztRQUduQixPQUFPOztLQUVWIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcsIFsndWkucm91dGVyJywgJ25nRmlsZVVwbG9hZCcsICduZ01lc3NhZ2VzJ10pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG5cbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLnN0YXRlKCdzaWduVXAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2xvZ0luJywge1xuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcbiAgICAgICAgICAgIGFjY2Vzczoge1xuICAgICAgICAgICAgICBpc0ZyZWU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2NoYXQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvY2hhdC86Z2FtZU5hbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGF0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NoYXRDdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9maWxlLmVkaXQuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhYm91dCBjb250cm9sbGVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7JHRlbXBsYXRlQ2FjaGUucHV0KCdhYm91dC5odG1sJywnPGgxPkFib3V0PC9oMT4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnY2hhdC5odG1sJywnPGgzPlxcbiAgPHNwYW4+Q2hhdCB3aXRoIG90aGVyIGdhbWVycyE8L3NwYW4+XFxuPC9oMz5cXG48ZGl2IGNsYXNzPVwicm93XCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgIDxzdHJvbmc+TWVzc2FnZTwvc3Ryb25nPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHMxIG9mZnNldC1zM1wiPlxcbiAgICA8c3Ryb25nPkRhdGU8L3N0cm9uZz5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjaGF0LWJveCBjb2wgczEyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3cgbWVzc2FnZS1ib3JkZXJcIiBuZy1yZXBlYXQ9XCJtZXNzYWdlIGluICRjdHJsLm1lc3NhZ2VzXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzOFwiPlxcbiAgICAgICAgPHN0cm9uZz48ZW0+e3ttZXNzYWdlLnVzZXJ9fTwvZW0+IDo8L3N0cm9uZz5cXG4gICAgICAgIHt7bWVzc2FnZS5tZXNzYWdlfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMyIG9mZnNldC1zMiByaWdodC1hbGlnblwiPlxcbiAgICAgICAge3skY3RybC5zdHJpcERhdGUobWVzc2FnZS5kYXRlKX19XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGJyPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyIFwiPlxcbiAgICA8dGV4dGFyZWEgbmctbW9kZWw9XCIkY3RybC5jaGF0TWVzc2FnZS5uZXdNZXNzYWdlXCIgaWQ9XCJpY29uX3ByZWZpeDJcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCI+PC90ZXh0YXJlYT5cXG4gICAgPGxhYmVsIGZvcj1cImljb25fcHJlZml4MlwiPk1lc3NhZ2UgdGV4dDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwuc2VuZE1lc3NhZ2UoKVwiY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5TZW5kIG1lc3NhZ2VcXG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuPC9idXR0b24+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2hvbWUuaHRtbCcsJzxoMT5Mb2dnZWQgaW4gYXM6IDxhIHVpLXNyZWY9XCJwcm9maWxlXCI+e3skY3RybC51c2VyTmFtZX19PC9hPjwvaDE+XFxuPGRpdiBjbGFzcz1cInJvdyBob21lLW1lbnVcIj5cXG5cXHQ8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuXFx0XFx0PGRpdiBjbGFzcz1cImNhcmQgaG92ZXJhYmxlXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cXG4gICAgICBcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L2NvdW50ZXItc3RyaWtlOmdsb2JhbC1vZmZlbnNpdmVcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2NzZ28uanBnXCI+PC9hPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cXG4gICAgICAgIDxwPkNvdW50ZXItU3RyaWtlOiBHbG9iYWwgT2ZmZW5zaXZlPC9wPlxcbiAgICAgIDwvZGl2PlxcblxcdFxcdDwvZGl2PlxcblxcdDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cImNhcmQgaG92ZXJhYmxlXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pbWFnZVwiPlxcbiAgICAgICAgXFx0PGEgbmctaHJlZj1cIiMvY2hhdC9kb3RhMlwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvZG90YTIucG5nXCI+PC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XFxuICAgICAgICAgIDxwPkRvdGEgMjwvcD5cXG4gICAgICAgIDwvZGl2PlxcblxcdFxcdFxcdDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XCJjYXJkIGhvdmVyYWJsZVwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cXG4gICAgICAgIFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvbGVhZ3Vlb2ZsZWdlbmRzXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9sb2wuanBlZ1wiPjwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxcbiAgICAgICAgICA8cD5MZWFndWUgb2YgTGVnZW5kczwvcD5cXG4gICAgICAgIDwvZGl2PlxcblxcdFxcdFxcdDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG5cXHRcXHRcXHQgPGRpdiBjbGFzcz1cImNhcmQgaG92ZXJhYmxlXCI+XFxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cXG4gICAgICAgICBcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L292ZXJ3YXRjaFwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvb3ZlcndhdGNoLmpwZ1wiPjwvYT5cXG4gICAgICAgICA8L2Rpdj5cXG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XFxuICAgICAgICAgICA8cD5PdmVyd2F0Y2g8L3A+XFxuICAgICAgICAgPC9kaXY+XFxuIFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdCA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbG9naW4uaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3cgbG9naW5cIj5cXG4gICAgICA8Zm9ybSBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczRcIiBuZy1zdWJtaXQ9XCIkY3RybC5vblN1Ym1pdCgpXCI+XFxuICAgICAgICA8aDQgY2xhc3M9XCJ1c2VyLWxvZ2luXCI+TG9nIGluPC9oND5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwuY3JlZGVudGlhbHMuZW1haWxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwuY3JlZGVudGlhbHMucGFzc3dvcmRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5Mb2cgaW5cXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDwvZm9ybT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiBuYW1lPVwiYWN0aW9uXCIgaHJlZj1cIiMvc2lnbnVwXCI+Q3JlYXRlIG5ldyB1c2VyXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmF2YmFyLmh0bWwnLCc8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnJhbmQtbG9nb1wiPkdhY2hhdDwvYT5cXG5cXG4gICAgICAgIDx1bCBpZD1cIm5hdi1tb2JpbGVcIiBjbGFzcz1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+IHt7JGN0cmwudXNlck5hbWV9fTwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncHJvZmlsZS5lZGl0Lmh0bWwnLCc8ZGl2IGNsYXNzPVwiZWRpdC1wcm9maWxlXCI+XFxuXFxuICA8ZGl2IGNsYXNzPVwicm93IGVkaXQtcHJvZmlsZS1maWVsZFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZmlsZS1maWVsZCBpbnB1dC1maWVsZCBjb2wgczEyIGVkaXQtcHJvZmlsZS1maWVsZFwiIG5nZi1zZWxlY3QgbmctbW9kZWw9XCIkY3RybC51c2VyLmZpbGVcIiBuYW1lPVwiZmlsZVwiIG5nZi1wYXR0ZXJuPVwiXFwnaW1hZ2UvKlxcJ1wiXFxuICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0blwiPlxcbiAgICAgICAgICA8c3Bhbj5GaWxlPC9zcGFuPlxcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbGUtcGF0aC13cmFwcGVyXCI+XFxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZpbGUtcGF0aCB2YWxpZGF0ZVwiIHR5cGU9XCJ0ZXh0XCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxwPlJlY29tbWVuZGVkIHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCBhcmUgTWluaW11bSAyMDBweCBhbmQgTWF4aW11bSAyODBweC4gSWYgeW91ciBwcm9maWxlIHBpY3R1cmUgaXMgbm90IGluIGxpbmUgd2l0aCB0aGUgcmVjb21tZW5kZWQgdmFsdWVzXFxuICAgICAgeW91ciBwcm9maWxlIHBpY3R1cmUgd2lsbCBiZSB0cmFuc2Zvcm1lZCBpbnRvIHBvb3IgcXVhbGl0eS5cXG4gICAgaW50byBwb29yIHF1YWxpdHk8L3A+XFxuICA8L2Rpdj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCIkY3RybC51cGxvYWQoZSwgJGN0cmwudXNlci5maWxlKVwiIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+VXBsb2FkIFBob3RvPC9idXR0b24+XFxuXFxuICA8ZGl2IGNsYXNzPVwicm93IGVkaXQtcHJvZmlsZS1maWVsZFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgIDxpbnB1dCBpZD1cInRleHRhcmVhLWVtYWlsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC51c2VyLm5ld0VtYWlsXCI+XFxuICAgICAgPGxhYmVsIGZvcj1cInRleHRhcmVhLWVtYWlsXCI+RW1haWw8L2xhYmVsPlxcbiAgICAgIDxidXR0b24gbmctY2xpY2s9XCIkY3RybC51cGRhdGVFbWFpbCgpXCIgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGRhdGUgRW1haWwgQWRyZXNzPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cInJvdyBlZGl0LXByb2ZpbGUtZmllbGRcIj5cXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cXG4gICAgICA8dGV4dGFyZWEgaWQ9XCJ0ZXh0YXJlYS1iaW9cIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCIgbGVuZ3RoPVwiMTIwXCIgbmctbW9kZWw9XCIkY3RybC51c2VyLmJpb1wiPjwvdGV4dGFyZWE+XFxuICAgICAgPGxhYmVsIGZvcj1cInRleHRhcmVhLWJpb1wiPllvdXIgYmlvPC9sYWJlbD5cXG4gICAgICA8YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwudXBkYXRlQmlvKClcIiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlVwZGF0ZSBCaW88L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwcm9maWxlLmh0bWwnLCc8ZGl2IGNsYXNzPVwicHJvZmlsZVwiPlxcbiAgPGRpdiBuZy1pZj1cIiRjdHJsLmltYWdlVXJsLmxlbmd0aCA+IDBcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvdyBwcm9maWxlLXBpY3R1cmUtY29udGFpbmVyXCI+XFxuICAgICAgICA8aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWcgcHJvZmlsZS1waWN0dXJlXCIgbmctc3JjPVwie3skY3RybC5pbWFnZVVybH19XCIgcmVsPVwiaW1hZ2VcIiAvPlxcbiAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzMyBvZmZzZXQtczNcIj5cXG4gICAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuLWxhcmdlXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIlxcbiAgICAgICAgdWktc3JlZj1cImVkaXRcIj5FZGl0IFByb2ZpbGU8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuLWxhcmdlIHJlZCBkYXJrZW4tMVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCJcXG4gICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlUHJvZmlsZSgpXCI+RGVsZXRlIFByb2ZpbGVcXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2lnbnVwLmh0bWwnLCc8ZGl2IGNsYXNzPVwicm93IHNpZ251cFwiPlxcbiAgICAgIDxmb3JtIGNsYXNzPVwiY29sIHM2IG9mZnNldC1zNFwiIG5nLXN1Ym1pdD1cIiRjdHJsLm9uU3VibWl0KClcIj5cXG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJjcmVhdGUtbmV3LXVzZXJcIj5DcmVhdGUgbmV3IHVzZXI8L2g0PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiRW1haWxcIiBpZD1cImVtYWlsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5lbWFpbFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsIEFkcmVzczwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5wYXNzd29yZFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlJlZ2lzdGVyXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9mb3JtPlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwYXJ0aWFscy9uYXZiYXIuaHRtbCcsJzxuYXY+XFxuICAgIDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJicmFuZC1sb2dvXCI+R2FjaGF0PC9hPlxcbiAgICAgICAgPHVsIGlkPVwibmF2LW1vYmlsZVwiIGNsYXNzPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8bGk+PGEgdWktc3JlZj1cInByb2ZpbGVcIj5Qcm9maWxlPC9hPjwvbGk+XFxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjL2Fib3V0XCI+QWJvdXQ8L2E+PC9saT5cXG4gICAgICAgICAgICA8bGk+PGEgbmctY2xpY2s9XCIkY3RybC5sb2dvdXQoKVwiPkxvZ291dDwvYT48L2xpPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9uYXY+XFxuJyk7fV0pOyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignQ2hhdEN0cmwnLCBbJ0h0dHBGYWN0b3J5JywgJyRzdGF0ZScsICckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oSHR0cEZhY3RvcnksICRzdGF0ZSwgJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcbiAgICBjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgQ2hhdEN0cmxcIik7XG5cblx0XHQkY3RybC5zZW5kTWVzc2FnZSA9IHNlbmRNZXNzYWdlO1xuXHRcdCRjdHJsLmdldEFsbE1lc3NhZ2VzID0gZ2V0QWxsTWVzc2FnZXM7XG5cdFx0JGN0cmwuc3RyaXBEYXRlID0gc3RyaXBEYXRlO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0JGN0cmwubWVzc2FnZXMgPSBcIlwiO1xuXHRcdFx0JGN0cmwuY3VycmVudFVybCA9ICRzdGF0ZS5wYXJhbXMuZ2FtZU5hbWU7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlck5hbWUgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKS5lbWFpbDtcblx0XHRcdFx0Z2V0QWxsTWVzc2FnZXMoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xuXHRcdFx0JGN0cmwuY2hhdE1lc3NhZ2UudHlwZSA9ICRjdHJsLmN1cnJlbnRVcmw7XG5cdFx0XHQkY3RybC5jaGF0TWVzc2FnZS51c2VyID0gJGN0cmwudXNlck5hbWU7XG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC5jaGF0TWVzc2FnZSk7XG5cdFx0XHRsZXQgbmV3TWVzc2FnZSA9IHtcblx0XHRcdFx0ZGF0YTogJGN0cmwuY2hhdE1lc3NhZ2UsXG5cdFx0XHRcdHVybDogYC9hcGkvbWVzc2FnZXMvJHskY3RybC5jdXJyZW50VXJsfWBcblx0XHRcdH1cblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QobmV3TWVzc2FnZSkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdCRjdHJsLmdldEFsbE1lc3NhZ2VzKCk7XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldEFsbE1lc3NhZ2VzKCkge1xuXHRcdFx0bGV0IGdldE1lc3NhZ2VzID0ge1xuXHRcdFx0XHR1cmw6IGAvYXBpL21lc3NhZ2VzLyR7JGN0cmwuY3VycmVudFVybH1gXG5cdFx0XHR9XG5cdFx0XHRIdHRwRmFjdG9yeS5nZXQoZ2V0TWVzc2FnZXMpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHQkY3RybC5tZXNzYWdlcyA9IHJlcy5kYXRhO1xuXHRcdFx0XHRjb25zb2xlLmxvZygkY3RybC5tZXNzYWdlcyk7XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHN0cmlwRGF0ZShkYXRlKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZS5zdWJzdHJpbmcoMCwxMCk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBbJyRzdGF0ZScsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnJGxvY2F0aW9uJyxcblx0XHRmdW5jdGlvbigkc3RhdGUsIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgJGxvY2F0aW9uKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIERhc2hib2FyZEN0cmxcIik7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlck5hbWUgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKS5lbWFpbDtcblx0XHRcdH1cblx0XHR9XG5cdH1dKTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIFsnJGxvY2F0aW9uJyxcblx0IFx0J0F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uKCRsb2NhdGlvbiwgQXV0aGVudGljYXRpb25TZXJ2aWNlKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBMb2dpbkN0cmwgY3RybFwiKTtcblxuXHRcdCRjdHJsLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC51c2VyID0gQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCk7XG5cdFx0XHRpZiAoJGN0cmwudXNlcikge1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnaG9tZScpO1xuXHRcdFx0fVxuXHRcdFx0JGN0cmwuY3JlZGVudGlhbHMgPSB7XG5cdFx0XHRcdGVtYWlsIDogXCJcIixcblx0XHRcdFx0cGFzc3dvcmQ6IFwiXCJcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblN1Ym1pdCgpIHtcbiAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZVxuICAgICAgLmxvZ2luKCRjdHJsLmNyZWRlbnRpYWxzKVxuICAgICAgLmVycm9yKChlcnIpID0+IHtcbiAgICAgICAgYWxlcnQoZXJyKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTE9HR0VEIElOXCIpXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCdob21lJyk7XG4gICAgICB9KTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignTmF2Q3RybCcsIFsnJHNjb3BlJywgJyRzdGF0ZScsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgJGxvY2F0aW9uKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIE5hdkN0cmxcIik7XG5cblx0XHQkY3RybC5sb2dvdXQgPSBsb2dvdXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIm5hdlwiLCBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKSlcblx0XHRcdC8qaWYgKCFBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKSkge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwubG9nZ2VkSW4gPSB0cnVlO1xuXHRcdFx0fSovXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbG9nb3V0KCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJMT0dPVVRcIik7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG5cdFx0XHQkbG9jYXRpb24udXJsKFsnLyddKTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignUHJvZmlsZUN0cmwnLCBbJ1VwbG9hZCcsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ0h0dHBGYWN0b3J5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oVXBsb2FkLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsICRodHRwLCAkbG9jYXRpb24sIEh0dHBGYWN0b3J5KSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0JGN0cmwudXBsb2FkID0gdXBsb2FkO1xuXHRcdCRjdHJsLmRlbGV0ZVByb2ZpbGUgPSBkZWxldGVQcm9maWxlO1xuXHRcdCRjdHJsLnVwZGF0ZUVtYWlsID0gdXBkYXRlRW1haWw7XG5cdFx0JGN0cmwudXBkYXRlQmlvID0gdXBkYXRlQmlvO1xuXHRcdCRjdHJsLmdldEltYWdlID0gZ2V0SW1hZ2U7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgUHJvZmlsZUN0cmxcIik7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlciA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpO1xuXHRcdFx0XHQkY3RybC5lbWFpbCA9ICRjdHJsLnVzZXIuZW1haWw7XG5cdFx0XHRcdCRjdHJsLmltYWdlVXJsID0gJyc7XG5cdFx0XHRcdGdldEltYWdlKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGxvYWQoZSwgZmlsZSkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJmaWxlXCIsIGZpbGUpXG5cdFx0XHRpZihmaWxlKSB7XG5cdFx0XHRcdFVwbG9hZC51cGxvYWQoe1xuXHRcdFx0XHRcdHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJvZmlsZS91cGxvYWRQaG90b2AsXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdFx0ZGF0YToge2VtYWlsOiAkY3RybC5lbWFpbH0sXG5cdFx0XHRcdFx0ZmlsZTogZmlsZVxuXHRcdFx0XHR9KS5wcm9ncmVzcygoZXZ0KSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJmaXJpbmdcIik7XG5cdFx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIik7XG5cdFx0XHRcdH0pLmVycm9yKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3JcIilcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0SW1hZ2UoKSB7XG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC5lbWFpbClcblx0XHRcdGNvbnN0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdHVybDogYC9hcGkvcHJvZmlsZS9nZXRJbWFnZS8keyRjdHJsLmVtYWlsfWBcblx0XHRcdH1cblxuXHRcdFx0SHR0cEZhY3RvcnkuZ2V0KHJlcXVlc3QpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHQkY3RybC5pbWFnZVVybCA9IHJlcy5kYXRhLmltYWdlO1xuXHRcdFx0XHQkY3RybC5pbWFnZVVybCA9IGAuLi8uLi8uLiR7JGN0cmwuaW1hZ2VVcmx9YFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlUHJvZmlsZSgpIHtcblx0XHRcdC8vY29uc3QgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB0aGF0IHlvdSB3YW50IHRvIGRlbGV0ZSB5b3VyIGFjY291bnQ/XCIpXG5cdFx0XHRjb25zb2xlLmxvZyhcImRlbGV0ZWluZ1wiKVxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0dXJsOiBgL2FwaS9wcm9maWxlL2RlbGV0ZS8keyRjdHJsLmVtYWlsfWBcblx0XHRcdH1cblx0XHRcdEh0dHBGYWN0b3J5LmRlbGV0ZShyZXF1ZXN0KS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0YWxlcnQoXCJZb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBkZWxldGVkXCIpO1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG5cdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvbG9naW4nXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVFbWFpbCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwidXBkYXRpbmcgZW1haWwgYWRyZXNzXCIpXG5cdFx0XHRjb25zb2xlLmxvZyhcIkVNQUlMXCIsICRjdHJsLmVtYWlsKVxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0dXJsOiAnL2FwaS9wcm9maWxlL3VwZGF0ZUVtYWlsJyxcblx0XHRcdFx0ZGF0YTogJGN0cmwudXNlclxuXHRcdFx0fVxuXG5cdFx0XHRIdHRwRmFjdG9yeS5wb3N0KHJlcXVlc3QpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMpXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVCaW8oKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcInVwZGF0aW5nIGJpb1wiKVxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0dXJsOiAnL2FwaS9wcm9maWxlL3VwZGF0ZUJpbycsXG5cdFx0XHRcdGRhdGE6ICRjdHJsLnVzZXJcblx0XHRcdH1cblxuXHRcdFx0SHR0cEZhY3RvcnkucG9zdChyZXF1ZXN0KS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsIFsnJHN0YXRlJywgJ0h0dHBGYWN0b3J5JywgJyRsb2NhdGlvbicsXG5cdCBcdCdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigkc3RhdGUsIEh0dHBGYWN0b3J5LCAkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xuXG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIFJlZ2lzdGVyQ3RybCBjdHJsXCIpO1xuXG5cdFx0JGN0cmwub25TdWJtaXQgPSBvblN1Ym1pdDtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLnVzZXIgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKTtcblx0XHRcdGlmICgkY3RybC51c2VyKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdob21lJyk7XG5cdFx0XHR9XG5cdFx0XHQkY3RybC5jcmVkZW50aWFscyA9IHtcblx0XHRcdFx0ZW1haWwgOiBcIlwiLFxuXHRcdFx0XHRwYXNzd29yZDogXCJcIlxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uU3VibWl0KCkge1xuXHRcdFx0QXV0aGVudGljYXRpb25TZXJ2aWNlXG5cdFx0XHQucmVnaXN0ZXIoJGN0cmwuY3JlZGVudGlhbHMpXG5cdFx0XHQuZXJyb3IoKGVycikgPT4ge1xuXHRcdFx0XHRcdGFsZXJ0KGVycik7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2xvZ2luJ10pXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG4gIC5kaXJlY3RpdmUoJ2NoZWNrVXNlcicsIFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAndXNlclNydicsXG4gICAgZnVuY3Rpb24gKCRyb290LCAkbG9jLCB1c2VyU3J2KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgICAgJHJvb3QuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGUsIGN1cnIsIHByZXYpe1xuICAgICAgICAgICAgaWYgKCFwcmV2LmFjY2Vzcy5pc0ZyZWUgJiYgIXVzZXJTcnYuaXNMb2dnZWQpIHtcbiAgICAgICAgICAgICAgLy8gcmVsb2FkIHRoZSBsb2dpbiByb3V0ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICogSU1QT1JUQU5UOlxuICAgICAgICAgICAgKiBJdCdzIG5vdCBkaWZmaWN1bHQgdG8gZm9vbCB0aGUgcHJldmlvdXMgY29udHJvbCxcbiAgICAgICAgICAgICogc28gaXQncyByZWFsbHkgSU1QT1JUQU5UIHRvIHJlcGVhdCBzZXJ2ZXIgc2lkZVxuICAgICAgICAgICAgKiB0aGUgc2FtZSBjb250cm9sIGJlZm9yZSBzZW5kaW5nIGJhY2sgcmVzZXJ2ZWQgZGF0YS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLnNlcnZpY2UoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIHNlcnZpY2UpO1xuXG4gICAgc2VydmljZS4kaW5qZWN0ID0gWydIdHRwRmFjdG9yeScsICckd2luZG93J107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBzZXJ2aWNlKEh0dHBGYWN0b3J5LCAkd2luZG93KSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBzYXZlVG9rZW46IHNhdmVUb2tlbixcbiAgICAgICAgICAgIGdldFRva2VuOiBnZXRUb2tlbixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgaXNMb2dnZWRJbjogaXNMb2dnZWRJbixcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyOiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVUb2tlbih0b2tlbikge1xuICAgICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddID0gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZVsnVXNlci1EYXRhJ107XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICBsZXQgcGF5bG9hZDtcblxuICAgICAgICAgIGlmKHRva2VuKXtcbiAgICAgICAgICAgIHBheWxvYWQgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgcGF5bG9hZCA9ICR3aW5kb3cuYXRvYihwYXlsb2FkKTtcbiAgICAgICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5leHAgPiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBjdXJyZW50VXNlcigpIHtcbiAgICAgICAgICBpZihpc0xvZ2dlZEluKCkpe1xuICAgICAgICAgICAgdmFyIHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgIHBheWxvYWQgPSAkd2luZG93LmF0b2IocGF5bG9hZCk7XG4gICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGVtYWlsIDogcGF5bG9hZC5lbWFpbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3Rlcih1c2VyKSB7XG4gICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VycycsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBIdHRwRmFjdG9yeS5wb3N0KHVzZXJJbmZvKS5zdWNjZXNzKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNhdmVUb2tlbihyZXMudG9rZW4pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW4odXNlcikge1xuICAgICAgICAgIGxldCB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gSHR0cEZhY3RvcnkucG9zdCh1c2VySW5mbykuc3VjY2VzcygocmVzKSA9PiB7XG4gICAgICAgICAgICBzYXZlVG9rZW4ocmVzLnRva2VuKTtcbiAgICAgICAgfSk7XG59O1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnSHR0cEZhY3RvcnknLCBmYWN0b3J5KTtcblxuICAgIGZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnQ29uZmlnJ107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KCRodHRwLCBDb25maWcpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIHB1dDogcHV0LFxuICAgICAgICAgICAgcG9zdDogcG9zdCxcbiAgICAgICAgICAgIGRlbGV0ZTogX2RlbGV0ZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogb3B0aW9ucy5jYWNoZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jYWNoZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG9wdGlvbnMua2luZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1dChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGVsZXRlKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5zZXJ2aWNlKCdDb25maWcnLCBTZXJ2aWNlKTtcblxuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gU2VydmljZSgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICAnQVBJX0JBU0VfVVJMJzonaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
