/**
 * Sounds
 *
 * This will handle the game sounds.
 */
export const Sounds =
{
	/**
	 * @type {array} activeSounds
	 */
	activeSounds: [],

	/**
	 * This will reset the sounds.
	 *
	 * @returns {void}
	 */
	reset()
	{
		this.activeSounds = [];
	},

	/**
	 * This will get all the sounds.
	 *
	 * @returns {array}
	 */
	getAll()
	{
		return this.activeSounds;
	},

	/**
	 * This will add a sound.
	 *
	 * @param {string} filePath
	 * @param {string} type
	 * @returns {object}
	 */
	add(filePath, type)
	{
		if (Settings.audio === true)
		{
			if (this.check(type) === false)
			{
				const audio = new Audio(filePath);
				const sound =
				{
					audio,
					type
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
		const activeSounds = this.activeSounds,
		index = activeSounds.indexOf(sound);
		if (index > -1)
		{
			activeSounds.splice(index, 1);
		}
	}
};