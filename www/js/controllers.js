angular.module('mainApp.controllers', [])
	.controller('loginCtrl', function($scope, $rootScope, $firebaseSimpleLogin, $window, $state, Auth){
		
		//check to see if the users logged or not
		if (Auth.signedIn()) {
			$state.go('tab.notes');
			} else {
				$state.go('login.signin');
			}

		$scope.user = {
			email: '',
			password: ''
		};

		//using firebase login event to see if user are logged it, if they are they wll be got notes page 
		$scope.$on('$firebaseSimpleLogin:login', function(e, user){
				$rootScope.userEmail = user.email;
  	 			 $state.go('tab.notes');
			});

		//logging and authenticating the users
		$scope.validateUser = function (){
		$rootScope.notify('Please wait... Authenticating', 999);

			var email = this.user.email,
				password = this.user.password;

			//if both email and password are left empty then error message will be notified
			if(!email || !password){
				$rootScope.notify('Please fill up both fields');
				return false;
			}

			//using Auth service for logging in the users
			Auth.login($scope.user).then(function(){
				 $state.go('tab.notes');
			},function(error){

				//using errors code from Firebase
				if (error.code == 'INVALID_EMAIL'){
					$rootScope.notify('Invalid Email Address used!!');
				}
				else if (error.code == 'INVALID_PASSWORD'){
					$rootScope.notify('Invalid Password used!!');
				}
				else if (error.code == 'INVALID_USER'){
					$rootScope.notify('Invalid User, Please try again with valid Username & Password!!');
				}
				else {
					$rootScope.notify('Opps something went wrong. Please try it again later');
				}
			});

		}
	})
	.controller('signupCtrl', function($scope, $rootScope, $window, Auth){
		$scope.user = {
			email: "",
			password: "",
			conPassword:""
		};

		//registering new users
		$scope.addUser = function(){
				var user = $scope.user;

				//Error message will be notified if all the fields are left empty
				if(!user.email || !user.password || !user.conPassword){
					$rootScope.notify('Please fill up all the fields!!');
					return false;
				}


        		if (user.password !== user.conPassword) {
          			$rootScope.notify('Passwords must match');
          			return false;
        		}

				$rootScope.notify('Please wait.. Registering', 999);

				var register = Auth.register(user);

				//Using Auth service for registering the users in Firebae
				register.then(function(user){
					$rootScope.notify('Successfully registered!!!', 999);
					$window.location.href= "#/login/signin";

				}, function(error){
					$rootScope.hide();

					//Error Code from Firebase
						if (error.code == 'INVALID_EMAIL'){	
							$rootScope.notify('Invalid Email Address');
					}
						else if (error.code == 'EMAIL_TAKEN') {
							$rootScope.notify('Email Address already taken');
					}
					else {
						$rootScope.notify('Opps something went wrong. Please try it again later');
					}
					
				});

		}
	})
	.controller('notesCtrl', function($rootScope, $scope, $ionicModal, $firebase, $timeout, FIREBASE_URL){
		//initializing empty notes
		$scope.notes = [];

		//creating new instance of Firebase using base url
		var notesList = new Firebase(FIREBASE_URL + escapeEmailAddress($rootScope.userEmail));

		//using on listener for value event using snapshot of firebase
		notesList.on('value', function(snapshot){
			var note = snapshot.val();
			$scope.notes = [];
			$timeout(function(){	
				for (var key in note){
					if (note.hasOwnProperty(key)){
						note[key].key = key;
						$scope.notes.push(note[key]);
					}
				}
				//checking to see if there's any notes 
				if ($scope.notes.length == 0){
					$scope.noNotes = true;
				} else {
					$scope.noNotes = false;
				}
			});
		});

		//for deleting the post
		$scope.deleteNote = function (key){
			var notesList = new Firebase(FIREBASE_URL + escapeEmailAddress($rootScope.userEmail));
			notesList.child(key).remove();
			console.log('deleted');
		};

	
		//this is used for calling newNotes.html when users click on newNote button
		$ionicModal.fromTemplateUrl('templates/newNotes.html', function(modal){
			$scope.modal = modal;
		});


		//opens new newNews.html page 
		$scope.newNotes = function (){
			$scope.modal.show();
		};

	
  		//Cleanup the modal when we're done with it!
  		$scope.$on('$destroy', function() {
    	$scope.modal.remove();
  		});

	})
	.controller('updateNotesCtrl', function($rootScope, $scope, $state, $stateParams, $firebase, FIREBASE_URL, $timeout, $window){
		var noteId = FIREBASE_URL + $stateParams.noteId;
		// $scope.note = $firebase(new Firebase(note)); 
	
		var notesList = new Firebase(FIREBASE_URL + escapeEmailAddress($rootScope.userEmail));
		notesList.on('value', function(snapshot){
		var note = snapshot.val();
			var id = $stateParams.noteId
				$timeout(function(){	
				//itirating over the list of not
				for (var key in note){
					if (note.hasOwnProperty(key)){
						note[key].key = key;
						$scope.note = note[id];	
					}
				}
			});
		});

		
		//updating the single note
		$scope.updateNote = function(note){
		var id = $stateParams.noteId;
		var noteUrl = FIREBASE_URL + escapeEmailAddress($rootScope.userEmail) + '/' + id; 
		var updateList = new Firebase(FIREBASE_URL + escapeEmailAddress($rootScope.userEmail));
		$scope.note = $firebase(new Firebase(noteUrl));

			$scope.note.$update({
				title: note.title,
				post: note.post,
				created: Date.now(),
				updated: Date.now()
			});

			 $state.go('tab.notes');
		}

	})
	.controller('picturesCtrl', function($scope, $rootScope, $ionicModal, $firebase, IFB_URL, $timeout){
		
		//using ionic modal for calling upload page
		$ionicModal.fromTemplateUrl('templates/upload.html', function(modal){
			$scope.modal = modal;
		});

		//for calling upload page
		$scope.upload = function(){
			$scope.modal.show();
		}
		
		//Creating empty list of images
		$scope.images = [];

		//defining imageList variable using Firebase url and users email
		var imageList = new Firebase(IFB_URL + escapeEmailAddress($rootScope.userEmail));

		//using on listener for value event using snapshot of firebase
		imageList.on('value', function(snapshot){
			var image = snapshot.val();
			$scope.images = [];
			$timeout(function(){	
				for (var key in image){
					if (image.hasOwnProperty(key)){
						image[key].key = key;
						$scope.images.push(image[key]);
						console.log(image[key]);
					}
				}

			//Checking to see if there any images 
			if ($scope.images.length == 0) {
					$scope.noImage = true;
						} else { 
							$scope.noImage = false;
						}

				
			});
		});

		//deteling single picture
		$scope.deleteImage = function (key){
			var notesList = new Firebase(IFB_URL);
			imageList.child(key).remove();
			console.log('deleted');
		};

	})
	.controller('uploadCtrl', function($scope, $rootScope, $state, $ionicModal, $firebase, IFB_URL, Camera, $timeout){

			//for closing the modal
		$scope.close = function (modal){
			$scope.modal.hide();

			$scope.imageURI = "";

		};

		//using image gallery of android device
		$scope.getPhoto = function(){
			
			//using camera service for getting the pictures from image gallery
			Camera.getPicture().then(function(imageData){
				$scope.imageURI = "data:image/png;base64," + imageData;
			}, function(err){
				console.log(err);
			});
		};

		//using camera of android device
		$scope.PhotoLibrary = function (){
			if (navigator.camera){
				 navigator.camera.getPicture( photoSuccess, photoError,
                     { 	quality: 50,
                     	sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                     	destinationType: navigator.camera.DestinationType.DATA_URL,
                     	correctOrientation: true
						}

                       );
				} else {
					alert('camera not found');
				}
			};

		 function photoSuccess(imageData) {
			$scope.image = document.getElementById('smallimage');
		    // hack until cordova 3.5.0 is released
		  	$timeout(function(){	
				if (imageData.substring(0,21)=="content://com.android") {
		      	var photo_split=imageData.split("%3A");
		      	imageData="content://media/external/images/media/"+photo_split[1];
		    	}
		    
		    //converting images into base64
			   	$scope.imageURI = "data:image/png;base64," + imageData;
			   	$scope.image.src = $scope.imageURI;
			});


		}
			//error message 
		  function photoError(message) {
		    console.log('Failed because: ' + message);
  		}


		//for uploading images in Firebase for image gallery
		$scope.UploadPicture = function() {   
	        var myImg = $scope.imageURI;
	        var image = {
				image: myImg,
				created: Date.now()
			}
	         var imageList = new Firebase(IFB_URL + escapeEmailAddress($rootScope.userEmail));
			$firebase(imageList).$add(image);
			$scope.modal.hide();
			$scope.imageURI = "";
    }

    //uploading images in Firebase for camera
    function onUploadSuccess(imageData){
   
    var imageList = new Firebase(IFB_URL + escapeEmailAddress($rootScope.userEmail));				
	$firebase(imageList).$add(imageData);
    
    }

    //error message when the upload fails
    function onUploadFail(message){
    	alert('Failed because:' + message);
    }


	})
	.controller('messagesCtrl', function($scope, MFB_URL, $timeout){
		// $scope.messages = Messages.all();
		$scope.messages = [];
		var messageList = new Firebase(MFB_URL);
		messageList.on('value', function(snapshot){
		var message = snapshot.val();
				$timeout(function(){	
				//itirating over the list of notes
				for (var key in message){
					if (message.hasOwnProperty(key)){
						message[key].key = key;
						$scope.messages.push(message[key]); 
					}
				}
			});
		});

	})
	.controller('newNotesCtrl', function($rootScope, $scope, $ionicModal, $firebase, FIREBASE_URL){

		//for closing the modal
		$scope.close = function (modal){
			$scope.modal.hide();
		}

		//creating notes
		$scope.createNote = function(note){

			var note = {
				title: note.title,
				post: note.post,
				created: Date.now(),
				updated: Date.now()
			}
			
			var notesList = new Firebase(FIREBASE_URL + escapeEmailAddress($rootScope.userEmail));
			
			//adding note into firebase 
			$firebase(notesList).$add(note);
			$scope.modal.hide();
			$scope.addForm.$setPristine();
			$scope.note = {};
		};
		
	})
	.controller('noteCtrl', function($scope, $rootScope, $stateParams, $firebase, $timeout, FIREBASE_URL){
		var notesList = new Firebase(FIREBASE_URL + escapeEmailAddress($rootScope.userEmail));
		
		//using on listener for value event using snapshot of firebase
		notesList.on('value', function(snapshot){
			var note = snapshot.val();
			var id = $stateParams.noteId
			$timeout(function(){	

				//itirating over the list of notes
				for (var key in note){
					if (note.hasOwnProperty(key)){
						note[key].key = key;
						$scope.note = note[id];	
					}
				}
			});
		});
	});

//Since Firebase does not allow '.' hence replacing '.' with ',' code provided by Firebase
	function escapeEmailAddress(email){
			if (!email) return false
				email = email.toLowerCase();
				email = email.replace(/\./g, ',');
				return email.trim();
		}