/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
var $j = jQuery.noConflict();
var forumApp = angular.module('forumApp', ['ngRoute']);

const PORT = 8761;
const SERVER = "localhost";
const BASE_URL = "http://" + SERVER + ":" + PORT;
var urlUsers = "/users";

function colorBorderRed(inputElement) {
	inputElement.css("border", "3px solid #840200");
}

function colorBorderGrey(inputElement) {
	inputElement.css("border", "3px solid #9EA9AB");
}

forumApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        resolve: {
            "check": function($location) {
                var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
                if(loggedIn === true) {
                    $location.path('/dashboard');
                    
                }
            }
        }, 
        templateUrl: 'pages/login.html', 
        controller: 'loginCtrl'
    })
    .when('/create', {
    	resolve: {
            "check": function($location) {
                var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
                if(loggedIn === true) {
                    $location.path('/dashboard');
                    
                }
            }
        }, 
        templateUrl: 'pages/createAccount.html', 
        controller: 'createAccountCtrl'
    })
    .when('/dashboard', {
        resolve: {
            "check": function($location) {
                var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
                if(!loggedIn) {
                    $location.path('/');
                    
                }
            }
        }, 
        templateUrl: 'pages/dashboard.html', 
        controller: 'dashboardCtrl'
    })
    .when('/404', {
    	templateUrl: 'pages/404.html'
    })
    .otherwise({
        redirectTo: '/404'
    });
    $locationProvider.html5Mode(true);
});


forumApp.controller('loginCtrl', function ($scope, $location) {
    "use strict";

    $j('#password').keypress(function(e) { //Enter keypress
  		if(e.keyCode==13) {
  			$j('#loginButton').click();
  		}
    });

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
            var loggedIn = JSON.parse(content);
            sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));
            if (loggedIn === true) {
            	sessionStorage.setItem('user', JSON.stringify($scope.username));
                $location.path('/dashboard');
                $scope.$apply();
            }
            else {
                $scope.loginReturnMessage = "Wrong username or password";
                $scope.$apply();
                colorBorderRed($j("#username"));
				colorBorderRed($j("#password"));
            }
        });
    };
    
    $scope.logIn = function() {
        $scope.postUser();
    }

    $scope.goToCreate = function() {
        $location.path('/create');
    }

});

forumApp.controller('createAccountCtrl', function ($scope) {
    "use strict";

    $j('#repeat').keypress(function(e){
  		if(e.keyCode==13) {
  			$j('#create').click();
  		}
    });

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
            $scope.returnMessage = content;
            $scope.$apply()
        });
    };
 
    function reset() {
        $scope.returnMessage = "";
        $scope.usernameReturnMessage = "";
        

        $scope.passwordReturnMessage = "";
        $scope.repeatPasswordReturnMessage = "";
        colorBorderGrey($j("#username"));
        colorBorderGrey($j("#password"));
        colorBorderGrey($j("#repeat"));
    }
    
    $scope.createUser = function () {
        reset();
        var errors = 0;
        // Check username
        if ($scope.username === undefined || $scope.username === "") {
            $scope.usernameReturnMessage = "Please write a username.";
            colorBorderRed($j("#username"));
            errors++;
        }
        // Check password
        if ($scope.password == undefined || $scope.password.length < 6) {
            $scope.passwordReturnMessage = "Please check that password is more than 6 characters.";
            colorBorderRed($j("#password"));
            errors++;
        } 
        // Check if pass and username is equal
        if ($scope.username != undefined && $scope.password != undefined && $scope.username === $scope.password) {
            $scope.passwordReturnMessage = "Username and password cannot be the same.";
            colorBorderRed($j("#password"));
            errors++;
        } 
        // Check if passwords matches
        if ($scope.password === undefined || $scope.repeat === undefined || $scope.password !== $scope.repeat) {
            $scope.repeatPasswordReturnMessage = "Password does not match.";
            colorBorderRed($j("#password"));
            colorBorderRed($j("#repeat"));
            errors++;
        }

        // Final error check
        if (errors === 0) {
            $scope.putUser();
        }
        else {
            $scope.returnMessage = "There " + (errors > 1 ? " were " + errors + " errors" : " was 1 error") + ".";
        }
    };

});

forumApp.controller('dashboardCtrl', function ($scope, $location) {
    "use strict";

    $scope.username = JSON.parse(sessionStorage.getItem('user'));

    $scope.gotoHome = function() {
        $location.path('/dashboard');
    }

    $scope.logOut = function() {
    	sessionStorage.setItem('loggedIn', JSON.stringify(false));
        $location.path('/');
    }

});
