'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:EventctrlCtrl
 * @description
 * # EventctrlCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('EventCtrl', ['$scope','$rootScope','$firebaseAuth','userSrv','$firebaseArray','$routeParams','eventsSrv','provincesSrv','Ref','firebaseUser','$uibModal','$location',function ($scope,$rootScope,$firebaseAuth,userSrv,$firebaseArray,$routeParams,eventsSrv,provincesSrv,Ref,firebaseUser,$uibModal,$location) {
    
    $rootScope.showNav = true;

    eventsSrv.getEventById($routeParams.id).then(function(event){
      $scope.hour = new Date(event.time)
      $scope.event = event;  
      return event.province;
    })
    .then(function(province){
      return provincesSrv.getProvinceById(province);
    })
    .then(function(data){
      $scope.province = data.name; 
    })

    $scope.joinEvent = function(){
      eventsSrv.addPerson($scope.event.$id,firebaseUser.uid)
      .then(function(data){
        $scope.persons =  Object.keys($scope.event.persons).length;
        $scope.$apply();
      })
      .then(function(){
        return userSrv.addEvent(firebaseUser.uid,$scope.event.$id)
      })
      .then(function(){
        $scope.unlinkedUser = false;
        openModal()
      })
    }

    Ref.child('events').child($routeParams.id).on('value',function(snapshot) {
      var event = snapshot.val();
      if(event!= null){
        if(event.persons !=null){
        $scope.persons =  Object.keys(event.persons).length;
          if($scope.persons >= event.capacity){
            $scope.fullEvent = true;
          }
        }else{
          $scope.persons = 0;
        }
      }
        if(event=== null & $routeParams.id !== null){
         $location.path('/app/events/all')
        }
      
  });

    Ref.child('users').child(firebaseUser.uid).child("events").on('value',function(snapshot) {
       if($routeParams.id!=null){
        userSrv.checkEvent(firebaseUser.uid,$routeParams.id).then(function(data){
        $scope.unlinkedUser = false;
      }).catch(function(){
        $scope.unlinkedUser = true;
      })
       }
    });

    Ref.child('users').child(firebaseUser.uid).child("eventsCreated").on('value',function(snapshot) {
      if($routeParams.id!=null){
        
        userSrv.checkEventCreated(firebaseUser.uid,$routeParams.id).then(function(data){
        $scope.adminEvent = true;
      }).catch(function(){
        $scope.adminEvent = false;
      })
      }
    });



    var openModal = function(){
            var modalInstance = $uibModal.open({
                template: '<div class="modal-content"><div class="modal-body"><h3 class="modal-title text-center">¡TE HAS UNIDO!</h3><div style="text-align: center"><img src="../images/tick.png"></div></div></div>',
                size: 'sm'
              
            })     
    }
}]);
