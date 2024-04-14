"use strict";

var Sounds =
{
	activeSounds: [],

	reset: function()
	{
		this.activeSounds = [];
	},

	getAll:function()
	{
		return this.activeSounds;
	},

	add: function(filePath, type)
	{
		if(Settings.audio === true)
		{
			if(this.check(type) === false)
			{
				var audio = new Audio(filePath);
				var sound =
				{
					audio: audio,
					type: type
				};

				//audio.addEventListener("ended", this.remove.bind(this, sound));
				audio.volume = 0.4;
				audio.play();
				this.activeSounds.push(sound);
				return sound;
			}
		}
		return false;
	},

	check: function(type)
	{
		return false;
		// var activeSounds = this.activeSounds,
		// length = activeSounds.length;
		// if(length)
		// {
		// 	var count = 0;
		// 	for(var i = 0; i < length; i++)
		// 	{
		// 		var sound = activeSounds[i];
		// 		if(sound.type === type)
		// 		{
		// 			count++;
		// 			if(count >= 2)
		// 			{
		// 				return true;
		// 			}
		// 		}
		// 	}
		// }
		// return false;
	},

	remove: function(sound)
	{
		var activeSounds = this.activeSounds,
		index = activeSounds.indexOf(sound);
		if(index > -1)
		{
			activeSounds.splice(index, 1);
		}
	}
};