angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){

	})
	.controller('notesCtrl', function($scope, $ionicModal, $ionicActionSheet){
		$ionicModal.fromTemplateUrl('newNotes.html', function (modal){
			$scope.settingsModal = modal; 
		});
	})
	.controller('picturesCtrl', function($scope){

	})
	.controller('messagesCtrl', function($scope, Messages){
		$scope.messages = Messages.all();
	})