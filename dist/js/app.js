'use strict';

angular.module('gachat', ['ui.router']);


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
            controllerAs: '$ctrl'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'DashboardCtrl',
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
$templateCache.put('home.html','<h1>Logged in</h1>\n<div class="row">\n\t<div class="col s3">\n      \t<a href="#/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      \t<p>Counter-Strike: Global Offensive</p>\n\t</div>\n    <div class="col s3">\n  \t\t<a href="#/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n        <p>Dota 2</p>\n    </div>\n    <div class="col s3">\n  \t\t<a href="#/league-of-legends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n  \t\t<p>League of Legends</p>\n      </div>\n     <div class="col s3">\n  \t\t<a href="#/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n  \t\t<p>Overwatch</p>\n\t</div>\n</div>');
$templateCache.put('login.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.logIn.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.logIn.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>      \n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.logUserIn()">Log in\n                  <i class="material-icons right">send</i>\n            </button>  \n            <a class="btn waves-effect waves-light" type="submit" name="action" href="#/signup">Create new user\n                  <i class="material-icons right">send</i>\n            </a>   \n      </form>\n</div>\n');
$templateCache.put('signup.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <h3>Create new user</h3>\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.newUser.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.newUser.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>      \n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.createUser()">Submit\n                  <i class="material-icons right">send</i>\n            </button>   \n      </form>\n      <!--<div class="col s3">\n      \t<a href="#/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      \t<p>Counter-Strike: Global Offensive</p>\n      </div>\n      <div class="col s3">\n      \t<a href="#/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n            <p>Dota 2</p>\n      </div>\n      <div class="col s3">\n      \t<a href="#/league-of-legends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n      \t<p>League of Legends</p>\n      </div>\n      <div class="col s3">\n      \t<a href="#/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n      \t<p>Overwatch</p>\n      </div>-->\n</div>\n');}]);
'use strict';
(function() {

	angular.module('gachat')

	.controller('AuthenticationCtrl', ['$state', 'HttpFactory', '$location', function($state, HttpFactory, $location) {
		var $ctrl = this;
		console.log("this is AuthenticationCtrl ctrl");

		$ctrl.createUser = createUser;
		$ctrl.logUserIn = logUserIn;

		activate();

		function activate() {
			//$ctrl.loggedIn;
		}

		if (localStorage['User-data']) {

		}

		function logUserIn() {
			$ctrl.userLogIn = {
				data: $ctrl.logIn,
				url: "/api/user/login"
			}
			
			HttpFactory.post($ctrl.userLogIn).then(function(res) {
				if (res.data._id) {
					
					localStorage.setItem('User-Data', JSON.stringify(res));
					$location.url(['/home'])
				} else {
					alert("Wrong information! Please try again")
					let input = document.getElementsByTagName('input');
					for (let i = 0; i < input.length; i++) {
						input[i].value = "";
					}
					//$ctrl.loggedIn = false;
				}
			});
		}

		function createUser() {
			var newUser = {
				data: $ctrl.newUser,
				url: "/api/users"
			}
			console.log(`${$ctrl.newUser}`)
			HttpFactory.post(newUser).then(function(res) {
				console.log(res.data);
				
				$location.url(['/home'])
			});
		}

	}]);
}());
'use strict';
(function() {

	angular.module('gachat')

	.controller('DashboardCtrl', ['$state', 'AuthenticationFactory', '$location', function($state, AuthenticationFactory, $location) {
		var $ctrl = this;
		
		console.log("this is DashboardCtrl ctrl");

		$ctrl.getUser = getUser;
		
		activate();

		function activate() {
			
		}

		function getUser() {
			//AuthenticationFactory.getCurrentUser()
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
                url:'/api-token-auth/',
                data:options.data
            });
        }

        function getAuthToken(){
            return $window.localStorage.getItem('WS.DATAWAREHOUSE.TOKEN');
        }

        function setAuthToken(token){
            $http.defaults.headers.common.Authorization = 'Bearer '+ token;
            return $window.localStorage.setItem('WS.DATAWAREHOUSE.TOKEN', token);
        }

        function logout(){
            return $window.localStorage.removeItem('WS.DATAWAREHOUSE.TOKEN');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2F1dGhlbnRpY2F0aW9uLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsInNlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmZhY3RvcnkuanMiLCJzZXJ2aWNlcy9odHRwLmZhY3RvcnkuanMiLCJzZXJ2aWNlcy9zZXJ2ZXJDb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsUUFBUSxPQUFPLFVBQVUsQ0FBQzs7QUFFMUI7QUNKQTs7QUFFQSxRQUFRLE9BQU87O0NBRWQsZ0RBQU8sU0FBUyxnQkFBZ0Isb0JBQW9COztJQUVqRCxtQkFBbUIsVUFBVTs7SUFFN0I7OztTQUdLLE1BQU0sVUFBVTtZQUNiLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7OztTQUdqQixNQUFNLFNBQVM7WUFDWixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7U0FHakIsTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZO1lBQ1osY0FBYzs7OztTQUlqQixNQUFNLFNBQVM7WUFDWixLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVksV0FBVztnQkFDbkIsUUFBUSxJQUFJOzs7O0lBSXpCO0FDekNILFFBQVEsT0FBTyxVQUFVLElBQUksQ0FBQyxrQkFBa0IsU0FBUyxnQkFBZ0IsQ0FBQyxlQUFlLElBQUksYUFBYTtBQUMxRyxlQUFlLElBQUksWUFBWTtBQUMvQixlQUFlLElBQUksYUFBYTtBQUNoQyxlQUFlLElBQUksY0FBYyxxcERBQXFwRDtBQ0h0ckQ7QUFDQSxDQUFDLFdBQVc7O0NBRVgsUUFBUSxPQUFPOztFQUVkLFdBQVcsc0JBQXNCLENBQUMsVUFBVSxlQUFlLGFBQWEsU0FBUyxRQUFRLGFBQWEsV0FBVztFQUNqSCxJQUFJLFFBQVE7RUFDWixRQUFRLElBQUk7O0VB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LFFBQVE7WUFDbEIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLEtBQUssT0FBTyxlQUFlLFFBQVE7Ozs7UUFJM0MsU0FBUyxRQUFRLFFBQVE7WUFDckIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLEtBQUssT0FBTyxlQUFlLFFBQVE7Ozs7S0FJOUM7QUN4REwsQ0FBQyxXQUFXO0lBQ1I7O0lBRUE7U0FDSyxPQUFPO1NBQ1AsUUFBUSxVQUFVOzs7O0lBSXZCLFNBQVMsVUFBVTtRQUNmLElBQUksVUFBVTtZQUNWLGVBQWU7OztRQUduQixPQUFPOztLQUVWIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcsIFsndWkucm91dGVyJ10pO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICBcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbiAgICBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICBcbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC5zdGF0ZSgnc2lnblVwJywge1xuICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NpZ251cC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoZW50aWNhdGlvbkN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdsb2dJbicsIHtcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhlbnRpY2F0aW9uQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIC8vIEFCT1VUIFBBR0UgQU5EIE1VTFRJUExFIE5BTUVEIFZJRVdTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAuc3RhdGUoJ2Fib3V0Jywge1xuICAgICAgICAgICAgdXJsOiAnL2Fib3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYWJvdXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFib3V0IGNvbnRyb2xsZXJcIik7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH0pXG4gICAgXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkgeyR0ZW1wbGF0ZUNhY2hlLnB1dCgnYWJvdXQuaHRtbCcsJzxoMT5BYm91dDwvaDE+Jyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ2hvbWUuaHRtbCcsJzxoMT5Mb2dnZWQgaW48L2gxPlxcbjxkaXYgY2xhc3M9XCJyb3dcIj5cXG5cXHQ8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgXFx0PGEgaHJlZj1cIiMvY291bnRlci1zdHJpa2U6Z2xvYmFsLW9mZmVuc2l2ZVwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvY3Nnby5qcGdcIj48L2E+XFxuICAgICAgXFx0PHA+Q291bnRlci1TdHJpa2U6IEdsb2JhbCBPZmZlbnNpdmU8L3A+XFxuXFx0PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gIFxcdFxcdDxhIGhyZWY9XCIjL2RvdGEyXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9kb3RhMi5wbmdcIj48L2E+XFxuICAgICAgICA8cD5Eb3RhIDI8L3A+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICBcXHRcXHQ8YSBocmVmPVwiIy9sZWFndWUtb2YtbGVnZW5kc1wiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvbG9sLmpwZWdcIj48L2E+XFxuICBcXHRcXHQ8cD5MZWFndWUgb2YgTGVnZW5kczwvcD5cXG4gICAgICA8L2Rpdj5cXG4gICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gIFxcdFxcdDxhIGhyZWY9XCIjL292ZXJ3YXRjaFwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvb3ZlcndhdGNoLmpwZ1wiPjwvYT5cXG4gIFxcdFxcdDxwPk92ZXJ3YXRjaDwvcD5cXG5cXHQ8L2Rpdj5cXG48L2Rpdj4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbG9naW4uaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICA8Zm9ybSBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczRcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwubG9nSW4uZW1haWxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbCBBZHJlc3M8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwubG9nSW4ucGFzc3dvcmRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PiAgICAgIFxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIiBuZy1jbGljaz1cIiRjdHJsLmxvZ1VzZXJJbigpXCI+TG9nIGluXFxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPnNlbmQ8L2k+XFxuICAgICAgICAgICAgPC9idXR0b24+ICBcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiIGhyZWY9XCIjL3NpZ251cFwiPkNyZWF0ZSBuZXcgdXNlclxcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgICAgICAgIDwvYT4gICBcXG4gICAgICA8L2Zvcm0+XFxuPC9kaXY+XFxuJyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3NpZ251cC5odG1sJywnPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxmb3JtIGNsYXNzPVwiY29sIHM2IG9mZnNldC1zNFwiPlxcbiAgICAgICAgICAgIDxoMz5DcmVhdGUgbmV3IHVzZXI8L2gzPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM4XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiRW1haWxcIiBpZD1cImVtYWlsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5uZXdVc2VyLmVtYWlsXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWwgQWRyZXNzPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuZy1tb2RlbD1cIiRjdHJsLm5ld1VzZXIucGFzc3dvcmRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PiAgICAgIFxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIiBuZy1jbGljaz1cIiRjdHJsLmNyZWF0ZVVzZXIoKVwiPlN1Ym1pdFxcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj5zZW5kPC9pPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPiAgIFxcbiAgICAgIDwvZm9ybT5cXG4gICAgICA8IS0tPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgICAgIFxcdDxhIGhyZWY9XCIjL2NvdW50ZXItc3RyaWtlOmdsb2JhbC1vZmZlbnNpdmVcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2NzZ28uanBnXCI+PC9hPlxcbiAgICAgIFxcdDxwPkNvdW50ZXItU3RyaWtlOiBHbG9iYWwgT2ZmZW5zaXZlPC9wPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gICAgICBcXHQ8YSBocmVmPVwiIy9kb3RhMlwiPjxpbWcgY2xhc3M9XCJyZXNwb25zaXZlLWltZ1wiIHNyYz1cInB1YmxpYy9pbWcvZG90YTIucG5nXCI+PC9hPlxcbiAgICAgICAgICAgIDxwPkRvdGEgMjwvcD5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgXFx0PGEgaHJlZj1cIiMvbGVhZ3VlLW9mLWxlZ2VuZHNcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2xvbC5qcGVnXCI+PC9hPlxcbiAgICAgIFxcdDxwPkxlYWd1ZSBvZiBMZWdlbmRzPC9wPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gICAgICBcXHQ8YSBocmVmPVwiIy9vdmVyd2F0Y2hcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL292ZXJ3YXRjaC5qcGdcIj48L2E+XFxuICAgICAgXFx0PHA+T3ZlcndhdGNoPC9wPlxcbiAgICAgIDwvZGl2Pi0tPlxcbjwvZGl2PlxcbicpO31dKTsiLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24oKSB7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cblx0LmNvbnRyb2xsZXIoJ0F1dGhlbnRpY2F0aW9uQ3RybCcsIFsnJHN0YXRlJywgJ0h0dHBGYWN0b3J5JywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRzdGF0ZSwgSHR0cEZhY3RvcnksICRsb2NhdGlvbikge1xuXHRcdHZhciAkY3RybCA9IHRoaXM7XG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIEF1dGhlbnRpY2F0aW9uQ3RybCBjdHJsXCIpO1xuXG5cdFx0JGN0cmwuY3JlYXRlVXNlciA9IGNyZWF0ZVVzZXI7XG5cdFx0JGN0cmwubG9nVXNlckluID0gbG9nVXNlckluO1xuXG5cdFx0YWN0aXZhdGUoKTtcblxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdFx0Ly8kY3RybC5sb2dnZWRJbjtcblx0XHR9XG5cblx0XHRpZiAobG9jYWxTdG9yYWdlWydVc2VyLWRhdGEnXSkge1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbG9nVXNlckluKCkge1xuXHRcdFx0JGN0cmwudXNlckxvZ0luID0ge1xuXHRcdFx0XHRkYXRhOiAkY3RybC5sb2dJbixcblx0XHRcdFx0dXJsOiBcIi9hcGkvdXNlci9sb2dpblwiXG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdEh0dHBGYWN0b3J5LnBvc3QoJGN0cmwudXNlckxvZ0luKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0XHRpZiAocmVzLmRhdGEuX2lkKSB7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1VzZXItRGF0YScsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xuXHRcdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvaG9tZSddKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KFwiV3JvbmcgaW5mb3JtYXRpb24hIFBsZWFzZSB0cnkgYWdhaW5cIilcblx0XHRcdFx0XHRsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpbnB1dFtpXS52YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vJGN0cmwubG9nZ2VkSW4gPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY3JlYXRlVXNlcigpIHtcblx0XHRcdHZhciBuZXdVc2VyID0ge1xuXHRcdFx0XHRkYXRhOiAkY3RybC5uZXdVc2VyLFxuXHRcdFx0XHR1cmw6IFwiL2FwaS91c2Vyc1wiXG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmxvZyhgJHskY3RybC5uZXdVc2VyfWApXG5cdFx0XHRIdHRwRmFjdG9yeS5wb3N0KG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHRcdFx0XG5cdFx0XHRcdCRsb2NhdGlvbi51cmwoWycvaG9tZSddKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1dKTtcbn0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgWyckc3RhdGUnLCAnQXV0aGVudGljYXRpb25GYWN0b3J5JywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRzdGF0ZSwgQXV0aGVudGljYXRpb25GYWN0b3J5LCAkbG9jYXRpb24pIHtcblx0XHR2YXIgJGN0cmwgPSB0aGlzO1xuXHRcdFxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyBEYXNoYm9hcmRDdHJsIGN0cmxcIik7XG5cblx0XHQkY3RybC5nZXRVc2VyID0gZ2V0VXNlcjtcblx0XHRcblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VyKCkge1xuXHRcdFx0Ly9BdXRoZW50aWNhdGlvbkZhY3RvcnkuZ2V0Q3VycmVudFVzZXIoKVxuXHRcdH1cblx0XHRcblx0fV0pO1xufSgpKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdnYWNoYXQnKVxuICAgICAgICAuZmFjdG9yeSgnQXV0aGVudGljYXRpb25GYWN0b3J5JywgZmFjdG9yeSk7XG5cbiAgICBmYWN0b3J5LiRpbmplY3QgPSBbJ0h0dHBGYWN0b3J5J107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KEh0dHBGYWN0b3J5KSB7XG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgZ2V0Q3VycmVudFVzZXI6IGdldEN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgbG9naW5Vc2VyOiBsb2dpblVzZXIsXG4gICAgICAgICAgICBnZXRBdXRoVG9rZW46IGdldEF1dGhUb2tlbixcbiAgICAgICAgICAgIHNldEF1dGhUb2tlbjogc2V0QXV0aFRva2VuLFxuICAgICAgICAgICAgbG9nb3V0OiBsb2dvdXRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcihvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBvcHRpb25zLmNhY2hlICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNhY2hlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAga2luZDogb3B0aW9ucy5raW5kLFxuICAgICAgICAgICAgICAgIHBhcmFtczogb3B0aW9ucy5wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW5Vc2VyKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuIEh0dHBGYWN0b3J5LnBvc3Qoe1xuICAgICAgICAgICAgICAgIHVybDonL2FwaS10b2tlbi1hdXRoLycsXG4gICAgICAgICAgICAgICAgZGF0YTpvcHRpb25zLmRhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0QXV0aFRva2VuKCl7XG4gICAgICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnV1MuREFUQVdBUkVIT1VTRS5UT0tFTicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0QXV0aFRva2VuKHRva2VuKXtcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcrIHRva2VuO1xuICAgICAgICAgICAgcmV0dXJuICR3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1dTLkRBVEFXQVJFSE9VU0UuVE9LRU4nLCB0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKXtcbiAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdXUy5EQVRBV0FSRUhPVVNFLlRPS0VOJyk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5mYWN0b3J5KCdIdHRwRmFjdG9yeScsIGZhY3RvcnkpO1xuXG4gICAgZmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICdDb25maWcnXTtcblxuICAgIC8qIEBuZ0luamVjdCAqL1xuICAgIGZ1bmN0aW9uIGZhY3RvcnkoJGh0dHAsIENvbmZpZykge1xuICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldDogZ2V0LFxuICAgICAgICAgICAgcHV0OiBwdXQsXG4gICAgICAgICAgICBwb3N0OiBwb3N0LFxuICAgICAgICAgICAgZGVsZXRlOiBfZGVsZXRlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBvcHRpb25zLmNhY2hlICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNhY2hlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAga2luZDogb3B0aW9ucy5raW5kLFxuICAgICAgICAgICAgICAgIHBhcmFtczogb3B0aW9ucy5wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcHV0KG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgdXJsOiBDb25maWcuQVBJX0JBU0VfVVJMICsgb3B0aW9ucy51cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9zdChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9kZWxldGUob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLnNlcnZpY2UoJ0NvbmZpZycsIFNlcnZpY2UpO1xuXG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBTZXJ2aWNlKCkge1xuICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgICdBUElfQkFTRV9VUkwnOidodHRwOi8vbG9jYWxob3N0OjgwMDAnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
