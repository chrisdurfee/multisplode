import { Arrays, base, Dom, Html } from '@base-framework/base';
import { animate } from './animate.js';

export class AutoScroller extends Html
{
	constructor(header, container, sceneClassName)
	{
		super();
		this.lastSelectedOption = null;
		this.optionsArray = [];
		this.conversionLabels = [];

		/* this is the class name of the scene
		containers that will be included in
		the scroll panel */
		this.sceneClassName = sceneClassName || 'cast-container';

		/* this is the size that will change from
		auto scroll to mobile scroll */
		this.mobileSize = 720;
		this.touch = false;

		/* this will change the way the auto scroller
		because of window size */
		this.scrollMode = null;

		this.container = container;
		this.init();

		/* this is the page header id */
		this.header = header;
	}

	init()
	{
		let constructor = this.constructor;
		this.number = (typeof constructor.number === 'undefined')? constructor.number = 0 : (++constructor.number);

		this.id = 'auto-scroller-' + this.number;
	}

	setupBinds()
	{
		this.mouseBind = this.mouseWheel.bind(this);
		this.keyBind = this.keyPress.bind(this);
		this.resizeBind = this.setScrollModeBySize.bind(this);
		this.scrollBind = this.checkScroll.bind(this);
	}

	addMouseWheelSupport()
	{
		base.onMouseWheel(this.mouseBind, document);
	}

	mouseWheel(delta)
	{
		/* we want to check if the user is scrolling up or down */
		if(delta >= 1)
		{
			/* scrolling up */
			this.selectPreviousOption();

		}
		else if(delta <= -1)
		{
			/* scrolling down */
			this.selectNextOption();
		}
	}

	removeMouseWheel()
	{
		base.off('mousewheel', document, this.mouseBind);
	}

	addKeyboardSupport()
	{
		base.on('keydown', document, this.keyBind);
	}

	keyPress(e)
	{
		let keyCode = e.keyCode;
		if(keyCode == '38')
		{
			/* scrolling up */
			this.selectPreviousOption();
		}
		else if(keyCode == '37')
		{
			/* scrolling up */
			this.selectPreviousOption();
		}
		else if(keyCode == '40')
		{
			/* scrolling down */
			this.selectNextOption();
		}
		else if(keyCode == '39')
		{
			/* scrolling down */
			this.selectNextOption();
		}
	}

	removeKeyPress()
	{
		base.off('keydown', document, this.keyBind);
	}

	remove()
	{
		this.reset();

		this.removeMouseWheel();
		this.removeKeyPress();
		this.removeResizeEvent();
		this.removeScroll();
	}

	addResizeEvent()
	{
		base.on('resize', window, this.resizeBind);
	}

	removeResizeEvent()
	{
		base.off('resize', window, this.resizeBind);
	}

	getScrollMode()
	{
		let size = Dom.getWindowSize();
		if(size.width <= this.mobileSize)
		{
			/* we need to check if the system needs to
			reset the desktop settings */
			if(this.scrollMode !== 'mobile')
			{
				this.setScrollMode('mobile');
			}
		}
		else
		{
			/* we need to check if the system needs to
			reset the desktop settings */
			if(this.scrollMode !== 'desktop')
			{
				this.setScrollMode('desktop');
			}
		}

		return this.scrollMode;
	}

	/* this will check to enable mobile or pc mode */
	setScrollModeBySize()
	{
		let size = Dom.getWindowSize();
		let last = this.lastSelectedOption;

		/* we want to change the settings if the window size is
		less or equal to mobile size */
		if(size.width <= this.mobileSize)
		{
			this.showAllPanels();

			/* we needto check if the system needs to
			reset the desktop settings */
			if(this.scrollMode !== 'mobile')
			{
				/* update scroll mode to mobile */
				this.setScrollMode('mobile');
				let result = this.touch.remove();

				/* we want to reselect the last selected option */
				if(last)
				{
					this.selectOption(last);
				}
				else
				{
					this.selectOptionByNumber(0);
				}
			}
		}
		else
		{
			/* we needto check if the system needs to
			reset the desktop settings */
			if(this.scrollMode !== 'desktop')
			{
				/* update scroll mode to desktop */
				this.setScrollMode('desktop');
				let result = this.touch.add();

				if(last)
				{
					this.selectOptionByNumber(last.optionNumber);
				}
				else
				{
					this.selectOptionByNumber(0);
				}
			}
		}
	}

