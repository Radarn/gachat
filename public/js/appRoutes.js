'use strict';

angular.module('gachat')

.config(function($stateProvider, $urlRouterProvider) {
    
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
    
});