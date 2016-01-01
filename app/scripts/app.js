'use strict';
/* App Module */

var repoApp = angular.module('repoApp', [
    'ngRoute',
    'repoControllers'
]);

repoApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).when('/show', {
            templateUrl: 'views/show.html',
            controller: 'ShowCtrl'
        });
        $locationProvider.html5Mode(false).hashPrefix('!');
    }
]);

repoApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (input) {
            return input.slice(start);
        }
    };
});
