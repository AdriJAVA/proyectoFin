'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('webApp')
  .controller('AccountCtrl',['$scope','$rootScope','$firebaseAuth','$timeout','firebaseUser','$firebaseObject','Ref','Auth','userSrv','provincesSrv',function ($scope,$rootScope,$firebaseAuth,$timeout,firebaseUser,$firebaseObject,Ref,Auth,userSrv,provincesSrv) {
    $rootScope.showNav = true;
    $scope.user = firebaseUser;
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;

    $scope.provinces = provincesSrv.getAll();

    $firebaseObject(Ref.child('users/'+ firebaseUser.uid)).$loaded(function(profile){
      $scope.profile = profile;
      
      provincesSrv.getProvinceById(profile.province).then(function(province){
        $scope.province = province;
      })

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
      var Profileref = Ref.child('users').child(firebaseUser.uid);

      if($scope.imageUpload != undefined){
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var file = $scope.imageUpload;
       var uploadTask = storageRef.child('imagesProfile/' + firebaseUser.uid).put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(){},function(){},
          function(snapshot) {
                Profileref.update({name: $scope.profile.name,description: $scope.profile.description || "",imagePath:'imagesProfile/' + firebaseUser.uid, image: uploadTask.snapshot.downloadURL,province: $scope.province.$id }).then(function(){
                  $scope.successProfile = true;
                  $scope.$apply();
                  $timeout(function(){
                    $scope.successProfile = false;
                  },2000)
        })
             
          });
        }else{
          Profileref.update({name: $scope.profile.name,description: $scope.profile.description || "",province: $scope.province.$id}).then(function(){
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




  }]);
