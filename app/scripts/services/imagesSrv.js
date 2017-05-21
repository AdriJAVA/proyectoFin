




angular.module('webApp')
  .factory('imagesSrv', ['Ref','$firebaseArray',function (Ref,$firebaseArray) {

     var upload = function(){
          var storage = firebase.storage();
          var storageRef = storage.ref();
          
          var file = $scope.image

          var metadata = {
            contentType: 'image/jpeg'
          };

          var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            }, function(error) {
                console.log(error)
          }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
          });
     }
    return{
      createEvent: createEvent,
      getAll: getAll
    }


  }]);
