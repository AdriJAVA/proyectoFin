'use strict';


angular.module('webApp')
  .controller('navbarCtrl', ['$scope','$rootScope','firebaseUser','$q','Auth','Ref','$route',function($scope,$rootScope, firebaseUser, $q,Auth,Ref,$route) {

   $scope.logout = function() { 
     Auth.$signOut();   
    window.location.reload(); 
  };
$scope.name = firebaseUser.uid

  }]);
