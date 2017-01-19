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
$templateCache.put('profile.edit.html','\n  <div class="file-field input-field" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n    accept="image/*">\n      <div class="btn">\n        <span>File</span>\n        <input type="file">\n      </div>\n      <div class="file-path-wrapper">\n        <input class="file-path validate" type="text">\n      </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <input id="textarea-username" type="text" class="validate" ng-model="$ctrl.user.username">\n      <label for="textarea-username">User name</label>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <textarea id="textarea-bio" class="materialize-textarea" length="120" ng-model="$ctrl.user.bio"></textarea>\n      <label for="textarea-bio">Your bio</label>\n    </div>\n  </div>\n\n  <button ng-click="$ctrl.upload(e, $ctrl.user.file)" class="btn waves-effect waves-light" type="submit" name="action">Update</button>\n');
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

		console.log("this is ProfileCtrl");

		activate();

		function activate() {
			if (!AuthenticationService.getToken()) {
				$location.path('logIn');
			} else {
				$ctrl.userName = AuthenticationService.currentUser().email;
				console.log($ctrl.userName)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2NoYXQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbG9naW4uY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL25hdmJhci5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcHJvZmlsZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXIuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvY2hlY2stdXNlci5kaXJlY3RpdmUuanMiLCJzZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic2VydmljZXMvaHR0cC5mYWN0b3J5LmpzIiwic2VydmljZXMvc2VydmVyQ29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFFBQVEsT0FBTyxVQUFVLENBQUMsYUFBYTtBQUN2QztBQ0hBOztBQUVBLFFBQVEsT0FBTzs7Q0FFZCxnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O0lBRWpELG1CQUFtQixVQUFVOztJQUU3Qjs7OztTQUlLLE1BQU0sVUFBVTtZQUNiLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFNBQVM7WUFDWixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjO1lBQ2QsUUFBUTtjQUNOLFFBQVE7Ozs7U0FJYixNQUFNLFFBQVE7WUFDWCxLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sV0FBVztVQUNoQixhQUFhO1VBQ2IsWUFBWTtVQUNaLGNBQWM7OztTQUdmLE1BQU0sUUFBUTtVQUNiLGFBQWE7VUFDYixZQUFZO1VBQ1osY0FBYzs7OztT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UUFBUTtZQUNyQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztLQUk5QztBQ3hETCxDQUFDLFdBQVc7SUFDUjs7SUFFQTtTQUNLLE9BQU87U0FDUCxRQUFRLFVBQVU7Ozs7SUFJdkIsU0FBUyxVQUFVO1FBQ2YsSUFBSSxVQUFVO1lBQ1YsZUFBZTs7O1FBR25CLE9BQU87O0tBRVYiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JywgWyd1aS5yb3V0ZXInLCAnbmdGaWxlVXBsb2FkJ10pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG5cbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLnN0YXRlKCdzaWduVXAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2xvZ0luJywge1xuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcbiAgICAgICAgICAgIGFjY2Vzczoge1xuICAgICAgICAgICAgICBpc0ZyZWU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2NoYXQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvY2hhdC86Z2FtZU5hbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGF0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NoYXRDdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9maWxlLmVkaXQuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhYm91dCBjb250cm9sbGVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7JHRlbXBsYXRlQ2FjaGUucHV0KCdhYm91dC5odG1sJywnPGgxPkFib3V0PC9oMT4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnY2hhdC5odG1sJywnPGgzPlxcbiAgPHNwYW4+Q2hhdCB3aXRoIG90aGVyIGdhbWVycyE8L3NwYW4+XFxuPC9oMz5cXG48ZGl2IGNsYXNzPVwicm93XCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgIDxzdHJvbmc+TWVzc2FnZTwvc3Ryb25nPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHMxIG9mZnNldC1zM1wiPlxcbiAgICA8c3Ryb25nPkRhdGU8L3N0cm9uZz5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjaGF0LWJveCBjb2wgczEyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3cgbWVzc2FnZS1ib3JkZXJcIiBuZy1yZXBlYXQ9XCJtZXNzYWdlIGluICRjdHJsLm1lc3NhZ2VzXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzOFwiPlxcbiAgICAgICAgPHN0cm9uZz48ZW0+e3ttZXNzYWdlLnVzZXJ9fTwvZW0+IDo8L3N0cm9uZz5cXG4gICAgICAgIHt7bWVzc2FnZS5tZXNzYWdlfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMyIG9mZnNldC1zMiByaWdodC1hbGlnblwiPlxcbiAgICAgICAge3skY3RybC5zdHJpcERhdGUobWVzc2FnZS5kYXRlKX19XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGJyPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyIFwiPlxcbiAgICA8dGV4dGFyZWEgbmctbW9kZWw9XCIkY3RybC5jaGF0TWVzc2FnZS5uZXdNZXNzYWdlXCIgaWQ9XCJpY29uX3ByZWZpeDJcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCI+PC90ZXh0YXJlYT5cXG4gICAgPGxhYmVsIGZvcj1cImljb25fcHJlZml4MlwiPk1lc3NhZ2UgdGV4dDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwuc2VuZE1lc3NhZ2UoKVwiY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5TZW5kIG1lc3NhZ2VcXG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuPC9idXR0b24+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2hvbWUuaHRtbCcsJzxoMT5Mb2dnZWQgaW4gYXM6IDxhIHVpLXNyZWY9XCJwcm9maWxlXCI+e3skY3RybC51c2VyTmFtZX19PC9hPjwvaDE+XFxuPGRpdiBjbGFzcz1cInJvdyBob21lLW1lbnVcIj5cXG5cXHQ8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgXFx0PGEgbmctaHJlZj1cIiMvY2hhdC9jb3VudGVyLXN0cmlrZTpnbG9iYWwtb2ZmZW5zaXZlXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9jc2dvLmpwZ1wiPjwvYT5cXG4gICAgICBcXHQ8cD5Db3VudGVyLVN0cmlrZTogR2xvYmFsIE9mZmVuc2l2ZTwvcD5cXG5cXHQ8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgXFx0XFx0PGEgbmctaHJlZj1cIiMvY2hhdC9kb3RhMlwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvZG90YTIucG5nXCI+PC9hPlxcbiAgICAgICAgPHA+RG90YSAyPC9wPlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgXFx0XFx0PGEgbmctaHJlZj1cIiMvY2hhdC9sZWFndWVvZmxlZ2VuZHNcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2xvbC5qcGVnXCI+PC9hPlxcbiAgXFx0XFx0PHA+TGVhZ3VlIG9mIExlZ2VuZHM8L3A+XFxuICAgICAgPC9kaXY+XFxuICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICBcXHRcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L292ZXJ3YXRjaFwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvb3ZlcndhdGNoLmpwZ1wiPjwvYT5cXG4gIFxcdFxcdDxwPk92ZXJ3YXRjaDwvcD5cXG5cXHQ8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbG9naW4uaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICA8Zm9ybSBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczRcIiBuZy1zdWJtaXQ9XCIkY3RybC5vblN1Ym1pdCgpXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIGlkPVwiZW1haWxcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLmNyZWRlbnRpYWxzLmVtYWlsXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWwgQWRyZXNzPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLmNyZWRlbnRpYWxzLnBhc3N3b3JkXCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+TG9nIGluXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2Zvcm0+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgbmFtZT1cImFjdGlvblwiIGhyZWY9XCIjL3NpZ251cFwiPkNyZWF0ZSBuZXcgdXNlclxcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ25hdmJhci5odG1sJywnPG5hdj5cXG4gICAgPGRpdiBjbGFzcz1cIm5hdi13cmFwcGVyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxcbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJyYW5kLWxvZ29cIj5HYWNoYXQ8L2E+XFxuXFxuICAgICAgICA8dWwgaWQ9XCJuYXYtbW9iaWxlXCIgY2xhc3M9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjL2Fib3V0XCI+QWJvdXQ8L2E+PC9saT5cXG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPiB7eyRjdHJsLnVzZXJOYW1lfX08L2E+PC9saT5cXG4gICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9uYXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3Byb2ZpbGUuZWRpdC5odG1sJywnXFxuICA8ZGl2IGNsYXNzPVwiZmlsZS1maWVsZCBpbnB1dC1maWVsZFwiIG5nZi1zZWxlY3QgbmctbW9kZWw9XCIkY3RybC51c2VyLmZpbGVcIiBuYW1lPVwiZmlsZVwiIG5nZi1wYXR0ZXJuPVwiXFwnaW1hZ2UvKlxcJ1wiXFxuICAgIGFjY2VwdD1cImltYWdlLypcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XFxuICAgICAgICA8c3Bhbj5GaWxlPC9zcGFuPlxcbiAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCI+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImZpbGUtcGF0aC13cmFwcGVyXCI+XFxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmaWxlLXBhdGggdmFsaWRhdGVcIiB0eXBlPVwidGV4dFwiPlxcbiAgICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XFxuICAgICAgPGlucHV0IGlkPVwidGV4dGFyZWEtdXNlcm5hbWVcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLnVzZXIudXNlcm5hbWVcIj5cXG4gICAgICA8bGFiZWwgZm9yPVwidGV4dGFyZWEtdXNlcm5hbWVcIj5Vc2VyIG5hbWU8L2xhYmVsPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgIDx0ZXh0YXJlYSBpZD1cInRleHRhcmVhLWJpb1wiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWFcIiBsZW5ndGg9XCIxMjBcIiBuZy1tb2RlbD1cIiRjdHJsLnVzZXIuYmlvXCI+PC90ZXh0YXJlYT5cXG4gICAgICA8bGFiZWwgZm9yPVwidGV4dGFyZWEtYmlvXCI+WW91ciBiaW88L2xhYmVsPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cIiRjdHJsLnVwbG9hZChlLCAkY3RybC51c2VyLmZpbGUpXCIgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGRhdGU8L2J1dHRvbj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncHJvZmlsZS5odG1sJywnPGRpdiBjbGFzcz1cInJvdyBwcm9maWxlXCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHMzIG9mZnNldC1zM1wiPlxcbiAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuLWxhcmdlXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIlxcbiAgICAgIHVpLXNyZWY9XCJlZGl0XCI+RWRpdCBQcm9maWxlPC9hPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0bi1sYXJnZSByZWQgZGFya2VuLTFcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiXFxuICAgICAgbmctY2xpY2s9XCIkY3RybC5kZWxldGVQcm9maWxlKClcIj5EZWxldGUgUHJvZmlsZVxcbiAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2lnbnVwLmh0bWwnLCc8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgPGZvcm0gY2xhc3M9XCJjb2wgczYgb2Zmc2V0LXM0XCIgbmctc3VibWl0PVwiJGN0cmwub25TdWJtaXQoKVwiPlxcbiAgICAgICAgICAgIDxoMz5DcmVhdGUgbmV3IHVzZXI8L2gzPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiRW1haWxcIiBpZD1cImVtYWlsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5lbWFpbFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsIEFkcmVzczwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5jcmVkZW50aWFscy5wYXNzd29yZFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlJlZ2lzdGVyXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9mb3JtPlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwYXJ0aWFscy9uYXZiYXIuaHRtbCcsJzxuYXY+XFxuICAgIDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJicmFuZC1sb2dvXCI+R2FjaGF0PC9hPlxcbiAgICAgICAgPHVsIGlkPVwibmF2LW1vYmlsZVwiIGNsYXNzPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cXG4gICAgICAgICAgICA8bGk+PGEgdWktc3JlZj1cInByb2ZpbGVcIj5Qcm9maWxlPC9hPjwvbGk+XFxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjL2Fib3V0XCI+QWJvdXQ8L2E+PC9saT5cXG4gICAgICAgICAgICA8bGk+PGEgbmctY2xpY2s9XCIkY3RybC5sb2dvdXQoKVwiPkxvZ291dDwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTt9XSk7IiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdDaGF0Q3RybCcsIFsnSHR0cEZhY3RvcnknLCAnJHN0YXRlJywgJyRsb2NhdGlvbicsXG5cdCBcdCdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbihIdHRwRmFjdG9yeSwgJHN0YXRlLCAkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xuICAgIGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBDaGF0Q3RybFwiKTtcblxuXHRcdCRjdHJsLnNlbmRNZXNzYWdlID0gc2VuZE1lc3NhZ2U7XG5cdFx0JGN0cmwuZ2V0QWxsTWVzc2FnZXMgPSBnZXRBbGxNZXNzYWdlcztcblx0XHQkY3RybC5zdHJpcERhdGUgPSBzdHJpcERhdGU7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5tZXNzYWdlcyA9IFwiXCI7XG5cdFx0XHQkY3RybC5jdXJyZW50VXJsID0gJHN0YXRlLnBhcmFtcy5nYW1lTmFtZTtcblx0XHRcdGlmICghQXV0aGVudGljYXRpb25TZXJ2aWNlLmdldFRva2VuKCkpIHtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJ2xvZ0luJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC51c2VyTmFtZSA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpLmVtYWlsO1xuXHRcdFx0XHRnZXRBbGxNZXNzYWdlcygpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XG5cdFx0XHQkY3RybC5jaGF0TWVzc2FnZS50eXBlID0gJGN0cmwuY3VycmVudFVybDtcblx0XHRcdCRjdHJsLmNoYXRNZXNzYWdlLnVzZXIgPSAkY3RybC51c2VyTmFtZTtcblx0XHRcdGNvbnNvbGUubG9nKCRjdHJsLmNoYXRNZXNzYWdlKTtcblx0XHRcdGxldCBuZXdNZXNzYWdlID0ge1xuXHRcdFx0XHRkYXRhOiAkY3RybC5jaGF0TWVzc2FnZSxcblx0XHRcdFx0dXJsOiBgL2FwaS9tZXNzYWdlcy8keyRjdHJsLmN1cnJlbnRVcmx9YFxuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkucG9zdChuZXdNZXNzYWdlKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0JGN0cmwuZ2V0QWxsTWVzc2FnZXMoKTtcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0QWxsTWVzc2FnZXMoKSB7XG5cdFx0XHRsZXQgZ2V0TWVzc2FnZXMgPSB7XG5cdFx0XHRcdHVybDogYC9hcGkvbWVzc2FnZXMvJHskY3RybC5jdXJyZW50VXJsfWBcblx0XHRcdH1cblx0XHRcdEh0dHBGYWN0b3J5LmdldChnZXRNZXNzYWdlcykudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdCRjdHJsLm1lc3NhZ2VzID0gcmVzLmRhdGE7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCRjdHJsLm1lc3NhZ2VzKTtcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc3RyaXBEYXRlKGRhdGUpIHtcblx0XHRcdHJldHVybiBkYXRlLnN1YnN0cmluZygwLDEwKTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignRGFzaGJvYXJkQ3RybCcsIFsnJHN0YXRlJywgJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsICckbG9jYXRpb24nLFxuXHRcdGZ1bmN0aW9uKCRzdGF0ZSwgQXV0aGVudGljYXRpb25TZXJ2aWNlLCAkbG9jYXRpb24pIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgRGFzaGJvYXJkQ3RybFwiKTtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdGlmICghQXV0aGVudGljYXRpb25TZXJ2aWNlLmdldFRva2VuKCkpIHtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJ2xvZ0luJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC51c2VyTmFtZSA9IEF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcigpLmVtYWlsO1xuXHRcdFx0fVxuXHRcdH1cblx0fV0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignTG9naW5DdHJsJywgWyckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIExvZ2luQ3RybCBjdHJsXCIpO1xuXG5cdFx0JGN0cmwub25TdWJtaXQgPSBvblN1Ym1pdDtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLmNyZWRlbnRpYWxzID0ge1xuXHRcdFx0XHRlbWFpbCA6IFwiXCIsXG5cdFx0XHRcdHBhc3N3b3JkOiBcIlwiXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gb25TdWJtaXQoKSB7XG4gICAgICBBdXRoZW50aWNhdGlvblNlcnZpY2VcbiAgICAgIC5sb2dpbigkY3RybC5jcmVkZW50aWFscylcbiAgICAgIC5lcnJvcigoZXJyKSA9PiB7XG4gICAgICAgIGFsZXJ0KGVycik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkxPR0dFRCBJTlwiKVxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnaG9tZScpO1xuICAgICAgfSk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ05hdkN0cmwnLCBbJyRzdGF0ZScsICdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHN0YXRlLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsICRsb2NhdGlvbikge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBOYXZDdHJsXCIpO1xuXHRcdC8vIFRFTVBMQVRFIElTIE5PVCBDT05ORUNURUQgVE8gQ09OVFJPTExFUiBFUlJPUiFcblx0XHQkY3RybC5nZXRVc2VyID0gZ2V0VXNlcjtcblx0XHQkY3RybC5sb2dvdXQgPSBsb2dvdXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFVzZXIoKSB7XG5cdFx0XHQkY3RybC51c2VyRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLURhdGEnKVxuXHRcdFx0Ly9KU09OLnN0cmluZ2lmeShldmFsKFwiKFwiICsgdXNlckRhdGEgKyBcIilcIikpXG5cdFx0XHQkY3RybC51c2VyRGF0YSA9IEpTT04ucGFyc2UoJGN0cmwudXNlckRhdGEpXG5cdFx0XHQkY3RybC51c2VyTmFtZSA9ICRjdHJsLnVzZXJEYXRhLmRhdGEuZW1haWw7XG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC5sb2dnZWRJbik7XG5cdFx0XHQkY3RybC5sb2dnZWRJbiA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBsb2dvdXQoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkxPR09VVFwiKTtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcblx0XHRcdCRsb2NhdGlvbi51cmwoWycvJ10pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdQcm9maWxlQ3RybCcsIFsnVXBsb2FkJywgJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsICckaHR0cCcsICckbG9jYXRpb24nLCAnSHR0cEZhY3RvcnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihVcGxvYWQsIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgJGh0dHAsICRsb2NhdGlvbiwgSHR0cEZhY3RvcnkpIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHQkY3RybC51cGxvYWQgPSB1cGxvYWQ7XG5cdFx0JGN0cmwuZGVsZXRlUHJvZmlsZSA9IGRlbGV0ZVByb2ZpbGU7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgUHJvZmlsZUN0cmxcIik7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRpZiAoIUF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCdsb2dJbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwudXNlck5hbWUgPSBBdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIoKS5lbWFpbDtcblx0XHRcdFx0Y29uc29sZS5sb2coJGN0cmwudXNlck5hbWUpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBsb2FkKGUsIGZpbGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiRklSSU5HXCIpO1xuXHRcdFx0Y29uc29sZS5sb2coZSwgZmlsZSk7XG5cdFx0XHRpZihmaWxlKSB7XG5cdFx0XHRcdFVwbG9hZC51cGxvYWQoe1xuXHRcdFx0XHRcdHVybDogJy9hcGkvcHJvZmlsZS9lZGl0Jyxcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0XHRkYXRhOiAkY3RybC51c2VyLmRhdGEuX2lkXG5cdFx0XHRcdH0pLnByb2dyZXNzKChldnQpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImZpcmluZ1wiKTtcblx0XHRcdFx0fSkuc3VjY2VzcygoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiKTtcblx0XHRcdFx0fSkuZXJyb3IoKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHlvdXIgYWNjb3VudD9cIilcblx0XHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdFx0Y29uc3QgdXNlcklkID0gJGN0cmwudXNlci5kYXRhLl9pZFxuXHRcdFx0XHRsZXQgY3VycmVudFVzZXIgPSB7XG5cdFx0XHRcdFx0ZGF0YTogJGN0cmwudXNlci5kYXRhLl9pZCxcblx0XHRcdFx0XHR1cmw6IGAvYXBpL3Byb2ZpbGUvZWRpdC8ke3VzZXJJZH1gXG5cdFx0XHRcdH1cblx0XHRcdFx0SHR0cEZhY3RvcnkuZGVsZXRlKGN1cnJlbnRVc2VyKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0XHRhbGVydChcIllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWRcIik7XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItRGF0YScpO1xuXHRcdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvbG9naW4nXSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbJyRzdGF0ZScsICdIdHRwRmFjdG9yeScsICckbG9jYXRpb24nLFxuXHQgXHQnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oJHN0YXRlLCBIdHRwRmFjdG9yeSwgJGxvY2F0aW9uLCBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcblxuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBSZWdpc3RlckN0cmwgY3RybFwiKTtcblxuXHRcdCRjdHJsLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5jcmVkZW50aWFscyA9IHtcblx0XHRcdFx0ZW1haWwgOiBcIlwiLFxuXHRcdFx0XHRwYXNzd29yZDogXCJcIlxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uU3VibWl0KCkge1xuXHRcdFx0QXV0aGVudGljYXRpb25TZXJ2aWNlXG5cdFx0XHQucmVnaXN0ZXIoJGN0cmwuY3JlZGVudGlhbHMpXG5cdFx0XHQuZXJyb3IoKGVycikgPT4ge1xuXHRcdFx0XHRcdGFsZXJ0KGVycik7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2xvZ2luJ10pXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG4gIC5kaXJlY3RpdmUoJ2NoZWNrVXNlcicsIFsnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAndXNlclNydicsXG4gICAgZnVuY3Rpb24gKCRyb290LCAkbG9jLCB1c2VyU3J2KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgICAgJHJvb3QuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGUsIGN1cnIsIHByZXYpe1xuICAgICAgICAgICAgaWYgKCFwcmV2LmFjY2Vzcy5pc0ZyZWUgJiYgIXVzZXJTcnYuaXNMb2dnZWQpIHtcbiAgICAgICAgICAgICAgLy8gcmVsb2FkIHRoZSBsb2dpbiByb3V0ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICogSU1QT1JUQU5UOlxuICAgICAgICAgICAgKiBJdCdzIG5vdCBkaWZmaWN1bHQgdG8gZm9vbCB0aGUgcHJldmlvdXMgY29udHJvbCxcbiAgICAgICAgICAgICogc28gaXQncyByZWFsbHkgSU1QT1JUQU5UIHRvIHJlcGVhdCBzZXJ2ZXIgc2lkZVxuICAgICAgICAgICAgKiB0aGUgc2FtZSBjb250cm9sIGJlZm9yZSBzZW5kaW5nIGJhY2sgcmVzZXJ2ZWQgZGF0YS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLnNlcnZpY2UoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIHNlcnZpY2UpO1xuXG4gICAgc2VydmljZS4kaW5qZWN0ID0gWydIdHRwRmFjdG9yeScsICckd2luZG93J107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBzZXJ2aWNlKEh0dHBGYWN0b3J5LCAkd2luZG93KSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBzYXZlVG9rZW46IHNhdmVUb2tlbixcbiAgICAgICAgICAgIGdldFRva2VuOiBnZXRUb2tlbixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgaXNMb2dnZWRJbjogaXNMb2dnZWRJbixcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyOiBjdXJyZW50VXNlcixcbiAgICAgICAgICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVUb2tlbih0b2tlbikge1xuICAgICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddID0gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZVsnVXNlci1EYXRhJ107XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICBsZXQgcGF5bG9hZDtcblxuICAgICAgICAgIGlmKHRva2VuKXtcbiAgICAgICAgICAgIHBheWxvYWQgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgcGF5bG9hZCA9ICR3aW5kb3cuYXRvYihwYXlsb2FkKTtcbiAgICAgICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5leHAgPiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBjdXJyZW50VXNlcigpIHtcbiAgICAgICAgICBpZihpc0xvZ2dlZEluKCkpe1xuICAgICAgICAgICAgdmFyIHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgIHBheWxvYWQgPSAkd2luZG93LmF0b2IocGF5bG9hZCk7XG4gICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGVtYWlsIDogcGF5bG9hZC5lbWFpbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3Rlcih1c2VyKSB7XG4gICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VycycsXG4gICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBIdHRwRmFjdG9yeS5wb3N0KHVzZXJJbmZvKS5zdWNjZXNzKChyZXMpID0+IHtcbiAgICAgICAgICAgIHNhdmVUb2tlbihyZXMudG9rZW4pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW4odXNlcikge1xuICAgICAgICAgIGxldCB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gSHR0cEZhY3RvcnkucG9zdCh1c2VySW5mbykuc3VjY2VzcygocmVzKSA9PiB7XG4gICAgICAgICAgICBzYXZlVG9rZW4ocmVzLnRva2VuKTtcbiAgICAgICAgfSk7XG59O1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnSHR0cEZhY3RvcnknLCBmYWN0b3J5KTtcblxuICAgIGZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnQ29uZmlnJ107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KCRodHRwLCBDb25maWcpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIHB1dDogcHV0LFxuICAgICAgICAgICAgcG9zdDogcG9zdCxcbiAgICAgICAgICAgIGRlbGV0ZTogX2RlbGV0ZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogb3B0aW9ucy5jYWNoZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jYWNoZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG9wdGlvbnMua2luZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1dChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGVsZXRlKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5zZXJ2aWNlKCdDb25maWcnLCBTZXJ2aWNlKTtcblxuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gU2VydmljZSgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICAnQVBJX0JBU0VfVVJMJzonaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
