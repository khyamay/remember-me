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
	.factory('Pictures', function (){
			var pictures = [
	    		{ id: 0, src: "https://placeimg.com/230/230/nature" },
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
	.factory('Form', function (){
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