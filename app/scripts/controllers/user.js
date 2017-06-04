'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the webApp
 */

angular.module('webApp')
  .controller('UserCtrl', ['$scope','$rootScope','$location','provincesSrv','$routeParams','Ref','firebaseUser','userSrv','$uibModal',function ($scope,$rootScope,$location,provincesSrv,$routeParams,Ref,firebaseUser,userSrv,$uibModal) {

    $rootScope.showNav = true;

    userSrv.getUser($routeParams.uid).$loaded(function(user){
      $scope.user = user;

      if(user.events){
          $scope.nEvents = Object.keys(user.events).length;
      }else{
          $scope.nEvents = 0;
      }

      if(user.eventsCreated){
          $scope.nEventsCreated = Object.keys(user.eventsCreated).length;
      }else{
          $scope.nEventsCreated = 0;
      }
      
    })


    $scope.sendMessage = function(){
      var modalInstance = $uibModal.open({
                animation: true,
                    templateUrl: '../views/modalSendMessage.html',
                    controller: 'modalSendMessageCtrl',
                    size: 'md',
                    resolve:  {   
                      user : function(){
                        return $scope.user;
                      }   
                    }
                                
              
            }) 
    }






    Ref.child('users').child($routeParams.uid).on('value',function(snapshot) {
      var user = snapshot.val();
       if(user.events){
          $scope.nEvents = Object.keys(user.events).length;
      }else{
          $scope.nEvents = 0;
      }

      if(user.eventsCreated){
          $scope.nEventsCreated = Object.keys(user.eventsCreated).length;
      }else{
          $scope.nEventsCreated = 0;
      }
    });
    

 

    
}]);


