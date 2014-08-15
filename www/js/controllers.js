angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){
		
	})
	.controller('notesCtrl', function($rootScope, $scope, $ionicModal, $firebase, $timeout, FIREBASE_URL){
		//initializing empty notes
		
		$scope.notes = [];
		//creating new instance of Firebase using base url
		var notesList = new Firebase(FIREBASE_URL);

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
				if ($scope.notes.length == 0){
					$scope.noNotes = true;
				} else {
					$scope.noNotes = false;
				}
			});
		});

		//for deleting the post
		$scope.deleteNote = function (key){
			var notesList = new Firebase(FIREBASE_URL);
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
	.controller('updateNotesCtrl', function($rootScope, $scope, $state, $stateParams, $firebase, FIREBASE_URL, $timeout){
		var noteId = FIREBASE_URL + $stateParams.noteId;
		// $scope.note = $firebase(new Firebase(note)); 
		
		var notesList = new Firebase(FIREBASE_URL);
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
		var noteUrl = FIREBASE_URL + '/' + id; 
		var updateList = new Firebase(FIREBASE_URL);
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
	.controller('picturesCtrl', function($scope, Pictures, $ionicModal, $firebase, IFB_URL, $timeout){
		// $scope.pictures = Pictures.all();
		
		//for calling uploading page
		$ionicModal.fromTemplateUrl('templates/upload.html', function(modal){
			$scope.modal = modal;
		});

		$scope.upload = function(){
			$scope.modal.show();
		}
		
		$scope.images = [];
		var imageList = new Firebase(IFB_URL);

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
	.controller('uploadCtrl', function($scope, $state, $ionicModal, $firebase, IFB_URL, Camera, $timeout){

			//for closing the modal
		$scope.close = function (modal){
			$scope.modal.hide();

			$scope.imageURI = "";

		};


		$scope.getPhoto = function(){
			Camera.getPicture().then(function(imageData){
				$scope.imageURI = "data:image/png;base64," + imageData;
			}, function(err){
				console.log(err);
			});
		};


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
		    
			   	$scope.imageURI = "data:image/png;base64," + imageData;
			   	$scope.image.src = $scope.imageURI;
			});


		}

		  function photoError(message) {
		    alert('Failed because: ' + message);
  		}


		//for uploading

		$scope.UploadPicture = function() {   
	        var myImg = $scope.imageURI;
	        var image = {
				image: myImg,
				created: Date.now()
			}
	         var imageList = new Firebase(IFB_URL);

			$firebase(imageList).$add(image);
			$scope.modal.hide();
			$scope.imageURI = "";
    }

    function onUploadSuccess(imageData){
    	alert('succes');
    var imageList = new Firebase(IFB_URL);
				
	$firebase(imageList).$add(imageData);
    }
    function onUploadFail(message){
    	alert('Failed because:' + message);
    }


	})
	.controller('messagesCtrl', function($scope, MFB_URL, $timeout){
		// $scope.messages = Messages.all();
		$scope.messages = [];
		var messageList = new Firebase(MFB_URL)
		messageList.on('value', function(snapshot){
		var message = snapshot.val();
				$timeout(function(){	
				//itirating over the list of not
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
			
			var notesList = new Firebase(FIREBASE_URL);
			
			//adding note into firebase 
			$firebase(notesList).$add(note);
			console.log(note);
			$scope.modal.hide();
			$scope.addForm.$setPristine();
			$scope.note = {};
		};
		
	})
	.controller('noteCtrl', function($scope, $stateParams, $firebase, $timeout, FIREBASE_URL){
		var notesList = new Firebase(FIREBASE_URL);
		
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


	})