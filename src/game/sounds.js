
export const Sounds =
{
	activeSounds: [],

	reset()
	{
		this.activeSounds = [];
	},

	getAll:function()
	{
		return this.activeSounds;
	},

	add(filePath, type)
	{
		if(Settings.audio === true)
		{
			if(this.check(type) === false)
			{
				let audio = new Audio(filePath);
				let sound =
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

	check(type)
	{
		return false;
		// let activeSounds = this.activeSounds,
		// length = activeSounds.length;
		// if(length)
		// {
		// 	let count = 0;
		// 	for(let i = 0; i < length; i++)
		// 	{
		// 		let sound = activeSounds[i];
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

	remove(sound)
	{
		let activeSounds = this.activeSounds,
		index = activeSounds.indexOf(sound);
		if(index > -1)
		{
			activeSounds.splice(index, 1);
		}
	}
};