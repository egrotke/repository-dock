'use strict';


angular.module('mytodoApp', [])
 .config(['$controllerProvider', function($controllerProvider) {
        $controllerProvider.allowGlobals();
    }])
  .controller('MainCtrl',  ['$scope', function MainCtrl($scope) {
    $scope.todos = ['Item 1', 'Item 2', 'Item 3'];
    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };
  }]);