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
            templateUrl: 'partial-home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
}]);
angular.module('gachat').run(['$templateCache', function($templateCache) {$templateCache.put('partial-home.html','<div layout="column">\n\t<h1>hej</h1>\n</div>');}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFwcFJvdXRlcy5qcyIsInRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxRQUFRLE9BQU8sVUFBVSxDQUFDOztBQUUxQjtBQ0pBOztBQUVBLFFBQVEsT0FBTzs7Q0FFZCxnREFBTyxTQUFTLGdCQUFnQixvQkFBb0I7O0lBRWpELG1CQUFtQixVQUFVOztJQUU3Qjs7O1NBR0ssTUFBTSxRQUFRO1lBQ1gsS0FBSztZQUNMLGFBQWE7Ozs7U0FJaEIsTUFBTSxTQUFTOzs7O0lBSXJCO0FDckJILFFBQVEsT0FBTyxVQUFVLElBQUksQ0FBQyxrQkFBa0IsU0FBUyxnQkFBZ0IsQ0FBQyxlQUFlLElBQUksb0JBQW9CLHFEQUFxRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdnYWNoYXQnLCBbJ3VpLnJvdXRlciddKTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JylcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2hvbWUnKTtcbiAgICBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICBcbiAgICAgICAgLy8gSE9NRSBTVEFURVMgQU5EIE5FU1RFRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgIHVybDogJy9ob21lJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbC1ob21lLmh0bWwnXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAvLyBBQk9VVCBQQUdFIEFORCBNVUxUSVBMRSBOQU1FRCBWSUVXUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgIC8vIHdlJ2xsIGdldCB0byB0aGlzIGluIGEgYml0ICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnZ2FjaGF0JykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkgeyR0ZW1wbGF0ZUNhY2hlLnB1dCgncGFydGlhbC1ob21lLmh0bWwnLCc8ZGl2IGxheW91dD1cImNvbHVtblwiPlxcblxcdDxoMT5oZWo8L2gxPlxcbjwvZGl2PicpO31dKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