	setScrollMode(mode)
	{
		this.scrollMode = mode;
	}

	getContainerScenePanels()
	{
		let scenePanels = [],
		className = this.sceneClassName;

		if(this.container)
		{
			let container = this.container;
			if(container.hasChildNodes())
			{
				let number = container.childNodes.length;
				for(let i = 0; i < number; i++)
				{
					let child = container.childNodes[i];
					if(child.className)
					{
						/* add any container that has our class name */
						if(child.className.indexOf(className) >= 0)
						{
							scenePanels.push(child);
						}
					}
				}
			}
		}

		return scenePanels;
	}

	setupOptions()
	{
		let tmpOptions = this.getContainerScenePanels();
		if(tmpOptions)
		{
			this.reset();

			let length = tmpOptions.length;
			if(length > 0)
			{
				let tmpNumber = 0;
				/* create the option array and setup the options */
				for(let i = 0; i < length; i++)
				{
					let panel = tmpOptions[i];
					this.addOption(panel);
				}

				/* we want to select the first option */
				this.selectOptionByNumber(0);
			}
		}
	}

	setupBreadCrumbContainer()
	{
		this.crumbContainer = Html.create('div', {
			className: 'crumb-container'
		}, this.container);
	}

	createCrumb(tmpOption)
	{
		const crumbContainer = this.crumbContainer;
		let optionClass = this.getCrumbClass(tmpOption);

		const option = Html.create('div', {
			className: optionClass,
			click: () => this.selectOption(tmpOption)
		}, crumbContainer);

		Dom.data(option, 'dataId', tmpOption.label);
		return option;
	}

	getCrumbClass(tmpOption)
	{
		return (tmpOption.selected === 'yes')? 'option selected' : 'option';
	}

	updateCrumbStyles()
	{
		let options = this.optionsArray,
		length = options.length;
		for(let i = 0; i < length; i++)
		{
			let option = options[i];
			if(option.crumb)
			{
				/* we want to get the crumb class name */
				let crumbClass = this.getCrumbClass(option);
				option.crumb.className = crumbClass;
			}
		}
	}

	setupScrollPointer()
	{
		let button = Html.create('div', {
			className: 'scroll_pointer_button',
			click: this.selectNextOption.bind(this)
		}, this.container);
		this.scrollPointer = button;

		let pointer = Html.create('div', {
			className: 'scroll_pointer'
		}, button);
	}

	/* this will select the panel */
	selectPanel(tmpOption)
	{
		/* we needto check if we are a desktop or mobile */
		if(this.scrollMode == '' || this.scrollMode === 'desktop')
		{
			this.showSelectedPanel(tmpOption);
		}
		else if(this.scrollMode === 'mobile')
		{
			this.scrollToSelectedPanel(tmpOption);
		}
	}

	/* this will get the panel animation class for the
	panel being selected and the panel being removed */
	getPanelClass(lastNum, currentNum)
	{
		let animation = {
			selecting: '',
			removing: ''
		};

		if(currentNum > lastNum)
		{
			animation.removing = 'pullUp';
			animation.selecting = 'pullDownIn';
		}
		else if(currentNum < lastNum)
		{
			animation.removing = 'pullDown';
			animation.selecting = 'pullUpIn';
		}

		return animation;
	}

	showSelectedPanel(tmpOption)
	{
		/* we needto get the panel number to get the
		selecting animation class */
		let panelNumber = Arrays.inArray(this.optionsArray, tmpOption),
		lastOption = this.lastSelectedOption,
		lastPanelNumber = (typeof lastOption !== 'undefined')? Arrays.inArray(this.optionsArray, lastOption): 0;
		let animations = this.getPanelClass(lastPanelNumber, panelNumber);

		let options = this.optionsArray,
		length = options.length;
		let panel;

		/* we need to get the selected panel and remove
		any previously selected panels */
		for(let i = 0; i < length; i++)
		{
			let panelId = options[i].panelId;
			panel = options[i].ele;

			/* we need to check if the panel is the selected panel */
			if(tmpOption.panelId === panelId)
			{
				panel.style.display = 'block';
				panel.style.zIndex = '5';

				Dom.removeClass(panel, 'animate');
				//panel.offsetWidth = panel.offsetWidth;
				Dom.addClass(panel, 'animate');

				let animationClass = animations.selecting;

				/* we only want to add the animation if we have animated
				the last panel perviously. this will make the first panel
				load in without sliding in. */
				if(lastOption && animationClass != '')
				{
					animate.show(panel,animationClass,800);
				}
			}
			else
			{
				panel.style.position = 'absolute';
				panel.style.zIndex = '2';
				panel.style.top = '0px';

				if(i == lastPanelNumber)
				{
					let animationClass = animations.removing;
					if(animationClass != '')
					{
						animate.hide(panel,animationClass,1000);
					}
				}
				else
				{
					panel.style.display = 'none';
				}
			}
		}

		this.updateCrumbStyles();
	}

