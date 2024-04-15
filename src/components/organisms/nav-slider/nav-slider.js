import { Component } from "@base-framework/base";

/**
 * This will create the step.
 *
 * @param {object} props
 * @param {number} index
 * @returns {object}
 */
const Step = (props, index) => Section({class: STEP_CLASS_NAME }, [ props ]);

/**
 * NavSlider
 *
 * This will create the nav slider.
 *
 * @class
 */
export class NavSlider extends Component
{
	onCreated()
	{
		this.viewNumber = null;
		this.optionsArray = [];
		this.selection = null;
		this.index = 0;

		this.moveX = 0;
		this.startX = 0;
		this.contact = false;
	}

    /**
     * This will render the touch slider.
     *
     * @returns {object}
     */
    render()
    {
        return Article({ class: 'touch-slider step-container' }, [
			Div({ cache: 'slider', class: 'step-slider-container', ...this.getEvents(), map: [this.items, Step] }),
			CrumbContainer({ map: [this.items, Crumb] })
		]);
    }

	setup(options)
	{
		this.createOptionContainer();
		this.setupOptions(options);
		this.reset();
		this.setupEvents();
	}

	reset()
	{
		this.moveToSelectedOption(this.optionsArray[0]);
	}

	remove()
	{
		this.optionsArray = [];
		this.viewNumber = null;
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

	getParentWidth()
	{
		if(this.container)
		{
			let rect = this.container.getBoundingClientRect();
			this.parentWidth = rect.width;
		}
	}

	createOptionContainer()
	{
		let container = this.container;
		if(container)
		{
			let obj = this.navContainer = document.createElement('ul');
			obj.className = 'option-container';
			container.appendChild(obj);
		}
	}

	setupEvents()
	{
		let container = this.navContainer;

		/* this will bind our object to our callback methods */
		let start = this.start.bind(this),
		end = this.end.bind(this),
		move = this.move.bind(this),
		resize = this.resize.bind(this);

		this.addEvents = () =>
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

		this.removeEvents = () =>
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
	}

	setupOptions(options)
	{
		if(options)
		{
			for(let i = 0, length = options.length; i < length; i++)
			{
				let option = options[i];
				if(option)
				{
					option = this.addOption(option);
				}
			}
			this.resize();
		}
	}

	addOption(label)
	{
		let element = document.createElement('li');
		element.className = 'option title-text';
		element.textContent = label;
		element.onclick = Utilities.createCallBack(this, this.moveToSelectedElement, [element]);

		this.navContainer.appendChild(element);

		this.optionsArray.push({
			number: this.optionsArray.length,
			element: element,
			selected: false
		});
	}

	moveToSelectedElement(element)
	{
		if(element)
		{
			let option = this.getOptionByElement(element);
			if(option)
			{
				this.moveToSelectedOption(option);
			}
		}
	}

	moveToSelectedOption(option)
	{
		if(option)
		{
			this.selectOption(option);
			this.moveToElement(option.element);
		}
	}

	moveToSelectedIndex(index)
	{
		let option = this.optionsArray[index];
		if(option)
		{
			this.selectOption(option, true);
			this.moveToElement(option.element);
		}
	}

	selectOptionByIndex(index)
	{
		let options = this.optionsArray;
		for(let i = 0, length = options.length; i < length; i++)
		{
			let option = options[i];
			if(i === index)
			{
				this.selectOption(option);
			}
		}
		return false;
	}

	getOptionByElement(element)
	{
		let options = this.optionsArray;
		for(let i = 0, length = options.length; i < length; i++)
		{
			let option = options[i];
			if(option.element === element)
			{
				return option;
			}
		}
		return false;
	}

	selectPrimaryOption()
	{
		let option = this.optionsArray[0];
		if(option)
		{
			this.selectOption(option);
		}
	}

	selectOption(option, cancelCallBack)
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
	}

	updateSelectOption(selection)
	{
		let options = this.optionsArray;
		for(let i = 0, length = options.length; i < length; i++)
		{
			let option = options[i],
			crumb = option.crumb;
			if(option !== selection)
			{
				option.element.classList.remove('selected');
				option.selected = false;
			}
		}
	}

	resize()
	{
		this.getParentWidth();
		if(this.selection)
		{
			this.moveToElement(this.selection.element);
		}
	}

	getEventX(e)
	{
		let x = 0;
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
	}

	start(e)
	{
		this.container.classList.add('active');
		this.getParentWidth();

		this.contact = true;
		this.startX = this.getEventX(e) - this.posX;
		this.move(e);
	}

	move(e)
	{
		/* this will check to ignor if the movement by mouse
		is not mousedown also */
		if(this.contact === false)
		{
			return false;
		}

		let posX = this.getEventX(e);
		this.moveX = (this.startX - posX);

		/* this will reversethe direction to scroll in the direction
		of the touch */
		this.moveX = (this.moveX * -1);
		this.moveContainer(this.moveX);
		this.checkSelectedElement();
	}

	posX = 0;
	moveContainer(number)
	{
		this.posX = number;
		this.navContainer.style.transform = 'translate3d(' + number + 'px,0,0)';
	}

	checkSelectedElement()
	{
		let center = this.parentWidth / 2;
		let options = this.optionsArray;
		let offset = 0;
		for(let i = 0, length = options.length; i < length; i++)
		{
			let option = options[i];
			if(option)
			{
				let selected = this.contains(option.element, center, 10);
				if(selected === true)
				{
					this.selectOption(option);
				}
			}
		}
	}

	moveToElement(element)
	{
		let center = this.parentWidth / 2;
		let element = this.selection.element;
		let rect = element.getBoundingClientRect();
		let offset = center - element.offsetLeft - (rect.width / 2);
		this.moveContainer(offset);
	}

	getElementOffset(element)
	{
		let rect = element.getBoundingClientRect();
		/*let pX =  this.posX + element.offsetLeft,
		pY = element.offsetTop,
		width = rect.width,
		height = rect.height;*/

		return {
			x: this.posX + element.offsetLeft,
			y: element.offsetTop,
			width: rect.width,
			height: rect.height
		};
	}

	contains(element, x, y)
	{
		let offset = this.getElementOffset(element);
		return (offset.x <= x) && (offset.x + offset.width >= x) && (offset.y <= y) && (offset.y + offset.height >= y);
	}

	end(e)
	{
		/* we need to block any mouseout events if the mouse
		is not down */
		if(this.contact === true)
		{
			this.container.classList.remove('active');
			this.contact = false;

			let center = this.parentWidth / 2;
			let element = this.selection.element;
			this.moveToElement(element);
		}
	}
}