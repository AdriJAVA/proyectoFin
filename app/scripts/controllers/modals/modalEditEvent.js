angular.module('webApp')
  .controller('modalEditEventCtrl', ['$scope','$uibModalInstance','$location','event',function ($scope,$uibModalInstance,$location,event) {
        
       $scope.event = event;

       $scope.min = event.capacity;

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

  }]);
