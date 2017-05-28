'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('EventsCtrl', ['$scope','$rootScope','$firebaseAuth','Ref','$firebaseArray','$routeParams','eventsSrv','provincesSrv','$location',function ($scope,$rootScope,$firebaseAuth,Ref,$firebaseArray,$routeParams,eventsSrv,provincesSrv,$location) {
    
    $rootScope.showNav = true;
    $scope.n = 10;
    console.log($routeParams.province)
    
    getEvents();
    
    $scope.click = function(event){
      $location.path('/app/event/' + event.$id)
    }

    $scope.loadMore = function() {
      if($routeParams.province === 'all'){
         $scope.n += 10;
      $scope.events = eventsSrv.getEvents($scope.n);
      }
    }


    Ref.child('events').on('value',function(snapshot) {
     if($routeParams.province !== 'all'){
       getEvents();
     }
      
      
  });

   function getEvents()  {
    if($routeParams.province === 'all'){
      $scope.province = "ESPAÑA";
      $scope.events = eventsSrv.getEvents($scope.n);
      console.log($scope.events)
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
  }

}]);

