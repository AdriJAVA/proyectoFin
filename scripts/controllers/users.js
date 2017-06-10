'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('UsersCtrl', ['$scope','$rootScope','$firebaseAuth','Ref','$firebaseArray','$routeParams','eventsSrv','provincesSrv','$location',function ($scope,$rootScope,$firebaseAuth,Ref,$firebaseArray,$routeParams,eventsSrv,provincesSrv,$location) {
    
    $rootScope.showNav = true;
    $scope.n = 20;
    
    getUsers();
    
    $scope.click = function(user){
      $location.path('/app/user/' + user.$id)
    }

    $scope.loadMore = function() {
      if($routeParams.province === 'all'){
         $scope.n += 10;
         $scope.users = eventsSrv.getUsers($scope.n);
      }
    }


   function getUsers()  {
    if($routeParams.province === 'all'){
      $scope.province = "ESPAÑA";
      eventsSrv.getUsers($scope.n).$loaded(function(users){
        $scope.users = users;
      })
    }else{
      provincesSrv.getProvinceById($routeParams.province)
      .then(function(data){
        $scope.province = data.name;
        $scope.users = eventsSrv.getUsersByProvince($routeParams.province);
      })
 
    }
  }

}]);

