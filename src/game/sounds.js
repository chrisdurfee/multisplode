import { Settings } from "./settings.js";

/**
 * This will create the audio.
 *
 * @param {string} filePath
 * @param {string} type
 * @param {function} callBack
 * @returns {object}
 */
const createAudio = (filePath, type, callBack) =>
{
	const audio = new Audio(filePath);
	const sound =
	{
		audio,
		type
	};

	audio.addEventListener("ended", () => callBack(sound));
	audio.volume = 0.6;
	audio.play();
	return sound;
};

/**
 * Sounds
 *
 * This will handle the game sounds.
 *
 * @type {object} Sounds
 */
export const Sounds =
{
	/**
	 * @type {Map} activeSounds
	 */
	activeSounds: new Map(),

	/**
	 * This will reset the sounds.
	 *
	 * @returns {void}
	 */
	reset()
	{
		this.activeSounds = new Map();
	},

	/**
	 * This will get all the sounds.
	 *
	 * @returns {array}
	 */
	getAll()
	{
		return this.activeSounds.getAll();
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
		if (Settings.audio !== true)
		{
			return false;
		}

		// if (this.check(type) !== false)
		// {
		// 	return false;
		// }

		const callBack = this.remove.bind(this);
		const sound = createAudio(filePath, type, callBack);
		this.activeSounds.set(type, sound);
		return sound;
	},

	/**
	 * This will check if the sound is already playing.
	 *
	 * @param {string} type
	 * @returns {boolean}
	 */
	check(type)
	{
		const activeSounds = this.activeSounds;
		if (activeSounds.count < 1)
		{
			return false;
		}

		return activeSounds.get(type) || false;
	},

	/**
	 * This will remove the sound.
	 *
	 * @param {object} sound
	 * @returns {void}
	 */
	remove(sound)
	{
		this.activeSounds.delete(sound.type);
	}
};