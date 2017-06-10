

angular.module('webApp')
  .controller('modalInfoProvinceCtrl', ['$scope','$uibModalInstance','$log','province','provincesSrv','$location',function ($scope,$uibModalInstance,$log,province,provincesSrv,$location) {
        $scope.province = province;
        provincesSrv.getProvinceById(province).then(function(data){
          $scope.name = data.name;
          $scope.id = data.$id;
          if(data.events!=null){
            $scope.events = Object.keys((data.events)).length;
          }else{
            $scope.events = 0;
          }
        })
        
        $scope.goProvince = function(){
          $uibModalInstance.close()
          $location.path('/app/events/' + $scope.id)
        }

        $scope.goAll = function(){
         $uibModalInstance.close()
          $location.path('/app/events/all')
        }

        $scope.goUsers = function(){
          $uibModalInstance.close()
          $location.path('/app/users/' + $scope.id)
        }
        
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

  }]);
