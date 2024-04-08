"use strict";

var ControlPanel = function()
{
	this.nav = null;
	this.touch = null;
};

Class.extend(
{
	constructor: ControlPanel,

	setup: function(touchContainer, slideClass, navContainer, optionsArray)
	{
		this.setupTouch(touchContainer, slideClass);
		this.setupNav(navContainer, optionsArray);
	},

	setupTouch: function(container, slideClass)
	{
		var touch = this.touch = new TouchSlider(container, slideClass, this.selectBySlide.bind(this));
		touch.setup();
	},

	setupNav: function(container, optionsArray)
	{
		var nav = this.nav = new NavSlider(this.selectByNav.bind(this), container);
		nav.setup(optionsArray);
	},

	selectByNav: function(index)
	{
		if(this.touch)
		{
			this.touch.moveToSelectedIndex(index);
		}
	},

	selectBySlide: function(index)
	{
		if(this.nav)
		{
			this.nav.moveToSelectedIndex(index);
		}
	}
});