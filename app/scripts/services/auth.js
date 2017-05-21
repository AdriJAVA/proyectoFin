'use strict';

angular.module('webApp')
  .factory('Auth',['$firebaseAuth',function ($firebaseAuth) {

    return $firebaseAuth();
  }]);
