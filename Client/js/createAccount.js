/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
var $j = jQuery.noConflict();
var http = angular.module('createAccount', []);
var url = "http://localhost:8761/users";


/*

document.getElementById('create').onclick(do_put());*/

http.controller('httpCtrl', function ($scope) {
    "use strict";
    
    var put = function (url, data, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        };
        xmlHttp.open("PUT", url, true); // true for asynchronous 
        xmlHttp.send(data);
    };

    $scope.do_put = function () {
        var usernameVal = document.getElementById('username'),
            passVal = document.getElementById('password'),
            user = JSON.stringify({username: usernameVal, password: passVal});
        put(url, user, function (content) {
        //var resultArea = document.getElementById('result');
        //resultArea.innerHTML = content;
        });
    };
    
    $j("#create").click($scope.do_put);
    
    function colorUser(value) {
        $scope.styleUser = function () {
            return { "border": value };
        };
    }
    
    function colorPassword(value) {
        $scope.stylePassword = function () {
            return { "border": value };
        };
    }
    
    $scope.createUser = function (password, repeat, user) {
        if (user === undefined || user === "") {
            $scope.returnMessage = "Please write a username.";
            colorUser("3px solid #840200");
            colorPassword("3px solid #9EA9AB");
        } else if (password.length < 6) {
            $scope.returnMessage = "Please check that password is more than 6 characters.";
            colorPassword("3px solid #840200");
            colorUser("3px solid #9EA9ABs");
        } else if (user === password) {
            $scope.returnMessage = "Username and password cannot be the same.";
            colorUser("3px solid #840200");
            colorPassword("3px solid #840200");
        } else {
            $scope.returnMessage = "User Created!";
            colorUser("3px solid #9EA9ABs");
            colorPassword("3px solid #9EA9AB");
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