'use strict';

/**
 * @ngdoc directive
 * @name webApp.directive:ngFileSelect
 * @description
 * # ngFileSelect
 */
angular.module('webApp')
 .directive("ngFileSelect",function(){    
  return {
    link: function($scope,el){          
      el.bind("change", function(e){          
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      });          
    }        
  }});