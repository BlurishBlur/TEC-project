/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
var $j = jQuery.noConflict();
var indexPage = angular.module('index', []);

const PORT = 8761;
const SERVER = "localhost";
const BASE_URL = "http://" + SERVER + ":" + PORT;
var urlUsers = "/users";

indexPage.controller('httpCtrl', function ($scope) {
    "use strict";

    function getUsersUrl() {
        return BASE_URL + urlUsers;
    }
    
    function post (url, data, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        };
        xmlHttp.open("POST", url, true); // true for asynchronous 
        xmlHttp.send(data);
    };

    $scope.postUser = function () {
        var userObj = {username: $scope.username, password: $scope.password},
            userObjJson = JSON.stringify(userObj);

        post(getUsersUrl(), userObjJson, function (content) {
        });
    };
    
    $scope.logIn = function() {
        $scope.postUser();
    }

});