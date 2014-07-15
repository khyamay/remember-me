angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){
		
	})
	.controller('notesCtrl', function($scope, $ionicModal, $stateParams){
		
		$ionicModal.fromTemplateUrl('templates/newNotes.html', function (modal){
			$scope.settingsModal = modal;
		});
		$scope.newNotes = function (){
			$scope.settingsModal.show();
		};

		$scope.notes = [
    		{ id: 0, title: "The average human life is relatively short", post: "We know deep down that life is short, and that death will happen to all of us eventually, and yet we are infinitely surprised when it happens to someone we know.  It’s like walking up a flight of stairs with a distracted mind, and misjudging the final step.  You expected there to be one more stair than there is, and so you find yourself off balance for a moment, before your mind shifts back to the present moment and how the world really is. LIVE your life TODAY!  Don’t ignore death, but don’t be afraid of it either.  Be afraid of a life you never lived because you were too afraid to take action.  Death is not the greatest loss in life.  The greatest loss is what dies inside you while you’re still alive.  Be bold.  Be courageous.  Be scared to death, and then take the next step anyway. " },
    		{ id: 1, title: "You will only ever live the life you create for yourself.", post: " Your life is yours alone.  Others can try to persuade you, but they can’t decide for you.  They can walk with you, but not in your shoes.  So make sure the path you decide to walk aligns with your own intuition and desires, and don’t be scared to switch paths or pave a new one when it makes sense. Remember, it’s always better to be at the bottom of the ladder you want to climb than the top of the one you don’t.  Be productive and patient.  And realize that patience is not about waiting, but the ability to keep a good attitude while working hard for what you believe in.  This is your life, and it is made up entirely of your choices.  May your actions speak louder than your words.  May your life preach louder than your lips.  May your success be your noise in the end. And if life only teaches you one thing, let it be that taking a passionate leap is always worth it. Even if you have no idea where you’re going to land, be brave enough to step up to the edge of the unknown, and listen to your heart. " },
    		{ id: 2, title: "Being busy does NOT mean being productive", post: " Busyness isn’t a virtue, nor is it something to respect.  Though we all have seasons of crazy schedules, very few of us have a legitimate need to be busy ALL the time.  We simply don’t know how to live within our means, prioritize properly, and say no when we should. Being busy rarely equates to productivity these days.  Just take a quick look around.  Busy people outnumber productive people by a wide margin.  Busy people are rushing all over the place, and running late half of the time.  They’re heading to work, conferences, meetings, social engagements, etc.  They barely have enough free time for family get-togethers and they rarely get enough sleep.  Yet, emails are shooting out of their smart phones like machine gun bullets, and their day planners are jammed to the brim with obligations.  Their busy schedule gives them an elevated sense of importance.  But it’s all an illusion. They’re like hamsters running on a wheel. Though being busy can make us feel more alive than anything else for a moment, the sensation is not sustainable long term.  We will inevitably, whether tomorrow or on our deathbed, come to wish that we spent less time in the buzz of busyness and more time actually living a purposeful life." },
    		{ id: 3, title: "Some kind of failure always occurs before success", post: " Most mistakes are unavoidable.  Learn to forgive yourself.  It’s not a problem to make them.  It’s only a problem if you never learn from them. If you’re too afraid of failure, you can’t possibly do what needs to be done to be successful.  The solution to this problem is making friends with failure.  You want to know the difference between a master and a beginner?  The master has failed more times than the beginner has even tried.  Behind every great piece of art is a thousand failed attempts to make it, but these attempts are simply never shown to us. Bottom line:  Just because it’s not happening now, doesn’t mean it never will.  Sometimes things have to go very wrong before they can be right." }
  ];

  		$scope.id = $stateParams.noteId;
  		
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