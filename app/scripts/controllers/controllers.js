'use strict';
/* Controllers */

var repoControllers =
    angular.module('repoControllers', []);

repoControllers.controller('sidebarCtrl', ['$scope',

    function sidebarCtrl($scope) {
        $scope.n = 4;
        $scope.selectedNav = "repos";
        $scope.navSelected = function(link) {
            $scope.selectedNav = link;
        };
    }
]);

repoControllers.controller('MainCtrl', ['$scope', '$http',
    function MainCtrl($scope, $http) {
        $scope.accountFilter = "";
        $scope.accounts = [];
        $scope.currentPage = 1;
        $scope.maxItemsPerPage = 8;
        $scope.repoAccount = "";
        // $scope.repo = {};
        $scope.selectRepoAccount = function(account) {
            $scope.repoAccount = account;
            // console.log("$scope.repo.account: " + $scope.repo.account);
        };
        $scope.numberOfPages = function() {
            if ($scope.filteredRepos) {
                return Math.ceil($scope.filteredRepos.length / $scope.maxItemsPerPage);
            }
        };
        $scope.addRepo = function(newRepo) {
        	var $newRepo;
            $scope.repos.unshift(newRepo);
            $("#newRepoModal").modal('hide');

            $newRepo = $("#page-content-wrapper article:first-child");
            $newRepo.addClass('new-repo');
               setTimeout(function() {
               $newRepo.removeClass('new-repo');
            }, 500);
        };
        $scope.showModal = false;
        $scope.toggleModal = function() {
            $scope.showModal = !$scope.showModal;
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

        // Alternate dropdown
        $scope.switchFilter = function(newFilter) {
            $scope.currentPage = 1;
            $scope.accountFilter = (newFilter === "All accounts") ? "" : newFilter;
        };


    }
]);


repoControllers.controller('DashboardCtrl', ['$scope',
    function DashboardCtrl($scope) {
        $scope.title = "Dashboard";
    }
]);

repoControllers.controller('ProfileCtrl', ['$scope',
    function ProfileCtrl($scope) {
        $scope.title = "Profile";
    }
]);

repoControllers.controller('SettingsCtrl', ['$scope',
    function SettingsCtrl($scope) {
        $scope.title = "Settings";
    }
]);

repoControllers.controller('BuildsCtrl', ['$scope',
    function BuildsCtrl($scope) {
        $scope.title = "Builds";
    }
]);
