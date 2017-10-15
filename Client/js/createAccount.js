/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
var $j = jQuery.noConflict();
var createAccountPage = angular.module('createAccount', []);

const PORT = 8761;
const SERVER = "localhost";
const BASE_URL = "http://" + SERVER + ":" + PORT;
var urlUsers = "/users";

createAccountPage.controller('httpCtrl', function ($scope) {
    "use strict";

    function getUsersUrl() {
        return BASE_URL + urlUsers;
    }
    
    function put (url, data, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        };
        xmlHttp.open("PUT", url, true); // true for asynchronous 
        xmlHttp.send(data);
    };

    $scope.putUser = function () {
        var userObj = {username: $scope.username, password: $scope.password},
            userObjJson = JSON.stringify(userObj);

        put(getUsersUrl(), userObjJson, function (content) {
            //$scope.returnMessage = content;
            $j("#returnMessage").text(content);
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
        $j("#returnMessage").text("");
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
        if ($scope.username === undefined || $scope.username === "") {
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
        if ($scope.username != undefined && $scope.password != undefined && $scope.username === $scope.password) {
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
            colorUser("3px solid #1B5E20");
            colorPassword("3px solid #1B5E20");

            $scope.putUser();
        }
        else {
            //$scope.returnMessage = "There were " + errors + " error(s).";
            $j("#returnMessage").text("There " + (errors > 1 ? " were " + errors + " errors" : " was 1 error") + ".");
        }
    };

});