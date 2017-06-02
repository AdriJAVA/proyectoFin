'use strict';

/**
 * @ngdoc service
 * @name webApp.userSrv
 * @description
 * # userSrv
 * Service in the webApp.
 */
angular.module('webApp')
  .factory('userSrv', ['Ref','$firebaseArray','$q','$firebaseObject',function (Ref,$firebaseArray,$q,$firebaseObject) {
    var users = $firebaseArray(Ref.child("users"));
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
              deferred.resolve(true)
            }else{
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
              deferred.reject(false);
            }
        });

        return promise;
    }

    var getEvents= function(uid){
      var deferred = $q.defer();
      var promise = deferred.promise;

      users.$loaded().then(function(){
           deferred.resolve(users.$getRecord(uid))
      }).catch(function(error) {
          deferred.reject(error);
        });

        return promise;
    }

    var getUser = function(uid){
      return $firebaseObject(Ref.child("users").child(uid));
    }

     var getUsersByUids= function(list){
      var aux = [];
      Object.keys(list).forEach(function(key,index) {
        users.$loaded().then(function(){
            aux.push(users.$getRecord(key))
        })
      });

      return aux;
    }



    
    return{
      addEventCreated: addEventCreated,
      addEvent: addEvent,
      checkEvent: checkEvent,
      checkEventCreated: checkEventCreated,
      getEvents:getEvents,
      getUser: getUser,
      getUsersByUids: getUsersByUids
    }


  }]);