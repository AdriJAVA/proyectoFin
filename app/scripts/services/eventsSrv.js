'use strict';

/**
 * @ngdoc service
 * @name webApp.eventsSrv
 * @description
 * # eventsSrv
 * Service in the webApp.
 */
angular.module('webApp')
  .factory('eventsSrv', ['Ref','$firebaseArray','$q',function (Ref,$firebaseArray,$q) {

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

    var addPerson = function(idEvent,uid){
      return Ref.child("events").child(idEvent).child("persons").update({[uid] : true})
    }


    return{
      createEvent: createEvent,
      getAll: getAll,
      getEventsByIds: getEventsByIds,
      getEventById: getEventById,
      addPerson: addPerson,
    }


  }]);
