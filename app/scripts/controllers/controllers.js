'use strict';
/* Controllers */

var repoControllers =
    angular.module('repoControllers', []);

repoControllers.controller('MainCtrl', ['$scope', '$http',
    function MainCtrl($scope, $http) {
        $scope.message = "Hello main";
        $scope.accountFilter = "";
        $scope.accounts = [];
        $scope.currentPage = 1;
        $scope.maxItemsPerPage = 8;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.repos.length / $scope.maxItemsPerPage);
        };
        $scope.getNumberArray = function(num) {
            return new Array(num);
        };
        $scope.decrementCurrentPage = function() {
            $scope.currentPage = ($scope.currentPage > 1) ? $scope.currentPage - 1 : 1;
        };
        $scope.incrementCurrentPage = function() {
            var numPages = $scope.numberOfPages();
            console.log("numRepos: " + $scope.repos.length);
            $scope.currentPage = ($scope.currentPage < numPages) ? $scope.currentPage + 1 : numPages;
        };
        $scope.updatePageNumber = function(index){
        	$scope.currentPage = index+1;
        };
        $http.get('json/repos.json').success(function(data) {
            $scope.repos = data.repos;

            $scope.repos.forEach(function(item) {
                if ($scope.accounts.indexOf(item.account) === -1) {
                    console.log(item.account);
                    $scope.accounts.push(item.account);
                }
            });
        });

    }
]);

repoControllers.controller('ShowCtrl', ['$scope',
    function ShowCtrl($scope) {
        $scope.message = "Show The World";
    }
]);
