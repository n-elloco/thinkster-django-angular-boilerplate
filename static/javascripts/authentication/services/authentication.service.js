(function (){
    'use strict';

    angular
        .module('thinkster.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    function Authentication($cookies, $http) {
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            register: register,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };
        return Authentication;

        function register(email, password, username) {
            return $http.post('api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccessFn, registerFailureFn);

            function registerSuccessFn() {
                Authentication.login(email, password);
            }

            function registerFailureFn() {
                console.error('Register error');
            }
        }

        function login(email, password) {
            return $http.post('api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccessFn, loginFailureFn);

            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);
                window.location = '/'
            }

            function loginFailureFn(data, status, headers, config) {
                console.error('Login error')
            }
        }

        function getAuthenticatedAccount() {
            if ($cookies.authenticatedAccount) {
                return
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }
    }
})();