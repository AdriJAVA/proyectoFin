'use strict';


angular.module('webApp')
  .controller('navbarCtrl', ['$scope','$rootScope','firebaseUser','$firebaseObject','Auth','Ref','$route',function($scope,$rootScope, firebaseUser, $firebaseObject,Auth,Ref,$route) {

   $scope.logout = function() { 
     Auth.$signOut();   
    window.location.reload(); 
  };
  $scope.name = $firebaseObject(Ref.child('users/' + firebaseUser.uid+'/name'))
  console.log($scope.name)
  }]);
