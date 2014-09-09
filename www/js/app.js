
angular.module('mainApp', ['ionic', 'firebase', 'mainApp.controllers', 'mainApp.services', 'routeSecurity'])

.config(function($compileProvider){
  // whitelisting of safe urls during img[src] sanitization providing my angularjs
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

    //setting user email to null at the beginning
   $rootScope.userEmail = null;

   //logout event provided by firebase
  $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
    $rootScope.userEmail = null;
    $state.go('login.signin');
      });

  //for showing the notifications
    $rootScope.show = function(text){
      $rootScope.loading = $ionicLoading.show({
        template: text ? text: 'Loading...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidith: 200,
        showDelay: 0 
      });
    };

    //notification for hiding the ionicloading
    $rootScope.hide = function(){
      $ionicLoading.hide();
    }

    //for notifying the notifications using the custom text
     $rootScope.notify = function(text, time) {
            var time = time || 999;
            $rootScope.show(text);
            $window.setTimeout(function() {
                $rootScope.hide();
            }, time);
        };

    //for logging out 
    $rootScope.logout = function(){
      Auth.logout()
      $rootScope.notify('Succesfully Logged out!!');
    };

  });
})
//routers for this app
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
//constant for urls and redirect path
  .constant('FIREBASE_URL','https://remember-me.firebaseio.com/notes')
  .constant('MFB_URL', 'https://remember-me.firebaseio.com/messages')
  .constant('IFB_URL', 'https://remember-me.firebaseio.com/images')
  .constant('loginRedirectPath', '/login/signin');
