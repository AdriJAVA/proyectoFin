angular.module('webApp')
  .controller('modalLeaveEventCtrl', ['$scope','$uibModalInstance','$location',function ($scope,$uibModalInstance) {
        
        $scope.yes = function(){
          $uibModalInstance.close()
        }

        $scope.no = function () {
          $uibModalInstance.dismiss('cancel');
        };

  }]);
