"use strict";

var FlashPanel = Class.extend(
{
	constructor: function(type, title, description, callback, duration, container)
	{
		/* this will setup to have mutliple instances of the
		panel in one project without issue */
		this.number = (typeof FlashPanel.number === 'undefined')? FlashPanel.number = 0 : (++FlashPanel.number);
		this.id = 'flash_panel_' + this.number;

		/* this will save the title and description */
		this.type = type || '';
		this.title = title;
		this.description = description;
		this.duration = (typeof duration === 'number')? duration : 4000;
		this.timer = null;

		this.container = container || document.getElementById('game_container');

		/* this will save the callback and args */
		this.callback = callback;
	},

	setup: function()
	{
		this.createPanel();
		this.startTimer();
	},

	create: function(type, id, className, html, parent)
	{
		var element = document.createElement(type);
		element.id = id;
		element.className = className;
		if(html)
		{
			element.innerHTML = html;
		}

		if(typeof parent !== 'object')
		{
			parent = document.getElementById(parent);
		}
		parent.appendChild(element);
		return element;
	},

	/* this will create the panel */
	createPanel: function()
	{
		var self = this;
		var frag = document.createDocumentFragment();
		var panel = this.create('div', this.id, 'flash-panel dropInBounce ' + this.type, '', frag);
		var buttonContainer = this.create('footer', this.id + '_buttons', 'button-container', '', panel);

		var imageContainer = this.create('div', '', 'icon-container', '', panel);

		var titleContainer = this.create('header', this.id + '_title_container', 'title-container', '', panel);
		this.create('div', this.id + '_title', 'title left dark', this.title, titleContainer);
		this.create('div', this.id + '_text', 'description center dark', this.description, titleContainer);

		var button = this.create('button', this.id + '_button_2', 'bttn circle close', '<div class="content"><span></span><span></span></div>', buttonContainer);
		button.onclick = function()
		{
			self.close();
		};

		Utilities.append(this.container, frag);
	},

	remove: function()
	{
		var panel = document.getElementById(this.id);
		if(panel)
		{
			panel.parentNode.removeChild(panel);
		}
	},

	close: function()
	{
		var obj = document.getElementById(this.id);
		if(obj)
		{
			var self = this;
			obj.classList.add('closed');
			window.setTimeout(function()
			{
				self.remove();
			}, 800);
		}
		this.stopTimer();
	},

	/* this will return true to the callback if
	supplied and remove the panel*/
	accept: function()
	{
		if(typeof this.callback === 'function')
		{
			this.callback.call();
		}
		this.close();
	},

	startTimer: function()
	{
		var self = this;
		this.stopTimer();

		this.timer = window.setTimeout(function()
		{
			self.close();
		}, this.duration);
	},

	stopTimer: function()
	{
		window.clearTimeout(this.timer);
	}
});