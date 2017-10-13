/*global angular*/
var createAccount = angular.module('createAccount', []);

createAccount.controller('checkInput', function ($scope) {
    "use strict";
    
    $scope.createUser = function (password, repeat) {
        console.log(password);
        $scope.returnMessage = "You clicked!";
        if (password !== repeat || password.length < 6) {
            $scope.returnMessage = "Please check that password matches, and it's more than 6 characters";
        } else {
            $scope.returnMessage = "User Created!";
        }
    };
});