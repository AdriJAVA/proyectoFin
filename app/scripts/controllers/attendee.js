'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MyeventsCtrl
 * @description
 * # MyeventsCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('AttendeeCtrl', ['$scope','$rootScope','$location','provincesSrv','Ref','eventsSrv','firebaseUser','userSrv','$uibModal',function ($scope,$rootScope,$location,provincesSrv,Ref,eventsSrv,firebaseUser,userSrv,$uibModal) {

    $rootScope.showNav = true;

    getEvents();

       
    $scope.leaveEvent = function(event){
      var modalInstance = $uibModal.open({
                animation: true,
                    templateUrl: '../views/modalMyEvents.html',
                    controller: 'modalMyEventsCtrl',
                    size: 'sm',
                    resolve:  {   
                      mode : function(){
                        return 'abandonar';
                      }
                    }
                                
              
            }) 

    modalInstance.result.then( function () {
        eventsSrv.leaveEvent(event.$id,firebaseUser.uid);
        getEvents();
        });
    }

    $scope.click = function(event){
      $location.path('/app/event/' + event.$id)
    }

       Ref.child('events').on('value',function(snapshot) {
          var event = snapshot.val();
          getEvents();
      });

    function getEvents(){
      userSrv.getEvents(firebaseUser.uid).then(function(user){
        if(user.events !=null){
          return eventsSrv.getEventsByIds(user.events)
        }
      }).then(function(events){
        if(events){
          $scope.events = events;
        }else{
          $scope.events = 0;
        }          
          })
    }

 

    
}]);


