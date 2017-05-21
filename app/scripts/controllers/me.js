'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MeCtrl
 * @description
 * # MeCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MeCtrl', ['$scope','$rootScope','$firebaseArray','provincesSrv','$firebaseStorage','eventsSrv','firebaseUser','userSrv','$uibModal',function ($scope,$rootScope,$firebaseArray,provincesSrv,$firebaseStorage,eventsSrv,firebaseUser,userSrv,$uibModal) {
    
    $rootScope.showNav = true;
    $scope.provinces = provincesSrv.getAll();
    $scope.event = {};
    $scope.err = false;

    $scope.createEvent = function(){
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var file = $scope.imageUpload;
          var metadata = {
            contentType: 'image/jpeg'
          };

          console.log($scope.event)

          var uploadTask = storageRef.child('images/' + guid()).put(file, metadata);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
              var progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
              $scope.progress = Math.round(progress);
              $scope.show = true;
            }, function(error) {
              $scope.err = true;
          }, function() {
            
            $scope.event.uid = firebaseUser.uid;
            $scope.event.image = uploadTask.snapshot.downloadURL;
            $scope.event.province = $scope.province.$id;
            $scope.event.date = $scope.event.date.getTime();
            $scope.event.time = $scope.event.time.toString();
             eventsSrv.createEvent($scope.event)
             .then(function(key){
               $scope.key = key;
               return provincesSrv.addEvent( $scope.event.province,key)})
             .then(function(){
               return userSrv.addEventCreated($scope.event.uid,$scope.key)
               })
             .then(function(){
               openModal();
               $scope.show = false;
              })
              .catch(function(err){
                $scope.err = true;
              })
             
          });
    }


       var openModal = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '../views/modalEventCreated.html',
                controller: 'modalEventCreatedCtrl',
                size: 'sm',
                resolve: {
                    key: function() {
                        return $scope.key;
                   }
              }    
            })

            modalInstance.result.then(function () {}, function () {
               clearAll();
              });
          
    }

    var clearAll = function(){
      $scope.event = {
        name: "",
        description: "",
        date: "",
      }
    }

      $scope.dateOptions = {
          formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
          minDate: new Date(),
          startingDay: 1
        };

        $scope.open1 = function() {
          $scope.popup1.opened = true;
      };

       $scope.popup1 = {
          opened: false
      };

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4();
  }




              
    
}]);

