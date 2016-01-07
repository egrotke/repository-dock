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

repoControllers.controller('MainCtrl', ['repoService', '$scope', 'cacheService', 'accountsCacheService',
    function MainCtrl(repoService, $scope, cacheService, accountsCacheService) {


        var repoCache = cacheService.get('repoData');
        var accountsCache = accountsCacheService.get('accounts');

        $scope.accounts = [];
        if (repoCache) {
            $scope.repos = repoCache;
            $scope.accounts = accountsCache;
        } else {
            repoService.async().then(function(d) {
                $scope.repos = d.repos;
                cacheService.put('repoData', d.repos);

                $scope.repos.forEach(function(item) {
                    if ($scope.accounts.indexOf(item.account) === -1) {
                        $scope.accounts.push(item.account);
                    }
                });
                accountsCacheService.put('accounts', $scope.accounts);
            });
        }


        $scope.accountFilter = "";
        $scope.currentPage = 1;
        $scope.maxItemsPerPage = 8;
        $scope.repoAccount = "";
        $scope.form = {};

        $scope.selectRepoAccount = function(account) {
            $scope.repoAccount = account;
            // console.log("$scope.repo.account: " + $scope.repo.account);
        };
        $scope.numberOfPages = function() {
            if ($scope.filteredRepos) {
                return Math.ceil($scope.filteredRepos.length / $scope.maxItemsPerPage);
            }
        };
        $scope.sanitizeInput = function(input) {
            return input.replace(/(<([^>]+)>)/ig, "");
        };
        $scope.addRepo = function(formRepo) {
            var newRepoObj = $.extend({}, formRepo),
                $newRepo;

            newRepoObj.id = $scope.repos.length;
            newRepoObj.title = $scope.sanitizeInput(newRepoObj.title);
            newRepoObj.description = $scope.sanitizeInput(newRepoObj.description);
            $scope.repos = $scope.repos.concat([newRepoObj]);
            cacheService.put('repoData', $scope.repos);

            $("#newRepoModal").modal('hide').on('hidden.bs.modal', function() {
                $scope.form.newRepoForm.$setPristine(true);
                // $(this).find('form')[0].reset();
                $scope.formReset();
            });

            // Animation for new repo
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
        $scope.formReset = function() {
            $scope.form.newRepoForm.$setPristine(true);
            $scope.form.account = "";
            $scope.form.title = "";
            $scope.form.description = "";
            $scope.form.isPrivate = false;
        };

        $scope.switchFilter = function(newFilter) {
            $scope.currentPage = 1;
            $scope.accountFilter = (newFilter === "All accounts") ? "" : newFilter;
        };


    }
]);

repoControllers.controller('RepoCtrl', ['repoService', '$scope', '$routeParams', 'cacheService',
    function RepoCtrl(repoService, $scope, $routeParams, cacheService) {
        var id = $scope.id = $routeParams.id;

        var repoCache = cacheService.get('repoData');
        if (repoCache) {
            $scope.repos = repoCache;
            $scope.item = $scope.repos[id];
        } else {
            repoService.async().then(function(d) {
                $scope.repos = d.repos;
                $scope.item = $scope.repos[id];
            });
        }
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
