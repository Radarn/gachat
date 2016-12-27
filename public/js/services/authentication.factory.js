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
