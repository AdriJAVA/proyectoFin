'use strict';

/**
 * @ngdoc directive
 * @name webApp.directive:map
 * @description
 * # map
 */
angular.module('webApp')
  .directive('map',['$location','$uibModal', function ($location,$uibModal) {
    return {
      template: '<div id="chart_wrap"><div id="map"></div></div>',
      restrict: 'E',
      scope:{
        provinceClick: '&',
        province: '='
      },
      link: function postLink(scope, element, attrs) {
         new SpainMap({
              id: 'map', //(Requerido) Elemento HTML en el que se renderizará el mapa
              width: '100%', //(Requerido) Ancho del mapa
              height: '700px', //(Requerido) Alto del mapa
              fillColor: "#eeeeee", // color de relleno del mapa
              strokeColor: "#bbbbbb", // color de las líneas de frontera
              strokeWidth: 0.7, // ancho de las líneas de frontera
              selectedColor: "#1abc9c", // color de relleno de la provincia al pasar el ratón por encima
              animationDuration: 200, // Duración de la animación de salida
              onClick: function(province, mouseevent) {
                            var modalInstance = $uibModal.open({
                                    animation: true,
                                    templateUrl: '../views/modalInfoProvince.html',
                                    controller: 'modalInfoProvinceCtrl',
                                    size: 'sm',
                                    resolve:{
                                      province: function(){
                                        return province.name;
                                      }
                                    }
                                      
                                })
                      
              } 
    });
      }
    };
  }]);
