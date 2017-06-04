'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('webApp')
  .controller('AccountCtrl',['$scope','$rootScope','$firebaseAuth','$timeout','firebaseUser','$firebaseObject','Ref','Auth','userSrv',function ($scope,$rootScope,$firebaseAuth,$timeout,firebaseUser,$firebaseObject,Ref,Auth,userSrv) {
    $rootScope.showNav = true;
    $scope.user = firebaseUser;
    $scope.keys = Object.keys;
    $firebaseObject(Ref.child('users/'+ firebaseUser.uid)).$loaded(function(profile){
      $scope.profile = profile;


      if(profile.messages){
          $scope.nMessages = Object.keys(profile.messages).length;
      }else{
          $scope.nMessages = 0;
      }
    })
    
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
      if($scope.imageUpload != undefined){
        console.log($scope.imageUpload)
       var storage = firebase.storage();
      var storageRef = storage.ref();
      var file = $scope.imageUpload;
       var uploadTask = storageRef.child('imagesProfile/' + firebaseUser.uid).put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(){},function(){},
          function(snapshot) {
             var Profileref = Ref.child('users').child(firebaseUser.uid);
             console.log(uploadTask.snapshot.downloadURL)
                Profileref.update({name: $scope.profile.name,description: $scope.profile.description || "",imagePath:'imagesProfile/' + firebaseUser.uid, image: uploadTask.snapshot.downloadURL }).then(function(){
                  $scope.successProfile = true;
                  $scope.$apply();
                  $timeout(function(){
                    $scope.successProfile = false;
                  },2000)
        })
             
          });
        }else{
          var Profileref = Ref.child('users').child(firebaseUser.uid);
          Profileref.update({name: $scope.profile.name,description: $scope.profile.description || ""}).then(function(){
                    $scope.successProfile = true;
                    $scope.$apply();
                    $timeout(function(){
                      $scope.successProfile = false;
                    },2000)
        })
        }
      }


    Ref.child('users').child(firebaseUser.uid).on('value',function(snapshot) {
      var profile = snapshot.val();
       if(profile.messages){
          $scope.nMessages = Object.keys(profile.messages).length;
      }else{
          $scope.nMessages = 0;
      }
    });

      $scope.remove = function(message){
        userSrv.removeMessage(firebaseUser.uid,message)
      }

    function showError(err) {
      $scope.errPass = err;
    }

     $scope.isNavCollapsed = true;
      $scope.isCollapsed = false;
      $scope.isCollapsedHorizontal = false;


  }]);
