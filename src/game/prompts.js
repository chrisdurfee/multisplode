"use strict";

var Prompts =
{
	prompts: [],

	setup: function()
	{
		var stopActivate = game.stopDraw.bind(game),
		startDeactivate = game.startDraw.bind(game);

		this.add('PromptStartUp', 'startup-panel', 'startup-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'add-two-panel', 'add-two-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'add-three-panel', 'add-three-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'add-four-panel', 'add-four-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'pulse-particle-panel', 'pulse-particle-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'gravity-field-panel', 'gravity-field-panel', stopActivate, startDeactivate);
	},

	getPrompt: function(id)
	{
		var prompts = this.prompts;
		for(var i = 0, length = prompts.length; i < length; i++)
		{
			var prompt = prompts[i];
			if(prompt.id === id)
			{
				return prompt;
			}
		}
		return false;
	},

	showPrompt: function(id)
	{
		var prompt = this.getPrompt(id);
		if(prompt)
		{
			prompt.display();
		}
	},

	reset: function()
	{
		this.prompts = [];
	},

	getAll:function()
	{
		return this.prompts;
	},

	add: function(promptType, id, container, activate, deactivate)
	{
		var prompt;

		try{
			prompt = new window[promptType](id, container, activate, deactivate);
			prompt.setup();
		}
		catch(e)
		{
		}

		if(prompt)
		{
			this.prompts.push(prompt);
			return prompt;
		}
		return false;
	},

	remove: function(prompt)
	{
		var index = this.prompts.indexOf(prompt);
		if(index > -1)
		{
			this.prompts.splice(index, 1);
		}
	}
};

var Prompt = Class.extend(
{
	constructor: function(id, container, activateCallBack, deactivateCallBack)
	{
		this.id = id;
		this.activateCallBack = activateCallBack || false;
		this.deactivateCallBack = deactivateCallBack || false;

		this.container = this.getContainer(container);
	},

	setup: function()
	{
		 this.addHeader();
	},

	addHeader: function()
	{
		var container = this.container,
		self = this;

		var obj = document.createElement('div');
		obj.className = 'panel-top-button-container';

		var parent = container;
		parent.insertBefore(obj, parent.firstChild);

		var button = document.createElement('div');
		button.className = 'bttn circle close';
		button.innerHTML = '<div class="content"><span></span><span></span></div>';
		button.onclick = this.display.bind(this);

		obj.appendChild(button);
	},

	getContainer: function(container)
	{
		if(container && typeof container === 'object')
		{
			return container;
		}
		else
		{
			var element = document.querySelector('#' + container);
			if(element)
			{
				return element;
			}
		}
		return false;
	},

	timer: null,

	display: function()
	{
		var container = this.container,
		playContainer = document.getElementById('play-container');
		this.toggleDisplay();

		if(this.toggleMode === 'block')
		{
			playContainer.classList.add('blur');
			window.clearTimeout(this.timer);
			this.timer = window.setTimeout(function()
			{
				container.classList.add('active');
			}, 1000);
		}
		else
		{
			window.clearTimeout(this.timer);
			container.classList.remove('active');
			playContainer.classList.remove('blur');
		}
	},

	toggleMode: null,

	toggleDisplay: function()
	{
		var obj = this.container,
		display = obj.style.display;

		if(display === '' || display === 'none')
		{
			obj.style.display = 'block';
			this.toggleMode = 'block';
			this.createShadow();

			if(typeof this.activateCallBack === 'function')
			{
				this.activateCallBack.call();
			}
		}
		else
		{
			obj.style.display = 'none';
			this.toggleMode = 'none';
			this.removeShadow();

			if(typeof this.deactivateCallBack === 'function')
			{
				this.deactivateCallBack.call();
			}
		}
	},

	removeShadow: function()
	{
		var panel = this.shadow;
		if(panel)
		{
			var parent = panel.parentNode;
			parent.removeChild(panel);
		}
	},

	shadow: null,

	createShadow: function()
	{
		var self = this,
		obj = this.shadow = document.createElement('div');

		obj.className = 'prompt-shadow';
		obj.onclick = function(){self.display();};
		this.container.parentNode.appendChild(obj);
	}
});

var PromptStartUp = function(id, container, activateCallBack, deactivateCallBack)
{
	this.id = id;
	this.activateCallBack = activateCallBack || false;
	this.deactivateCallBack = deactivateCallBack || false;

	this.container = this.getContainer(container);
};

Prompt.extend(
{
	constructor: PromptStartUp,

	setup: function()
	{
		 this.addHeader();
		 this.setupTouch();
	},

	setupTouch: function()
	{
		var touch = PromptStartUp.touch = new TouchSlider('#startup-step-panel', '.step');
		touch.setup();
	},

	toggleDisplay: function()
	{
		var obj = this.container,
		display = obj.style.display;

		if(display === '' || display === 'none')
		{
			PromptStartUp.touch.reset();

			obj.style.display = 'block';
			this.toggleMode = 'block';
			this.createShadow();

			if(typeof this.activateCallBack === 'function')
			{
				this.activateCallBack.call();
			}
		}
		else
		{
			obj.style.display = 'none';
			this.toggleMode = 'none';
			this.removeShadow();

			if(typeof this.deactivateCallBack === 'function')
			{
				this.deactivateCallBack.call();
			}
		}
	}
});