'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('EventsCtrl', ['$scope','$rootScope','$firebaseAuth','$timeout','$firebaseArray','$routeParams','eventsSrv','provincesSrv','$location',function ($scope,$rootScope,$firebaseAuth,$timeout,$firebaseArray,$routeParams,eventsSrv,provincesSrv,$location) {
    
    $rootScope.showNav = true;

    console.log($routeParams.province)
    
    if($routeParams.province === 'all'){
      $scope.province = "ESPAÑA";
      $scope.events = eventsSrv.getAll();
    }else{
      provincesSrv.getProvinceById($routeParams.province)
      .then(function(data){
        console.log(data)
        $scope.province = data.name;
        return eventsSrv.getEventsByIds(data.events)
      })
      .then(function(events){
        console.log(events)
        $scope.events = events;
      })
      .catch(function(err){
        console.log(err)
        $location.path('/app/events/all')
      })
    }
    
    $scope.click = function(event){
      $location.path('/app/event/' + event.$id)
    }



}]);

