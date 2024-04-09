"use strict";

var Data =
{
	storage: null,

	setup: function()
	{
		this.supported = this.checkSupport();
		if(this.supported === true)
		{
			this.storage = window.localStorage;
		}
	},

	supported: false,

	checkSupport: function()
	{
		if(typeof window.localStorage !== 'undefined')
		{
			return true;
		}
		return false;
	},

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

	set: function(key, value)
	{
		if(this.supported === true)
		{
			value = JSON.stringify(value);
			this.storage.setItem(key, value);
		}
	},

	clear: function()
	{
		if(this.supported === true)
		{
			this.storage.clear();
		}
	}
};