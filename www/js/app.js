// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mainApp', ['ionic', 'firebase', 'mainApp.controllers', 'mainApp.services', 'routeSecurity', 'simpleLoginTools'])

.config(function($compileProvider){
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|blob|cdvfile|content):|data:image\//);

})
.run(function($ionicPlatform, $state, $rootScope, $firebaseSimpleLogin, $firebase, $window, $ionicLoading, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $rootScope.userEmail = null;
    $rootScope.baseUrl = 'https://remember-me.firebaseio.com/';
    var authRef = new Firebase($rootScope.baseUrl);
    // $rootScope.auth = $firebaseSimpleLogin(authRef);

    // $rootScope.auth.$getCurrentUser().then(function(user){
    //   if(!user){
    //     $rootScope.userEmail = null;
    //     $state.go('login.signin');
    //   }
    // }, function(err){
    //   console.error(err);
    // });

  //   $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
  //   $rootScope.userEmail = user.email;
  //   $state.go('tab.notes');
  //     });

  // $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
  //   console.log($state);
  //   $rootScope.userEmail = null;
  //   $state.go('login.signin');
  //     });

    $rootScope.show = function(text){
      $rootScope.loading = $ionicLoading.show({
        content: text ? text: 'Loading...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidith: 200,
        showDelay: 0 
      });
    };

    $rootScope.hide = function(){
      $ionicLoading.hide();
    }

     $rootScope.notify = function(text, time) {
            var time = time || 999;
            $rootScope.show(text);
            $window.setTimeout(function() {
                $rootScope.hide();
            }, time);
        };

    $rootScope.logout = function(){
      Auth.logout()
      $rootScope.notify('Succesfully Logged out!!');
    };

  });
})
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.notes', {
      url: '/notes',
      authRequired: true,
      views: {
        'tab-notes': {
        templateUrl: 'templates/tab-notes.html',
        controller: 'notesCtrl'
        }
      } 
    })
    .state('tab.notes-note',{
      url: '/notes/:noteId',
     authRequired: true,  
      views: {
        'tab-notes': {
          templateUrl: 'templates/notes-note.html',
          controller: 'noteCtrl'
        }
      }     
    })
    .state('tab.pictures', {
      url: '/pictures',
      authRequired: true,  
      views: {
        'tab-pictures': {
        templateUrl: 'templates/tab-pictures.html',
        controller: 'picturesCtrl' 
        }
      }
    })
    .state('tab.notes-update', {
      url: '/notes/edit/:noteId',
     authRequired: true, 
      views: {
        'tab-notes':{
          templateUrl: 'templates/notes-update.html',
          controller: 'updateNotesCtrl'

        }
      }
    })
    .state('tab.messages', {
      url: '/messages',
     authRequired: true, 
      views : {
        'tab-messages': {
      templateUrl: 'templates/tab-messages.html',
      controller: 'messagesCtrl'
        }  
      }
    })
    .state('login', {
      url: '/login',
      abstract: true,
      templateUrl: 'templates/login.html'
    })
    .state('login.signin', {
      url: '/signin',
      views: {
        'login-signin': {
          templateUrl: 'templates/login-signin.html',
          controller: 'loginCtrl'
        }
      }
    })
    .state('login.signup', {
      url: '/signup',
      views: {
        'login-signup': {
          templateUrl: 'templates/login-signup.html',
          controller: 'signupCtrl'
        }
      }
    })
    $urlRouterProvider.otherwise('/login/signin');
})
  .constant('FIREBASE_URL','https://remember-me.firebaseio.com/notes')
  .constant('MFB_URL', 'https://remember-me.firebaseio.com/messages')
  .constant('IFB_URL', 'https://remember-me.firebaseio.com/images')
  .constant('loginRedirectPath', '/login/signin');
  // .constant('loginStateName', 'login.signin')
  // .constant('alreadyLoggedInStateName', 'tab.notes') 
