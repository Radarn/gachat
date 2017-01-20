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
$templateCache.put('profile.edit.html','  <div class="row edit-profile">\n    <div class="file-field input-field col s12" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n      accept="image/*">\n        <div class="btn">\n          <span>File</span>\n          <input type="file">\n        </div>\n        <div class="file-path-wrapper">\n          <input class="file-path validate" type="text">\n        </div>\n    </div>\n  </div>\n  <button ng-click="$ctrl.upload(e, $ctrl.user.file)" class="btn waves-effect waves-light" type="submit" name="action">Upload Photo</button>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <input id="textarea-email" type="text" class="validate" ng-model="$ctrl.user.newEmail">\n      <label for="textarea-email">Email</label>\n      <button ng-click="$ctrl.updateEmail()" class="btn waves-effect waves-light" type="submit" name="action">Update Email Adress</button>\n      </div>\n    </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <textarea id="textarea-bio" class="materialize-textarea" length="120" ng-model="$ctrl.user.bio"></textarea>\n      <label for="textarea-bio">Your bio</label>\n      <button ng-click="$ctrl.updateBio()" class="btn waves-effect waves-light" type="submit" name="action">Update Bio</button>\n    </div>\n  </div>\n  </div>\n');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2NoYXQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbG9naW4uY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL25hdmJhci5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcHJvZmlsZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXIuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvY2hlY2stdXNlci5kaXJlY3RpdmUuanMiLCJzZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic2VydmljZXMvaHR0cC5mYWN0b3J5LmpzIiwic2VydmljZXMvc2VydmVyQ29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFFBQVEsT0FBTyxVQUFVLENBQUMsYUFBYTtBQUN2QztBQ0hBOztBQUVBLFFBQVEsT0FBTzs7Q0FFZCxnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O0lBRWpELG1CQUFtQixVQUFVOztJQUU3Qjs7OztTQUlLLE1BQU0sVUFBVTtZQUNiLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFNBQVM7WUFDWixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjO1lBQ2QsUUFBUTtjQUNOLFFBQVE7Ozs7U0FJYixNQUFNLFFBQVE7WUFDWCxLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sV0FBVztVQUNoQixhQUFhO1VBQ2IsWUFBWTtVQUNaLGNBQWM7OztTQUdmLE1BQU0sUUFBUTtVQUNiLGFBQWE7VUFDYixZQUFZO1VBQ1osY0FBYzs7OztT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O2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLFNBQVMsUUFBUTtnQkFDakIsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztRQUkzQyxTQUFTLEtBQUssUUFBUTtZQUNsQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztRQUkzQyxTQUFTLFFBQVEsUUFBUTtZQUNyQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztLQUk5QztBQ3hETCxDQUFDLFdBQVc7SUFDUjs7SUFFQTtTQUNLLE9BQU87U0FDUCxRQUFRLFVBQVU7Ozs7SUFJdkIsU0FBUyxVQUFVO1FBQ2YsSUFBSSxVQUFVO1lBQ1YsZUFBZTs7O1FBR25CLE9BQU87O0tBRVYiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JywgWyd1aS5yb3V0ZXInLCAnbmdGaWxlVXBsb2FkJ10pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG5cbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLnN0YXRlKCdzaWduVXAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2xvZ0luJywge1xuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcbiAgICAgICAgICAgIGFjY2Vzczoge1xuICAgICAgICAgICAgICBpc0ZyZWU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2NoYXQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvY2hhdC86Z2FtZU5hbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGF0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NoYXRDdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9maWxlLmVkaXQuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Byb2ZpbGVDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhYm91dCBjb250cm9sbGVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7JHRlbXBsYXRlQ2FjaGUucHV0KCdhYm91dC5odG1sJywnPGgxPkFib3V0PC9oMT4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnY2hhdC5odG1sJywnPGgzPlxcbiAgPHNwYW4+Q2hhdCB3aXRoIG90aGVyIGdhbWVycyE8L3NwYW4+XFxuPC9oMz5cXG48ZGl2IGNsYXNzPVwicm93XCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgIDxzdHJvbmc+TWVzc2FnZTwvc3Ryb25nPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHMxIG9mZnNldC1zM1wiPlxcbiAgICA8c3Ryb25nPkRhdGU8L3N0cm9uZz5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjaGF0LWJveCBjb2wgczEyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3cgbWVzc2FnZS1ib3JkZXJcIiBuZy1yZXBlYXQ9XCJtZXNzYWdlIGluICRjdHJsLm1lc3NhZ2VzXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzOFwiPlxcbiAgICAgICAgPHN0cm9uZz48ZW0+e3ttZXNzYWdlLnVzZXJ9fTwvZW0+IDo8L3N0cm9uZz5cXG4gICAgICAgIHt7bWVzc2FnZS5tZXNzYWdlfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMyIG9mZnNldC1zMiByaWdodC1hbGlnblwiPlxcbiAgICAgICAge3skY3RybC5zdHJpcERhdGUobWVzc2FnZS5kYXRlKX19XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGJyPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyIFwiPlxcbiAgICA8dGV4dGFyZWEgbmctbW9kZWw9XCIkY3RybC5jaGF0TWVzc2FnZS5uZXdNZXNzYWdlXCIgaWQ9XCJpY29uX3ByZWZpeDJcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCI+PC90ZXh0YXJlYT5cXG4gICAgPGxhYmVsIGZvcj1cImljb25fcHJlZml4MlwiPk1lc3NhZ2UgdGV4dDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwuc2VuZE1lc3NhZ2UoKVwiY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5TZW5kIG1lc3NhZ2VcXG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuPC9idXR0b24+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2hvbWUuaHRtbCcsJzxoMT5Mb2dnZWQgaW4gYXM6IDxhIHVpLXNyZWY9XCJwcm9maWxlXCI+e3skY3RybC51c2VyTmFtZX19PC9hPjwvaDE+XFxuPGRpdiBjbGFzcz1cInJvdyBob21lLW1lbnVcIj5cXG5cXHQ8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgXFx0PGEgbmctaHJlZj1cIiMvY2hhdC9jb3VudGVyLXN0cmlrZTpnbG9iYWwtb2ZmZW5zaXZlXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9jc2dvLmpwZ1wiPjwvYT5cXG4gICAgICBcXHQ8cD5Db3VudGVyLVN0cmlrZTogR2xvYmFsIE9mZmVuc2l2ZTwvcD5cXG5cXHQ8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgXFx0XFx0PGEgbmctaHJlZj1cIiMvY2hhdC9kb3RhMlwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvZG90YTIucG5nXCI+PC9hPlxcbiAgICAgICAgPHA+RG90YSAyPC9wPlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgXFx0XFx0PGEgbmctaHJlZj1cIiMvY2hhdC9sZWFndWVvZmxlZ2VuZHNcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2xvbC5qcGVnXCI+PC9hPlxcbiAgXFx0XFx0PHA+TGVhZ3VlIG9mIExlZ2VuZHM8L3A+XFxuICAgICAgPC9kaXY+XFxuICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICBcXHRcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L292ZXJ3YXRjaFwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvb3ZlcndhdGNoLmpwZ1wiPjwvYT5cXG4gIFxcdFxcdDxwPk92ZXJ3YXRjaDwvcD5cXG5cXHQ8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbG9naW4uaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICA8Zm9ybSBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczRcIiBuZy1zdWJtaXQ9XCIkY3RybC5vblN1Ym1pdCgpXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIGlkPVwiZW1haWxcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLmNyZWRlbnRpYWxzLmVtYWlsXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWwgQWRyZXNzPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLmNyZWRlbnRpYWxzLnBhc3N3b3JkXCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+TG9nIGluXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2Zvcm0+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgbmFtZT1cImFjdGlvblwiIGhyZWY9XCIjL3NpZ251cFwiPkNyZWF0ZSBuZXcgdXNlclxcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ25hdmJhci5odG1sJywnPG5hdj5cXG4gICAgPGRpdiBjbGFzcz1cIm5hdi13cmFwcGVyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxcbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJyYW5kLWxvZ29cIj5HYWNoYXQ8L2E+XFxuXFxuICAgICAgICA8dWwgaWQ9XCJuYXYtbW9iaWxlXCIgY2xhc3M9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjL2Fib3V0XCI+QWJvdXQ8L2E+PC9saT5cXG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPiB7eyRjdHJsLnVzZXJOYW1lfX08L2E+PC9saT5cXG4gICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9uYXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3Byb2ZpbGUuZWRpdC5odG1sJywnICA8ZGl2IGNsYXNzPVwicm93IGVkaXQtcHJvZmlsZVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZmlsZS1maWVsZCBpbnB1dC1maWVsZCBjb2wgczEyXCIgbmdmLXNlbGVjdCBuZy1tb2RlbD1cIiRjdHJsLnVzZXIuZmlsZVwiIG5hbWU9XCJmaWxlXCIgbmdmLXBhdHRlcm49XCJcXCdpbWFnZS8qXFwnXCJcXG4gICAgICBhY2NlcHQ9XCJpbWFnZS8qXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XFxuICAgICAgICAgIDxzcGFuPkZpbGU8L3NwYW4+XFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsZS1wYXRoLXdyYXBwZXJcIj5cXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZmlsZS1wYXRoIHZhbGlkYXRlXCIgdHlwZT1cInRleHRcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cIiRjdHJsLnVwbG9hZChlLCAkY3RybC51c2VyLmZpbGUpXCIgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGxvYWQgUGhvdG88L2J1dHRvbj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cXG4gICAgICA8aW5wdXQgaWQ9XCJ0ZXh0YXJlYS1lbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwudXNlci5uZXdFbWFpbFwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XCJ0ZXh0YXJlYS1lbWFpbFwiPkVtYWlsPC9sYWJlbD5cXG4gICAgICA8YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwudXBkYXRlRW1haWwoKVwiIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+VXBkYXRlIEVtYWlsIEFkcmVzczwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cXG4gICAgICA8dGV4dGFyZWEgaWQ9XCJ0ZXh0YXJlYS1iaW9cIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCIgbGVuZ3RoPVwiMTIwXCIgbmctbW9kZWw9XCIkY3RybC51c2VyLmJpb1wiPjwvdGV4dGFyZWE+XFxuICAgICAgPGxhYmVsIGZvcj1cInRleHRhcmVhLWJpb1wiPllvdXIgYmlvPC9sYWJlbD5cXG4gICAgICA8YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwudXBkYXRlQmlvKClcIiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlVwZGF0ZSBCaW88L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwcm9maWxlLmh0bWwnLCc8ZGl2IGNsYXNzPVwicm93IHByb2ZpbGVcIj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wgczMgb2Zmc2V0LXMzXCI+XFxuICAgIDxhIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG4tbGFyZ2VcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiXFxuICAgICAgdWktc3JlZj1cImVkaXRcIj5FZGl0IFByb2ZpbGU8L2E+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuLWxhcmdlIHJlZCBkYXJrZW4tMVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCJcXG4gICAgICBuZy1jbGljaz1cIiRjdHJsLmRlbGV0ZVByb2ZpbGUoKVwiPkRlbGV0ZSBQcm9maWxlXFxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdzaWdudXAuaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICA8Zm9ybSBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczRcIiBuZy1zdWJtaXQ9XCIkY3RybC5vblN1Ym1pdCgpXCI+XFxuICAgICAgICAgICAgPGgzPkNyZWF0ZSBuZXcgdXNlcjwvaDM+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIGlkPVwiZW1haWxcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLmNyZWRlbnRpYWxzLmVtYWlsXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWwgQWRyZXNzPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLmNyZWRlbnRpYWxzLnBhc3N3b3JkXCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+UmVnaXN0ZXJcXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Zvcm0+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3BhcnRpYWxzL25hdmJhci5odG1sJywnPG5hdj5cXG4gICAgPGRpdiBjbGFzcz1cIm5hdi13cmFwcGVyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxcbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJyYW5kLWxvZ29cIj5HYWNoYXQ8L2E+XFxuICAgICAgICA8dWwgaWQ9XCJuYXYtbW9iaWxlXCIgY2xhc3M9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxcbiAgICAgICAgICAgIDxsaT48YSB1aS1zcmVmPVwicHJvZmlsZVwiPlByb2ZpbGU8L2E+PC9saT5cXG4gICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgICAgIDxsaT48YSBuZy1jbGljaz1cIiRjdHJsLmxvZ291dCgpXCI+TG9nb3V0PC9hPjwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbjwvbmF2PlxcbicpO31dKTsiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0NoYXRDdHJsJywgWydIdHRwRmFjdG9yeScsICckc3RhdGUnLCAnJGxvY2F0aW9uJyxcblx0IFx0J0F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uKEh0dHBGYWN0b3J5LCAkc3RhdGUsICRsb2NhdGlvbiwgQXV0aGVudGljYXRpb25TZXJ2aWNlKSB7XG4gICAgY29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIENoYXRDdHJsXCIpO1xuXG5cdFx0JGN0cmwuc2VuZE1lc3NhZ2UgPSBzZW5kTWVzc2FnZTtcblx0XHQkY3RybC5nZXRBbGxNZXNzYWdlcyA9IGdldEFsbE1lc3NhZ2VzO1xuXHRcdCRjdHJsLnN0cmlwRGF0ZSA9IHN0cmlwRGF0ZTtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLm1lc3NhZ2VzID0gXCJcIjtcblx0XHRcdCRjdHJsLmN1cnJlbnRVcmwgPSAkc3RhdGUucGFyYW1zLmdhbWVOYW1lO1xuXHRcdFx0aWYgKCFBdXRoZW50aWNhdGlvblNlcnZpY2UuZ2V0VG9rZW4oKSkge1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnbG9nSW4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRjdHJsLnVzZXJOYW1lID0gQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCkuZW1haWw7XG5cdFx0XHRcdGdldEFsbE1lc3NhZ2VzKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcblx0XHRcdCRjdHJsLmNoYXRNZXNzYWdlLnR5cGUgPSAkY3RybC5jdXJyZW50VXJsO1xuXHRcdFx0JGN0cmwuY2hhdE1lc3NhZ2UudXNlciA9ICRjdHJsLnVzZXJOYW1lO1xuXHRcdFx0Y29uc29sZS5sb2coJGN0cmwuY2hhdE1lc3NhZ2UpO1xuXHRcdFx0bGV0IG5ld01lc3NhZ2UgPSB7XG5cdFx0XHRcdGRhdGE6ICRjdHJsLmNoYXRNZXNzYWdlLFxuXHRcdFx0XHR1cmw6IGAvYXBpL21lc3NhZ2VzLyR7JGN0cmwuY3VycmVudFVybH1gXG5cdFx0XHR9XG5cdFx0XHRIdHRwRmFjdG9yeS5wb3N0KG5ld01lc3NhZ2UpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHQkY3RybC5nZXRBbGxNZXNzYWdlcygpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRBbGxNZXNzYWdlcygpIHtcblx0XHRcdGxldCBnZXRNZXNzYWdlcyA9IHtcblx0XHRcdFx0dXJsOiBgL2FwaS9tZXNzYWdlcy8keyRjdHJsLmN1cnJlbnRVcmx9YFxuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkuZ2V0KGdldE1lc3NhZ2VzKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0JGN0cmwubWVzc2FnZXMgPSByZXMuZGF0YTtcblx0XHRcdFx0Y29uc29sZS5sb2coJGN0cmwubWVzc2FnZXMpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzdHJpcERhdGUoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIGRhdGUuc3Vic3RyaW5nKDAsMTApO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgWyckc3RhdGUnLCAnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgJyRsb2NhdGlvbicsXG5cdFx0ZnVuY3Rpb24oJHN0YXRlLCBBdXRoZW50aWNhdGlvblNlcnZpY2UsICRsb2NhdGlvbikge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBEYXNoYm9hcmRDdHJsXCIpO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0aWYgKCFBdXRoZW50aWNhdGlvblNlcnZpY2UuZ2V0VG9rZW4oKSkge1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnbG9nSW4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRjdHJsLnVzZXJOYW1lID0gQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCkuZW1haWw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBbJyRsb2NhdGlvbicsXG5cdCBcdCdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigkbG9jYXRpb24sIEF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgTG9naW5DdHJsIGN0cmxcIik7XG5cblx0XHQkY3RybC5vblN1Ym1pdCA9IG9uU3VibWl0O1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0JGN0cmwuY3JlZGVudGlhbHMgPSB7XG5cdFx0XHRcdGVtYWlsIDogXCJcIixcblx0XHRcdFx0cGFzc3dvcmQ6IFwiXCJcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblN1Ym1pdCgpIHtcbiAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZVxuICAgICAgLmxvZ2luKCRjdHJsLmNyZWRlbnRpYWxzKVxuICAgICAgLmVycm9yKChlcnIpID0+IHtcbiAgICAgICAgYWxlcnQoZXJyKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTE9HR0VEIElOXCIpXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCdob21lJyk7XG4gICAgICB9KTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignTmF2Q3RybCcsIFsnJHN0YXRlJywgJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsICckbG9jYXRpb24nLCBmdW5jdGlvbigkc3RhdGUsIEF1dGhlbnRpY2F0aW9uU2VydmljZSwgJGxvY2F0aW9uKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIE5hdkN0cmxcIik7XG5cdFx0Ly8gVEVNUExBVEUgSVMgTk9UIENPTk5FQ1RFRCBUTyBDT05UUk9MTEVSIEVSUk9SIVxuXHRcdCRjdHJsLmdldFVzZXIgPSBnZXRVc2VyO1xuXHRcdCRjdHJsLmxvZ291dCA9IGxvZ291dDtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLmxvZ2dlZEluID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0VXNlcigpIHtcblx0XHRcdCRjdHJsLnVzZXJEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItRGF0YScpXG5cdFx0XHQvL0pTT04uc3RyaW5naWZ5KGV2YWwoXCIoXCIgKyB1c2VyRGF0YSArIFwiKVwiKSlcblx0XHRcdCRjdHJsLnVzZXJEYXRhID0gSlNPTi5wYXJzZSgkY3RybC51c2VyRGF0YSlcblx0XHRcdCRjdHJsLnVzZXJOYW1lID0gJGN0cmwudXNlckRhdGEuZGF0YS5lbWFpbDtcblx0XHRcdGNvbnNvbGUubG9nKCRjdHJsLmxvZ2dlZEluKTtcblx0XHRcdCRjdHJsLmxvZ2dlZEluID0gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGxvZ291dCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiTE9HT1VUXCIpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItRGF0YScpO1xuXHRcdFx0JGxvY2F0aW9uLnVybChbJy8nXSk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ1Byb2ZpbGVDdHJsJywgWydVcGxvYWQnLCAnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgJyRodHRwJywgJyRsb2NhdGlvbicsICdIdHRwRmFjdG9yeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKFVwbG9hZCwgQXV0aGVudGljYXRpb25TZXJ2aWNlLCAkaHR0cCwgJGxvY2F0aW9uLCBIdHRwRmFjdG9yeSkge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdCRjdHJsLnVwbG9hZCA9IHVwbG9hZDtcblx0XHQkY3RybC5kZWxldGVQcm9maWxlID0gZGVsZXRlUHJvZmlsZTtcblx0XHQkY3RybC51cGRhdGVFbWFpbCA9IHVwZGF0ZUVtYWlsO1xuXHRcdCRjdHJsLnVwZGF0ZUJpbyA9IHVwZGF0ZUJpbztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBQcm9maWxlQ3RybFwiKTtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdGlmICghQXV0aGVudGljYXRpb25TZXJ2aWNlLmdldFRva2VuKCkpIHtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJ2xvZ0luJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC51c2VyID0gQXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdCRjdHJsLmVtYWlsID0gJGN0cmwudXNlci5lbWFpbDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGxvYWQoZSwgZmlsZSkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJmaWxlXCIsIGZpbGUpXG5cdFx0XHRpZihmaWxlKSB7XG5cdFx0XHRcdFVwbG9hZC51cGxvYWQoe1xuXHRcdFx0XHRcdHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJvZmlsZS91cGxvYWRQaG90b2AsXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdFx0ZGF0YToge2VtYWlsOiAkY3RybC5lbWFpbH0sXG5cdFx0XHRcdFx0ZmlsZTogZmlsZVxuXHRcdFx0XHR9KS5wcm9ncmVzcygoZXZ0KSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJmaXJpbmdcIik7XG5cdFx0XHRcdH0pLnN1Y2Nlc3MoKGRhdGEpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIik7XG5cdFx0XHRcdH0pLmVycm9yKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3JcIilcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlUHJvZmlsZSgpIHtcblx0XHRcdC8vY29uc3QgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB0aGF0IHlvdSB3YW50IHRvIGRlbGV0ZSB5b3VyIGFjY291bnQ/XCIpXG5cdFx0XHRjb25zb2xlLmxvZyhcImRlbGV0ZWluZ1wiKVxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0dXJsOiBgL2FwaS9wcm9maWxlL2RlbGV0ZS8keyRjdHJsLmVtYWlsfWBcblx0XHRcdH1cblx0XHRcdEh0dHBGYWN0b3J5LmRlbGV0ZShyZXF1ZXN0KS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0YWxlcnQoXCJZb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBkZWxldGVkXCIpO1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG5cdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvbG9naW4nXSk7XG5cdFx0XHR9KTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZUVtYWlsKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJ1cGRhdGluZyBlbWFpbCBhZHJlc3NcIilcblx0XHRcdGNvbnNvbGUubG9nKFwiRU1BSUxcIiwgJGN0cmwuZW1haWwpXG5cdFx0XHRjb25zdCByZXF1ZXN0ID0ge1xuXHRcdFx0XHR1cmw6ICcvYXBpL3Byb2ZpbGUvdXBkYXRlRW1haWwnLFxuXHRcdFx0XHRkYXRhOiAkY3RybC51c2VyXG5cdFx0XHR9XG5cblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QocmVxdWVzdCkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlcylcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZUJpbygpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwidXBkYXRpbmcgYmlvXCIpXG5cdFx0XHRjb25zdCByZXF1ZXN0ID0ge1xuXHRcdFx0XHR1cmw6ICcvYXBpL3Byb2ZpbGUvdXBkYXRlQmlvJyxcblx0XHRcdFx0ZGF0YTogJGN0cmwudXNlclxuXHRcdFx0fVxuXG5cdFx0XHRIdHRwRmFjdG9yeS5wb3N0KHJlcXVlc3QpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMpXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJywgWyckc3RhdGUnLCAnSHR0cEZhY3RvcnknLCAnJGxvY2F0aW9uJyxcblx0IFx0J0F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uKCRzdGF0ZSwgSHR0cEZhY3RvcnksICRsb2NhdGlvbiwgQXV0aGVudGljYXRpb25TZXJ2aWNlKSB7XG5cblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgUmVnaXN0ZXJDdHJsIGN0cmxcIik7XG5cblx0XHQkY3RybC5vblN1Ym1pdCA9IG9uU3VibWl0O1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0JGN0cmwuY3JlZGVudGlhbHMgPSB7XG5cdFx0XHRcdGVtYWlsIDogXCJcIixcblx0XHRcdFx0cGFzc3dvcmQ6IFwiXCJcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvblN1Ym1pdCgpIHtcblx0XHRcdEF1dGhlbnRpY2F0aW9uU2VydmljZVxuXHRcdFx0LnJlZ2lzdGVyKCRjdHJsLmNyZWRlbnRpYWxzKVxuXHRcdFx0LmVycm9yKChlcnIpID0+IHtcblx0XHRcdFx0XHRhbGVydChlcnIpO1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0JGxvY2F0aW9uLnVybChbJy9sb2dpbiddKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuICAuZGlyZWN0aXZlKCdjaGVja1VzZXInLCBbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ3VzZXJTcnYnLFxuICAgIGZ1bmN0aW9uICgkcm9vdCwgJGxvYywgdXNlclNydikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgICAgICAgICRyb290LiRvbignJHJvdXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihlLCBjdXJyLCBwcmV2KXtcbiAgICAgICAgICAgIGlmICghcHJldi5hY2Nlc3MuaXNGcmVlICYmICF1c2VyU3J2LmlzTG9nZ2VkKSB7XG4gICAgICAgICAgICAgIC8vIHJlbG9hZCB0aGUgbG9naW4gcm91dGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAqIElNUE9SVEFOVDpcbiAgICAgICAgICAgICogSXQncyBub3QgZGlmZmljdWx0IHRvIGZvb2wgdGhlIHByZXZpb3VzIGNvbnRyb2wsXG4gICAgICAgICAgICAqIHNvIGl0J3MgcmVhbGx5IElNUE9SVEFOVCB0byByZXBlYXQgc2VydmVyIHNpZGVcbiAgICAgICAgICAgICogdGhlIHNhbWUgY29udHJvbCBiZWZvcmUgc2VuZGluZyBiYWNrIHJlc2VydmVkIGRhdGEuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5zZXJ2aWNlKCdBdXRoZW50aWNhdGlvblNlcnZpY2UnLCBzZXJ2aWNlKTtcblxuICAgIHNlcnZpY2UuJGluamVjdCA9IFsnSHR0cEZhY3RvcnknLCAnJHdpbmRvdyddO1xuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gc2VydmljZShIdHRwRmFjdG9yeSwgJHdpbmRvdykge1xuICAgICAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgc2F2ZVRva2VuOiBzYXZlVG9rZW4sXG4gICAgICAgICAgICBnZXRUb2tlbjogZ2V0VG9rZW4sXG4gICAgICAgICAgICBsb2dvdXQ6IGxvZ291dCxcbiAgICAgICAgICAgIGlzTG9nZ2VkSW46IGlzTG9nZ2VkSW4sXG4gICAgICAgICAgICBjdXJyZW50VXNlcjogY3VycmVudFVzZXIsXG4gICAgICAgICAgICByZWdpc3RlcjogcmVnaXN0ZXIsXG4gICAgICAgICAgICBsb2dpbjogbG9naW5cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBzYXZlVG9rZW4odG9rZW4pIHtcbiAgICAgICAgICAgICR3aW5kb3cubG9jYWxTdG9yYWdlWydVc2VyLURhdGEnXSA9IHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgICAgICAgICAgcmV0dXJuICR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItRGF0YScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNMb2dnZWRJbigpIHtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IGdldFRva2VuKCk7XG4gICAgICAgICAgbGV0IHBheWxvYWQ7XG5cbiAgICAgICAgICBpZih0b2tlbil7XG4gICAgICAgICAgICBwYXlsb2FkID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgIHBheWxvYWQgPSAkd2luZG93LmF0b2IocGF5bG9hZCk7XG4gICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcblxuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQuZXhwID4gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gY3VycmVudFVzZXIoKSB7XG4gICAgICAgICAgaWYoaXNMb2dnZWRJbigpKXtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGdldFRva2VuKCk7XG4gICAgICAgICAgICB2YXIgcGF5bG9hZCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICBwYXlsb2FkID0gJHdpbmRvdy5hdG9iKHBheWxvYWQpO1xuICAgICAgICAgICAgcGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBlbWFpbCA6IHBheWxvYWQuZW1haWxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVnaXN0ZXIodXNlcikge1xuICAgICAgICAgIGxldCB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgIHVybDogJy9hcGkvdXNlcnMnLFxuICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gSHR0cEZhY3RvcnkucG9zdCh1c2VySW5mbykuc3VjY2VzcygocmVzKSA9PiB7XG4gICAgICAgICAgICBzYXZlVG9rZW4ocmVzLnRva2VuKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ2luKHVzZXIpIHtcbiAgICAgICAgICBsZXQgdXNlckluZm8gPSB7XG4gICAgICAgICAgICAgIHVybDogJy9hcGkvdXNlci9sb2dpbicsXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIEh0dHBGYWN0b3J5LnBvc3QodXNlckluZm8pLnN1Y2Nlc3MoKHJlcykgPT4ge1xuICAgICAgICAgICAgc2F2ZVRva2VuKHJlcy50b2tlbik7XG4gICAgICAgIH0pO1xufTtcbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLmZhY3RvcnkoJ0h0dHBGYWN0b3J5JywgZmFjdG9yeSk7XG5cbiAgICBmYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJ0NvbmZpZyddO1xuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gZmFjdG9yeSgkaHR0cCwgQ29uZmlnKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgICAgICBwdXQ6IHB1dCxcbiAgICAgICAgICAgIHBvc3Q6IHBvc3QsXG4gICAgICAgICAgICBkZWxldGU6IF9kZWxldGUsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0KG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgdXJsOiBDb25maWcuQVBJX0JBU0VfVVJMICsgb3B0aW9ucy51cmwsXG4gICAgICAgICAgICAgICAgY2FjaGU6IG9wdGlvbnMuY2FjaGUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2FjaGUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBraW5kOiBvcHRpb25zLmtpbmQsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBvcHRpb25zLnBhcmFtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwdXQob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwb3N0KG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgdXJsOiBDb25maWcuQVBJX0JBU0VfVVJMICsgb3B0aW9ucy51cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2RlbGV0ZShvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgdXJsOiBDb25maWcuQVBJX0JBU0VfVVJMICsgb3B0aW9ucy51cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuc2VydmljZSgnQ29uZmlnJywgU2VydmljZSk7XG5cblxuICAgIC8qIEBuZ0luamVjdCAqL1xuICAgIGZ1bmN0aW9uIFNlcnZpY2UoKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgJ0FQSV9CQVNFX1VSTCc6J2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
