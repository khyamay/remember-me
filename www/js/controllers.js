angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){
		
	})
	.controller('notesCtrl', function ($scope, $ionicModal, Notes){
		
		$ionicModal.fromTemplateUrl('templates/newNotes.html', function (modal){
			$scope.settingsModal = modal;
		});
		$scope.newNotes = function (){
			$scope.settingsModal.show();
		};

		$scope.notes = Notes.all();

	})
	.controller('picturesCtrl', function($scope, Notes){

	})
	.controller('messagesCtrl', function($scope, Messages){
		$scope.messages = Messages.all();
	})
	.controller('newNotesCtrl', function($scope, $ionicModal){

		$scope.close = function (modal){
			$scope.modal.hide();
		}
		
	})
	.controller('noteCtrl', function ($scope, $stateParams, Notes){
          $scope.note = Notes.get($stateParams.noteId);
	})