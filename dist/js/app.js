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

        .state('editProfile', {
          url: '/edit-profile',
          templateUrl: 'edit-profile.html',
          controller: 'EditProfileCtrl'
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
$templateCache.put('edit-profile.html','\n  <div class="file-field input-field" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n    accept="image/*">\n      <div class="btn">\n        <span>File</span>\n        <input type="file">\n      </div>\n      <div class="file-path-wrapper">\n        <input class="file-path validate" type="text">\n      </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <input id="textarea-username" type="text" class="validate" ng-model="$ctrl.user.username">\n      <label for="textarea-username">User name</label>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <textarea id="textarea-bio" class="materialize-textarea" length="120" ng-model="$ctrl.user.bio"></textarea>\n      <label for="textarea-bio">Your bio</label>\n    </div>\n  </div>\n\n  <button ng-click="$ctrl.upload(e, $ctrl.user.file)" class="btn waves-effect waves-light" type="submit" name="action">Update</button>\n');
$templateCache.put('home.html','<h1>Logged in as: <a href="#/edit-profile">{{$ctrl.currentUserName}}</a></h1>\n<div class="row home-menu">\n\t<div class="col s3">\n      \t<a ng-href="#/chat/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      \t<p>Counter-Strike: Global Offensive</p>\n\t</div>\n    <div class="col s3">\n  \t\t<a ng-href="#/chat/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n        <p>Dota 2</p>\n    </div>\n\n    <div class="col s3">\n  \t\t<a ng-href="#/chat/leagueoflegends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n  \t\t<p>League of Legends</p>\n      </div>\n     <div class="col s3">\n  \t\t<a ng-href="#/chat/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n  \t\t<p>Overwatch</p>\n\t</div>\n</div>\n');
$templateCache.put('login.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.logIn.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.logIn.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.logUserIn()">Log in\n                  <i class="material-icons right">send</i>\n            </button>\n            <a class="btn waves-effect waves-light" type="submit" name="action" href="#/signup">Create new user\n                  <i class="material-icons right">send</i>\n            </a>\n      </form>\n</div>\n');
$templateCache.put('navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n              <li><a href="#/about">About</a></li>\n              <li><a href="#"> {{$ctrl.userName}}</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('signup.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <h3>Create new user</h3>\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.newUser.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.newUser.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>      \n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.createUser()">Submit\n                  <i class="material-icons right">send</i>\n            </button>   \n      </form>\n</div>\n');}]);
'use strict';
(function() {

	angular.module('gachat')

	.controller('AuthenticationCtrl', ['$state', 'HttpFactory', '$location', function($state, HttpFactory, $location) {
		const $ctrl = this;
		console.log("this is AuthenticationCtrl ctrl");

		$ctrl.createUser = createUser;
		$ctrl.logUserIn = logUserIn;
		$ctrl.checkForUser = checkForUser;

		activate();
		function activate() {
			$ctrl.loggedIn = false;
			checkForUser();
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
				url: "/api/user/login"
			}

			HttpFactory.post($ctrl.userLogIn).then((res) => {
				if (res.data._id) {
					$ctrl.loggedIn = true;
					localStorage.setItem('User-Data', JSON.stringify(res));
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

		function createUser() {
			let newUser = {
				data: $ctrl.newUser,
				url: "/api/users"
			}
			console.log(`${$ctrl.newUser}`)
			HttpFactory.post(newUser).then((res) => {
				console.log(res.data);

				$location.url(['/home'])
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

	.controller('EditProfileCtrl', ['Upload', '$state', '$http', '$location',
                          function(Upload, $state, $http, $location) {
		const $ctrl = this;

		$ctrl.upload = upload;
		$ctrl.checkForUser = checkForUser;

		console.log("this is EditProfileCtrl");

		activate();

		function activate() {
			checkForUser();
			$ctrl.user = JSON.parse(localStorage['User-Data']) || undefined;
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

		function upload(e, file) {
			console.log("FIRING");
			e.preventDefault();
			console.log(e, file);
			if(file) {
				Upload.upload({
					url: '/profile/edit',
					method: 'POST',
					data: $ctrl.user._id
				}).progress((evt) => {
					console.log("firing");
				}).success((data) => {
					console.log("Success");
				}).error((error) => {
					console.log(error);
				})
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2F1dGhlbnRpY2F0aW9uLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9jaGF0LmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2VkaXQtcHJvZmlsZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbmF2YmFyLmNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmVzL2NoZWNrLXVzZXIuZGlyZWN0aXZlLmpzIiwic2VydmljZXMvYXV0aGVudGljYXRpb24uZmFjdG9yeS5qcyIsInNlcnZpY2VzL2h0dHAuZmFjdG9yeS5qcyIsInNlcnZpY2VzL3NlcnZlckNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxRQUFRLE9BQU8sVUFBVSxDQUFDLGFBQWE7QUFDdkM7QUNIQTs7QUFFQSxRQUFRLE9BQU87O0NBRWQsZ0RBQU8sU0FBUyxnQkFBZ0Isb0JBQW9COztJQUVqRCxtQkFBbUIsVUFBVTs7SUFFN0I7OztTQUdLLE1BQU0sVUFBVTtZQUNiLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFNBQVM7WUFDWixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjO1lBQ2QsUUFBUTtjQUNOLFFBQVE7Ozs7U0FJYixNQUFNLFFBQVE7WUFDWCxLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7O1NBR2pCLE1BQU0sZUFBZTtVQUNwQixLQUFLO1VBQ0wsYUFBYTtVQUNiLFlBQVk7Ozs7O1NBS2IsTUFBTSxTQUFTO1lBQ1osS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZLFdBQVc7Z0JBQ25CLFFBQVEsSUFBSTs7Ozs7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ZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcsIFsndWkucm91dGVyJywgJ25nRmlsZVVwbG9hZCddKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG5cbiAgICAkc3RhdGVQcm92aWRlclxuXG4gICAgICAgIC8vIEhPTUUgU1RBVEVTIEFORCBORVNURUQgVklFV1MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAuc3RhdGUoJ3NpZ25VcCcsIHtcbiAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzaWdudXAuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aGVudGljYXRpb25DdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnbG9nSW4nLCB7XG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoZW50aWNhdGlvbkN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnLFxuICAgICAgICAgICAgYWNjZXNzOiB7XG4gICAgICAgICAgICAgIGlzRnJlZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgIHVybDogJy9ob21lJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaG9tZS5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoZW50aWNhdGlvbkN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdjaGF0Jywge1xuICAgICAgICAgICAgdXJsOiAnL2NoYXQvOmdhbWVOYW1lJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY2hhdC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGF0Q3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2VkaXRQcm9maWxlJywge1xuICAgICAgICAgIHVybDogJy9lZGl0LXByb2ZpbGUnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZWRpdC1wcm9maWxlLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdFZGl0UHJvZmlsZUN0cmwnXG4gICAgICAgIH0pXG5cblxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhYm91dCBjb250cm9sbGVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7JHRlbXBsYXRlQ2FjaGUucHV0KCdhYm91dC5odG1sJywnPGgxPkFib3V0PC9oMT4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnY2hhdC5odG1sJywnPGgzPlxcbiAgPHNwYW4+Q2hhdCB3aXRoIG90aGVyIGdhbWVycyE8L3NwYW4+XFxuPC9oMz5cXG48ZGl2IGNsYXNzPVwicm93XCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHM4XCI+XFxuICAgIDxzdHJvbmc+TWVzc2FnZTwvc3Ryb25nPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY29sIHMxIG9mZnNldC1zM1wiPlxcbiAgICA8c3Ryb25nPkRhdGU8L3N0cm9uZz5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJjaGF0LWJveCBjb2wgczEyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3cgbWVzc2FnZS1ib3JkZXJcIiBuZy1yZXBlYXQ9XCJtZXNzYWdlIGluICRjdHJsLm1lc3NhZ2VzXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzOFwiPlxcbiAgICAgICAgPHN0cm9uZz48ZW0+e3ttZXNzYWdlLnVzZXJ9fTwvZW0+IDo8L3N0cm9uZz5cXG4gICAgICAgIHt7bWVzc2FnZS5tZXNzYWdlfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMyIG9mZnNldC1zMiByaWdodC1hbGlnblwiPlxcbiAgICAgICAge3skY3RybC5zdHJpcERhdGUobWVzc2FnZS5kYXRlKX19XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGJyPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyIFwiPlxcbiAgICA8dGV4dGFyZWEgbmctbW9kZWw9XCIkY3RybC5jaGF0TWVzc2FnZS5uZXdNZXNzYWdlXCIgaWQ9XCJpY29uX3ByZWZpeDJcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCI+PC90ZXh0YXJlYT5cXG4gICAgPGxhYmVsIGZvcj1cImljb25fcHJlZml4MlwiPk1lc3NhZ2UgdGV4dDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48YnV0dG9uIG5nLWNsaWNrPVwiJGN0cmwuc2VuZE1lc3NhZ2UoKVwiY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5TZW5kIG1lc3NhZ2VcXG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuPC9idXR0b24+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2VkaXQtcHJvZmlsZS5odG1sJywnXFxuICA8ZGl2IGNsYXNzPVwiZmlsZS1maWVsZCBpbnB1dC1maWVsZFwiIG5nZi1zZWxlY3QgbmctbW9kZWw9XCIkY3RybC51c2VyLmZpbGVcIiBuYW1lPVwiZmlsZVwiIG5nZi1wYXR0ZXJuPVwiXFwnaW1hZ2UvKlxcJ1wiXFxuICAgIGFjY2VwdD1cImltYWdlLypcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XFxuICAgICAgICA8c3Bhbj5GaWxlPC9zcGFuPlxcbiAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCI+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImZpbGUtcGF0aC13cmFwcGVyXCI+XFxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmaWxlLXBhdGggdmFsaWRhdGVcIiB0eXBlPVwidGV4dFwiPlxcbiAgICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XFxuICAgICAgPGlucHV0IGlkPVwidGV4dGFyZWEtdXNlcm5hbWVcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLnVzZXIudXNlcm5hbWVcIj5cXG4gICAgICA8bGFiZWwgZm9yPVwidGV4dGFyZWEtdXNlcm5hbWVcIj5Vc2VyIG5hbWU8L2xhYmVsPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxcbiAgICAgIDx0ZXh0YXJlYSBpZD1cInRleHRhcmVhLWJpb1wiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWFcIiBsZW5ndGg9XCIxMjBcIiBuZy1tb2RlbD1cIiRjdHJsLnVzZXIuYmlvXCI+PC90ZXh0YXJlYT5cXG4gICAgICA8bGFiZWwgZm9yPVwidGV4dGFyZWEtYmlvXCI+WW91ciBiaW88L2xhYmVsPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cIiRjdHJsLnVwbG9hZChlLCAkY3RybC51c2VyLmZpbGUpXCIgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5VcGRhdGU8L2J1dHRvbj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnaG9tZS5odG1sJywnPGgxPkxvZ2dlZCBpbiBhczogPGEgaHJlZj1cIiMvZWRpdC1wcm9maWxlXCI+e3skY3RybC5jdXJyZW50VXNlck5hbWV9fTwvYT48L2gxPlxcbjxkaXYgY2xhc3M9XCJyb3cgaG9tZS1tZW51XCI+XFxuXFx0PGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgICAgIFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvY291bnRlci1zdHJpa2U6Z2xvYmFsLW9mZmVuc2l2ZVwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvY3Nnby5qcGdcIj48L2E+XFxuICAgICAgXFx0PHA+Q291bnRlci1TdHJpa2U6IEdsb2JhbCBPZmZlbnNpdmU8L3A+XFxuXFx0PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gIFxcdFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvZG90YTJcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2RvdGEyLnBuZ1wiPjwvYT5cXG4gICAgICAgIDxwPkRvdGEgMjwvcD5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gIFxcdFxcdDxhIG5nLWhyZWY9XCIjL2NoYXQvbGVhZ3Vlb2ZsZWdlbmRzXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9sb2wuanBlZ1wiPjwvYT5cXG4gIFxcdFxcdDxwPkxlYWd1ZSBvZiBMZWdlbmRzPC9wPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgXFx0XFx0PGEgbmctaHJlZj1cIiMvY2hhdC9vdmVyd2F0Y2hcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL292ZXJ3YXRjaC5qcGdcIj48L2E+XFxuICBcXHRcXHQ8cD5PdmVyd2F0Y2g8L3A+XFxuXFx0PC9kaXY+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2xvZ2luLmh0bWwnLCc8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgPGZvcm0gY2xhc3M9XCJjb2wgczYgb2Zmc2V0LXM0XCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIGlkPVwiZW1haWxcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLmxvZ0luLmVtYWlsXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWwgQWRyZXNzPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLmxvZ0luLnBhc3N3b3JkXCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCIgbmctY2xpY2s9XCIkY3RybC5sb2dVc2VySW4oKVwiPkxvZyBpblxcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCIgaHJlZj1cIiMvc2lnbnVwXCI+Q3JlYXRlIG5ldyB1c2VyXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgIDwvZm9ybT5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmF2YmFyLmh0bWwnLCc8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnJhbmQtbG9nb1wiPkdhY2hhdDwvYT5cXG5cXG4gICAgICAgIDx1bCBpZD1cIm5hdi1tb2JpbGVcIiBjbGFzcz1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+IHt7JGN0cmwudXNlck5hbWV9fTwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L25hdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnc2lnbnVwLmh0bWwnLCc8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgPGZvcm0gY2xhc3M9XCJjb2wgczYgb2Zmc2V0LXM0XCI+XFxuICAgICAgICAgICAgPGgzPkNyZWF0ZSBuZXcgdXNlcjwvaDM+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIGlkPVwiZW1haWxcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLm5ld1VzZXIuZW1haWxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwubmV3VXNlci5wYXNzd29yZFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+ICAgICAgXFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiIG5nLWNsaWNrPVwiJGN0cmwuY3JlYXRlVXNlcigpXCI+U3VibWl0XFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9idXR0b24+ICAgXFxuICAgICAgPC9mb3JtPlxcbjwvZGl2PlxcbicpO31dKTsiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0F1dGhlbnRpY2F0aW9uQ3RybCcsIFsnJHN0YXRlJywgJ0h0dHBGYWN0b3J5JywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRzdGF0ZSwgSHR0cEZhY3RvcnksICRsb2NhdGlvbikge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgQXV0aGVudGljYXRpb25DdHJsIGN0cmxcIik7XG5cblx0XHQkY3RybC5jcmVhdGVVc2VyID0gY3JlYXRlVXNlcjtcblx0XHQkY3RybC5sb2dVc2VySW4gPSBsb2dVc2VySW47XG5cdFx0JGN0cmwuY2hlY2tGb3JVc2VyID0gY2hlY2tGb3JVc2VyO1xuXG5cdFx0YWN0aXZhdGUoKTtcblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLmxvZ2dlZEluID0gZmFsc2U7XG5cdFx0XHRjaGVja0ZvclVzZXIoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGVja0ZvclVzZXIoKSB7XG5cdFx0XHRpZiAobG9jYWxTdG9yYWdlWydVc2VyLURhdGEnXSkge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IHRydWU7XG5cdFx0XHRcdGxldCB1c2VySnNvbk9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItRGF0YScpKVxuXHRcdFx0XHQkY3RybC5jdXJyZW50VXNlck5hbWUgPSB1c2VySnNvbk9iai5kYXRhLmVtYWlsO1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2hvbWUnXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnLyddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBsb2dVc2VySW4oKSB7XG5cdFx0XHQkY3RybC51c2VyTG9nSW4gPSB7XG5cdFx0XHRcdGRhdGE6ICRjdHJsLmxvZ0luLFxuXHRcdFx0XHR1cmw6IFwiL2FwaS91c2VyL2xvZ2luXCJcblx0XHRcdH1cblxuXHRcdFx0SHR0cEZhY3RvcnkucG9zdCgkY3RybC51c2VyTG9nSW4pLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRpZiAocmVzLmRhdGEuX2lkKSB7XG5cdFx0XHRcdFx0JGN0cmwubG9nZ2VkSW4gPSB0cnVlO1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdVc2VyLURhdGEnLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcblx0XHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2hvbWUnXSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbGVydChcIldyb25nIGluZm9ybWF0aW9uISBQbGVhc2UgdHJ5IGFnYWluXCIpXG5cdFx0XHRcdFx0bGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0Jyk7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aW5wdXRbaV0udmFsdWUgPSBcIlwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjcmVhdGVVc2VyKCkge1xuXHRcdFx0bGV0IG5ld1VzZXIgPSB7XG5cdFx0XHRcdGRhdGE6ICRjdHJsLm5ld1VzZXIsXG5cdFx0XHRcdHVybDogXCIvYXBpL3VzZXJzXCJcblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKGAkeyRjdHJsLm5ld1VzZXJ9YClcblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QobmV3VXNlcikudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblxuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnL2hvbWUnXSlcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdDaGF0Q3RybCcsIFsnSHR0cEZhY3RvcnknLCAnJHN0YXRlJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKEh0dHBGYWN0b3J5LCAkc3RhdGUsICRsb2NhdGlvbikge1xuICAgIGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBDaGF0Q3RybFwiKTtcblxuXHRcdCRjdHJsLnNlbmRNZXNzYWdlID0gc2VuZE1lc3NhZ2U7XG5cdFx0JGN0cmwuZ2V0QWxsTWVzc2FnZXMgPSBnZXRBbGxNZXNzYWdlcztcblx0XHQkY3RybC5zdHJpcERhdGUgPSBzdHJpcERhdGU7XG5cdFx0JGN0cmwuY2hlY2tGb3JVc2VyID0gY2hlY2tGb3JVc2VyO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0Y2hlY2tGb3JVc2VyKCk7XG5cdFx0XHQkY3RybC5tZXNzYWdlcyA9IFwiXCI7XG5cdFx0XHQkY3RybC5jdXJyZW50VXJsID0gJHN0YXRlLnBhcmFtcy5nYW1lTmFtZTtcblx0XHRcdCRjdHJsLnVzZXJOYW1lID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1EYXRhJykpLmRhdGEuZW1haWw7XG5cdFx0XHRnZXRBbGxNZXNzYWdlcygpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoZWNrRm9yVXNlcigpIHtcblx0XHRcdGlmIChsb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddKSB7XG5cdFx0XHRcdCRjdHJsLmxvZ2dlZEluID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHVzZXJKc29uT2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1EYXRhJykpXG5cdFx0XHRcdCRjdHJsLmN1cnJlbnRVc2VyTmFtZSA9IHVzZXJKc29uT2JqLmRhdGEuZW1haWw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnLyddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcblx0XHRcdCRjdHJsLmNoYXRNZXNzYWdlLnR5cGUgPSAkY3RybC5jdXJyZW50VXJsO1xuXHRcdFx0JGN0cmwuY2hhdE1lc3NhZ2UudXNlciA9ICRjdHJsLnVzZXJOYW1lO1xuXHRcdFx0Y29uc29sZS5sb2coJGN0cmwuY2hhdE1lc3NhZ2UpO1xuXHRcdFx0bGV0IG5ld01lc3NhZ2UgPSB7XG5cdFx0XHRcdGRhdGE6ICRjdHJsLmNoYXRNZXNzYWdlLFxuXHRcdFx0XHR1cmw6IGAvYXBpL21lc3NhZ2VzLyR7JGN0cmwuY3VycmVudFVybH1gXG5cdFx0XHR9XG5cdFx0XHRIdHRwRmFjdG9yeS5wb3N0KG5ld01lc3NhZ2UpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHQkY3RybC5nZXRBbGxNZXNzYWdlcygpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRBbGxNZXNzYWdlcygpIHtcblx0XHRcdGxldCBnZXRNZXNzYWdlcyA9IHtcblx0XHRcdFx0dXJsOiBgL2FwaS9tZXNzYWdlcy8keyRjdHJsLmN1cnJlbnRVcmx9YFxuXHRcdFx0fVxuXHRcdFx0SHR0cEZhY3RvcnkuZ2V0KGdldE1lc3NhZ2VzKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0JGN0cmwubWVzc2FnZXMgPSByZXMuZGF0YTtcblx0XHRcdFx0Y29uc29sZS5sb2coJGN0cmwubWVzc2FnZXMpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzdHJpcERhdGUoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIGRhdGUuc3Vic3RyaW5nKDAsMTApO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgWyckc3RhdGUnLCAnQXV0aGVudGljYXRpb25GYWN0b3J5JywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRzdGF0ZSwgQXV0aGVudGljYXRpb25GYWN0b3J5LCAkbG9jYXRpb24pIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgRGFzaGJvYXJkQ3RybFwiKTtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdCRjdHJsLnVzZXJEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItZGF0YScpXG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC51c2VyRGF0YSk7XG5cdFx0XHQvL0pTT04uc3RyaW5naWZ5KGV2YWwoXCIoXCIgKyB1c2VyRGF0YSArIFwiKVwiKSlcblx0XHRcdCRjdHJsLnVzZXJEYXRhID0gSlNPTi5wYXJzZSgkY3RybC51c2VyRGF0YSlcblx0XHRcdCRjdHJsLnVzZXJOYW1lID0gJGN0cmwudXNlckRhdGEuZGF0YS5lbWFpbDtcblx0XHR9XG5cblxuXHR9XSk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdFZGl0UHJvZmlsZUN0cmwnLCBbJ1VwbG9hZCcsICckc3RhdGUnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oVXBsb2FkLCAkc3RhdGUsICRodHRwLCAkbG9jYXRpb24pIHtcblx0XHRjb25zdCAkY3RybCA9IHRoaXM7XG5cblx0XHQkY3RybC51cGxvYWQgPSB1cGxvYWQ7XG5cdFx0JGN0cmwuY2hlY2tGb3JVc2VyID0gY2hlY2tGb3JVc2VyO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIEVkaXRQcm9maWxlQ3RybFwiKTtcblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcdGNoZWNrRm9yVXNlcigpO1xuXHRcdFx0JGN0cmwudXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlWydVc2VyLURhdGEnXSkgfHwgdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoZWNrRm9yVXNlcigpIHtcblx0XHRcdGlmIChsb2NhbFN0b3JhZ2VbJ1VzZXItRGF0YSddKSB7XG5cdFx0XHRcdCRjdHJsLmxvZ2dlZEluID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHVzZXJKc29uT2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1EYXRhJykpXG5cdFx0XHRcdCRjdHJsLmN1cnJlbnRVc2VyTmFtZSA9IHVzZXJKc29uT2JqLmRhdGEuZW1haWw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdFx0XHQkbG9jYXRpb24udXJsKFsnLyddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGxvYWQoZSwgZmlsZSkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJGSVJJTkdcIik7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zb2xlLmxvZyhlLCBmaWxlKTtcblx0XHRcdGlmKGZpbGUpIHtcblx0XHRcdFx0VXBsb2FkLnVwbG9hZCh7XG5cdFx0XHRcdFx0dXJsOiAnL3Byb2ZpbGUvZWRpdCcsXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdFx0ZGF0YTogJGN0cmwudXNlci5faWRcblx0XHRcdFx0fSkucHJvZ3Jlc3MoKGV2dCkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZmlyaW5nXCIpO1xuXHRcdFx0XHR9KS5zdWNjZXNzKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJTdWNjZXNzXCIpO1xuXHRcdFx0XHR9KS5lcnJvcigoZXJyb3IpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ05hdkN0cmwnLCBbJyRzdGF0ZScsICdBdXRoZW50aWNhdGlvbkZhY3RvcnknLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHN0YXRlLCBBdXRoZW50aWNhdGlvbkZhY3RvcnksICRsb2NhdGlvbikge1xuXHRcdGNvbnN0ICRjdHJsID0gdGhpcztcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBOYXZDdHJsXCIpO1xuXHRcdC8vIFRFTVBMQVRFIElTIE5PVCBDT05ORUNURUQgVE8gQ09OVFJPTExFUiBFUlJPUiFcblx0XHQkY3RybC5nZXRVc2VyID0gZ2V0VXNlcjtcblx0XHQkY3RybC5sb2dvdXQgPSBsb2dvdXQ7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHQkY3RybC5sb2dnZWRJbiA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFVzZXIoKSB7XG5cdFx0XHQkY3RybC51c2VyRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLURhdGEnKVxuXHRcdFx0Ly9KU09OLnN0cmluZ2lmeShldmFsKFwiKFwiICsgdXNlckRhdGEgKyBcIilcIikpXG5cdFx0XHQkY3RybC51c2VyRGF0YSA9IEpTT04ucGFyc2UoJGN0cmwudXNlckRhdGEpXG5cdFx0XHQkY3RybC51c2VyTmFtZSA9ICRjdHJsLnVzZXJEYXRhLmRhdGEuZW1haWw7XG5cdFx0XHRjb25zb2xlLmxvZygkY3RybC5sb2dnZWRJbik7XG5cdFx0XHQkY3RybC5sb2dnZWRJbiA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBsb2dvdXQoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkxPR09VVFwiKTtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcblx0XHRcdCRsb2NhdGlvbi51cmwoWycvJ10pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cbiAgLmRpcmVjdGl2ZSgnY2hlY2tVc2VyJywgWyckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICd1c2VyU3J2JyxcbiAgICBmdW5jdGlvbiAoJHJvb3QsICRsb2MsIHVzZXJTcnYpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgICAkcm9vdC4kb24oJyRyb3V0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgY3VyciwgcHJldil7XG4gICAgICAgICAgICBpZiAoIXByZXYuYWNjZXNzLmlzRnJlZSAmJiAhdXNlclNydi5pc0xvZ2dlZCkge1xuICAgICAgICAgICAgICAvLyByZWxvYWQgdGhlIGxvZ2luIHJvdXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgKiBJTVBPUlRBTlQ6XG4gICAgICAgICAgICAqIEl0J3Mgbm90IGRpZmZpY3VsdCB0byBmb29sIHRoZSBwcmV2aW91cyBjb250cm9sLFxuICAgICAgICAgICAgKiBzbyBpdCdzIHJlYWxseSBJTVBPUlRBTlQgdG8gcmVwZWF0IHNlcnZlciBzaWRlXG4gICAgICAgICAgICAqIHRoZSBzYW1lIGNvbnRyb2wgYmVmb3JlIHNlbmRpbmcgYmFjayByZXNlcnZlZCBkYXRhLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnQXV0aGVudGljYXRpb25GYWN0b3J5JywgZmFjdG9yeSk7XG5cbiAgICBmYWN0b3J5LiRpbmplY3QgPSBbJ0h0dHBGYWN0b3J5J107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KEh0dHBGYWN0b3J5KSB7XG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgZ2V0Q3VycmVudFVzZXI6IGdldEN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgbG9naW5Vc2VyOiBsb2dpblVzZXIsXG4gICAgICAgICAgICBnZXRBdXRoVG9rZW46IGdldEF1dGhUb2tlbixcbiAgICAgICAgICAgIHNldEF1dGhUb2tlbjogc2V0QXV0aFRva2VuLFxuICAgICAgICAgICAgbG9nb3V0OiBsb2dvdXRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcihvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBvcHRpb25zLmNhY2hlICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNhY2hlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAga2luZDogb3B0aW9ucy5raW5kLFxuICAgICAgICAgICAgICAgIHBhcmFtczogb3B0aW9ucy5wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW5Vc2VyKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuIEh0dHBGYWN0b3J5LnBvc3Qoe1xuICAgICAgICAgICAgICAgIHVybDonL2FwaS91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOm9wdGlvbnMuZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRBdXRoVG9rZW4oKXtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLURhdGEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldEF1dGhUb2tlbih0b2tlbil7XG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbi5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnKyB0b2tlbjtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdVc2VyLURhdGEnLCB0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKXtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLURhdGEnKTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnSHR0cEZhY3RvcnknLCBmYWN0b3J5KTtcblxuICAgIGZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnQ29uZmlnJ107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KCRodHRwLCBDb25maWcpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIHB1dDogcHV0LFxuICAgICAgICAgICAgcG9zdDogcG9zdCxcbiAgICAgICAgICAgIGRlbGV0ZTogX2RlbGV0ZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogb3B0aW9ucy5jYWNoZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jYWNoZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG9wdGlvbnMua2luZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1dChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGVsZXRlKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5zZXJ2aWNlKCdDb25maWcnLCBTZXJ2aWNlKTtcblxuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gU2VydmljZSgpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICAnQVBJX0JBU0VfVVJMJzonaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
