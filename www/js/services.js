angular.module('mainApp.services', []).factory('Camera', ['$q',
    function($q) {
        return {
            //service for getting images from camera in base64 format
            getPicture: function(options) {
                var q = $q.defer();
                navigator.camera.getPicture(function(imageData) {
                    q.resolve(imageData);
                }, function(err) {
                    q.reject(err);
                }, {
                    quality: 75,
                    targetWidth: 320,
                    targetHeight: 320,
                    saveToPhotoAlbum: false,
                    correctOrientation: true,
                    destinationType: Camera.DestinationType.DATA_URL
                });

                return q.promise;
            }
        }
    }
])
//service for Authencating users
.factory('Auth', function($rootScope, $firebaseSimpleLogin, FIREBASE_URL) {
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);

    var Auth = {
        //for regsitering the users
        register: function(user) {
            return auth.$createUser(user.email, user.password);
        },
        //to check if the users care signedin
        signedIn: function() {
            return auth.user !== null;
        },
        //for logging the users
        login: function(user) {
            return auth.$login('password', user);
        },
        //for logging out the users
        logout: function() {
            auth.$logout();
        }
    };

    $rootScope.signedIn = function() {
        return Auth.signedIn();
    };

    return Auth;

})
