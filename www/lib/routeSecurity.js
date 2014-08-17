(function (angular) {
  'use strict';
  angular.module('routeSecurity', [])
    .run(function ($injector, $location, $rootScope, loginRedirectPath) {
      if ($injector.has('$state')) {
        new RouteSecurityManager($location, $rootScope, $injector.get('$state'), loginRedirectPath);
      }
    });
 
  function RouteSecurityManager($location, $rootScope, $state, path) {
    this._state = $state;
    this._location = $location;
    this._rootScope = $rootScope;
    this._loginPath = path;
    this._redirectTo = null;
    this._authenticated = !!($rootScope.auth && $rootScope.auth.user);
    this._init();
  }
 
  RouteSecurityManager.prototype = {
    _init: function () {
      var self = this;
      this._checkCurrent();
 
      // Set up a handler for all future route changes, so we can check
      // if authentication is required.
      self._rootScope.$on('$stateChangeStart', function (e, next) {
        self._authRequiredRedirect(next, self._loginPath);
      });
 
      self._rootScope.$on('$firebaseSimpleLogin:login', angular.bind(this, this._login));
      self._rootScope.$on('$firebaseSimpleLogin:logout', angular.bind(this, this._logout));
      self._rootScope.$on('$firebaseSimpleLogin:error', angular.bind(this, this._logout));
    },
 
    _checkCurrent: function () {
      // Check if the current page requires authentication.
      if (this._state.current) {
        this._authRequiredRedirect(this._state.current, this._loginPath);
      }
    },
 
    _login: function () {
      this._authenticated = true;
      if (this._redirectTo) {
        this._redirect(this._redirectTo);
        this._redirectTo = null;
      }
      else if (this._location.path() === this._loginPath) {
        this._location.replace();
        this._location.path('/');
      }
    },
 
    _logout: function () {
      this._authenticated = false;
      this._checkCurrent();
    },
 
    _redirect: function (path) {
      this._location.replace();
      this._location.path(path);
    },
 
    // A function to check whether the current path requires authentication,
    // and if so, whether a redirect to a login page is needed.
    _authRequiredRedirect: function (state, path) {
      if (state.authRequired && !this._authenticated) {
        if (state.pathTo === undefined) {
          this._redirectTo = this._location.path();
        } else {
          this._redirectTo = state.pathTo === path ? '/' : state.pathTo;
        }
        this._redirect(path);
      }
      else if (this._authenticated && this._location.path() === this._loginPath) {
        this._redirect('/');
      }
    }
  };
})(angular);