angular.module('webApp')
  .controller('modalSendMessageCtrl', ['$scope','$uibModalInstance','user','firebaseUser','eventsSrv','userSrv','$uibModal',function ($scope,$uibModalInstance, user,firebaseUser,eventsSrv,userSrv, $uibModal) {
        
        eventsSrv.getEventsByUid(firebaseUser.uid).$loaded(function(events){
          $scope.events = events;
          console.log($scope.events)
        })

        $scope.send = function(){
          userSrv.addMessage(user.$id,$scope.message).then(function(){
            $scope.err = false;
            var modalInstance = $uibModal.open({
                template: '<div class="modal-content"><div class="modal-body"><h3 class="modal-title text-center">¡SE HA ENVIADO!</h3><div style="text-align: center"><img src="../images/tick.png"></div></div></div>',
                size: 'sm'
            })     

             $uibModalInstance.close();
          })
          .catch(function(err){
            $scope.err = true;
          })
        }

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

  }]);