	/* this will scroll to the selected option */
	scrollToSelectedPanel(tmpOption)
	{
		this.showAllPanels();

		let panel = tmpOption.ele;
		let position = Dom.getPosition(panel);

		window.scrollTo(0, position.y);

		this.updateCrumbStyles();
	}

	/* this will track scrolling */
	addScroll()
	{
		base.on('scroll', window, this.scrollBind);
	}

	removeScroll()
	{
		base.off('scroll', window, this.scrollBind);
	}

	/* this will check to change the header class as
	the page is scrolled and check to select panels
	by scroll */
	checkScroll()
	{
		let logo = document.querySelector('.main_logo_top');
		let landingHeader = document.getElementById('header_container');
		let scrollTop = Dom.getScrollTop();

		let collapseClass = 'header_collapse';

		/* we want to check if the page has been scrolled */
		if(typeof landingHeader !== 'undefined')
		{
			if(scrollTop > 0 && 'page_main_header ' + collapseClass)
			{
				landingHeader.className = 'page_main_header ' + collapseClass;
			}
			else
			{
				landingHeader.className = 'page_main_header';
			}
		}

		let options = this.optionsArray,
		length = options.length;
		/* this will select the panel as the user
		scrolls over it */
		for(let i = 0; i < length; i++)
		{
			let tmpOption = options[i],
			panelId = tmpOption.panelId,
			panel = tmpOption.ele;

			let position = Dom.getPosition(panel),
			size = Dom.getSize(panel),
			bottom = position.y + size.height;

			if(scrollTop >= position.y && scrollTop < bottom)
			{
				if(tmpOption.selected !== 'yes')
				{
					this.selectOption(tmpOption, true);
				}
			}

		}
	}

	/* this will show all scenes */
	showAllPanels()
	{
		let options = this.optionsArray,
		length = options.length;
		/* we need to get the selected panel and remove
		any previously selected panels */
		for(let i = 0; i < length; i++)
		{
			let panelId = options[i].panelId,
			panel = options[i].ele;

			panel.style.position = 'relative';
			panel.style.zIndex = '5';

			/* we dont want to select the panel if its already blocked */
			if(panel.style.display !== 'block')
			{
				panel.style.display = 'block';
			}
		}
	}

	setup()
	{
		this.setupBinds();
		this.setupBreadCrumbContainer();
		this.setupScrollPointer();
		this.getScrollMode();
		this.setupOptions();

		this.addMouseWheelSupport();
		this.addKeyboardSupport();

		this.addScroll();

		/* we need to setup the scroll mode to add the
		behaviors by the screen
		size */
		this.setScrollModeBySize();
		this.addResizeEvent();
	}

	reset()
	{
		this.optionsArray = [];
	}

	/* this adds a new option to the list panel */
	addOption(panel)
	{
		let number = this.optionsArray.length;

		let option = {
			optionNumber: number,
			nameId: this.id + '_option_number_' + number,
			panelId: panel.id,
			ele: panel,
			label: panel.getAttribute('data-id'),
			selected: 'no'
		};

		this.optionsArray.push(option);
		const crumb = this.createCrumb(option);
		option.crumb = crumb;
	}

	/* this will get the selected option */
	selectLastOption()
	{
		if(this.optionsArray)
		{
			let lastOptionNumber = (this.optionsArray.length - 1);
			this.selectOptionByNumber(lastOptionNumber);
			return true;
		}

		return false;
	}

