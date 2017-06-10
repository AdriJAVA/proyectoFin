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

    $scope.currentDate =  new Date().getTime();



   function getEvents()  {
    if($routeParams.province === 'all'){
      $scope.province = "ESPAÑA";
      $scope.events = eventsSrv.getEvents($scope.n);
    }else{
      provincesSrv.getProvinceById($routeParams.province)
      .then(function(data){
        $scope.province = data.name;
        $scope.events = eventsSrv.getEventsByProvince($routeParams.province);
      })
 
    }
  }

}]);

