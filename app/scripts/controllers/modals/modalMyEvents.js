angular.module('webApp')
  .controller('modalMyEventsCtrl', ['$scope','$uibModalInstance','$location','mode',function ($scope,$uibModalInstance,$location,mode) {
        
        $scope.mode = mode;

        $scope.yes = function(){
          $uibModalInstance.close()
        }

        $scope.no = function () {
          $uibModalInstance.dismiss('cancel');
        };

  }]);
