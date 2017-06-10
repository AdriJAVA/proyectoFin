angular.module('webApp')
  .controller('modalEventCreatedCtrl', ['$scope','$uibModalInstance','key','$location',function ($scope,$uibModalInstance, key,$location) {
        
        $scope.go = function(){
          $uibModalInstance.close()
          $location.path('/app/event/' + key)
        }

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

  }]);
