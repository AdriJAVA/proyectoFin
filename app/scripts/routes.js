'use strict';
/**
 * @ngdoc overview
 * @name webApp:routes
 * @description
 * # routes.js
 */
angular.module('webApp')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .when('/app/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
            "currentAuth": ["$firebaseAuth", function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }]
      }})
      .when('/app/events/:province', {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl',
        resolve: {
            "currentAuth": ["$firebaseAuth", function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }]
      }})
      .when('/app/event/:id', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl',
        resolve: {
            "currentAuth": ["$firebaseAuth", function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }]
      }})
      .when('/app/me/create', {
        templateUrl: 'views/createEvent.html',
        controller: 'MeCtrl',
        resolve: {
            "currentAuth": ["$firebaseAuth", function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }]
      }})
      .when('/app/me/events/attend', {
        templateUrl: 'views/attendEvents.html',
        controller: 'MyEventsCtrl',
        resolve: {
            "currentAuth": ["$firebaseAuth", function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }]
      }})
      .when('/app/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        resolve: {
            "currentAuth": ["$firebaseAuth", function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }]
      }})
            
      .otherwise({redirectTo: '/login'});
  }])

.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {

    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
      window.location.reload(); 

    }
  });
}]);

