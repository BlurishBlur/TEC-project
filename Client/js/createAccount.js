/*global angular*/
var createAccount = angular.module('createAccount', []);
/*
var url = "http://localhost:8761/users";

var put = function (url, data, callback) {
    "use strict";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("PUT", url, true); // true for asynchronous 
    xmlHttp.send(data);
};

var do_put = function () {
    "use strict";
    var usernameVal = document.getElementById('username');
    var passVal = document.getElementById('password');
    
    var user = JSON.stringify({username: usernameVal, password: passVal});
    put(url, user, function (content) {
        //var resultArea = document.getElementById('result');
        //resultArea.innerHTML = content;
    });
};

document.getElementById('create').onclick(do_put());*/

createAccount.controller('checkInput', function ($scope) {
    "use strict";
    console.log("test");
    
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