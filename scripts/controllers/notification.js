'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('NotificationCtrl', ['$scope','$rootScope','firebaseUser','$q','Auth','Ref','$route',function($scope,$rootScope, firebaseUser, $q,Auth,Ref,$route) {

  $scope.alerts = [];
  

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };    

  var event = false;

  Ref.child('events').on('child_added',function(snapshot) {
    
    if (!event) return;
    var newEvent = snapshot.val();
    var id = newEvent.$id;
    var alert = {};
    alert.name = newEvent.name;
    alert.id = snapshot.key;
    $scope.alerts.push(alert);
    
  })

  Ref.child('events').once('value', function(snapshot) {
     event = true;
  });


  }]);