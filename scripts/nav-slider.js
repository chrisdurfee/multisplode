"use strict";

var NavSlider = function(callBackFn, container)
{
	this.viewNumber = null;
	this.optionsArray = [];
	this.selection = null;
	this.index = 0;

	this.moveX = 0;
	this.startX = 0;
	this.contact = false;

	this.callBackFn = callBackFn;
	this.navContainer = null;
	this.container = this.getContainer(container);
	this.getParentWidth();
};

Class.extend(
{
	constructor: NavSlider,

	setup: function(options)
	{
		this.createOptionContainer();
		this.setupOptions(options);
		this.reset();
		this.setupEvents();
	},

	reset: function()
	{
		this.moveToSelectedOption(this.optionsArray[0]);
	},

	remove: function()
	{
		this.optionsArray = [];
		this.viewNumber = null;
		this.removeEvents();
	},

	getContainer: function(container)
	{
		if(container && typeof container === 'object')
		{
			return container;
		}
		else
		{
			var element = document.querySelector(container);
			if(element)
			{
				return element;
			}
		}
		return false;
	},

	getParentWidth: function()
	{
		if(this.container)
		{
			var rect = this.container.getBoundingClientRect();
			this.parentWidth = rect.width;
		}
	},

	createOptionContainer: function()
	{
		var container = this.container;
		if(container)
		{
			var obj = this.navContainer = document.createElement('ul');
			obj.className = 'option-container';
			container.appendChild(obj);
		}
	},

	setupEvents: function()
	{
		var container = this.navContainer;

		/* this will bind our object to our callback methods */
		var start = this.start.bind(this),
		end = this.end.bind(this),
		move = this.move.bind(this),
		resize = this.resize.bind(this);

		this.addEvents = function()
		{
			container.addEventListener('touchstart', start);
			container.addEventListener('mousedown', start);

			container.addEventListener('touchmove', move);
			container.addEventListener('mousemove', move);

			container.addEventListener('touchend', end);
			container.addEventListener('mouseup', end);
			container.addEventListener('mouseout', end);

			window.addEventListener('resize', resize);
		};

		this.removeEvents = function()
		{
			container.removeEventListener('touchstart', start);
			container.removeEventListener('mousedown', start);

			container.removeEventListener('touchmove', move);
			container.removeEventListener('mousemove', move);

			container.removeEventListener('touchend', end);
			container.removeEventListener('mouseup', end);
			container.removeEventListener('mouseout', end);

			window.removeEventListener('resize', resize);
		};

		this.addEvents();
	},

	setupOptions: function(options)
	{
		if(options)
		{
			for(var i = 0, length = options.length; i < length; i++)
			{
				var option = options[i];
				if(option)
				{
					option = this.addOption(option);
				}
			}
			this.resize();
		}
	},

	addOption: function(label)
	{
		var element = document.createElement('li');
		element.className = 'option title-text';
		element.textContent = label;
		element.onclick = Utilities.createCallBack(this, this.moveToSelectedElement, [element]);

		this.navContainer.appendChild(element);

		this.optionsArray.push({
			number: this.optionsArray.length,
			element: element,
			selected: false
		});
	},

	moveToSelectedElement: function(element)
	{
		if(element)
		{
			var option = this.getOptionByElement(element);
			if(option)
			{
				this.moveToSelectedOption(option);
			}
		}
	},

	moveToSelectedOption: function(option)
	{
		if(option)
		{
			this.selectOption(option);
			this.moveToElement(option.element);
		}
	},

	moveToSelectedIndex: function(index)
	{
		var option = this.optionsArray[index];
		if(option)
		{
			this.selectOption(option, true);
			this.moveToElement(option.element);
		}
	},

	selectOptionByIndex: function(index)
	{
		var options = this.optionsArray;
		for(var i = 0, length = options.length; i < length; i++)
		{
			var option = options[i];
			if(i === index)
			{
				this.selectOption(option);
			}
		}
		return false;
	},

	getOptionByElement: function(element)
	{
		var options = this.optionsArray;
		for(var i = 0, length = options.length; i < length; i++)
		{
			var option = options[i];
			if(option.element === element)
			{
				return option;
			}
		}
		return false;
	},

	selectPrimaryOption: function()
	{
		var option = this.optionsArray[0];
		if(option)
		{
			this.selectOption(option);
		}
	},

	selectOption: function(option, cancelCallBack)
	{
		if(option)
		{
			this.selection = option;
			option.element.classList.add('selected');
			option.selected = true;
			this.updateSelectOption(option);

			if(typeof this.callBackFn === 'function' && cancelCallBack !== true)
			{
				this.callBackFn(option.number);
			}
		}
	},

	updateSelectOption: function(selection)
	{
		var options = this.optionsArray;
		for(var i = 0, length = options.length; i < length; i++)
		{
			var option = options[i],
			crumb = option.crumb;
			if(option !== selection)
			{
				option.element.classList.remove('selected');
				option.selected = false;
			}
		}
	},

	resize: function()
	{
		this.getParentWidth();
		if(this.selection)
		{
			this.moveToElement(this.selection.element);
		}
	},

	getEventX: function(e)
	{
		var x = 0;
		if(e)
		{
			if(e.touches)
			{
				x = e.touches[0].pageX;
			}
			else
			{
				x = e.clientX || e.pageX;
			}
		}
		return x;
	},

	start: function(e)
	{
		this.container.classList.add('active');
		this.getParentWidth();

		this.contact = true;
		this.startX = this.getEventX(e) - this.posX;
		this.move(e);
	},

	move: function(e)
	{
		/* this will check to ignor if the movement by mouse
		is not mousedown also */
		if(this.contact === false)
		{
			return false;
		}

		var posX = this.getEventX(e);
		this.moveX = (this.startX - posX);

		/* this will reversethe direction to scroll in the direction
		of the touch */
		this.moveX = (this.moveX * -1);
		this.moveContainer(this.moveX);
		this.checkSelectedElement();
	},

	posX: 0,
	moveContainer: function(number)
	{
		this.posX = number;
		this.navContainer.style.transform = 'translate3d(' + number + 'px,0,0)';
	},

	checkSelectedElement: function()
	{
		var center = this.parentWidth / 2;
		var options = this.optionsArray;
		var offset = 0;
		for(var i = 0, length = options.length; i < length; i++)
		{
			var option = options[i];
			if(option)
			{
				var selected = this.contains(option.element, center, 10);
				if(selected === true)
				{
					this.selectOption(option);
				}
			}
		}
	},

	moveToElement: function(element)
	{
		var center = this.parentWidth / 2;
		var element = this.selection.element;
		var rect = element.getBoundingClientRect();
		var offset = center - element.offsetLeft - (rect.width / 2);
		this.moveContainer(offset);
	},

	getElementOffset: function(element)
	{
		var rect = element.getBoundingClientRect();
		/*var pX =  this.posX + element.offsetLeft,
		pY = element.offsetTop,
		width = rect.width,
		height = rect.height;*/

		return {
			x: this.posX + element.offsetLeft,
			y: element.offsetTop,
			width: rect.width,
			height: rect.height
		};
	},

	contains: function(element, x, y)
	{
		var offset = this.getElementOffset(element);
		return (offset.x <= x) && (offset.x + offset.width >= x) && (offset.y <= y) && (offset.y + offset.height >= y);
	},

	end: function(e)
	{
		/* we need to block any mouseout events if the mouse
		is not down */
		if(this.contact === true)
		{
			this.container.classList.remove('active');
			this.contact = false;

			var center = this.parentWidth / 2;
			var element = this.selection.element;
			this.moveToElement(element);
		}
	}
});