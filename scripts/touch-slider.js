"use strict";

var TouchSlider = function(container, slidesClass, callBackFn)
{
	this.viewNumber = null;
	this.slides = [];
	this.index = 0;
	this.slideWidth = null;

	this.minimum = 72;
	this.moveX = 0;
	this.startX = 0;
	this.moveY = 0;
	this.startY = 0;
	this.contact = false;
	this.callBackFn = callBackFn;
	this.preventTouch = false;
	this.preventScroll = false;

	this.container = this.getContainer(container);
	this.slidesClass = slidesClass || '.slides';
};

TouchSlider.prototype =
{
	constructor: TouchSlider,

	setup: function()
	{
		this.createCrumbContainer();
		this.getSlides();
		this.reset();
		this.setupEvents();
	},

	reset: function()
	{
		this.moveToSelectedSlide(this.slides[0]);
	},

	remove: function()
	{
		this.slides = [];
		this.viewNumber = null;
		this.slideWidth = null;
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

	createCrumbContainer: function()
	{
		var container = this.container;
		if(container)
		{

			var frag = document.createDocumentFragment();

			var obj = document.createElement('div');
			obj.className = 'crumb-container';
			frag.appendChild(obj);

			var child = this.crumbContainer = document.createElement('div');
			child.className = 'number-crumb-container';
			obj.appendChild(child);

			Utilities.append(container.parentNode, frag);
		}
	},

	addCrumb: function(element)
	{
		var crumb = document.createElement('div');
		crumb.className = 'option';

		crumb.onclick = Utilities.createCallBack(this, this.moveToSelectedElement, [element]);

		this.crumbContainer.appendChild(crumb);
		return crumb;
	},

	setupEvents: function()
	{
		var container = this.container;

		/* this will bind our object to our callback methods */
		var start = this.start.bind(this),
		end = this.end.bind(this),
		move = this.move.bind(this),
		resize = this.getSlideWidth.bind(this);

		this.addEvents = function()
		{
			container.addEventListener('touchstart', start);
			container.addEventListener('mousedown', start, true);

			container.addEventListener('touchmove', move, true);
			container.addEventListener('mousemove', move, true);

			container.addEventListener('touchend', end, true);
			container.addEventListener('mouseup', end, true);
			container.addEventListener('mouseout', end, true);

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
			container.removeEventListener('mouseout', end, true);

			window.removeEventListener('resize', resize);
		};

		this.addEvents();
	},

	getSlides: function()
	{
		var slides = this.container.querySelectorAll(this.slidesClass);
		if(slides)
		{
			/* this will convert the node list to an array
			and save the slide to the slides array */
			slides = [].slice.call(slides);

			for(var i = 0, length = slides.length; i < length; i++)
			{
				var slide = slides[i];
				if(slide)
				{
					slide = this.addSlide(slide);
				}
			}
			this.getSlideWidth();
		}
	},

	addSlide: function(element)
	{
		var crumb = this.addCrumb(element);
		this.slides.push({
			number: this.slides.length,
			element: element,
			crumb: crumb,
			selected: false
		});

		var self = this;
		element.addEventListener('scroll', function()
		{
			self.preventTouch = true;
		}, true);
	},

	moveToSelectedElement: function(element)
	{
		if(element)
		{
			var slide = this.getSlideByElement(element);
			if(slide)
			{
				this.moveToSelectedSlide(slide);
			}
		}
	},

	moveToSelectedSlide: function(slide)
	{
		if(slide)
		{
			/* this will get the current slide width and
			find the offset of the selected slide to
			move the container to the child */
			this.getSlideWidth();
			var offset = this.slideWidth * slide.number;
			this.moveContainer('-' + offset);

			/* we want to override the index to show the
			current selected slide */
			this.index = slide.number;
			this.selectSlide(slide);
		}
	},

	moveToSelectedIndex: function(index)
	{
		var slide = this.slides[index];
		if(slide)
		{
			/* this will get the current slide width and
			find the offset of the selected slide to
			move the container to the child */
			this.getSlideWidth();
			var offset = this.slideWidth * slide.number;
			this.moveContainer('-' + offset);

			/* we want to override the index to show the
			current selected slide */
			this.index = slide.number;
			this.selectSlide(slide, true);
		}
	},

	selectSlideByIndex: function(index)
	{
		var slides = this.slides;
		for(var i = 0, length = slides.length; i < length; i++)
		{
			var option = slides[i];
			if(i === index)
			{
				this.selectSlide(option);
			}
		}
		return false;
	},

	getSlideByElement: function(element)
	{
		var slides = this.slides;
		for(var i = 0, length = slides.length; i < length; i++)
		{
			var option = slides[i];
			if(option.element === element)
			{
				return option;
			}
		}
		return false;
	},

	selectPrimarySlide: function()
	{
		var slide = this.slides[0];
		if(slide)
		{
			this.selectSlide(slide);
		}
	},

	selectSlide: function(slide, cancelCallBack)
	{
		if(slide)
		{
			slide.element.classList.add('active');
			slide.selected = true;
			this.updateSelectSlide(slide);

			if(typeof this.callBackFn === 'function' && cancelCallBack !== true)
			{
				this.callBackFn(slide.number);
			}
		}
	},

	updateSelectSlide: function(slide)
	{
		var slides = this.slides;
		for(var i = 0, length = slides.length; i < length; i++)
		{
			var option = slides[i],
			crumb = option.crumb;
			if(option !== slide)
			{
				option.element.classList.remove('active');
				option.selected = false;
			}

			if(crumb)
			{
				crumb.className = option.selected === true? 'option circle selected' : 'option circle';
			}
		}
	},

	getSlideWidth: function()
	{
		var slides = this.slides;
		if(slides)
		{
			var width;
			if(this.viewNumber === null)
			{
				var element = slides[0].element;
				width = element.offsetWidth;
			}
			else
			{
				var parentWidth = this.container.offsetWidth;
				/* we need to get the width each slide should be
				by the number of slides in view */
				width = this.slideWidth = (parentWidth / this.viewNumber);

				var slide;
				/* we need to set the width of each slide to match the
				view number of the parent container */
				for(var i = 0, maxLength = slides.length; i < maxLength; i++)
				{
					slide = slides[i];
					if(slide)
					{
						slide.style.width = width + 'px';
					}
				}

				/* we need to get the width each slide should be
				by the number of slides in view */
				width = this.slideWidth = (parentWidth / this.viewNumber);
			}
			this.slideWidth = width;
		}
	},

	getEventPosition: function(e)
	{
		var position = {
			x: 0,
			y: 0
		};

		if(e)
		{
			var touches = e.touches;
			if(touches)
			{
				var touch = touches[0];
				position.x = touch.pageX;
				position.y = touch.pageY;
			}
			else
			{
				position.x = e.clientX || e.pageX;
				position.y = e.clientY || e.pageY;
			}
		}
		return position;
	},

	calculateAngle: function()
	{
		var positionX = this.startX - this.moveX,
		positionY = this.moveY - this.startY;

		/* we need to get the distance */
		//var z = Math.round(Math.sqrt(Math.pow(positionX, 2) + Math.pow(positionY, 2)));
		//angle in radians
		var r = Math.atan2(positionY, positionX);

		//angle in degrees
		var swipeAngle = Math.round(r * 180 / Math.PI);
		if (swipeAngle < 0)
		{
			swipeAngle =  360 - Math.abs(swipeAngle);
		}
		return swipeAngle;
	},

	getSwipeDirection: function(angle)
	{
		var direction;
		if(angle <= 45 && angle >= 0)
		{
			direction = 'left';
		}
		else if(angle <= 360 && angle >= 315)
		{
			direction = 'left';
		}
		else if(angle >= 135 && angle <= 225)
		{
			direction = 'right';
		}
		else if(angle > 45 && angle < 135)
		{
			direction = 'down';
		}
		else
		{
			direction = 'up';
		}
		return direction;
	},

	isLeftRight: function()
	{
		var angle = this.calculateAngle();
		var direction = this.getSwipeDirection(angle);
		if(direction === 'left' || direction === 'right')
		{
			return true;
		}
		return false;
	},

	canMove: null,

	shouldMove: function()
	{
		if(this.canMove === null)
		{
			this.canMove = this.isLeftRight()? true : false;
		}
		return this.canMove;
	},

	start: function(e)
	{
		if(this.preventTouch === false)
		{
			this.container.classList.add('active');

			this.getSlideWidth();
			this.contact = true;

			var pos = this.getEventPosition(e);
			this.startX = pos.x;
			this.startY = pos.y;
			this.move(e);
		}
	},

	move: function(e)
	{
		if(this.preventTouch === false)
		{
			/* this will check to ignor if the movement by mouse
			is not mousedown also */
			if(this.contact === false)
			{
				return false;
			}

			var pos = this.getEventPosition(e);
			var posX = pos.x;
			this.moveX = this.index * this.slideWidth + (this.startX - posX);
			this.moveY = pos.y;

			var distance = Math.abs(this.moveX);
			if(distance <= this.minimum)
			{
				return false;
			}

			if(this.shouldMove())
			{
				//e.preventDefault();
			}

			/* this will reversethe direction to scroll in the direction
			of the touch */
			this.moveX = (this.moveX * -1);
			this.moveContainer(this.moveX);
		}
	},

	moveContainer: function(number)
	{
		this.container.style.transform = 'translate3d(' + number + 'px,0,0)';
	},

	end: function(e)
	{
		/* we need to block any mouseout events if the mouse
		is not down */
		if(this.contact === true)
		{
			this.container.classList.remove('active');
			this.contact = false;

			/* this is to check if the panel is being moved in
			the negative direction */
			if(this.moveX > 0)
			{

			}
			else
			{
				// Calculate the distance swiped.
				var absMove = Math.abs(this.index * this.slideWidth - this.moveX);
				/* convert to positive number */
				this.moveX = Math.abs(this.moveX);

				// Calculate the index. All other calculations are based on the index.
				if(absMove > this.slideWidth / 3)
				{
					if(this.moveX > this.index * this.slideWidth && this.index < (this.slides.length - 1))
					{
						this.index++;
					}
					else if (this.moveX < this.index * this.slideWidth && this.index > 0)
					{
						this.index--;
					}
				}
				this.selectSlideByIndex(this.index);
			}
			this.moveContainer('-' + (this.index * this.slideWidth));
		}

		this.canMove = null;
		this.preventTouch = false;
	}
};