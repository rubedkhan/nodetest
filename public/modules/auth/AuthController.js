!(function() {
    'use strict';
    angular.module('myApp').controller('AuthController', ['$scope', 'UtilityService', function($scope, UtilityService) {

        $scope.loginFormObj = { username: '', password: '' };
        $scope.login = function login() {
            if ($scope.loginForm.$valid) {
                
            }
        };
    }]);
})();
