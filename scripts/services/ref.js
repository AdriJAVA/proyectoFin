'use strict';

angular.module('webApp')
  .factory('Ref',[function () {
    return firebase.database().ref();
  }]);
