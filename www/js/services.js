angular.module('mainApp.services', [])
	.factory('Camera', ['$q', function($q){
		return {
			getPicture: function(options){
				var q = $q.defer();
				navigator.camera.getPicture(function(imageData){
					q.resolve(imageData);
				}, function(err){
					q.reject(err);
				}, {
				quality: 75,
				targetWidth:320,
				targetHeight: 320,
				saveToPhotoAlbum: false,
				correctOrientation: true,
				destinationType: Camera.DestinationType.DATA_URL
				});

				return q.promise;
			}
		}
	}])
	.factory('Form', function (){
		var notes = [];

		var addNotes = function (note){
			notes.push(note);
	
		}

		var getNotes = function (){
			return notes;
		}

		
		return {
			addNotes: addNotes,
			getNotes: getNotes
		}
	})
	.factory('Auth', function($rootScope, $firebaseSimpleLogin, FIREBASE_URL){
		var authRef = new Firebase(FIREBASE_URL);
		var auth = $firebaseSimpleLogin(authRef);

		var Auth = {
			register: function (user){
				return auth.$createUser(user.email, user.password);
			},
			signedIn: function(){
				return auth.user !== null;
			},
			login: function(user){
				return auth.$login('password', user);
			},
			logout: function(){
				auth.$logout();
			}
		};

		$rootScope.signedIn = function(){
			return Auth.signedIn();
		};

		return Auth;

	})