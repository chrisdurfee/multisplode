
/**
 * This will check if local storage is supported.
 *
 * @returns {boolean}
 */
const checkSupport = () => (typeof window.localStorage !== 'undefined');

/**
 * @type {boolean} isSupported
 */
const isSupported = checkSupport();

/**
 * Data
 *
 * This module provides a simple interface to the browser's local storage.
 *
 * @type {object} Data
 */
export const Data =
{
	/**
	 * @property {object|null} storage
	 */
	storage: null,

	/**
	 * This will setup our data module.
	 *
	 * @returns {object}
	 */
	setup()
	{
		if (isSupported === true)
		{
			this.storage = window.localStorage;
		}

        return this;
	},

	/**
	 * This will get a value from local storage.
	 *
	 * @param {string} key
	 * @returns {*}
	 */
	get(key)
	{
		if (isSupported === false)
		{
			return null;
		}

		const value = this.storage.getItem(key);
		if (typeof value !== 'undefined')
		{
			return JSON.parse(value);
		}
	},

	/**
	 * This will set a value in local storage.
	 *
	 * @param {string} key
	 * @param {*} value
	 * @returns {void}
	 */
	set(key, value)
	{
		if (isSupported !== true)
		{
			return;
		}

		value = JSON.stringify(value);
		this.storage.setItem(key, value);
	},

	/**
	 * This will clear local storage.
	 *
	 * @returns {void}
	 */
	clear()
	{
		if (isSupported === true)
		{
			this.storage.clear();
		}
	}
}.setup();