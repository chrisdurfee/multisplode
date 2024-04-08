"use strict";

/*
	data

	this will allow data to be added and retreived
	from the local storage. this will encode the data
	to and from json automatically.
*/
var Data =
{
	storage: null,

	/* this will setup the object and check if
	local storage is supported. */
	setup: function()
	{
		this.supported = this.checkSupport();
		if(this.supported === true)
		{
			this.storage = window.localStorage;
		}
	},

	supported: false,
	/* this will check if local storage is supported.
	@return (bool) true or false */
	checkSupport: function()
	{
		if(typeof window.localStorage !== 'undefined')
		{
			return true;
		}
		return false;
	},

	/* this will get a data value saved to the local
	storage.
	@param (string) key = the key
	@return (mixed) the value or null */
	get: function(key)
	{
		if(this.supported === true)
		{
			var value = this.storage.getItem(key);
			if(typeof value !== 'undefined')
			{
				return JSON.parse(value);
			}
		}
		return null;
	},

	/* this will set a data value saved to the local
	storage.
	@param (string) key = the key
	@param (mixed) value = the value */
	set: function(key, value)
	{
		if(this.supported === true)
		{
			value = JSON.stringify(value);
			this.storage.setItem(key, value);
		}
	},

	/* this will clear all the saved data on the local
	storage. */
	clear: function()
	{
		if(this.supported === true)
		{
			this.storage.clear();
		}
	}
};