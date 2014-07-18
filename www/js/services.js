angular.module('mainApp.services', [])
	.factory('Messages', function (){

		var messages = [
		{id: 0, 
		 message: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.",
		 by: "Mark Twain" 
		},
		{id: 1, 
		 message: "I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.",
		 by: "Michael Jordan" 
		},
		{id: 2, 
		 message: "It does not matter how slowly you go as long as you do not stop.",
		 by: "Confucius" 
		},
		{id: 3, 
		 message: "In bed my real love has always been the sleep that rescued me by allowing me to dream",
		 by: "Luigi Pirandello" 
		},
		{id: 4, 
		 message: "Remember no one can make you feel inferior without your consent.",
		 by: "Eleanor Roosevelt" 
		},
		{id: 6, 
		 message: "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
		 by: "Samuel Beckett" 
		},
		{id: 7, 
		 message: "Take the first step in faith. You don't have to see the whole staircase, just take the first step.",
		 by: "Dr. Martin Luther King Jr" 
		},
		{id: 8, 
		 message: "Knowing is not enough; we must apply. Willing is not enough; we must do.",
		 by: "Johann Wolfgang von Goethe" 
		},
		{id: 9, 
		 message: "People often say that motivation doesn't last. Well, neither does bathing - that's why we recommend it daily.",
		 by: "Zig Ziglar" 
		}		
		];

		return {
			all: function (){
				return messages;
			},
			get: function(messageId){
				return messages[messageId];
			}
		}
	})
	.factory('Notes', function (){
		var notes = [
    		{ id: 0, title: "The average human life is relatively short", post: "We know deep down that life is short, and that death will happen to all of us eventually, and yet we are infinitely surprised when it happens to someone we know.  It’s like walking up a flight of stairs with a distracted mind, and misjudging the final step.  You expected there to be one more stair than there is, and so you find yourself off balance for a moment, before your mind shifts back to the present moment and how the world really is. LIVE your life TODAY!  Don’t ignore death, but don’t be afraid of it either.  Be afraid of a life you never lived because you were too afraid to take action.  Death is not the greatest loss in life.  The greatest loss is what dies inside you while you’re still alive.  Be bold.  Be courageous.  Be scared to death, and then take the next step anyway. " },
    		{ id: 1, title: "You will only ever live the life you create for yourself.", post: " Your life is yours alone.  Others can try to persuade you, but they can’t decide for you.  They can walk with you, but not in your shoes.  So make sure the path you decide to walk aligns with your own intuition and desires, and don’t be scared to switch paths or pave a new one when it makes sense. Remember, it’s always better to be at the bottom of the ladder you want to climb than the top of the one you don’t.  Be productive and patient.  And realize that patience is not about waiting, but the ability to keep a good attitude while working hard for what you believe in.  This is your life, and it is made up entirely of your choices.  May your actions speak louder than your words.  May your life preach louder than your lips.  May your success be your noise in the end. And if life only teaches you one thing, let it be that taking a passionate leap is always worth it. Even if you have no idea where you’re going to land, be brave enough to step up to the edge of the unknown, and listen to your heart. " },
    		{ id: 2, title: "Being busy does NOT mean being productive", post: " Busyness isn’t a virtue, nor is it something to respect.  Though we all have seasons of crazy schedules, very few of us have a legitimate need to be busy ALL the time.  We simply don’t know how to live within our means, prioritize properly, and say no when we should. Being busy rarely equates to productivity these days.  Just take a quick look around.  Busy people outnumber productive people by a wide margin.  Busy people are rushing all over the place, and running late half of the time.  They’re heading to work, conferences, meetings, social engagements, etc.  They barely have enough free time for family get-togethers and they rarely get enough sleep.  Yet, emails are shooting out of their smart phones like machine gun bullets, and their day planners are jammed to the brim with obligations.  Their busy schedule gives them an elevated sense of importance.  But it’s all an illusion. They’re like hamsters running on a wheel. Though being busy can make us feel more alive than anything else for a moment, the sensation is not sustainable long term.  We will inevitably, whether tomorrow or on our deathbed, come to wish that we spent less time in the buzz of busyness and more time actually living a purposeful life." },
    		{ id: 3, title: "Some kind of failure always occurs before success", post: " Most mistakes are unavoidable.  Learn to forgive yourself.  It’s not a problem to make them.  It’s only a problem if you never learn from them. If you’re too afraid of failure, you can’t possibly do what needs to be done to be successful.  The solution to this problem is making friends with failure.  You want to know the difference between a master and a beginner?  The master has failed more times than the beginner has even tried.  Behind every great piece of art is a thousand failed attempts to make it, but these attempts are simply never shown to us. Bottom line:  Just because it’s not happening now, doesn’t mean it never will.  Sometimes things have to go very wrong before they can be right." }
  		];

  		return {
  			all: function (){
  				return notes;
  			},
  			get: function(noteId){
  				return notes[noteId];
  			}
  		}
	})
	.factory('Pictures', function (){
			var pictures = [
	    		{ id: 0, src: "https://placeimg.com/230/230/arch" },
	    		{ id: 1, src: "https://placeimg.com/230/230/arch" },
	    		{ id: 2, src: "https://placeimg.com/230/230/people" },
	    		{ id: 3, src: "https://placeimg.com/230/230/tech" }
	  		];

	  		return {
	  			all: function (){
	  				return pictures;
	  			},
	  			get: function(pictureId){
	  				return pictures[pictureId];
	  			}
	  		}
		})
	.factory('LocalStorage', function ($window){
		return {
			set: function (key, value){
				$window.LocalStorage[key] = value;
			},
			get: function(key, defaultValue){
				return $window.LocalStorage[key] || defaultValue;
			},
			setObject: function (key, value){
				$window.LocalStorage[key] = JSON.stringify(value);
			},
			getObject: function(key){
				return JSON.parse($window.LocalStorage[key] || '{}');
			}
		}
	})
	.service('Form', function (){
		var notes = [];

		var addNotes = function (note){
			notes.push(note);
	
		}

		var getNotes = function (){
			return notes;
		}

		
		return {
			addNotes: addNotes,
			getNotes: getNotes
		}
	})