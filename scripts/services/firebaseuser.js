'use strict';

/**
 * @ngdoc service
 * @name webApp.firebaseUser
 * @description
 * # firebaseUser
 * Service in the webApp.
 */
angular.module('webApp')
   .factory('firebaseUser',['$firebaseAuth',function ($firebaseAuth) {

    return $firebaseAuth().$getAuth()
  }]);
