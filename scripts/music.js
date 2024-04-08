"use strict";

var Music = function(audioId, songFileName)
{ 
	this.eleId = audioId;
	this.element = null; 
	this.song = songFileName;
}; 

Class.extend(
{ 
	constructor: Music, 
	
	getElement: function() 
	{ 
		if(this.element === null) 
		{ 
			this.element = document.getElementById(this.eleId);
		}
		return this.element;  
	}, 

	change: function(fileName) 
	{ 
		if(this.song !== fileName) 
		{ 
			this.song = fileName; 
			var music = this.getElement();  
			music.src = 'sound/music/' + fileName; 

			if(Settings.music === true) 
			{ 
				this.start();  
			}
		}
	}, 

	delay: function() 
	{ 
		if(Settings.music === true) 
		{ 
			this.start();  
		}
	}, 

	start: function() 
	{ 
		var music = this.getElement(); 
		music.volume = 0.6; 
		music.play(); 
	}, 

	stop: function() 
	{ 
		var music = this.getElement(); 
		music.pause(); 
	}
});  
