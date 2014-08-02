angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){
		
	})
	.controller('notesCtrl', function($rootScope, $scope, $ionicModal, $firebase, $timeout, FIREBASE_URL){
		//initializing empty notes
		
		$scope.notes = [];
		$scope.noNotes = true;
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
					
					$scope.noNotes = false;
				}
				
			});
		});

		//for deleting the post
		$scope.deleteNote = function (key){
			var notesList = new Firebase(FIREBASE_URL);
			notesList.child(key).remove();
			console.log('deleted');
			$scope.noNotes = true;
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
	.controller('picturesCtrl', function($scope, Pictures, $ionicModal){
		$scope.pictures = Pictures.all();
		
		
		//for calling uploading page
		$ionicModal.fromTemplateUrl('templates/upload.html', function(modal){
			$scope.modal = modal;
		});

		$scope.upload = function(){
			$scope.modal.show();
		}
	

	})
	.controller('uploadCtrl', function($scope, $log, $ionicModal, $firebase, IFB_URL){
			//for closing the modal
		$scope.close = function (modal){
			$scope.modal.hide();
		};

		

		$scope.postImg = function (image){
			
			var imageList = new Firebase(IFB_URL);
				
			// $firebase(imageList).$add(image);
			imageList.childname(safename).set(image);
			console.log(image.data);
			console.log(image);
			};
		

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