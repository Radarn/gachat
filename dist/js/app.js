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
            controller: 'AuthenticationCtrl',
            controllerAs: '$ctrl'
        })

        .state('logIn', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'AuthenticationCtrl',
            controllerAs: '$ctrl',
            access: {
              isFree: true
            }
        })

        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'AuthenticationCtrl',
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
$templateCache.put('home.html','<h1>Logged in as: <a ui-sref="profile">{{$ctrl.currentUserName}}</a></h1>\n<div class="row home-menu">\n\t<div class="col s3">\n      \t<a ng-href="#/chat/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      \t<p>Counter-Strike: Global Offensive</p>\n\t</div>\n    <div class="col s3">\n  \t\t<a ng-href="#/chat/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n        <p>Dota 2</p>\n    </div>\n\n    <div class="col s3">\n  \t\t<a ng-href="#/chat/leagueoflegends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n  \t\t<p>League of Legends</p>\n      </div>\n     <div class="col s3">\n  \t\t<a ng-href="#/chat/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n  \t\t<p>Overwatch</p>\n\t</div>\n</div>\n');
$templateCache.put('login.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.logIn.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.logIn.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.logUserIn()">Log in\n                  <i class="material-icons right">send</i>\n            </button>\n            <a class="btn waves-effect waves-light" type="submit" name="action" href="#/signup">Create new user\n                  <i class="material-icons right">send</i>\n            </a>\n      </form>\n</div>\n');
$templateCache.put('navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n              <li><a href="#/about">About</a></li>\n              <li><a href="#"> {{$ctrl.userName}}</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('profile.edit.html','\n  <div class="file-field input-field" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n    accept="image/*">\n      <div class="btn">\n        <span>File</span>\n        <input type="file">\n      </div>\n      <div class="file-path-wrapper">\n        <input class="file-path validate" type="text">\n      </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <input id="textarea-username" type="text" class="validate" ng-model="$ctrl.user.username">\n      <label for="textarea-username">User name</label>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <textarea id="textarea-bio" class="materialize-textarea" length="120" ng-model="$ctrl.user.bio"></textarea>\n      <label for="textarea-bio">Your bio</label>\n    </div>\n  </div>\n\n  <button ng-click="$ctrl.upload(e, $ctrl.user.file)" class="btn waves-effect waves-light" type="submit" name="action">Update</button>\n');
$templateCache.put('profile.html','<div class="row profile">\n  <div class="col s3 offset-s3">\n    <a class="btn waves-effect waves-light btn-large" type="submit" name="action"\n      ui-sref="edit">Edit Profile</a>\n    </div>\n    <div class="col s3">\n      <button class="btn waves-effect waves-light btn-large red darken-1" type="submit" name="action"\n      ng-click="$ctrl.deleteProfile()">Delete Profile\n            <i class="material-icons right">send</i>\n      </button>\n    </div>\n</div>\n');
$templateCache.put('signup.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <h3>Create new user</h3>\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.newUser.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.newUser.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>      \n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.createUser()">Submit\n                  <i class="material-icons right">send</i>\n            </button>   \n      </form>\n</div>\n');
$templateCache.put('partials/navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n            <li><a ui-sref="profile">Profile</a></li>\n            <li><a href="#/about">About</a></li>\n            <li><a ng-click="$ctrl.logout()">Logout</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');}]);
'use strict';
(function() {

	angular.module('gachat')

	.controller('AuthenticationCtrl', ['$state', 'HttpFactory', '$location', function($state, HttpFactory, $location) {
		const $ctrl = this;
		console.log("this is AuthenticationCtrl ctrl");

		$ctrl.createUser = createUser;
		$ctrl.logUserIn = logUserIn;
		$ctrl.checkForUser = checkForUser;
		$ctrl.createCookie = createCookie;

		activate();
		function activate() {
			$ctrl.loggedIn = false;
			$ctrl.currentUrl = $state.current.url;
			if ($ctrl.currentUrl !== '/signup') {
				checkForUser();
			}
		}

		function checkForUser() {
			if (localStorage['User-Data']) {
				$ctrl.loggedIn = true;
				let userJsonObj = JSON.parse(localStorage.getItem('User-Data'))
				$ctrl.currentUserName = userJsonObj.data.email;
				$location.url(['/home']);
			} else {
				$ctrl.loggedIn = false;
				$location.url(['/']);
			}
		}

		function logUserIn() {
			$ctrl.userLogIn = {
				data: $ctrl.logIn,
				url: '/api/user/login'
			}

			HttpFactory.post($ctrl.userLogIn).then((res) => {
				if (res.data._id) {
					$ctrl.loggedIn = true;
					localStorage.setItem('User-Data', JSON.stringify(res));
					createCookie();
					$location.url(['/home'])
				} else {
					alert("Wrong information! Please try again")
					let input = document.getElementsByTagName('input');
					for (let i = 0; i < input.length; i++) {
						input[i].value = "";
					}
					$ctrl.loggedIn = false;
				}
			});
		}

		function createCookie() {
			let cookieInfo = {
				url: '/api/cookie'
			}
			HttpFactory.get(cookieInfo).then((res) => {
				console.log('cookie response', res);
				console.log(document.cookie);
			});
		}

		function createUser() {
			let newUser = {
				data: $ctrl.newUser,
				url: "/api/users"
			}
			console.log(`${$ctrl.newUser}`)
			HttpFactory.post(newUser).then((res) => {
				console.log(res.data);

				$location.url(['/login'])
			});
		}

	}]);
}());

