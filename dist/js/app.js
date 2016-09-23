'use strict';

angular.module('gachat', ['ui.router']);


'use strict';

angular.module('gachat')

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html',
            controller: 'DashboardCtrl',
            controllerAs: '$ctrl'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
}]);
angular.module('gachat').run(['$templateCache', function($templateCache) {$templateCache.put('partial-home.html','<div class="row">\n      <div class="col s3">\n      \t<!--<img src="public/img/csgo.jpg">-->\n      \t<h2>Counter-Strike: Global Offensive</h2>\n      </div>\n      <div class="col s3">\n      \t<h2>Dota 2</h2>\n      \t<!--<img src="public/img/dota2.png">-->\n      </div>\n      <div class="col s3">\n      \t<!--<img src="public/img/lol.jpeg">-->\n      \t<h2>League of Legends</h2>\n      </div>\n      <div class="col s3">\n      \t<!--<img src="public/img/overwatch.jpg">-->\n      \t<h2>Overwatch</h2>\n      </div>\n</div>\n');}]);
'use strict';

angular.module('gachat')

.controller('DashboardCtrl', [function() {
	var $ctrl = this
	console.log("this is dashboard ctrl")

	activate()

	function activate() {
		
	};

}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFFBQVEsT0FBTyxVQUFVLENBQUM7O0FBRTFCO0FDSkE7O0FBRUEsUUFBUSxPQUFPOztDQUVkLGdEQUFPLFNBQVMsZ0JBQWdCLG9CQUFvQjs7SUFFakQsbUJBQW1CLFVBQVU7O0lBRTdCOzs7U0FHSyxNQUFNLFFBQVE7WUFDWCxLQUFLO1lBQ0wsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjOzs7O1NBSWpCLE1BQU0sU0FBUzs7OztJQUlyQjtBQ3ZCSCxRQUFRLE9BQU8sVUFBVSxJQUFJLENBQUMsa0JBQWtCLFNBQVMsZ0JBQWdCLENBQUMsZUFBZSxJQUFJLG9CQUFvQiw2aEJBQTZoQjtBQ0E5b0I7O0FBRUEsUUFBUSxPQUFPOztDQUVkLFdBQVcsaUJBQWlCLENBQUMsV0FBVztDQUN4QyxJQUFJLFFBQVE7Q0FDWixRQUFRLElBQUk7O0NBRVo7O0NBRUEsU0FBUyxXQUFXOztFQUVuQjs7SUFFRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnLCBbJ3VpLnJvdXRlciddKTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2hvbWUnKTtcbiAgICBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICBcbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgIHVybDogJy9ob21lJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbC1ob21lLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZEN0cmwnLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIC8vIHdlJ2xsIGdldCB0byB0aGlzIGluIGEgYml0ICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkgeyR0ZW1wbGF0ZUNhY2hlLnB1dCgncGFydGlhbC1ob21lLmh0bWwnLCc8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBzM1wiPlxcbiAgICAgIFxcdDwhLS08aW1nIHNyYz1cInB1YmxpYy9pbWcvY3Nnby5qcGdcIj4tLT5cXG4gICAgICBcXHQ8aDI+Q291bnRlci1TdHJpa2U6IEdsb2JhbCBPZmZlbnNpdmU8L2gyPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gICAgICBcXHQ8aDI+RG90YSAyPC9oMj5cXG4gICAgICBcXHQ8IS0tPGltZyBzcmM9XCJwdWJsaWMvaW1nL2RvdGEyLnBuZ1wiPi0tPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczNcIj5cXG4gICAgICBcXHQ8IS0tPGltZyBzcmM9XCJwdWJsaWMvaW1nL2xvbC5qcGVnXCI+LS0+XFxuICAgICAgXFx0PGgyPkxlYWd1ZSBvZiBMZWdlbmRzPC9oMj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHMzXCI+XFxuICAgICAgXFx0PCEtLTxpbWcgc3JjPVwicHVibGljL2ltZy9vdmVyd2F0Y2guanBnXCI+LS0+XFxuICAgICAgXFx0PGgyPk92ZXJ3YXRjaDwvaDI+XFxuICAgICAgPC9kaXY+XFxuPC9kaXY+XFxuJyk7fV0pOyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2dhY2hhdCcpXG5cbi5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgW2Z1bmN0aW9uKCkge1xuXHR2YXIgJGN0cmwgPSB0aGlzXG5cdGNvbnNvbGUubG9nKFwidGhpcyBpcyBkYXNoYm9hcmQgY3RybFwiKVxuXG5cdGFjdGl2YXRlKClcblxuXHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHRcblx0fTtcblxufV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