	/* this will get the selected option */
	getSelectedOption()
	{
		let options = this.optionsArray,
		length = options.length;
		for(let j = 0; j < length; j++)
		{
			let option = options[j];
			if(option.selected === 'yes')
			{
				return option;
			}
		}

		return false;
	}

	/* the enables click events to be added in a for loop */
	createClickHandler(option)
	{
		let self = this;

		return function()
		{
			self.selectOption(option)
		};
	}

	/* this will allow the option to be selected by number */
	selectOptionByNumber(number)
	{
		let selection,
		options = this.optionsArray,
		length = options.length;

		for(let i = 0; i < length; i++)
		{
			if(i == number)
			{
				selection = options[i];
			}
		}

		if(selection)
		{
			this.selectOption(selection);
		}
	}

	selectOption(tmpOption, scrollUpdate)
	{
		let object = tmpOption.ele;
		tmpOption.selected = 'yes';

		/* we want to check to change header class */
		this.updateHeaderClass(tmpOption.optionNumber);
		this.checkToAddScrollPointer(tmpOption.optionNumber);

		Dom.addClass(object, 'active');
		this.unselectOption(tmpOption);

		/* if the page is scrolling we dont want to
		affect the scroll */
		if(!scrollUpdate)
		{
			this.selectPanel(tmpOption);
		}
		else
		{
			this.updateCrumbStyles();
		}

		this.setLastSelectedOption(tmpOption);
	}

	/* this will check to change the header class to a
	class desired by the panel number */
	updateHeaderClass(numberSelected)
	{
		let header = document.getElementById(this.header),
		className = '';

		if(header)
		{
			if(numberSelected == '0')
			{
				className = 'page_main_header';
			}
			else if(numberSelected == (this.optionsArray.length - 1))
			{
				className = 'page_main_header header_collapse header_hidden';
			}
			else
			{
				className = 'page_main_header header_collapse';
			}

			header.className = className;
		}
	}

	/* this will add the pointer on the first screen only */
	checkToAddScrollPointer(numberSelected)
	{
		let pointer = this.scrollPointer;
		pointer.style.display = (numberSelected == '0')? 'block' : 'none';
	}

	/* we can use the get and select
	next options to move in reverse
	through the list */
	getNextOption(lastOptionNumber)
	{
		if(lastOptionNumber !== null)
		{
			let nextOptionNumber = ++lastOptionNumber;
			if(nextOptionNumber < this.optionsArray.length)
			{
				return this.optionsArray[nextOptionNumber];
			}
		}
	}

	selectNextOption()
	{
		let option = this.lastSelectedOption;
		if(option)
		{
			let nextOption = this.getNextOption(option.optionNumber);
			if(nextOption)
			{
				this.selectOption(nextOption);
			}
		}
	}

	/* we can use the get and select
	previous options to move in reverse
	through the list */
	getPreviousOption(lastOptionNumber)
	{
		if(lastOptionNumber !== null)
		{
			let previousOptionNumber = --lastOptionNumber;
			if(previousOptionNumber >= 0)
			{
				return this.optionsArray[previousOptionNumber];
			}
		}
	}

	selectPreviousOption()
	{
		let option = this.lastSelectedOption;
		if(option)
		{
			let previousOption = this.getPreviousOption(option.optionNumber);
			if(previousOption)
			{
				this.selectOption(previousOption);
			}
		}
	}

	/* this will save the last selected option */
	setLastSelectedOption(option)
	{
		this.lastSelectedOption = option;
	}

	/* this will unselect all options except the last selected option */
	unselectOption(tmpOption)
	{
		let options = this.optionsArray,
		length = options.length;
		for(let j = 0; j < length; j++)
		{
			let option = options[j];
			if(option !== tmpOption)
			{
				if(option.selected === 'yes')
				{
					option.selected = 'no';

					let object = option.ele;
					Dom.removeClass(object, 'active');
				}
			}
		}
	}

	/* this will update the list for the selected desks and option */
	update()
	{

	}

	stopClickEvents(e)
	{
		if(!e)
		{
			e = window.event;
		}

		//IE9 & Other Browsers
		if(e.stopPropagation)
		{
			e.stopPropagation();
		}
		//IE8 and Lower
		else
		{
			e.cancelBubble = true;
		}
	}
}