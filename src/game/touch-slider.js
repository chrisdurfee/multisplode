
export class TouchSlider
{
	constructor(container, slidesClass, callBackFn)
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
	}

	setup()
	{
		this.createCrumbContainer();
		this.getSlides();
		this.reset();
		this.setupEvents();
	}

	reset()
	{
		this.moveToSelectedSlide(this.slides[0]);
	}

	remove()
	{
		this.slides = [];
		this.viewNumber = null;
		this.slideWidth = null;
		this.removeEvents();
	}

	getContainer(container)
	{
		if(container && typeof container === 'object')
		{
			return container;
		}
		else
		{
			let element = document.querySelector(container);
			if(element)
			{
				return element;
			}
		}
		return false;
	}

	createCrumbContainer()
	{
		let container = this.container;
		if(container)
		{

			let frag = document.createDocumentFragment();

			let obj = document.createElement('div');
			obj.className = 'crumb-container';
			frag.appendChild(obj);

			let child = this.crumbContainer = document.createElement('div');
			child.className = 'number-crumb-container';
			obj.appendChild(child);

			Utilities.append(container.parentNode, frag);
		}
	}

	addCrumb(element)
	{
		let crumb = document.createElement('div');
		crumb.className = 'option';

		crumb.onclick = Utilities.createCallBack(this, this.moveToSelectedElement, [element]);

		this.crumbContainer.appendChild(crumb);
		return crumb;
	}

	setupEvents()
	{
		let container = this.container;

		/* this will bind our object to our callback methods */
		let start = this.start.bind(this),
		end = this.end.bind(this),
		move = this.move.bind(this),
		resize = this.getSlideWidth.bind(this);

		this.addEvents = () =>
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

		this.removeEvents = () =>
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
	}

	getSlides()
	{
		let slides = this.container.querySelectorAll(this.slidesClass);
		if(slides)
		{
			/* this will convert the node list to an array
			and save the slide to the slides array */
			slides = [].slice.call(slides);

			for(let i = 0, length = slides.length; i < length; i++)
			{
				let slide = slides[i];
				if(slide)
				{
					slide = this.addSlide(slide);
				}
			}
			this.getSlideWidth();
		}
	}

	addSlide(element)
	{
		let crumb = this.addCrumb(element);
		this.slides.push({
			number: this.slides.length,
			element: element,
			crumb: crumb,
			selected: false
		});

		let self = this;
		element.addEventListener('scroll', () =>
		{
			self.preventTouch = true;
		}, true);
	}

	moveToSelectedElement(element)
	{
		if(element)
		{
			let slide = this.getSlideByElement(element);
			if(slide)
			{
				this.moveToSelectedSlide(slide);
			}
		}
	}

	moveToSelectedSlide(slide)
	{
		if(slide)
		{
			/* this will get the current slide width and
			find the offset of the selected slide to
			move the container to the child */
			this.getSlideWidth();
			let offset = this.slideWidth * slide.number;
			this.moveContainer('-' + offset);

			/* we want to override the index to show the
			current selected slide */
			this.index = slide.number;
			this.selectSlide(slide);
		}
	}

	moveToSelectedIndex(index)
	{
		let slide = this.slides[index];
		if(slide)
		{
			/* this will get the current slide width and
			find the offset of the selected slide to
			move the container to the child */
			this.getSlideWidth();
			let offset = this.slideWidth * slide.number;
			this.moveContainer('-' + offset);

			/* we want to override the index to show the
			current selected slide */
			this.index = slide.number;
			this.selectSlide(slide, true);
		}
	}

	selectSlideByIndex(index)
	{
		let slides = this.slides;
		for(let i = 0, length = slides.length; i < length; i++)
		{
			let option = slides[i];
			if(i === index)
			{
				this.selectSlide(option);
			}
		}
		return false;
	}

	getSlideByElement(element)
	{
		let slides = this.slides;
		for(let i = 0, length = slides.length; i < length; i++)
		{
			let option = slides[i];
			if(option.element === element)
			{
				return option;
			}
		}
		return false;
	}

	selectPrimarySlide()
	{
		let slide = this.slides[0];
		if(slide)
		{
			this.selectSlide(slide);
		}
	}

	selectSlide(slide, cancelCallBack)
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
	}

	updateSelectSlide(slide)
	{
		let slides = this.slides;
		for(let i = 0, length = slides.length; i < length; i++)
		{
			let option = slides[i],
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
	}

	getSlideWidth()
	{
		let slides = this.slides;
		if(slides)
		{
			let width;
			if(this.viewNumber === null)
			{
				let element = slides[0].element;
				width = element.offsetWidth;
			}
			else
			{
				let parentWidth = this.container.offsetWidth;
				/* we need to get the width each slide should be
				by the number of slides in view */
				width = this.slideWidth = (parentWidth / this.viewNumber);

				let slide;
				/* we need to set the width of each slide to match the
				view number of the parent container */
				for(let i = 0, maxLength = slides.length; i < maxLength; i++)
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
	}

	getEventPosition(e)
	{
		let position = {
			x: 0,
			y: 0
		};

		if(e)
		{
			let touches = e.touches;
			if(touches)
			{
				let touch = touches[0];
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
	}

	calculateAngle()
	{
		let positionX = this.startX - this.moveX,
		positionY = this.moveY - this.startY;

		/* we need to get the distance */
		//let z = Math.round(Math.sqrt(Math.pow(positionX, 2) + Math.pow(positionY, 2)));
		//angle in radians
		let r = Math.atan2(positionY, positionX);

		//angle in degrees
		let swipeAngle = Math.round(r * 180 / Math.PI);
		if (swipeAngle < 0)
		{
			swipeAngle =  360 - Math.abs(swipeAngle);
		}
		return swipeAngle;
	}

	getSwipeDirection(angle)
	{
		let direction;
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
	}

	isLeftRight()
	{
		let angle = this.calculateAngle();
		let direction = this.getSwipeDirection(angle);
		if(direction === 'left' || direction === 'right')
		{
			return true;
		}
		return false;
	}

	canMove = null;

	shouldMove()
	{
		if(this.canMove === null)
		{
			this.canMove = this.isLeftRight()? true : false;
		}
		return this.canMove;
	}

	start(e)
	{
		if(this.preventTouch === false)
		{
			this.container.classList.add('active');

			this.getSlideWidth();
			this.contact = true;

			let pos = this.getEventPosition(e);
			this.startX = pos.x;
			this.startY = pos.y;
			this.move(e);
		}
	}

	move(e)
	{
		if(this.preventTouch === false)
		{
			/* this will check to ignor if the movement by mouse
			is not mousedown also */
			if(this.contact === false)
			{
				return false;
			}

			let pos = this.getEventPosition(e);
			let posX = pos.x;
			this.moveX = this.index * this.slideWidth + (this.startX - posX);
			this.moveY = pos.y;

			let distance = Math.abs(this.moveX);
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
	}

	moveContainer(number)
	{
		this.container.style.transform = 'translate3d(' + number + 'px,0,0)';
	}

	end(e)
	{
		/* we need to block any mouseout events if the mouse
		is not down */
		if(this.contact === true)
		{
			this.container.classList.remove('active');
			this.contact = false;

			/* this is to check if the panel is being moved in
			the negative direction */
			if(this.moveX <= 0)
			{
				// Calculate the distance swiped.
				let absMove = Math.abs(this.index * this.slideWidth - this.moveX);
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
}