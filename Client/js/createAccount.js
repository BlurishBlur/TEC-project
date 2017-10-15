/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
var $j = jQuery.noConflict();
var http = angular.module('createAccount', []);

const PORT = 8761;
const SERVER = "localhost";
const BASE_URL = "http://" + SERVER + ":" + PORT;
var urlUsers = "/users";


/*

document.getElementById('create').onclick(do_put());*/

http.controller('httpCtrl', function ($scope) {
    "use strict";

    function getUsersUrl() {
        return BASE_URL + urlUsers;
    }
    
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
        var userObj = {username: $scope.user, password: $scope.password},
            userObjJson = JSON.stringify(userObj);

        put(getUsersUrl(), userObjJson, function (content) {
        //var resultArea = document.getElementById('result');
        //resultArea.innerHTML = content;
        });
    };
    
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

    function reset() {
        $scope.usernameReturnMessage = "";
        $scope.styleUser = function () {
            return { "border": "3px solid #9EA9AB" };
        };

        $scope.passwordReturnMessage = "";
        $scope.repeatPasswordReturnMessage = "";
        $scope.stylePassword = function () {
            return { "border": "3px solid #9EA9AB" };
        };
    }
    
    $scope.createUser = function () {
        reset();
        var errors = 0;
        // Check username
        if ($scope.user === undefined || $scope.user === "") {
            $scope.usernameReturnMessage = "Please write a username.";
            colorUser("3px solid #840200");
            errors++;
        }
        // Check password
        if ($scope.password == undefined || $scope.password.length < 6) {
            $scope.passwordReturnMessage = "Please check that password is more than 6 characters.";
            colorPassword("3px solid #840200");
            errors++;
        } 
        // Check if pass and username is equal
        if ($scope.user != undefined && $scope.password != undefined && $scope.user === $scope.password) {
            $scope.passwordReturnMessage = "Username and password cannot be the same.";
            colorPassword("3px solid #840200");
            errors++;
        } 
        // Check if passwords matches
        if ($scope.password === undefined || $scope.repeat === undefined || $scope.password !== $scope.repeat) {
            $scope.repeatPasswordReturnMessage = "Password does not match.";
            colorPassword("3px solid #840200");
            errors++;
        }

        // Final error check
        if (errors === 0) {
            $scope.returnMessage = "User Created!";
            colorUser("3px solid #1B5E20");
            colorPassword("3px solid #1B5E20");

            //$scope.do_put;
        }
        else {
            $scope.returnMessage = "There were " + errors + " error(s)." ;
        }
    };
    
    /*$scope.checkPasswordMatch = function () {
        if ($scope.repeat === "") {
            $scope.passwordMatchMessage = "";
        } else if ($scope.password === $scope.repeat) {
            $scope.passwordMatchMessage = "Password matches";
        } else {
            $scope.passwordMatchMessage = "Password does not match";
        }
    };*/
});