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

    var getEvents = function(n){
      return $firebaseArray(Ref.child('events').orderByChild('date').limitToFirst(n)).reverse();
    }

    var createEvent = function(event){

      var deferred = $q.defer();
      var promise = deferred.promise;

      events.$add(event).then(function(data){
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

    var getEvent = function(id){
      return $firebaseObject(Ref.child("events").child(id)) 
    }

    var leaveEvent = function(idEvent,uid){
      Ref.child('events/'+ idEvent+ '/persons/' + uid).remove();
      Ref.child('users/' + uid + '/events/' + idEvent).remove();
    }

    var getEventsByProvince= function(province){
      return $firebaseArray(Ref.child("events").orderByChild("province").equalTo(province));    
}

    var getEventsByUid= function(uid){
      return $firebaseArray(Ref.child("events").orderByChild("uid").equalTo(uid));    
}

    var addPerson = function(idEvent,uid){
      return Ref.child("events").child(idEvent).child("persons").update({[uid] : true})
    }

    var removeEvent = function(event,uid){
      if(event.persons!=null){
        Object.keys(event.persons).forEach(function(key,index) {
          Ref.child('users/' + key + '/events/' + event.$id).remove();
        })
      }
      Ref.child('provinces/'+ event.province + '/events/' + event.$id).remove();
      Ref.child('users/' + uid + '/eventsCreated/' + event.$id).remove();
      Ref.child('events/'+ event.$id).remove();
      firebase.storage().ref().child(event.imagePath).delete()
    }

    return{
      createEvent: createEvent,
      getAll: getAll,
      getEventsByIds: getEventsByIds,
      getEventById: getEventById,
      addPerson: addPerson,
      getEventsByUid : getEventsByUid,
      leaveEvent: leaveEvent,
      removeEvent: removeEvent,
      getEvents: getEvents,
      getEvent: getEvent,
      getEventsByProvince: getEventsByProvince
    }


  }]);
