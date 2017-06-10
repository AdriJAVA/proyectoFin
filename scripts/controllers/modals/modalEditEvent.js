angular.module('webApp')
  .controller('modalEditEventCtrl', ['$scope','$uibModalInstance','eventsSrv','$location','idEvent','$uibModal',function ($scope,$uibModalInstance,eventsSrv,$location,idEvent,$uibModal) {
        
      eventsSrv.getEvent(idEvent).$loaded()
        .then(function(event) {
           $scope.event = event;
           $scope.min = event.capacity;
        })
        .catch(function(error) {
          console.error("Error:", error);
        });


        $scope.saveEvent = function(){
          $scope.event.$save().then(function(ref) {
              $uibModalInstance.close()
              openModal();

            }, function(error) {
              $scope.err = true;
            });
        }



      $scope.dateOptions = {
          formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
          minDate: new Date(),
          startingDay: 1
        };

      $scope.open1 = function() {
          $scope.popup1.opened = true;
      };

       $scope.popup1 = {
          opened: false
      };

       var openModal = function(){
            var modalInstance = $uibModal.open({
                template: '<div class="modal-content"><div class="modal-body"><h3 class="modal-title text-center">¡EVENTO EDITADO!</h3><div style="text-align: center"><img src="../images/tick.png"></div></div></div>',
                size: 'sm'
            })     
    }

  }]);
