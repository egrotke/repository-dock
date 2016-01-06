'use strict';
/* App Module */

var repoApp = angular.module('repoApp', [
    'ngRoute',
    'repoControllers'
]);

// repoApp.service('repoService', function($http) {
//     var repos;

//     $http.get('json/repos.json').success(function(data) {
//         repos = data.repos;

//         // repos.forEach(function(item) {
//         //     if ($scope.accounts.indexOf(item.account) === -1) {
//         //         $scope.accounts.push(item.account);
//         //     }
//         // });
//     });

//     return repos;
// });

repoApp.factory('repoService', function($http) {
  var repoService = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('../json/repos.json').then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return repoService;
});

repoApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        }).when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        }).when('/builds', {
            templateUrl: 'views/builds.html',
            controller: 'BuildsCtrl'
        }).when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl'
        }).when('/repo/:id', {
            templateUrl: '../views/repo.html',
            controller: 'RepoCtrl'
        }).otherwise({
            redirectTo: '/404'
        });;

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');
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

repoApp.directive('modal', function() {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            var $elem = $(element);
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value) {
                if (value === true) {
                    $elem.modal('show');
                } else {
                    $elem.modal('hide');
                }
            });

            $elem.on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $elem.on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
