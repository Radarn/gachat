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
$templateCache.put('home.html','<h1>Logged in as: <a ui-sref="profile">{{$ctrl.userName}}</a></h1>\n<div class="row home-menu">\n\t<div class="col s3">\n\t\t<div class="card">\n      <div class="card-image">\n      \t<a ng-href="#/chat/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      </div>\n      <div class="card-content">\n        <p>Counter-Strike: Global Offensive</p>\n      </div>\n\t\t</div>\n\t</div>\n    <div class="col s3">\n\t\t\t<div class="card">\n        <div class="card-image">\n        \t<a ng-href="#/chat/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n        </div>\n        <div class="card-content">\n          <p>Dota 2</p>\n        </div>\n\t\t\t</div>\n    </div>\n    <div class="col s3">\n\t\t\t<div class="card">\n        <div class="card-image">\n        \t<a ng-href="#/chat/leagueoflegends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n        </div>\n        <div class="card-content">\n          <p>League of Legends</p>\n        </div>\n\t\t\t</div>\n    </div>\n     <div class="col s3">\n\t\t\t <div class="card">\n         <div class="card-image">\n         \t<a ng-href="#/chat/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n         </div>\n         <div class="card-content">\n           <p>Overwatch</p>\n         </div>\n \t\t\t</div>\n\t\t </div>\n</div>\n');
$templateCache.put('login.html','<div class="row">\n      <form class="col s6 offset-s4" ng-submit="$ctrl.onSubmit()">\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.credentials.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.credentials.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <div class="row">\n              <button class="btn waves-effect waves-light" type="submit" name="action">Log in\n                  <i class="material-icons right">send</i>\n              </button>\n            </form>\n            <a class="btn waves-effect waves-light" name="action" href="#/signup">Create new user\n                  <i class="material-icons right">send</i>\n            </a>\n          </div>\n</div>\n');
$templateCache.put('navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n              <li><a href="#/about">About</a></li>\n              <li><a href="#"> {{$ctrl.userName}}</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('profile.edit.html','  <div class="row edit-profile">\n    <div class="file-field input-field col s12" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n      accept="image/*">\n        <div class="btn">\n          <span>File</span>\n          <input type="file">\n        </div>\n        <div class="file-path-wrapper">\n          <input class="file-path validate" type="text">\n        </div>\n    </div>\n  </div>\n  <button ng-click="$ctrl.upload(e, $ctrl.user.file)" class="btn waves-effect waves-light" type="submit" name="action">Upload Photo</button>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <input id="textarea-email" type="text" class="validate" ng-model="$ctrl.user.newEmail">\n      <label for="textarea-email">Email</label>\n      <button ng-click="$ctrl.updateEmail()" class="btn waves-effect waves-light" type="submit" name="action">Update Email Adress</button>\n      </div>\n    </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <textarea id="textarea-bio" class="materialize-textarea" length="120" ng-model="$ctrl.user.bio"></textarea>\n      <label for="textarea-bio">Your bio</label>\n      <button ng-click="$ctrl.updateBio()" class="btn waves-effect waves-light" type="submit" name="action">Update Bio</button>\n    </div>\n  </div>\n  </div>\n');
$templateCache.put('profile.html','<div class="row profile">\n  <div class="col s3 offset-s3">\n    <a class="btn waves-effect waves-light btn-large" type="submit" name="action"\n      ui-sref="edit">Edit Profile</a>\n    </div>\n    <div class="col s3">\n      <button class="btn waves-effect waves-light btn-large red darken-1" type="submit" name="action"\n      ng-click="$ctrl.deleteProfile()">Delete Profile\n            <i class="material-icons right">send</i>\n      </button>\n    </div>\n</div>\n');
$templateCache.put('signup.html','<div class="row">\n      <form class="col s6 offset-s4" ng-submit="$ctrl.onSubmit()">\n            <h3>Create new user</h3>\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.credentials.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.credentials.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <button class="btn waves-effect waves-light" type="submit" name="action">Register\n                  <i class="material-icons right">send</i>\n            </button>\n      </form>\n</div>\n');
$templateCache.put('partials/navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n            <li><a ui-sref="profile">Profile</a></li>\n            <li><a href="#/about">About</a></li>\n            <li><a ng-click="$ctrl.logout()">Logout</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');}]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImRpcmVjdGl2ZXMvY2hlY2stdXNlci5kaXJlY3RpdmUuanMiLCJzZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic2VydmljZXMvaHR0cC5mYWN0b3J5LmpzIiwic2VydmljZXMvc2VydmVyQ29uZmlnLmpzIiwiY29udHJvbGxlcnMvY2hhdC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvZGFzaGJvYXJkLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9sb2dpbi5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbmF2YmFyLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9wcm9maWxlLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9yZWdpc3Rlci5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFFBQVEsT0FBTyxVQUFVLENBQUMsYUFBYTtBQUN2QztBQ0hBOztBQUVBLFFBQVEsT0FBTzs7Q0FFZCxnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O0lBRWpELG1CQUFtQixVQUFVOztJQUU3Qjs7OztTQUlLLE1BQU0sVUFBVTtZQUNiLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFNBQVM7WUFDWixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjO1lBQ2QsUUFBUTtjQUNOLFFBQVE7Ozs7U0FJYixNQUFNLFFBQVE7WUFDWCxLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sV0FBVztVQUNoQixhQUFhO1VBQ2IsWUFBWTtVQUNaLGNBQWM7OztTQUdmLE1BQU0sUUFBUTtVQUNiLGFBQWE7VUFDYixZQUFZO1VBQ1osY0FBYzs7OztT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LFFBQVEsSUFBSTtHQUNaLE1BQU0sVUFBVTtJQUNmLEtBQUs7SUFDTCxNQUFNLE1BQU07OztHQUdiLFlBQVksS0FBSyxTQUFTLEtBQUs7Ozs7Ozs7QUFPbEM7QUN2RkE7QUFDQSxDQUFDLFdBQVc7O0NBRVgsUUFBUSxPQUFPOztFQUVkLFdBQVcsZ0JBQWdCLENBQUMsVUFBVSxlQUFlO0dBQ3BELHlCQUF5QixTQUFTLFFBQVEsYUFBYSxXQUFXLHVCQUF1Qjs7RUFFMUYsTUFBTSxRQUFROztFQUVkLFFBQVEsSUFBSTs7RUFFWixNQUFNLFdBQVc7O0VBRWpCOztFQUVBLFNBQVMsV0FBVztHQUNuQixNQUFNLGNBQWM7SUFDbkIsUUFBUTtJQUNSLFVBQVU7Ozs7RUFJWixTQUFTLFdBQVc7R0FDbkI7SUFDQyxTQUFTLE1BQU07SUFDZixNQUFNOzs7SUFHTixLQUFLOzs7Ozs7O0FBT1QiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JywgWyd1aS5yb3V0ZXInLCAnbmdGaWxlVXBsb2FkJ10pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG5cbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLnN0YXRlKCdzaWduVXAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2xvZ0luJywge1xuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcbiAgICAgICAgICAgIGFjY2Vzczoge1xuICAgICAgICAgICAgICBpc0ZyZWU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2NoYXQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvY2hhdC86Z2FtZU5hbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGF0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NoYXRDdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9maWxlLmVkaXQuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhYm91dCBjb250cm9sbGVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7JHRlbXBsYXRlQ2FjaGUucHV0KCdhYm91dC5odG1sJywnPGgxPkFib3V0PC9oMT4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnY2hhdC5odG1sJywnPGgzPlxcbiAgPHNwYW4+Q2hhdCB3aXRoIG90aGVyIGdhbWVycyE8L3NwYW4+XFxuPC9oMz5cXG48ZGl2IGNsYXNzPVwicm93XCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgIDxzdHJvbmc+TWVzc2FnZTwvc3Ryb25nPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHMxIG9mZnNldC1zM1wiPlxcbiAgICA8c3Ryb25nPkRhdGU8L3N0cm9uZz5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjaGF0LWJveCBjb2wgczEyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3cgbWVzc2FnZS1ib3JkZXJcIiBuZy1yZXBlYXQ9XCJtZXNzYWdlIGluICRjdHJsLm1lc3NhZ2VzXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzOFwiPlxcbiAgICAgICAgPHN0cm9uZz48ZW0+e3ttZXNzYWdlLnVzZXJ9fTwvZW0+IDo8L3N0cm9uZz5cXG4gICAgICAgIHt7bWVzc2FnZS5tZXNzYWdlfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMyIG9mZnNldC1zMiByaWdodC1hbGlnblwiPlxcbiAgICAgICAge3skY3RybC5zdHJpcERhdGUobWVzc2FnZS5kYXRlKX19XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGJyPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyIFwiPlxcbiAgICA8dGV4dGFyZWEgbmctbW9kZWw9XCIkY3RybC5jaGF0TWVzc2FnZS5uZXdNZXNzYWdlXCIgaWQ9XCJpY29uX3ByZWZpeDJcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCI+PC90ZXh0YXJlYT5cXG4gICAgPGxhYmVsIGZvcj1cImljb25fcHJlZml4MlwiPk1lc3NhZ2UgdGV4dDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwuc2VuZE1lc3NhZ2UoKVwiY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5TZW5kIG1lc3NhZ2VcXG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuPC9idXR0b24+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2hvbWUuaHRtbCcsJzxoMT5Mb2dnZWQgaW4gYXM6IDxhIHVpLXNyZWY9XCJwcm9maWxlXCI+e3skY3RybC51c2VyTmFtZX19PC9hPjwvaDE+XFxuPGRpdiBjbGFzcz1cInJvdyBob21lLW1lbnVcIj5cXG5cXHQ8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuXFx0XFx0PGRpdiBjbGFzcz1cImNhcmRcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pbWFnZVwiPlxcbiAgICAgIFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvY291bnRlci1zdHJpa2U6Z2xvYmFsLW9mZmVuc2l2ZVwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvY3Nnby5qcGdcIj48L2E+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxcbiAgICAgICAgPHA+Q291bnRlci1TdHJpa2U6IEdsb2JhbCBPZmZlbnNpdmU8L3A+XFxuICAgICAgPC9kaXY+XFxuXFx0XFx0PC9kaXY+XFxuXFx0PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVwiY2FyZFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cXG4gICAgICAgIFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvZG90YTJcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2RvdGEyLnBuZ1wiPjwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxcbiAgICAgICAgICA8cD5Eb3RhIDI8L3A+XFxuICAgICAgICA8L2Rpdj5cXG5cXHRcXHRcXHQ8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVwiY2FyZFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cXG4gICAgICAgIFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvbGVhZ3Vlb2ZsZWdlbmRzXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9sb2wuanBlZ1wiPjwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxcbiAgICAgICAgICA8cD5MZWFndWUgb2YgTGVnZW5kczwvcD5cXG4gICAgICAgIDwvZGl2PlxcblxcdFxcdFxcdDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG5cXHRcXHRcXHQgPGRpdiBjbGFzcz1cImNhcmRcIj5cXG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pbWFnZVwiPlxcbiAgICAgICAgIFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvb3ZlcndhdGNoXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9vdmVyd2F0Y2guanBnXCI+PC9hPlxcbiAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cXG4gICAgICAgICAgIDxwPk92ZXJ3YXRjaDwvcD5cXG4gICAgICAgICA8L2Rpdj5cXG4gXFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0IDwvZGl2PlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdsb2dpbi5odG1sJywnPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxmb3JtIGNsYXNzPVwiY29sIHM2IG9mZnNldC1zNFwiIG5nLXN1Ym1pdD1cIiRjdHJsLm9uU3VibWl0KClcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwuY3JlZGVudGlhbHMuZW1haWxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwuY3JlZGVudGlhbHMucGFzc3dvcmRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5Mb2cgaW5cXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDwvZm9ybT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiBuYW1lPVwiYWN0aW9uXCIgaHJlZj1cIiMvc2lnbnVwXCI+Q3JlYXRlIG5ldyB1c2VyXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmF2YmFyLmh0bWwnLCc8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnJhbmQtbG9nb1wiPkdhY2hhdDwvYT5cXG5cXG4gICAgICAgIDx1bCBpZD1cIm5hdi1tb2JpbGVcIiBjbGFzcz1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+IHt7JGN0cmwudXNlck5hbWV9fTwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncHJvZmlsZS5lZGl0Lmh0bWwnLCcgIDxkaXYgY2xhc3M9XCJyb3cgZWRpdC1wcm9maWxlXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJmaWxlLWZpZWxkIGlucHV0LWZpZWxkIGNvbCBzMTJcIiBuZ2Ytc2VsZWN0IG5nLW1vZGVsPVwiJGN0cmwudXNlci5maWxlXCIgbmFtZT1cImZpbGVcIiBuZ2YtcGF0dGVybj1cIlxcJ2ltYWdlLypcXCdcIlxcbiAgICAgIGFjY2VwdD1cImltYWdlLypcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cXG4gICAgICAgICAgPHNwYW4+RmlsZTwvc3Bhbj5cXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXBhdGgtd3JhcHBlclwiPlxcbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmaWxlLXBhdGggdmFsaWRhdGVcIiB0eXBlPVwidGV4dFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwudXBsb2FkKGUsICRjdHJsLnVzZXIuZmlsZSlcIiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlVwbG9hZCBQaG90bzwvYnV0dG9uPlxcblxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgIDxpbnB1dCBpZD1cInRleHRhcmVhLWVtYWlsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC51c2VyLm5ld0VtYWlsXCI+XFxuICAgICAgPGxhYmVsIGZvcj1cInRleHRhcmVhLWVtYWlsXCI+RW1haWw8L2xhYmVsPlxcbiAgICAgIDxidXR0b24gbmctY2xpY2s9XCIkY3RybC51cGRhdGVFbWFpbCgpXCIgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGRhdGUgRW1haWwgQWRyZXNzPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgIDx0ZXh0YXJlYSBpZD1cInRleHRhcmVhLWJpb1wiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWFcIiBsZW5ndGg9XCIxMjBcIiBuZy1tb2RlbD1cIiRjdHJsLnVzZXIuYmlvXCI+PC90ZXh0YXJlYT5cXG4gICAgICA8bGFiZWwgZm9yPVwidGV4dGFyZWEtYmlvXCI+WW91ciBiaW88L2xhYmVsPlxcbiAgICAgIDxidXR0b24gbmctY2xpY2s9XCIkY3RybC51cGRhdGVCaW8oKVwiIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+VXBkYXRlIEJpbzwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3Byb2ZpbGUuaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3cgcHJvZmlsZVwiPlxcbiAgPGRpdiBjbGFzcz1cImNvbCBzMyBvZmZzZXQtczNcIj5cXG4gICAgPGEgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0bi1sYXJnZVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCJcXG4gICAgICB1aS1zcmVmPVwiZWRpdFwiPkVkaXQgUHJvZmlsZTwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG4tbGFyZ2UgcmVkIGRhcmtlbi0xXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIlxcbiAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlUHJvZmlsZSgpXCI+RGVsZXRlIFByb2ZpbGVcXG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3NpZ251cC5odG1sJywnPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxmb3JtIGNsYXNzPVwiY29sIHM2IG9mZnNldC1zNFwiIG5nLXN1Ym1pdD1cIiRjdHJsLm9uU3VibWl0KClcIj5cXG4gICAgICAgICAgICA8aDM+Q3JlYXRlIG5ldyB1c2VyPC9oMz5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwuY3JlZGVudGlhbHMuZW1haWxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwuY3JlZGVudGlhbHMucGFzc3dvcmRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5SZWdpc3RlclxcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDwvZm9ybT5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncGFydGlhbHMvbmF2YmFyLmh0bWwnLCc8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnJhbmQtbG9nb1wiPkdhY2hhdDwvYT5cXG4gICAgICAgIDx1bCBpZD1cIm5hdi1tb2JpbGVcIiBjbGFzcz1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XFxuICAgICAgICAgICAgPGxpPjxhIHVpLXNyZWY9XCJwcm9maWxlXCI+UHJvZmlsZTwvYT48L2xpPlxcbiAgICAgICAgICAgIDxsaT48YSBocmVmPVwiIy9hYm91dFwiPkFib3V0PC9hPjwvbGk+XFxuICAgICAgICAgICAgPGxpPjxhIG5nLWNsaWNrPVwiJGN0cmwubG9nb3V0KClcIj5Mb2dvdXQ8L2E+PC9saT5cXG4gICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9uYXY+XFxuJyk7fV0pOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG4gIC5kaXJlY3RpdmUoJ2NoZWNrVXNlcicsIFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAndXNlclNydicsXG4gICAgZnVuY3Rpb24gKCRyb290LCAkbG9jLCB1c2VyU3J2KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgICAgJHJvb3QuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGUsIGN1cnIsIHByZXYpe1xuICAgICAgICAgICAgaWYgKCFwcmV2LmFjY2Vzcy5pc0ZyZWUgJiYgIXVzZXJTcnYuaXNMb2dnZWQpIHtcbiAgICAgICAgICAgICAgLy8gcmVsb2FkIHRoZSBsb2dpbiByb3V0ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICogSU1QT1JUQU5UOlxuICAgICAgICAgICAgKiBJdCdzIG5vdCBkaWZmaWN1bHQgdG8gZm9vbCB0aGUgcHJldmlvdXMgY29udHJvbCxcbiAgICAgICAgICAgICogc28gaXQncyByZWFsbHkgSU1QT1JUQU5UIHRvIHJlcGVhdCBzZXJ2ZXIgc2lkZVxuICAgICAgICAgICAgKiB0aGUgc2FtZSBjb250cm9sIGJlZm9yZSBzZW5kaW5nIGJhY2sgcmVzZXJ2ZWQgZGF0YS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLnNlcnZpY2UoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIHNlcnZpY2UpO1xuXG4gICAgc2VydmljZS4kaW5qZWN0ID0gWydIdHRwRmFjdG9yeScsICckd2luZG93J107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBzZXJ2aWNlKEh0dHBGYWN0b3J5LCAkd2luZG93KSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBzYXZlVG9rZW46IHNhdmVUb2tlbixcbiAgICAgICAgICAgIGdldFRva2VuOiBnZXRUb2tlbixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgaXNMb2dnZWRJbjogaXNMb2dnZWRJbixcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyOiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVUb2tlbih0b2tlbikge1xuICAgICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddID0gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZVsnVXNlci1EYXRhJ107XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICBsZXQgcGF5bG9hZDtcblxuICAgICAgICAgIGlmKHRva2VuKXtcbiAgICAgICAgICAgIHBheWxvYWQgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgcGF5bG9hZCA9ICR3aW5kb3cuYXRvYihwYXlsb2FkKTtcbiAgICAgICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5leHAgPiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBjdXJyZW50VXNlcigpIHtcbiAgICAgICAgICBpZihpc0xvZ2dlZEluKCkpe1xuICAgICAgICAgICAgdmFyIHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgIHBheWxvYWQgPSAkd2luZG93LmF0b2IocGF5bG9hZCk7XG4gICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGVtYWlsIDogcGF5bG9hZC5lbWFpbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3Rlcih1c2VyKSB7XG4gICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VycycsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBIdHRwRmFjdG9yeS5wb3N0KHVzZXJJbmZvKS5zdWNjZXNzKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNhdmVUb2tlbihyZXMudG9rZW4pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW4odXNlcikge1xuICAgICAgICAgIGxldCB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gSHR0cEZhY3RvcnkucG9zdCh1c2VySW5mbykuc3VjY2VzcygocmVzKSA9PiB7XG4gICAgICAgICAgICBzYXZlVG9rZW4ocmVzLnRva2VuKTtcbiAgICAgICAgfSk7XG59O1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnSHR0cEZhY3RvcnknLCBmYWN0b3J5KTtcblxuICAgIGZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnQ29uZmlnJ107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KCRodHRwLCBDb25maWcpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIHB1dDogcHV0LFxuICAgICAgICAgICAgcG9zdDogcG9zdCxcbiAgICAgICAgICAgIGRlbGV0ZTogX2RlbGV0ZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogb3B0aW9ucy5jYWNoZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jYWNoZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG9wdGlvbnMua2luZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1dChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGVsZXRlKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5zZXJ2aWNlKCdDb25maWcnLCBTZXJ2aWNlKTtcblxuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gU2VydmljZSgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICAnQVBJX0JBU0VfVVJMJzonaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignQ2hhdEN0cmwnLCBbJ0h0dHBGYWN0b3J5JywgJyRzdGF0ZScsICckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oSHR0cEZhY3RvcnksICRzdGF0ZSwgJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcbiAgICBjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgQ2hhdEN0cmxcIik7XG5cblx0XHQkY3RybC5zZW5kTWVzc2FnZSA9IHNlbmRNZXNzYWdlO1xuXHRcdCRjdHJsLmdldEFsbE1lc3NhZ2VzID0gZ2V0QWxsTWVzc2FnZXM7XG5cdFx0JGN0cmwuc3RyaXBEYXRlID0gc3RyaXBEYXRlO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0JGN0cmwubWVzc2FnZXMgPSBcIlwiO1xuXHRcdFx0JGN0cmwuY3VycmVudFVybCA9ICRzdGF0ZS5wYXJhbXMuZ2FtZU5hbWU7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlck5hbWUgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKS5lbWFpbDtcblx0XHRcdFx0Z2V0QWxsTWVzc2FnZXMoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xuXHRcdFx0JGN0cmwuY2hhdE1lc3NhZ2UudHlwZSA9ICRjdHJsLmN1cnJlbnRVcmw7XG5cdFx0XHQkY3RybC5jaGF0TWVzc2FnZS51c2VyID0gJGN0cmwudXNlck5hbWU7XG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC5jaGF0TWVzc2FnZSk7XG5cdFx0XHRsZXQgbmV3TWVzc2FnZSA9IHtcblx0XHRcdFx0ZGF0YTogJGN0cmwuY2hhdE1lc3NhZ2UsXG5cdFx0XHRcdHVybDogYC9hcGkvbWVzc2FnZXMvJHskY3RybC5jdXJyZW50VXJsfWBcblx0XHRcdH1cblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QobmV3TWVzc2FnZSkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdCRjdHJsLmdldEFsbE1lc3NhZ2VzKCk7XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldEFsbE1lc3NhZ2VzKCkge1xuXHRcdFx0bGV0IGdldE1lc3NhZ2VzID0ge1xuXHRcdFx0XHR1cmw6IGAvYXBpL21lc3NhZ2VzLyR7JGN0cmwuY3VycmVudFVybH1gXG5cdFx0XHR9XG5cdFx0XHRIdHRwRmFjdG9yeS5nZXQoZ2V0TWVzc2FnZXMpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHQkY3RybC5tZXNzYWdlcyA9IHJlcy5kYXRhO1xuXHRcdFx0XHRjb25zb2xlLmxvZygkY3RybC5tZXNzYWdlcyk7XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHN0cmlwRGF0ZShkYXRlKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZS5zdWJzdHJpbmcoMCwxMCk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBbJyRzdGF0ZScsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnJGxvY2F0aW9uJyxcblx0XHRmdW5jdGlvbigkc3RhdGUsIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgJGxvY2F0aW9uKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIERhc2hib2FyZEN0cmxcIik7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlck5hbWUgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKS5lbWFpbDtcblx0XHRcdH1cblx0XHR9XG5cdH1dKTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIFsnJGxvY2F0aW9uJyxcblx0IFx0J0F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uKCRsb2NhdGlvbiwgQXV0aGVudGljYXRpb25TZXJ2aWNlKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBMb2dpbkN0cmwgY3RybFwiKTtcblxuXHRcdCRjdHJsLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5jcmVkZW50aWFscyA9IHtcblx0XHRcdFx0ZW1haWwgOiBcIlwiLFxuXHRcdFx0XHRwYXNzd29yZDogXCJcIlxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uU3VibWl0KCkge1xuICAgICAgQXV0aGVudGljYXRpb25TZXJ2aWNlXG4gICAgICAubG9naW4oJGN0cmwuY3JlZGVudGlhbHMpXG4gICAgICAuZXJyb3IoKGVycikgPT4ge1xuICAgICAgICBhbGVydChlcnIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJMT0dHRUQgSU5cIilcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJ2hvbWUnKTtcbiAgICAgIH0pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdOYXZDdHJsJywgWyckc3RhdGUnLCAnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRzdGF0ZSwgQXV0aGVudGljYXRpb25TZXJ2aWNlLCAkbG9jYXRpb24pIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgTmF2Q3RybFwiKTtcblx0XHQvLyBURU1QTEFURSBJUyBOT1QgQ09OTkVDVEVEIFRPIENPTlRST0xMRVIgRVJST1IhXG5cdFx0JGN0cmwuZ2V0VXNlciA9IGdldFVzZXI7XG5cdFx0JGN0cmwubG9nb3V0ID0gbG9nb3V0O1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0JGN0cmwubG9nZ2VkSW4gPSBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VyKCkge1xuXHRcdFx0JGN0cmwudXNlckRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1EYXRhJylcblx0XHRcdC8vSlNPTi5zdHJpbmdpZnkoZXZhbChcIihcIiArIHVzZXJEYXRhICsgXCIpXCIpKVxuXHRcdFx0JGN0cmwudXNlckRhdGEgPSBKU09OLnBhcnNlKCRjdHJsLnVzZXJEYXRhKVxuXHRcdFx0JGN0cmwudXNlck5hbWUgPSAkY3RybC51c2VyRGF0YS5kYXRhLmVtYWlsO1xuXHRcdFx0Y29uc29sZS5sb2coJGN0cmwubG9nZ2VkSW4pO1xuXHRcdFx0JGN0cmwubG9nZ2VkSW4gPSB0cnVlO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbG9nb3V0KCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJMT0dPVVRcIik7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG5cdFx0XHQkbG9jYXRpb24udXJsKFsnLyddKTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignUHJvZmlsZUN0cmwnLCBbJ1VwbG9hZCcsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ0h0dHBGYWN0b3J5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oVXBsb2FkLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsICRodHRwLCAkbG9jYXRpb24sIEh0dHBGYWN0b3J5KSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0JGN0cmwudXBsb2FkID0gdXBsb2FkO1xuXHRcdCRjdHJsLmRlbGV0ZVByb2ZpbGUgPSBkZWxldGVQcm9maWxlO1xuXHRcdCRjdHJsLnVwZGF0ZUVtYWlsID0gdXBkYXRlRW1haWw7XG5cdFx0JGN0cmwudXBkYXRlQmlvID0gdXBkYXRlQmlvO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIFByb2ZpbGVDdHJsXCIpO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0aWYgKCFBdXRoZW50aWNhdGlvblNlcnZpY2UuZ2V0VG9rZW4oKSkge1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnbG9nSW4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRjdHJsLnVzZXIgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKTtcblx0XHRcdFx0JGN0cmwuZW1haWwgPSAkY3RybC51c2VyLmVtYWlsO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwbG9hZChlLCBmaWxlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImZpbGVcIiwgZmlsZSlcblx0XHRcdGlmKGZpbGUpIHtcblx0XHRcdFx0VXBsb2FkLnVwbG9hZCh7XG5cdFx0XHRcdFx0dXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9wcm9maWxlL3VwbG9hZFBob3RvYCxcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0XHRkYXRhOiB7ZW1haWw6ICRjdHJsLmVtYWlsfSxcblx0XHRcdFx0XHRmaWxlOiBmaWxlXG5cdFx0XHRcdH0pLnByb2dyZXNzKChldnQpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImZpcmluZ1wiKTtcblx0XHRcdFx0fSkuc3VjY2VzcygoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiKTtcblx0XHRcdFx0fSkuZXJyb3IoKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJFcnJvclwiKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBkZWxldGVQcm9maWxlKCkge1xuXHRcdFx0Ly9jb25zdCByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHlvdXIgYWNjb3VudD9cIilcblx0XHRcdGNvbnNvbGUubG9nKFwiZGVsZXRlaW5nXCIpXG5cdFx0XHRjb25zdCByZXF1ZXN0ID0ge1xuXHRcdFx0XHR1cmw6IGAvYXBpL3Byb2ZpbGUvZGVsZXRlLyR7JGN0cmwuZW1haWx9YFxuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkuZGVsZXRlKHJlcXVlc3QpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRhbGVydChcIllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWRcIik7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcblx0XHRcdFx0JGxvY2F0aW9uLnVybChbJy9sb2dpbiddKTtcblx0XHRcdH0pO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlRW1haWwoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcInVwZGF0aW5nIGVtYWlsIGFkcmVzc1wiKVxuXHRcdFx0Y29uc29sZS5sb2coXCJFTUFJTFwiLCAkY3RybC5lbWFpbClcblx0XHRcdGNvbnN0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdHVybDogJy9hcGkvcHJvZmlsZS91cGRhdGVFbWFpbCcsXG5cdFx0XHRcdGRhdGE6ICRjdHJsLnVzZXJcblx0XHRcdH1cblxuXHRcdFx0SHR0cEZhY3RvcnkucG9zdChyZXF1ZXN0KS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlQmlvKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJ1cGRhdGluZyBiaW9cIilcblx0XHRcdGNvbnN0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdHVybDogJy9hcGkvcHJvZmlsZS91cGRhdGVCaW8nLFxuXHRcdFx0XHRkYXRhOiAkY3RybC51c2VyXG5cdFx0XHR9XG5cblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QocmVxdWVzdCkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlcylcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbJyRzdGF0ZScsICdIdHRwRmFjdG9yeScsICckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oJHN0YXRlLCBIdHRwRmFjdG9yeSwgJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcblxuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBSZWdpc3RlckN0cmwgY3RybFwiKTtcblxuXHRcdCRjdHJsLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5jcmVkZW50aWFscyA9IHtcblx0XHRcdFx0ZW1haWwgOiBcIlwiLFxuXHRcdFx0XHRwYXNzd29yZDogXCJcIlxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uU3VibWl0KCkge1xuXHRcdFx0QXV0aGVudGljYXRpb25TZXJ2aWNlXG5cdFx0XHQucmVnaXN0ZXIoJGN0cmwuY3JlZGVudGlhbHMpXG5cdFx0XHQuZXJyb3IoKGVycikgPT4ge1xuXHRcdFx0XHRcdGFsZXJ0KGVycik7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2xvZ2luJ10pXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
