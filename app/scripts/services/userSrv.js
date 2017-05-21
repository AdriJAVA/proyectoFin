'use strict';

/**
 * @ngdoc service
 * @name webApp.userSrv
 * @description
 * # userSrv
 * Service in the webApp.
 */
angular.module('webApp')
  .factory('userSrv', ['Ref','$firebaseArray','$q',function (Ref,$firebaseArray,$q) {

    var addEventCreated = function(idUser,idEvent){
      return Ref.child("users").child(idUser).child("eventsCreated").update({[idEvent] : true})
    };

    var addEvent = function(idUser,idEvent){
      return Ref.child("users").child(idUser).child("events").update({[idEvent] : true})
    };

    var checkEvent = function(idUser,idEvent){

      var deferred = $q.defer();
      var promise = deferred.promise;
      var eventsRef =  Ref.child("users").child(idUser).child("events").child(idEvent);
        eventsRef.once("value",function(snapshot) {
            if(snapshot.val()){
              snapshot.val()
              console.log("Existe")
              deferred.resolve(true)
            }else{
              console.log("No existe")
              deferred.reject(false);
            }
        });

        return promise
    }

    var checkEventCreated = function(idUser,idEvent){

      var deferred = $q.defer();
      var promise = deferred.promise;
      var eventsRef =  Ref.child("users").child(idUser).child("eventsCreated").child(idEvent);
        eventsRef.once("value",function(snapshot) {
            if(snapshot.val()){
              snapshot.val()
              console.log("Existe")
              deferred.resolve(true)
            }else{
              console.log("No existe")
              deferred.reject(false);
            }
        });

        return promise
    }
    
    return{
      addEventCreated: addEventCreated,
      addEvent: addEvent,
      checkEvent: checkEvent,
      checkEventCreated: checkEventCreated
    }


  }]);