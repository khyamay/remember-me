angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){
		
	})
	.controller('notesCtrl', function ($rootScope, $scope, $ionicModal, Form, $firebase, $window){
		
		//initializing empty notes
		$scope.notes = [];
		
		//creating new instance of Firebase using base url
		var notesList = new Firebase('https://remember-me.firebaseio.com/');

		//using on listener for value event using snapshot of firebase
		notesList.on('value', function(snapshot){
			var note = snapshot.val();

			$scope.notes = [];

			for (var key in note){
				if (note.hasOwnProperty(key)){
					note[key].key = key;
					$scope.notes.push(note[key]);
				}
			}
		})

		// $scope.notes = Form.getNotes();
		// console.log($scope.notes);
	
		//this is used for calling newNotes.html when users clikck on newNote button
		$ionicModal.fromTemplateUrl('templates/newNotes.html', function(modal){
			$scope.modal = modal;
		});

		//opens new newNews.html page 
		$scope.newNotes = function (){
			$scope.modal.show();
		};

		//for closing the modal
  		$scope.close = function() {
    	$scope.modal.hide();
  		};

  		//Cleanup the modal when we're done with it!
  		$scope.$on('$destroy', function() {
    	$scope.modal.remove();
  		});

	})
	.controller('picturesCtrl', function($scope, Pictures){
		$scope.pictures = Pictures.all();

	})
	.controller('messagesCtrl', function($scope, Messages){
		$scope.messages = Messages.all();
	})
	.controller('newNotesCtrl', function($rootScope, $scope, $ionicModal, Form, $firebase){

		$scope.close = function (modal){
			$scope.modal.hide();
		}

		$scope.createNote = function(note){

			var note = {
				title: note.title,
				post: note.post,
				created: Date.now(),
				updated: Date.now()
			}
			var notesList = new Firebase('https://remember-me.firebaseio.com/');
			$firebase(notesList).$add(note);
			// Form.addNotes(note);
			console.log(note);
			$scope.modal.hide();
			$scope.addForm.$setPristine();
			$scope.note = {};
		};
		
	})
	.controller('noteCtrl', function ($scope, $stateParams, Notes){
          $scope.note = Notes.get($stateParams.noteId);
	})