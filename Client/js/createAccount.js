/*global angular*/
var createAccount = angular.module('createAccount', []);

createAccount.controller('checkInput', function ($scope) {
    "use strict";
    
    $scope.createUser = function (password, repeat, user) {
        if (user === undefined || user === "") {
            $scope.returnMessage = "Please write a username.";
        } else if (password.length < 6) {
            $scope.returnMessage = "Please check that password is more than 6 characters.";
        } else if (user === password) {
            $scope.returnMessage = "Username and password cannot be the same.";
        } else {
            $scope.returnMessage = "User Created!";
        }
    };
    
    $scope.checkPasswordMatch = function (password, repeatedPassword) {
        if (repeatedPassword === "") {
            $scope.passwordMatchMessage = "";
        } else if (password === repeatedPassword) {
            $scope.passwordMatchMessage = "Password matches";
        } else {
            $scope.passwordMatchMessage = "Password does not match";
        }
    };
});