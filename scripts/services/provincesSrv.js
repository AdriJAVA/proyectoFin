'use strict';

/**
 * @ngdoc service
 * @name webApp.provinces
 * @description
 * # provinces
 * Service in the webApp.
 */
angular.module('webApp')
  .factory('provincesSrv', ['Ref','$firebaseArray','$q',function (Ref,$firebaseArray,$q) {

    var provincesRef = Ref.child('provinces');

    var provinces = $firebaseArray(provincesRef);
 
    var getAll = function(){
      return provinces;
    };

    var addEvent = function(province,idEvent){
      return Ref.child("provinces").child(province).child("events").update({[idEvent] : true})
    }

    var getProvinceById = function(province){

      var deferred = $q.defer();
      var promise = deferred.promise;

      provinces.$loaded().then(function(){
           deferred.resolve(provinces.$getRecord(province))
      }).catch(function(error) {
          deferred.reject(error);
        });

        return promise;
    }

    return{
      getAll: getAll,
      addEvent: addEvent,
      getProvinceById: getProvinceById
    }


  }]);
