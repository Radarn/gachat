'use strict';

angular.module('gachat', ['ui.router']);


'use strict';

angular.module('gachat')

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/signup');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('signUp', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'SignUpCtrl',
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
$templateCache.put('signup.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Placeholder" id="email" type="text" class="validate" ng-model="$ctrl.newUser.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Placeholder" id="password" type="text" class="validate" ng-model="$ctrl.newUser.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>      \n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.createUser()">Submit\n                  <i class="material-icons right">send</i>\n            </button>   \n      </form>\n      <!--<div class="col s3">\n      \t<a href="#/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      \t<p>Counter-Strike: Global Offensive</p>\n      </div>\n      <div class="col s3">\n      \t<a href="#/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n            <p>Dota 2</p>\n      </div>\n      <div class="col s3">\n      \t<a href="#/league-of-legends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n      \t<p>League of Legends</p>\n      </div>\n      <div class="col s3">\n      \t<a href="#/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n      \t<p>Overwatch</p>\n      </div>-->\n</div>\n');}]);
'use strict';
(function() {

	angular.module('gachat')

	.controller('SignUpCtrl', ['$state', 'HttpFactory', function($state, HttpFactory) {
		var $ctrl = this;
		console.log("this is SignUpCtrl ctrl");

		$ctrl.createUser = createUser;

		activate();

		function activate() {
			
		}

		function createUser() {
			var newUser = {
				data: $ctrl.newUser,
				url: "/api/polls/"
			}
			console.log(`Success! ${$ctrl.newUser}`)
			HttpFactory.post($ctrl.newUser).then(function(res) {

			});
		}

	}]);
}());
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
            'API_BASE_URL':'http://localhost:8080',
        };

        return service;
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL3NpZ251cC5jb250cm9sbGVyLmpzIiwic2VydmljZXMvaHR0cEZhY3RvcnkuanMiLCJzZXJ2aWNlcy9zZXJ2ZXJDb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsUUFBUSxPQUFPLFVBQVUsQ0FBQzs7QUFFMUI7QUNKQTs7QUFFQSxRQUFRLE9BQU87O0NBRWQsZ0RBQU8sU0FBUyxnQkFBZ0Isb0JBQW9COztJQUVqRCxtQkFBbUIsVUFBVTs7SUFFN0I7OztTQUdLLE1BQU0sVUFBVTtZQUNiLEtBQUs7WUFDTCxhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7Ozs7U0FJakIsTUFBTSxTQUFTO1lBQ1osS0FBSztZQUNMLGFBQWE7WUFDYixZQUFZLFdBQVc7Z0JBQ25CLFFBQVEsSUFBSTs7OztJQUl6QjtBQzNCSCxRQUFRLE9BQU8sVUFBVSxJQUFJLENBQUMsa0JBQWtCLFNBQVMsZ0JBQWdCLENBQUMsZUFBZSxJQUFJLGFBQWE7QUFDMUcsZUFBZSxJQUFJLGNBQWMsd25EQUF3bkQ7QUNEenBEO0FBQ0EsQ0FBQyxXQUFXOztDQUVYLFFBQVEsT0FBTzs7RUFFZCxXQUFXLGNBQWMsQ0FBQyxVQUFVLGVBQWUsU0FBUyxRQUFRLGFBQWE7RUFDakYsSUFBSSxRQUFRO0VBQ1osUUFBUSxJQUFJOztFQUVaLE1BQU0sYUFBYTs7RUFFbkI7O0VBRUEsU0FBUyxXQUFXOzs7O0VBSXBCLFNBQVMsYUFBYTtHQUNyQixJQUFJLFVBQVU7SUFDYixNQUFNLE1BQU07SUFDWixLQUFLOztHQUVOLFFBQVEsSUFBSTtHQUNaLFlBQVksS0FBSyxNQUFNLFNBQVMsS0FBSyxTQUFTLEtBQUs7Ozs7OztLQU1qRDtBQzdCTCxDQUFDLFdBQVc7SUFDUjs7SUFFQTtTQUNLLE9BQU87U0FDUCxRQUFRLGVBQWU7O0lBRTVCLFFBQVEsVUFBVSxDQUFDLFNBQVM7OztJQUc1QixTQUFTLFFBQVEsT0FBTyxRQUFRO1FBQzVCLElBQUksVUFBVTtZQUNWLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtZQUNOLFFBQVE7OztRQUdaLE9BQU87O1FBRVAsU0FBUyxJQUFJLFNBQVM7WUFDbEIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsU0FBUyxRQUFRO2dCQUNqQixLQUFLLE9BQU8sZUFBZSxRQUFRO2dCQUNuQyxPQUFPLFFBQVEsVUFBVSxZQUFZLFFBQVEsUUFBUTtnQkFDckQsTUFBTSxRQUFRO2dCQUNkLFFBQVEsUUFBUTs7OztRQUl4QixTQUFTLElBQUksUUFBUTtZQUNqQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsU0FBUyxRQUFRO2dCQUNqQixLQUFLLE9BQU8sZUFBZSxRQUFROzs7O1FBSTNDLFNBQVMsS0FBSyxRQUFRO1lBQ2xCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLE1BQU0sUUFBUTtnQkFDZCxLQUFLLE9BQU8sZUFBZSxRQUFROzs7O1FBSTNDLFNBQVMsUUFBUSxRQUFRO1lBQ3JCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLE1BQU0sUUFBUTtnQkFDZCxLQUFLLE9BQU8sZUFBZSxRQUFROzs7O0tBSTlDO0FDeERMLENBQUMsV0FBVztJQUNSOztJQUVBO1NBQ0ssT0FBTztTQUNQLFFBQVEsVUFBVTs7OztJQUl2QixTQUFTLFVBQVU7UUFDZixJQUFJLFVBQVU7WUFDVixlQUFlOzs7UUFHbkIsT0FBTzs7S0FFViIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnLCBbJ3VpLnJvdXRlciddKTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3NpZ251cCcpO1xuICAgIFxuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgIFxuICAgICAgICAvLyBIT01FIFNUQVRFUyBBTkQgTkVTVEVEIFZJRVdTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdzaWduVXAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1NpZ25VcEN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhYm91dCBjb250cm9sbGVyXCIpO1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9KVxuICAgIFxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHskdGVtcGxhdGVDYWNoZS5wdXQoJ2Fib3V0Lmh0bWwnLCc8aDE+QWJvdXQ8L2gxPicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdzaWdudXAuaHRtbCcsJzxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICA8Zm9ybSBjbGFzcz1cImNvbCBzNiBvZmZzZXQtczRcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBsYWNlaG9sZGVyXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5nLW1vZGVsPVwiJGN0cmwubmV3VXNlci5lbWFpbFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsIEFkcmVzczwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczhcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiUGxhY2Vob2xkZXJcIiBpZD1cInBhc3N3b3JkXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmctbW9kZWw9XCIkY3RybC5uZXdVc2VyLnBhc3N3b3JkXCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj4gICAgICBcXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYWN0aW9uXCIgbmctY2xpY2s9XCIkY3RybC5jcmVhdGVVc2VyKClcIj5TdWJtaXRcXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+c2VuZDwvaT5cXG4gICAgICAgICAgICA8L2J1dHRvbj4gICBcXG4gICAgICA8L2Zvcm0+XFxuICAgICAgPCEtLTxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gICAgICBcXHQ8YSBocmVmPVwiIy9jb3VudGVyLXN0cmlrZTpnbG9iYWwtb2ZmZW5zaXZlXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9jc2dvLmpwZ1wiPjwvYT5cXG4gICAgICBcXHQ8cD5Db3VudGVyLVN0cmlrZTogR2xvYmFsIE9mZmVuc2l2ZTwvcD5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgXFx0PGEgaHJlZj1cIiMvZG90YTJcIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS1pbWdcIiBzcmM9XCJwdWJsaWMvaW1nL2RvdGEyLnBuZ1wiPjwvYT5cXG4gICAgICAgICAgICA8cD5Eb3RhIDI8L3A+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgICAgIFxcdDxhIGhyZWY9XCIjL2xlYWd1ZS1vZi1sZWdlbmRzXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9sb2wuanBlZ1wiPjwvYT5cXG4gICAgICBcXHQ8cD5MZWFndWUgb2YgTGVnZW5kczwvcD5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgXFx0PGEgaHJlZj1cIiMvb3ZlcndhdGNoXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtaW1nXCIgc3JjPVwicHVibGljL2ltZy9vdmVyd2F0Y2guanBnXCI+PC9hPlxcbiAgICAgIFxcdDxwPk92ZXJ3YXRjaDwvcD5cXG4gICAgICA8L2Rpdj4tLT5cXG48L2Rpdj5cXG4nKTt9XSk7IiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uKCkge1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnKVxuXG5cdC5jb250cm9sbGVyKCdTaWduVXBDdHJsJywgWyckc3RhdGUnLCAnSHR0cEZhY3RvcnknLCBmdW5jdGlvbigkc3RhdGUsIEh0dHBGYWN0b3J5KSB7XG5cdFx0dmFyICRjdHJsID0gdGhpcztcblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgU2lnblVwQ3RybCBjdHJsXCIpO1xuXG5cdFx0JGN0cmwuY3JlYXRlVXNlciA9IGNyZWF0ZVVzZXI7XG5cblx0XHRhY3RpdmF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cdFx0XHRcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjcmVhdGVVc2VyKCkge1xuXHRcdFx0dmFyIG5ld1VzZXIgPSB7XG5cdFx0XHRcdGRhdGE6ICRjdHJsLm5ld1VzZXIsXG5cdFx0XHRcdHVybDogXCIvYXBpL3BvbGxzL1wiXG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmxvZyhgU3VjY2VzcyEgJHskY3RybC5uZXdVc2VyfWApXG5cdFx0XHRIdHRwRmFjdG9yeS5wb3N0KCRjdHJsLm5ld1VzZXIpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG5cblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XSk7XG59KCkpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2dhY2hhdCcpXG4gICAgICAgIC5mYWN0b3J5KCdIdHRwRmFjdG9yeScsIGZhY3RvcnkpO1xuXG4gICAgZmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICdDb25maWcnXTtcblxuICAgIC8qIEBuZ0luamVjdCAqL1xuICAgIGZ1bmN0aW9uIGZhY3RvcnkoJGh0dHAsIENvbmZpZykge1xuICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldDogZ2V0LFxuICAgICAgICAgICAgcHV0OiBwdXQsXG4gICAgICAgICAgICBwb3N0OiBwb3N0LFxuICAgICAgICAgICAgZGVsZXRlOiBfZGVsZXRlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBvcHRpb25zLmNhY2hlICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNhY2hlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAga2luZDogb3B0aW9ucy5raW5kLFxuICAgICAgICAgICAgICAgIHBhcmFtczogb3B0aW9ucy5wYXJhbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcHV0KG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgdXJsOiBDb25maWcuQVBJX0JBU0VfVVJMICsgb3B0aW9ucy51cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9zdChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9kZWxldGUob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZ2FjaGF0JylcbiAgICAgICAgLnNlcnZpY2UoJ0NvbmZpZycsIFNlcnZpY2UpO1xuXG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBTZXJ2aWNlKCkge1xuICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgICdBUElfQkFTRV9VUkwnOidodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
