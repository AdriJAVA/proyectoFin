'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('HomeCtrl', ['$scope','$rootScope','$firebaseAuth','$firebaseArray','$uibModal',function ($scope,$rootScope,$firebaseAuth,$firebaseArray,$uibModal) {

      var firebaseUser = $firebaseAuth().$getAuth();
      
      $rootScope.showNav = true;
     



}]);
