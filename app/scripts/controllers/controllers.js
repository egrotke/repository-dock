'use strict';
/* Controllers */

var repoControllers = 
angular.module('repoControllers', []);

repoControllers.controller('MainCtrl', ['$scope', '$http', 
function MainCtrl($scope, $http) {
  $scope.message ="Hello main";
  $http.get('json/repos.json').success(function(data) {
       $scope.repos = data.repos;
       console.log("data");
       console.log($scope.repos);
   });

}]);

repoControllers.controller('ShowCtrl', ['$scope', 
function ShowCtrl($scope) {
  $scope.message = "Show The World";
}]);