'use strict';

/**
 * @ngdoc service
 * @name webApp.eventsSrv
 * @description
 * # eventsSrv
 * Service in the webApp.
 */
angular.module('webApp')
  .factory('eventsSrv', ['Ref','$firebaseArray','$q','$firebaseObject',function (Ref,$firebaseArray,$q,$firebaseObject) {

    var eventsRef = Ref.child('events');
    var query = eventsRef.orderByChild("date");
    var events = $firebaseArray(query);
 
    var getAll = function(){
      return events.reverse();
    };

    var createEvent = function(event){

      var deferred = $q.defer();
      var promise = deferred.promise;

      events.$add(event).then(function(data){
        console.log(data)
        deferred.resolve(data.key);
      }).catch(function(error) {
          deferred.reject(error);
        });

        return promise;
    }

    var getEventsByIds= function(list){
      var aux = [];
      Object.keys(list).forEach(function(key,index) {
        events.$loaded().then(function(){
            aux.push(events.$getRecord(key))
        })
      });

      return aux;
    }

    var getEventById= function(id){
      var deferred = $q.defer();
      var promise = deferred.promise;
        events.$loaded().then(function(){
              deferred.resolve(events.$getRecord(id));
        })
        .catch(function(){
           deferred.reject(error);
        });

        return promise;  
    }

    var leaveEvent = function(idEvent,uid){
      Ref.child('events/'+ idEvent+ '/persons/' + uid).remove();
      Ref.child('users/' + uid + '/events/' + idEvent).remove();
    }

    var getEventsByUid= function(uid){
      return $firebaseArray(Ref.child("events").orderByChild("uid").equalTo(uid));
        
}

    var addPerson = function(idEvent,uid){
      return Ref.child("events").child(idEvent).child("persons").update({[uid] : true})
    }


    return{
      createEvent: createEvent,
      getAll: getAll,
      getEventsByIds: getEventsByIds,
      getEventById: getEventById,
      addPerson: addPerson,
      getEventsByUid : getEventsByUid,
      leaveEvent: leaveEvent
    }


  }]);
