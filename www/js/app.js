// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mainApp', ['ionic', 'firebase', 'mainApp.controllers', 'mainApp.services'])

.config(function($compileProvider){
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|blob|cdvfile|content):|data:image\//);

})
.run(function($ionicPlatform) {
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
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    // .state('tab.home', {
    //   url: '/home',
    //   views: {
    //     'tab-home': {
    //    templateUrl: 'templates/tab-home.html',
    //   controller: 'homeCtrl' 
    //       }
    //     }
    // })
    .state('tab.notes', {
      url: '/notes',
      views: {
        'tab-notes': {
        templateUrl: 'templates/tab-notes.html',
        controller: 'notesCtrl'
        }
      } 
        
    })
    .state('tab.notes-note',{
      url: '/notes/:noteId',
      views: {
        'tab-notes': {
          templateUrl: 'templates/notes-note.html',
          controller: 'noteCtrl'
        }
      }     
    })
    .state('tab.pictures', {
      url: '/pictures',
      views: {
        'tab-pictures': {
        templateUrl: 'templates/tab-pictures.html',
        controller: 'picturesCtrl'  
        }
      }
    })
    .state('tab.notes-update', {
      url: '/notes/edit/:noteId',
      views: {
        'tab-notes':{
          templateUrl: 'templates/notes-update.html',
          controller: 'updateNotesCtrl'
        }
      }
    })
    .state('tab.messages', {
      url: '/messages',
      views : {
        'tab-messages': {
      templateUrl: 'templates/tab-messages.html',
      controller: 'messagesCtrl' 
        }  
      }
    });
    $urlRouterProvider.otherwise('/tab/notes');
})
  .constant('FIREBASE_URL','https://remember-me.firebaseio.com/notes')
  .constant('MFB_URL', 'https://remember-me.firebaseio.com/messages')
  .constant('IFB_URL', 'https://remember-me.firebaseio.com/images');