'use strict';
(function() {

	angular.module('gachat')

	.controller('ChatCtrl', ['HttpFactory', '$state', '$location', function(HttpFactory, $state, $location) {
    const $ctrl = this;

		console.log("this is ChatCtrl");

		$ctrl.sendMessage = sendMessage;
		$ctrl.getAllMessages = getAllMessages;
		$ctrl.stripDate = stripDate;
		$ctrl.checkForUser = checkForUser;

		activate();

		function activate() {
			checkForUser();
			$ctrl.messages = "";
			$ctrl.currentUrl = $state.params.gameName;
			$ctrl.userName = JSON.parse(localStorage.getItem('User-Data')).data.email;
			getAllMessages();
		}

		function checkForUser() {
			if (localStorage['User-Data']) {
				$ctrl.loggedIn = true;
				let userJsonObj = JSON.parse(localStorage.getItem('User-Data'))
				$ctrl.currentUserName = userJsonObj.data.email;
			} else {
				$ctrl.loggedIn = false;
				$location.url(['/']);
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

	.controller('DashboardCtrl', ['$state', 'AuthenticationFactory', '$location', function($state, AuthenticationFactory, $location) {
		const $ctrl = this;

		console.log("this is DashboardCtrl");

		activate();

		function activate() {
			$ctrl.userData = localStorage.getItem('User-data')
			console.log($ctrl.userData);
			//JSON.stringify(eval("(" + userData + ")"))
			$ctrl.userData = JSON.parse($ctrl.userData)
			$ctrl.userName = $ctrl.userData.data.email;
		}


	}]);
}());

'use strict';
(function() {

	angular.module('gachat')

	.controller('NavCtrl', ['$state', 'AuthenticationFactory', '$location', function($state, AuthenticationFactory, $location) {
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

	.controller('ProfileCtrl', ['Upload', '$state', '$http', '$location', 'HttpFactory',
                          function(Upload, $state, $http, $location, HttpFactory) {
		const $ctrl = this;

		$ctrl.upload = upload;
		$ctrl.checkForUser = checkForUser;
		$ctrl.deleteProfile = deleteProfile;

		console.log("this is EditProfileCtrl");

		activate();

		function activate() {
			console.log($state)
			$ctrl.user = JSON.parse(localStorage.getItem('User-Data')) || undefined;
			checkForUser();
		}

		function checkForUser() {
			if (localStorage['User-Data']) {
				$ctrl.loggedIn = true;
				//let userJsonObj = JSON.parse(localStorage.getItem('User-Data'))
				$ctrl.currentUserName = $ctrl.user.data.email;
			} else {
				$ctrl.loggedIn = false;
				$location.url(['/']);
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
        .factory('AuthenticationFactory', factory);

    factory.$inject = ['HttpFactory'];

    /* @ngInject */
    function factory(HttpFactory) {
        var service = {
            getCurrentUser: getCurrentUser,
            loginUser: loginUser,
            getAuthToken: getAuthToken,
            setAuthToken: setAuthToken,
            logout: logout
        };

        return service;

        function getCurrentUser(options) {
            return $http({
                method: 'GET',
                headers: options.headers,
                url: Config.API_BASE_URL + options.url,
                cache: options.cache !== undefined ? options.cache : false,
                kind: options.kind,
                params: options.params
            });
        }

        function loginUser(options){
            return HttpFactory.post({
                url:'/api/user/login',
                data:options.data
            });
        }

        function getAuthToken(){
            return $window.localStorage.getItem('User-Data');
        }

        function setAuthToken(token){
            $http.defaults.headers.common.Authorization = 'Bearer '+ token;
            return $window.localStorage.setItem('User-Data', token);
        }

        function logout(){
            return $window.localStorage.removeItem('User-Data');
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2F1dGhlbnRpY2F0aW9uLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9jaGF0LmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL25hdmJhci5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcHJvZmlsZS5jb250cm9sbGVyLmpzIiwiZGlyZWN0aXZlcy9jaGVjay11c2VyLmRpcmVjdGl2ZS5qcyIsInNlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmZhY3RvcnkuanMiLCJzZXJ2aWNlcy9odHRwLmZhY3RvcnkuanMiLCJzZXJ2aWNlcy9zZXJ2ZXJDb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsUUFBUSxPQUFPLFVBQVUsQ0FBQyxhQUFhO0FBQ3ZDO0FDSEE7O0FBRUEsUUFBUSxPQUFPOztDQUVkLGdEQUFPLFNBQVMsZ0JBQWdCLG9CQUFvQjs7SUFFakQsbUJBQW1CLFVBQVU7O0lBRTdCOzs7O1NBSUssTUFBTSxVQUFVO1lBQ2IsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sU0FBUztZQUNaLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7WUFDZCxRQUFRO2NBQ04sUUFBUTs7OztTQUliLE1BQU0sUUFBUTtZQUNYLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFFBQVE7WUFDWCxLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxXQUFXO1VBQ2hCLGFBQWE7VUFDYixZQUFZO1VBQ1osY0FBYzs7O1NBR2YsTUFBTSxRQUFRO1VBQ2IsYUFBYTtVQUNiLFlBQVk7VUFDWixjQUFjOzs7O1NBSWYsTUFBTSxTQUFTO1lBQ1osS0FBSztZQUNM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QUFJLFFBQVE7WUFDakIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLFNBQVMsUUFBUTtnQkFDakIsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztRQUkzQyxTQUFTLEtBQUssUUFBUTtZQUNsQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztRQUkzQyxTQUFTLFFBQVEsUUFBUTtZQUNyQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztLQUk5QztBQ3hETCxDQUFDLFdBQVc7SUFDUjs7SUFFQTtTQUNLLE9BQU87U0FDUCxRQUFRLFVBQVU7Ozs7SUFJdkIsU0FBUyxVQUFVO1FBQ2YsSUFBSSxVQUFVO1lBQ1YsZUFBZTs7O1FBR25CLE9BQU87O0tBRVYiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JywgWyd1aS5yb3V0ZXInLCAnbmdGaWxlVXBsb2FkJ10pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG5cbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgLnN0YXRlKCdzaWduVXAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhlbnRpY2F0aW9uQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2xvZ0luJywge1xuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aGVudGljYXRpb25DdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcbiAgICAgICAgICAgIGFjY2Vzczoge1xuICAgICAgICAgICAgICBpc0ZyZWU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aGVudGljYXRpb25DdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnY2hhdCcsIHtcbiAgICAgICAgICAgIHVybDogJy9jaGF0LzpnYW1lTmFtZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NoYXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhdEN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdwcm9maWxlJywge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJvZmlsZS5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUN0cmwnLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnZWRpdCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUuZWRpdC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUN0cmwnLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC8vIEFCT1VUIFBBR0UgQU5EIE1VTFRJUExFIE5BTUVEIFZJRVdTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAuc3RhdGUoJ2Fib3V0Jywge1xuICAgICAgICAgICAgdXJsOiAnL2Fib3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYWJvdXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFib3V0IGNvbnRyb2xsZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHskdGVtcGxhdGVDYWNoZS5wdXQoJ2Fib3V0Lmh0bWwnLCc8aDE+QWJvdXQ8L2gxPicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdjaGF0Lmh0bWwnLCc8aDM+XFxuICA8c3Bhbj5DaGF0IHdpdGggb3RoZXIgZ2FtZXJzITwvc3Bhbj5cXG48L2gzPlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wgczhcIj5cXG4gICAgPHN0cm9uZz5NZXNzYWdlPC9zdHJvbmc+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wgczEgb2Zmc2V0LXMzXCI+XFxuICAgIDxzdHJvbmc+RGF0ZTwvc3Ryb25nPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgPGRpdiBjbGFzcz1cImNoYXQtYm94IGNvbCBzMTJcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvdyBtZXNzYWdlLWJvcmRlclwiIG5nLXJlcGVhdD1cIm1lc3NhZ2UgaW4gJGN0cmwubWVzc2FnZXNcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgICAgICA8c3Ryb25nPjxlbT57e21lc3NhZ2UudXNlcn19PC9lbT4gOjwvc3Ryb25nPlxcbiAgICAgICAge3ttZXNzYWdlLm1lc3NhZ2V9fVxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczIgb2Zmc2V0LXMyIHJpZ2h0LWFsaWduXCI+XFxuICAgICAgICB7eyRjdHJsLnN0cmlwRGF0ZShtZXNzYWdlLmRhdGUpfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8YnI+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTIgXCI+XFxuICAgIDx0ZXh0YXJlYSBuZy1tb2RlbD1cIiRjdHJsLmNoYXRNZXNzYWdlLm5ld01lc3NhZ2VcIiBpZD1cImljb25fcHJlZml4MlwiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWFcIj48L3RleHRhcmVhPlxcbiAgICA8bGFiZWwgZm9yPVwiaWNvbl9wcmVmaXgyXCI+TWVzc2FnZSB0ZXh0PC9sYWJlbD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxidXR0b24gbmctY2xpY2s9XCIkY3RybC5zZW5kTWVzc2FnZSgpXCJjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlNlbmQgbWVzc2FnZVxcbiAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG48L2J1dHRvbj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnaG9tZS5odG1sJywnPGgxPkxvZ2dlZCBpbiBhczogPGEgdWktc3JlZj1cInByb2ZpbGVcIj57eyRjdHJsLmN1cnJlbnRVc2VyTmFtZX19PC9hPjwvaDE+XFxuPGRpdiBjbGFzcz1cInJvdyBob21lLW1lbnVcIj5cXG5cXHQ8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgXFx0PGEgbmctaHJlZj1cIiMvY2hhdC9jb3VudGVyLXN0cmlrZTpnbG9iYWwtb2ZmZW5zaXZlXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9jc2dvLmpwZ1wiPjwvYT5cXG4gICAgICBcXHQ8cD5Db3VudGVyLVN0cmlrZTogR2xvYmFsIE9mZmVuc2l2ZTwvcD5cXG5cXHQ8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgXFx0XFx0PGEgbmctaHJlZj1cIiMvY2hhdC9kb3RhMlwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvZG90YTIucG5nXCI+PC9hPlxcbiAgICAgICAgPHA+RG90YSAyPC9wPlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgXFx0XFx0PGEgbmctaHJlZj1cIiMvY2hhdC9sZWFndWVvZmxlZ2VuZHNcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2xvbC5qcGVnXCI+PC9hPlxcbiAgXFx0XFx0PHA+TGVhZ3VlIG9mIExlZ2VuZHM8L3A+XFxuICAgICAgPC9kaXY+XFxuICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICBcXHRcXHQ8YSBuZy1ocmVmPVwiIy9jaGF0L292ZXJ3YXRjaFwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvb3ZlcndhdGNoLmpwZ1wiPjwvYT5cXG4gIFxcdFxcdDxwPk92ZXJ3YXRjaDwvcD5cXG5cXHQ8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbG9naW4uaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICA8Zm9ybSBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczRcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwubG9nSW4uZW1haWxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwubG9nSW4ucGFzc3dvcmRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIiBuZy1jbGljaz1cIiRjdHJsLmxvZ1VzZXJJbigpXCI+TG9nIGluXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIiBocmVmPVwiIy9zaWdudXBcIj5DcmVhdGUgbmV3IHVzZXJcXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgICA8L2E+XFxuICAgICAgPC9mb3JtPlxcbjwvZGl2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCduYXZiYXIuaHRtbCcsJzxuYXY+XFxuICAgIDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJicmFuZC1sb2dvXCI+R2FjaGF0PC9hPlxcblxcbiAgICAgICAgPHVsIGlkPVwibmF2LW1vYmlsZVwiIGNsYXNzPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cXG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiIy9hYm91dFwiPkFib3V0PC9hPjwvbGk+XFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj4ge3skY3RybC51c2VyTmFtZX19PC9hPjwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbjwvbmF2PlxcbicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwcm9maWxlLmVkaXQuaHRtbCcsJ1xcbiAgPGRpdiBjbGFzcz1cImZpbGUtZmllbGQgaW5wdXQtZmllbGRcIiBuZ2Ytc2VsZWN0IG5nLW1vZGVsPVwiJGN0cmwudXNlci5maWxlXCIgbmFtZT1cImZpbGVcIiBuZ2YtcGF0dGVybj1cIlxcJ2ltYWdlLypcXCdcIlxcbiAgICBhY2NlcHQ9XCJpbWFnZS8qXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImJ0blwiPlxcbiAgICAgICAgPHNwYW4+RmlsZTwvc3Bhbj5cXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXBhdGgtd3JhcHBlclwiPlxcbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZmlsZS1wYXRoIHZhbGlkYXRlXCIgdHlwZT1cInRleHRcIj5cXG4gICAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgIDxpbnB1dCBpZD1cInRleHRhcmVhLXVzZXJuYW1lXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC51c2VyLnVzZXJuYW1lXCI+XFxuICAgICAgPGxhYmVsIGZvcj1cInRleHRhcmVhLXVzZXJuYW1lXCI+VXNlciBuYW1lPC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cXG4gICAgICA8dGV4dGFyZWEgaWQ9XCJ0ZXh0YXJlYS1iaW9cIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCIgbGVuZ3RoPVwiMTIwXCIgbmctbW9kZWw9XCIkY3RybC51c2VyLmJpb1wiPjwvdGV4dGFyZWE+XFxuICAgICAgPGxhYmVsIGZvcj1cInRleHRhcmVhLWJpb1wiPllvdXIgYmlvPC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxidXR0b24gbmctY2xpY2s9XCIkY3RybC51cGxvYWQoZSwgJGN0cmwudXNlci5maWxlKVwiIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCI+VXBkYXRlPC9idXR0b24+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3Byb2ZpbGUuaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3cgcHJvZmlsZVwiPlxcbiAgPGRpdiBjbGFzcz1cImNvbCBzMyBvZmZzZXQtczNcIj5cXG4gICAgPGEgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0bi1sYXJnZVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCJcXG4gICAgICB1aS1zcmVmPVwiZWRpdFwiPkVkaXQgUHJvZmlsZTwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG4tbGFyZ2UgcmVkIGRhcmtlbi0xXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIlxcbiAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlUHJvZmlsZSgpXCI+RGVsZXRlIFByb2ZpbGVcXG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3NpZ251cC5odG1sJywnPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxmb3JtIGNsYXNzPVwiY29sIHM2IG9mZnNldC1zNFwiPlxcbiAgICAgICAgICAgIDxoMz5DcmVhdGUgbmV3IHVzZXI8L2gzPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiRW1haWxcIiBpZD1cImVtYWlsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5uZXdVc2VyLmVtYWlsXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWwgQWRyZXNzPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLm5ld1VzZXIucGFzc3dvcmRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PiAgICAgIFxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIiBuZy1jbGljaz1cIiRjdHJsLmNyZWF0ZVVzZXIoKVwiPlN1Ym1pdFxcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPiAgIFxcbiAgICAgIDwvZm9ybT5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgncGFydGlhbHMvbmF2YmFyLmh0bWwnLCc8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnJhbmQtbG9nb1wiPkdhY2hhdDwvYT5cXG4gICAgICAgIDx1bCBpZD1cIm5hdi1tb2JpbGVcIiBjbGFzcz1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XFxuICAgICAgICAgICAgPGxpPjxhIHVpLXNyZWY9XCJwcm9maWxlXCI+UHJvZmlsZTwvYT48L2xpPlxcbiAgICAgICAgICAgIDxsaT48YSBocmVmPVwiIy9hYm91dFwiPkFib3V0PC9hPjwvbGk+XFxuICAgICAgICAgICAgPGxpPjxhIG5nLWNsaWNrPVwiJGN0cmwubG9nb3V0KClcIj5Mb2dvdXQ8L2E+PC9saT5cXG4gICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9uYXY+XFxuJyk7fV0pOyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignQXV0aGVudGljYXRpb25DdHJsJywgWyckc3RhdGUnLCAnSHR0cEZhY3RvcnknLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHN0YXRlLCBIdHRwRmFjdG9yeSwgJGxvY2F0aW9uKSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBBdXRoZW50aWNhdGlvbkN0cmwgY3RybFwiKTtcblxuXHRcdCRjdHJsLmNyZWF0ZVVzZXIgPSBjcmVhdGVVc2VyO1xuXHRcdCRjdHJsLmxvZ1VzZXJJbiA9IGxvZ1VzZXJJbjtcblx0XHQkY3RybC5jaGVja0ZvclVzZXIgPSBjaGVja0ZvclVzZXI7XG5cdFx0JGN0cmwuY3JlYXRlQ29va2llID0gY3JlYXRlQ29va2llO1xuXG5cdFx0YWN0aXZhdGUoKTtcblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLmxvZ2dlZEluID0gZmFsc2U7XG5cdFx0XHQkY3RybC5jdXJyZW50VXJsID0gJHN0YXRlLmN1cnJlbnQudXJsO1xuXHRcdFx0aWYgKCRjdHJsLmN1cnJlbnRVcmwgIT09ICcvc2lnbnVwJykge1xuXHRcdFx0XHRjaGVja0ZvclVzZXIoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGVja0ZvclVzZXIoKSB7XG5cdFx0XHRpZiAobG9jYWxTdG9yYWdlWydVc2VyLURhdGEnXSkge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IHRydWU7XG5cdFx0XHRcdGxldCB1c2VySnNvbk9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItRGF0YScpKVxuXHRcdFx0XHQkY3RybC5jdXJyZW50VXNlck5hbWUgPSB1c2VySnNvbk9iai5kYXRhLmVtYWlsO1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2hvbWUnXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnLyddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBsb2dVc2VySW4oKSB7XG5cdFx0XHQkY3RybC51c2VyTG9nSW4gPSB7XG5cdFx0XHRcdGRhdGE6ICRjdHJsLmxvZ0luLFxuXHRcdFx0XHR1cmw6ICcvYXBpL3VzZXIvbG9naW4nXG5cdFx0XHR9XG5cblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QoJGN0cmwudXNlckxvZ0luKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0aWYgKHJlcy5kYXRhLl9pZCkge1xuXHRcdFx0XHRcdCRjdHJsLmxvZ2dlZEluID0gdHJ1ZTtcblx0XHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVXNlci1EYXRhJywgSlNPTi5zdHJpbmdpZnkocmVzKSk7XG5cdFx0XHRcdFx0Y3JlYXRlQ29va2llKCk7XG5cdFx0XHRcdFx0JGxvY2F0aW9uLnVybChbJy9ob21lJ10pXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJXcm9uZyBpbmZvcm1hdGlvbiEgUGxlYXNlIHRyeSBhZ2FpblwiKVxuXHRcdFx0XHRcdGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlucHV0W2ldLnZhbHVlID0gXCJcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JGN0cmwubG9nZ2VkSW4gPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY3JlYXRlQ29va2llKCkge1xuXHRcdFx0bGV0IGNvb2tpZUluZm8gPSB7XG5cdFx0XHRcdHVybDogJy9hcGkvY29va2llJ1xuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkuZ2V0KGNvb2tpZUluZm8pLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnY29va2llIHJlc3BvbnNlJywgcmVzKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNyZWF0ZVVzZXIoKSB7XG5cdFx0XHRsZXQgbmV3VXNlciA9IHtcblx0XHRcdFx0ZGF0YTogJGN0cmwubmV3VXNlcixcblx0XHRcdFx0dXJsOiBcIi9hcGkvdXNlcnNcIlxuXHRcdFx0fVxuXHRcdFx0Y29uc29sZS5sb2coYCR7JGN0cmwubmV3VXNlcn1gKVxuXHRcdFx0SHR0cEZhY3RvcnkucG9zdChuZXdVc2VyKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzLmRhdGEpO1xuXG5cdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvbG9naW4nXSlcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdDaGF0Q3RybCcsIFsnSHR0cEZhY3RvcnknLCAnJHN0YXRlJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKEh0dHBGYWN0b3J5LCAkc3RhdGUsICRsb2NhdGlvbikge1xuICAgIGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBDaGF0Q3RybFwiKTtcblxuXHRcdCRjdHJsLnNlbmRNZXNzYWdlID0gc2VuZE1lc3NhZ2U7XG5cdFx0JGN0cmwuZ2V0QWxsTWVzc2FnZXMgPSBnZXRBbGxNZXNzYWdlcztcblx0XHQkY3RybC5zdHJpcERhdGUgPSBzdHJpcERhdGU7XG5cdFx0JGN0cmwuY2hlY2tGb3JVc2VyID0gY2hlY2tGb3JVc2VyO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0Y2hlY2tGb3JVc2VyKCk7XG5cdFx0XHQkY3RybC5tZXNzYWdlcyA9IFwiXCI7XG5cdFx0XHQkY3RybC5jdXJyZW50VXJsID0gJHN0YXRlLnBhcmFtcy5nYW1lTmFtZTtcblx0XHRcdCRjdHJsLnVzZXJOYW1lID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1EYXRhJykpLmRhdGEuZW1haWw7XG5cdFx0XHRnZXRBbGxNZXNzYWdlcygpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoZWNrRm9yVXNlcigpIHtcblx0XHRcdGlmIChsb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddKSB7XG5cdFx0XHRcdCRjdHJsLmxvZ2dlZEluID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHVzZXJKc29uT2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1EYXRhJykpXG5cdFx0XHRcdCRjdHJsLmN1cnJlbnRVc2VyTmFtZSA9IHVzZXJKc29uT2JqLmRhdGEuZW1haWw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnLyddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcblx0XHRcdCRjdHJsLmNoYXRNZXNzYWdlLnR5cGUgPSAkY3RybC5jdXJyZW50VXJsO1xuXHRcdFx0JGN0cmwuY2hhdE1lc3NhZ2UudXNlciA9ICRjdHJsLnVzZXJOYW1lO1xuXHRcdFx0Y29uc29sZS5sb2coJGN0cmwuY2hhdE1lc3NhZ2UpO1xuXHRcdFx0bGV0IG5ld01lc3NhZ2UgPSB7XG5cdFx0XHRcdGRhdGE6ICRjdHJsLmNoYXRNZXNzYWdlLFxuXHRcdFx0XHR1cmw6IGAvYXBpL21lc3NhZ2VzLyR7JGN0cmwuY3VycmVudFVybH1gXG5cdFx0XHR9XG5cdFx0XHRIdHRwRmFjdG9yeS5wb3N0KG5ld01lc3NhZ2UpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHQkY3RybC5nZXRBbGxNZXNzYWdlcygpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRBbGxNZXNzYWdlcygpIHtcblx0XHRcdGxldCBnZXRNZXNzYWdlcyA9IHtcblx0XHRcdFx0dXJsOiBgL2FwaS9tZXNzYWdlcy8keyRjdHJsLmN1cnJlbnRVcmx9YFxuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkuZ2V0KGdldE1lc3NhZ2VzKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0JGN0cmwubWVzc2FnZXMgPSByZXMuZGF0YTtcblx0XHRcdFx0Y29uc29sZS5sb2coJGN0cmwubWVzc2FnZXMpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzdHJpcERhdGUoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIGRhdGUuc3Vic3RyaW5nKDAsMTApO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgWyckc3RhdGUnLCAnQXV0aGVudGljYXRpb25GYWN0b3J5JywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRzdGF0ZSwgQXV0aGVudGljYXRpb25GYWN0b3J5LCAkbG9jYXRpb24pIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgRGFzaGJvYXJkQ3RybFwiKTtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLnVzZXJEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItZGF0YScpXG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC51c2VyRGF0YSk7XG5cdFx0XHQvL0pTT04uc3RyaW5naWZ5KGV2YWwoXCIoXCIgKyB1c2VyRGF0YSArIFwiKVwiKSlcblx0XHRcdCRjdHJsLnVzZXJEYXRhID0gSlNPTi5wYXJzZSgkY3RybC51c2VyRGF0YSlcblx0XHRcdCRjdHJsLnVzZXJOYW1lID0gJGN0cmwudXNlckRhdGEuZGF0YS5lbWFpbDtcblx0XHR9XG5cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdOYXZDdHJsJywgWyckc3RhdGUnLCAnQXV0aGVudGljYXRpb25GYWN0b3J5JywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRzdGF0ZSwgQXV0aGVudGljYXRpb25GYWN0b3J5LCAkbG9jYXRpb24pIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgTmF2Q3RybFwiKTtcblx0XHQvLyBURU1QTEFURSBJUyBOT1QgQ09OTkVDVEVEIFRPIENPTlRST0xMRVIgRVJST1IhXG5cdFx0JGN0cmwuZ2V0VXNlciA9IGdldFVzZXI7XG5cdFx0JGN0cmwubG9nb3V0ID0gbG9nb3V0O1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0JGN0cmwubG9nZ2VkSW4gPSBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VyKCkge1xuXHRcdFx0JGN0cmwudXNlckRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1EYXRhJylcblx0XHRcdC8vSlNPTi5zdHJpbmdpZnkoZXZhbChcIihcIiArIHVzZXJEYXRhICsgXCIpXCIpKVxuXHRcdFx0JGN0cmwudXNlckRhdGEgPSBKU09OLnBhcnNlKCRjdHJsLnVzZXJEYXRhKVxuXHRcdFx0JGN0cmwudXNlck5hbWUgPSAkY3RybC51c2VyRGF0YS5kYXRhLmVtYWlsO1xuXHRcdFx0Y29uc29sZS5sb2coJGN0cmwubG9nZ2VkSW4pO1xuXHRcdFx0JGN0cmwubG9nZ2VkSW4gPSB0cnVlO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbG9nb3V0KCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJMT0dPVVRcIik7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1EYXRhJyk7XG5cdFx0XHQkbG9jYXRpb24udXJsKFsnLyddKTtcblx0XHR9XG5cblx0fV0pO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbigpIHtcblxuXHRhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuXHQuY29udHJvbGxlcignUHJvZmlsZUN0cmwnLCBbJ1VwbG9hZCcsICckc3RhdGUnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ0h0dHBGYWN0b3J5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oVXBsb2FkLCAkc3RhdGUsICRodHRwLCAkbG9jYXRpb24sIEh0dHBGYWN0b3J5KSB7XG5cdFx0Y29uc3QgJGN0cmwgPSB0aGlzO1xuXG5cdFx0JGN0cmwudXBsb2FkID0gdXBsb2FkO1xuXHRcdCRjdHJsLmNoZWNrRm9yVXNlciA9IGNoZWNrRm9yVXNlcjtcblx0XHQkY3RybC5kZWxldGVQcm9maWxlID0gZGVsZXRlUHJvZmlsZTtcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBFZGl0UHJvZmlsZUN0cmxcIik7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRjb25zb2xlLmxvZygkc3RhdGUpXG5cdFx0XHQkY3RybC51c2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1EYXRhJykpIHx8IHVuZGVmaW5lZDtcblx0XHRcdGNoZWNrRm9yVXNlcigpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoZWNrRm9yVXNlcigpIHtcblx0XHRcdGlmIChsb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddKSB7XG5cdFx0XHRcdCRjdHJsLmxvZ2dlZEluID0gdHJ1ZTtcblx0XHRcdFx0Ly9sZXQgdXNlckpzb25PYmogPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLURhdGEnKSlcblx0XHRcdFx0JGN0cmwuY3VycmVudFVzZXJOYW1lID0gJGN0cmwudXNlci5kYXRhLmVtYWlsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGN0cmwubG9nZ2VkSW4gPSBmYWxzZTtcblx0XHRcdFx0JGxvY2F0aW9uLnVybChbJy8nXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBsb2FkKGUsIGZpbGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiRklSSU5HXCIpO1xuXHRcdFx0Y29uc29sZS5sb2coZSwgZmlsZSk7XG5cdFx0XHRpZihmaWxlKSB7XG5cdFx0XHRcdFVwbG9hZC51cGxvYWQoe1xuXHRcdFx0XHRcdHVybDogJy9hcGkvcHJvZmlsZS9lZGl0Jyxcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0XHRkYXRhOiAkY3RybC51c2VyLmRhdGEuX2lkXG5cdFx0XHRcdH0pLnByb2dyZXNzKChldnQpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImZpcmluZ1wiKTtcblx0XHRcdFx0fSkuc3VjY2VzcygoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiKTtcblx0XHRcdFx0fSkuZXJyb3IoKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHlvdXIgYWNjb3VudD9cIilcblx0XHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdFx0Y29uc3QgdXNlcklkID0gJGN0cmwudXNlci5kYXRhLl9pZFxuXHRcdFx0XHRsZXQgY3VycmVudFVzZXIgPSB7XG5cdFx0XHRcdFx0ZGF0YTogJGN0cmwudXNlci5kYXRhLl9pZCxcblx0XHRcdFx0XHR1cmw6IGAvYXBpL3Byb2ZpbGUvZWRpdC8ke3VzZXJJZH1gXG5cdFx0XHRcdH1cblx0XHRcdFx0SHR0cEZhY3RvcnkuZGVsZXRlKGN1cnJlbnRVc2VyKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0XHRhbGVydChcIllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWRcIik7XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItRGF0YScpO1xuXHRcdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvbG9naW4nXSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cbiAgLmRpcmVjdGl2ZSgnY2hlY2tVc2VyJywgWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICd1c2VyU3J2JyxcbiAgICBmdW5jdGlvbiAoJHJvb3QsICRsb2MsIHVzZXJTcnYpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgICAkcm9vdC4kb24oJyRyb3V0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgY3VyciwgcHJldil7XG4gICAgICAgICAgICBpZiAoIXByZXYuYWNjZXNzLmlzRnJlZSAmJiAhdXNlclNydi5pc0xvZ2dlZCkge1xuICAgICAgICAgICAgICAvLyByZWxvYWQgdGhlIGxvZ2luIHJvdXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgKiBJTVBPUlRBTlQ6XG4gICAgICAgICAgICAqIEl0J3Mgbm90IGRpZmZpY3VsdCB0byBmb29sIHRoZSBwcmV2aW91cyBjb250cm9sLFxuICAgICAgICAgICAgKiBzbyBpdCdzIHJlYWxseSBJTVBPUlRBTlQgdG8gcmVwZWF0IHNlcnZlciBzaWRlXG4gICAgICAgICAgICAqIHRoZSBzYW1lIGNvbnRyb2wgYmVmb3JlIHNlbmRpbmcgYmFjayByZXNlcnZlZCBkYXRhLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnQXV0aGVudGljYXRpb25GYWN0b3J5JywgZmFjdG9yeSk7XG5cbiAgICBmYWN0b3J5LiRpbmplY3QgPSBbJ0h0dHBGYWN0b3J5J107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KEh0dHBGYWN0b3J5KSB7XG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgZ2V0Q3VycmVudFVzZXI6IGdldEN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgbG9naW5Vc2VyOiBsb2dpblVzZXIsXG4gICAgICAgICAgICBnZXRBdXRoVG9rZW46IGdldEF1dGhUb2tlbixcbiAgICAgICAgICAgIHNldEF1dGhUb2tlbjogc2V0QXV0aFRva2VuLFxuICAgICAgICAgICAgbG9nb3V0OiBsb2dvdXRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcihvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBvcHRpb25zLmNhY2hlICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNhY2hlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAga2luZDogb3B0aW9ucy5raW5kLFxuICAgICAgICAgICAgICAgIHBhcmFtczogb3B0aW9ucy5wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW5Vc2VyKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuIEh0dHBGYWN0b3J5LnBvc3Qoe1xuICAgICAgICAgICAgICAgIHVybDonL2FwaS91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOm9wdGlvbnMuZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRBdXRoVG9rZW4oKXtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLURhdGEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldEF1dGhUb2tlbih0b2tlbil7XG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbi5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnKyB0b2tlbjtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdVc2VyLURhdGEnLCB0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKXtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnSHR0cEZhY3RvcnknLCBmYWN0b3J5KTtcblxuICAgIGZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnQ29uZmlnJ107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KCRodHRwLCBDb25maWcpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIHB1dDogcHV0LFxuICAgICAgICAgICAgcG9zdDogcG9zdCxcbiAgICAgICAgICAgIGRlbGV0ZTogX2RlbGV0ZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogb3B0aW9ucy5jYWNoZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jYWNoZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG9wdGlvbnMua2luZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1dChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGVsZXRlKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5zZXJ2aWNlKCdDb25maWcnLCBTZXJ2aWNlKTtcblxuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gU2VydmljZSgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICAnQVBJX0JBU0VfVVJMJzonaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
