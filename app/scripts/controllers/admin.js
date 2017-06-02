'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('AdminCtrl', ['$scope','$rootScope','$location','provincesSrv','Ref','eventsSrv','firebaseUser','userSrv','$uibModal',function ($scope,$rootScope,$location,provincesSrv,Ref,eventsSrv,firebaseUser,userSrv,$uibModal) {

    $rootScope.showNav = true;

    $scope.events = eventsSrv.getEventsByUid(firebaseUser.uid) || 0;
    console.log($scope.events.length)
    $scope.removeEvent = function(event){
      var modalInstance = $uibModal.open({
                animation: true,
                    templateUrl: '../views/modalMyEvents.html',
                    controller: 'modalMyEventsCtrl',
                    size: 'sm',
                    resolve:  {   
                      mode : function(){
                        return 'eliminar';
                      }
                    }
                                
              
            }) 

    modalInstance.result.then( function () {
        eventsSrv.removeEvent(event,firebaseUser.uid)
        $location.path('/app/me/events/admin')
        });
    }

    $scope.editEvent = function(event){
      var modalInstance = $uibModal.open({
                animation: true,
                    templateUrl: '../views/modalEditEvent.html',
                    controller: 'modalEditEventCtrl',
                    size: 'md',
                    resolve:  {   
                      event : function(){
                        return event;
                      }
                    }
                                
              
            }) 

    modalInstance.result.then( function () {
        eventsSrv.removeEvent(event,firebaseUser.uid)
        $location.path('/app/me/events/admin')
        });
    }

    $scope.click = function(event){
      $location.path('/app/event/' + event.$id)
    }

    

    
}]);


