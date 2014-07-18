angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){
		
	})
	.controller('notesCtrl', function ($scope, $ionicModal, Notes, Form){
		
		$ionicModal.fromTemplateUrl('templates/newNotes.html', function(modal){
			$scope.modal = modal;
		});
		$scope.newNotes = function (){
			$scope.modal.show();
		};

		$scope.notes = Notes.all();
		$scope.notes = Form.getNotes();
		console.log($scope.notes);
	
		
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
	.controller('newNotesCtrl', function($rootScope, $scope, $ionicModal, Form){

		$scope.close = function (modal){
			$scope.modal.hide();
		}

		$scope.createNote = function(note){

			var note = {
				title: note.title,
				post: note.post
			}
			Form.addNotes(note);
			console.log(note);
			$scope.modal.hide();
			$scope.addForm.$setPristine();
			$scope.note = {};
		};
		
	})
	.controller('noteCtrl', function ($scope, $stateParams, Notes){
          $scope.note = Notes.get($stateParams.noteId);
	})