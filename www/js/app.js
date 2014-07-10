// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mainApp', ['ionic', 'service', 'controllers'])

.run(function($ionicPlatform, service, controllers) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })
    .state('notes', {
      url: '/notes', 
        templateUrl: 'templates/notes.html'
    })
    .state('pictures', {
      url: '/pictures',
      templateUrl: 'templates/pictures.html'
    }).
    state('messages', {
      url: '/messages',
      templateUrl: 'templates/messages.html'
    })
})
