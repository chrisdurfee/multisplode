"use strict";

var Toggle = Class.extend(
{
	/* we want to reset the constructor */
	constructor: function(checked, callBack, container)
	{
		/* this will setup to have mutliple instances of the
		panel in one project without issue */
		this.number = (typeof Toggle.number === 'undefined')? Toggle.number = 0 : (++Toggle.number);
		this.id = 'toggle_' + this.number;

		this.checked = checked || false;
		this.callBack = callBack;

		this.container = container;
	},

	create: function(type, id, className, html, container, prepend)
	{
		var obj = document.createElement(type);
		if(typeof id !== 'undefined')
		{
			obj.id = id;
		}
		if(typeof className !== 'undefined')
		{
			obj.className = className;
		}
		obj.textContent = html;
		if(typeof container !== 'object')
		{
			container = document.getElementById(container);
		}
		if(prepend !== true)
		{
			container.appendChild(obj);
		}
		else
		{
			container.insertBefore(obj, container.firstChild);
		}
		return obj;
	},

	createPanel: function()
	{
		var panel = this.create('div', this.id, 'data-toggle-panel', '', this.container);

		var callBack = Utilities.createCallBack(this, this.change),
		checkId = this.id + '_checkbox';
		var check = this.create('input', checkId, 'toggle', '', panel, true);
		check.type = 'checkbox';
		check.onchange = callBack;
		check.checked = this.checked;

		var label = this.create('label', '', 'toggle-bttn', '', panel);
		label.htmlFor = checkId;
	},

	isChecked: function(e)
	{
		var checked = false;
		var element = (e)? (e.target || e.srcElement) : document.getElementById(this.id + '_checkbox');
		if(element)
		{
			checked = this.checked = element.checked;
		}
		return checked;
	},

	toggle: function()
	{
		var checked = this.isChecked();
		document.getElementById(this.id + '_checkbox').checked = (checked === true)? false : true;
	},

	change: function(e)
	{
		var checked = this.isChecked(e);
		if(typeof this.callBack === 'function')
		{
			this.callBack(checked);
		}
	},

	setup: function()
	{
		this.createPanel();
	}
});