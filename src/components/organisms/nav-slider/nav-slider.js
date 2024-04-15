import { Header, Li, Ul } from "@base-framework/atoms";
import { Component } from "@base-framework/base";

/**
 * This will create the step.
 *
 * @param {object} props
 * @param {number} index
 * @returns {object}
 */
const Link = (props, index) => Li({ class: 'option title-text', click: (e, parent) => parent.moveToSelectedIndex(index) }, props);

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
        return Header({ class: 'title-container' }, [
			Ul({ cache: 'navContainer', class: 'option-container', ...this.getEvents(), map: [this.items, Link] })
		]);
    }

    /**
	 * This will get the events.
	 *
	 * @returns {object}
	 */
	getEvents()
	{
		const start = this.start.bind(this),
		move = this.move.bind(this),
		end = this.end.bind(this);

		return {
			touchstart: start,
			mousedown: start,

			touchmove: move,
			mousemove: move,

			touchend: end,
			mouseup: end,
			mouseout: end
		};
	}

	setupEvents()
	{
		const resize = this.resize.bind(this);

		return [
			['resize', window, resize],
		];
	}

    /**
	 * This will create the touch slider.
	 *
	 * @returns {void}
	 */
	afterSetup()
	{
        this.getOptions();
        this.reset();
        window.setTimeout(() => this.resize(), 10);
	}

    /**
	 * This will select the first step.
	 *
	 * @returns {void}
	 */
	selectPrimaryStep()
	{
		const option = this.optionsArray[0];
		if (option)
		{
			this.moveToSelectedOption(option);
		}
	}

	reset()
	{
		this.selectPrimaryStep();
	}

	getParentWidth()
	{
		if (this.panel)
		{
			const rect = this.panel.getBoundingClientRect();
			this.parentWidth = rect.width;
		}
	}

	/**
	 * This will get the steps.
	 *
	 * @returns {void}
	 */
    getOptions()
	{
		let items = this.navContainer.querySelectorAll('.option');
		if (!items)
		{
			return [];
		}

        /* this will convert the node list to an array
        and save the item to the items array */
        items = [].slice.call(items);
        const options = items.map((element, index) => ({
            element,
            index
        }));

        this.optionsArray = options;
        this.getParentWidth();
	}

	moveToSelectedElement(element)
	{
        if (!element)
		{
			return;
		}

		let option = this.getOptionByElement(element);
        if (option)
        {
            this.moveToSelectedOption(option);
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
		if (!option || option.selected === true)
		{
			return;
		}

        this.selection = option;
        option.element.classList.add('selected');
        option.selected = true;
        this.updateSelectOption(option);

        if (typeof this.callBackFn === 'function' && cancelCallBack !== true)
        {
            this.callBackFn(option.index);
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
		this.navContainer.classList.add('active');
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
			this.navContainer.classList.remove('active');
			this.contact = false;

			let center = this.parentWidth / 2;
			let element = this.selection.element;
			this.moveToElement(element);
		}
	}
}