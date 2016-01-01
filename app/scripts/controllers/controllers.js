'use strict';
/* Controllers */

var repoControllers =
    angular.module('repoControllers', []);

repoControllers.controller('MainCtrl', ['$scope', '$http', '$filter',
    function MainCtrl($scope, $http, $filter) {
        $scope.accountFilter = "";
        $scope.accounts = [];
        $scope.currentPage = 1;
        $scope.maxItemsPerPage = 8;
        $scope.numberOfPages = function() {
            if($scope.filteredRepos){
               return Math.ceil($scope.filteredRepos.length / $scope.maxItemsPerPage);
           } 
        };
        $scope.newFilter = function() {
            $scope.currentPage = 1;
        };
        $scope.getNumberArray = function(num) {
            return new Array(num);
        };
        $scope.decrementCurrentPage = function() {
            $scope.currentPage = ($scope.currentPage > 1) ? $scope.currentPage - 1 : 1;
        };
        $scope.incrementCurrentPage = function() {
            var numPages = $scope.numberOfPages();
            $scope.currentPage = ($scope.currentPage < numPages) ? $scope.currentPage + 1 : numPages;
        };
        $scope.updatePageNumber = function(index) {
            $scope.currentPage = index + 1;
        };
        $http.get('json/repos.json').success(function(data) {
            $scope.repos = data.repos;

            $scope.repos.forEach(function(item) {
                if ($scope.accounts.indexOf(item.account) === -1) {
                    $scope.accounts.push(item.account);
                }
            });
        });

    }
]);

