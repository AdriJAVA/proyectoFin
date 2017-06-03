'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('webApp')
  .controller('AccountCtrl',['$scope','$rootScope','$firebaseAuth','$timeout','firebaseUser','$firebaseObject','Ref','Auth',function ($scope,$rootScope,$firebaseAuth,$timeout,firebaseUser,$firebaseObject,Ref,Auth) {
    $rootScope.showNav = true;
    $scope.user = firebaseUser;
    
    $scope.profile = $firebaseObject(Ref.child('users/'+ firebaseUser.uid));  
    
    $scope.changePassword = function(oldPass, newPass, confirm) {
      $scope.err = null;

      if( newPass !== confirm ) {
        showError('Las contraseñas no coinciden');
      }
      else {
        Auth.$updatePassword(newPass)
          .then(function() {
                $scope.successPass = true;
          }, showError);
      }
    };

    $scope.updateProfile = function() {
       var storage = firebase.storage();
      var storageRef = storage.ref();
      var file = $scope.imageUpload;
       var uploadTask = storageRef.child('imagesProfile/' + firebaseUser.uid).put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(){},function(){},
          function(snapshot) {
             var Profileref = Ref.child('users').child(firebaseUser.uid);
             console.log(uploadTask.snapshot.downloadURL)
                Profileref.update({name: $scope.profile.name,imagePath:'imagesProfile/' + firebaseUser.uid, image: uploadTask.snapshot.downloadURL }).then(function(){
                  $scope.successProfile = true;
                  $scope.$apply();
                  $timeout(function(){
                    $scope.successProfile = false;
                  },2000)
        })
             
          });

       
      }

    function showError(err) {
      $scope.errPass = err;
    }


  }]);
