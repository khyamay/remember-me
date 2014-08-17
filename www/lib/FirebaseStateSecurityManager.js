/*
 MIT License
 ui-router Port of Firebase Simple Login RouteSecurityManager from 
 https://github.com/firebase/angularFire-seed/blob/master/app/js/module.routeSecurity.js

For any state that requires security, setup a custom data authRequired flag:

        .state('profile', {
          url: '/acct/profile',
          templateUrl: 'views/account/profile.html',
          data: {
            authRequired: true
          }
        })
        
When defining your module, you'll also want to define two states with constants, the 'loginStateName' 
which is self explanatory, and the 'alreadyLoggedInStateName' which is the name of the state you'd 
like the module to redirect your user to if they're already logged in and they attempt to go to your 
login state (instead of showing them a login form).

 angular.module('myApp', ['stateSecurity'])
  .constant('loginStateName', 'main.login')
  .constant('alreadyLoggedInStateName', 'main.secured.profile') 
  .config(function() { ... });

*/


(function () {
  "use strict";

  (function(angular) {
    angular.module('stateSecurity', [])
      .run(function($injector, $rootScope, $log, loginStateName, alreadyLoggedInStateName) {
        if( $injector.has('$state') ) {
          new StateSecurityManager($rootScope, $injector.get('$state'), $log, loginStateName, alreadyLoggedInStateName);
        }
      });

    function StateSecurityManager($rootScope, $state, $log, loginState, authState) {
      this._log = $log;
      this._state = $state;
      this._rootScope = $rootScope;
      this._loginState = loginState;
      this._authState = authState;
      this._redirectTo = null;
      this._authenticated = !!($rootScope.auth && $rootScope.auth.user);
      this._init();
    }

    StateSecurityManager.prototype = {
      _init: function() {
        this._log.info('Initializing State Security');
        var self = this;
        this._checkCurrent();

        // Set up a handler for all future route changes, so we can check
        // if authentication is required.
        self._rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
          self._log.info("$stateChangeStart " + angular.toJson(toState));
          self._authRequiredRedirect(toState, self._loginState, e);
        });

        self._rootScope.$on('$firebaseSimpleLogin:login', angular.bind(this, this._login));
        self._rootScope.$on('$firebaseSimpleLogin:logout', angular.bind(this, this._logout));
        self._rootScope.$on('$firebaseSimpleLogin:error', angular.bind(this, this._error));
      },

      _checkCurrent: function() {
        // Check if the current page requires authentication.
        this._log.info('Checking Current - ' + angular.toJson(this._state.current));
        if (this._state.current) {
          this._authRequiredRedirect(this._state.current, this._loginState);
        }
      },

      _login: function() {
        this._authenticated = true;
        if( this._redirectTo ) {
          this._redirect(this._redirectTo);
          this._redirectTo = null;
        }
        else if( this._state.current.name === this._loginState ) {
          this._redirect(this._authState);
        }
      },

      _logout: function() {
        this._authenticated = false;
        this._checkCurrent();
      },

      _error: function() {
        if( !this._rootScope.auth || !this._rootScope.auth.user ) {
          this._authenticated = false;
        }
        this._checkCurrent();
      },

      _redirect: function(stateName) {        
        this._state.go(stateName);
      },

      // A function to check whether the current path requires authentication,
      // and if so, whether a redirect to a login page is needed.
      _authRequiredRedirect: function(state, loginState, event) {
        this._log.info('Inside authRequiredRedirect with params: ' + angular.toJson(state) + ', ' + loginState);
        if (state.data && state.data.authRequired && !this._authenticated){
          // event.preventDefault();
          if (state.name === undefined) {
            this._redirectTo = this._state.current.name;
          } else {
            this._redirectTo = state.name;
          }
          this._redirect(loginState);
        }
        else if( this._authenticated && state.name === this._loginState) {
          if(event) {
            event.preventDefault();
          }
          this._redirect(this._authState);
        }
      }
    };
  })(angular);


}).call(this);