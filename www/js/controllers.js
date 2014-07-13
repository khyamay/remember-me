angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope, $ionicModal, $ionicActionSheet){
		$ionicModal.fromTempalteUrl('newTask.html', function (){
			$scope.settingsModal = modal; 
		});
	})
	.controller('notesCtrl', function($scope){

	})
	.controller('picturesCtrl', function($scope){

	})
	.controller('messagesCtrl', function($scope, Messages){
		$scope.messages = Messages.all();
	})