'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('webApp')
  .controller('LoginCtrl', ['$scope','$rootScope','$location','$q','Auth','Ref','$timeout',function($scope,$rootScope, $location, $q,Auth,Ref,$timeout) {

    $rootScope.showNav = false;
    $scope.login = function(email,pass){
        Auth.$signInWithEmailAndPassword(email,pass).then(function(firebaseUser){
            console.log("Signed in as:", firebaseUser.uid);
            $location.path('/app/home');
        })
        .catch(showError)
    }


    $scope.createAccount = function(email,pass,confirm) {
      $scope.err = null;
      if(pass === confirm){
        Auth.$createUserWithEmailAndPassword(email, pass)
          .then(function () {
            return Auth.$signInWithEmailAndPassword(email, pass);
          })
          .then(createProfile)
          .then(redirect, showError);
      }else{
          showError("Las contraseñas no coinciden");
      }

      function createProfile(user) {
        var Profileref = Ref.child('users').child(user.uid), def = $q.defer();
        Profileref.set({email: email, name: $scope.name}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(Profileref);
            }
          });
        });
        return def.promise;
      }
    };

    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  }]);
