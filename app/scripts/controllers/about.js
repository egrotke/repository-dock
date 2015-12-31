'use strict';

/**
 * @ngdoc function
 * @name sitesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sitesApp
 */
angular.module('sitesApp')
  .controller('AboutCtrl', ['$scope', function AboutCtrl() {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
