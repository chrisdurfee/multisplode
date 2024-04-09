
export class ControlPanel
{
	constructor()
	{
		this.nav = null;
		this.touch = null;
	}

	setup(touchContainer, slideClass, navContainer, optionsArray)
	{
		this.setupTouch(touchContainer, slideClass);
		this.setupNav(navContainer, optionsArray);
	}

	setupTouch(container, slideClass)
	{
		const touch = this.touch = new TouchSlider(container, slideClass, this.selectBySlide.bind(this));
		touch.setup();
	}

	setupNav(container, optionsArray)
	{
		const nav = this.nav = new NavSlider(this.selectByNav.bind(this), container);
		nav.setup(optionsArray);
	}

	selectByNav(index)
	{
		if(this.touch)
		{
			this.touch.moveToSelectedIndex(index);
		}
	}

	selectBySlide(index)
	{
		if(this.nav)
		{
			this.nav.moveToSelectedIndex(index);
		}
	}
}