angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){
		
	})
	.controller('notesCtrl', function($scope, $ionicModal){
		
		$ionicModal.fromTemplateUrl('templates/newNotes.html', function (modal){
			$scope.settingsModal = modal;
		});
		$scope.newNotes = function (){
			$scope.settingsModal.show();
		};
	})
	.controller('picturesCtrl', function($scope){

	})
	.controller('messagesCtrl', function($scope, Messages){
		$scope.messages = Messages.all();
	})
	.controller('newNotesCtrl', function($scope, $ionicModal){

		$scope.close = function (modal){
			$scope.modal.hide();
		}
		
	})