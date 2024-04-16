
export class Prompt
{
	constructor(id, container, activateCallBack, deactivateCallBack)
	{
		this.id = id;
		this.activateCallBack = activateCallBack || false;
		this.deactivateCallBack = deactivateCallBack || false;

		this.container = this.getContainer(container);
	}

	setup()
	{
		this.addHeader();
	}

	addHeader()
	{
		let container = this.container,
		self = this;

		let obj = document.createElement('div');
		obj.className = 'panel-top-button-container';

		let parent = container;
		parent.insertBefore(obj, parent.firstChild);

		let button = document.createElement('div');
		button.className = 'bttn circle close';
		button.innerHTML = '<div class="content"><span></span><span></span></div>';
		button.onclick = this.display.bind(this);

		obj.appendChild(button);
	}

	getContainer(container)
	{
		if(container && typeof container === 'object')
		{
			return container;
		}
		else
		{
			let element = document.querySelector('#' + container);
			if(element)
			{
				return element;
			}
		}
		return false;
	}

	timer = null;

	display()
	{
		let container = this.container,
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
	}

	toggleMode = null;

	toggleDisplay()
	{
		let obj = this.container,
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
	}

	removeShadow()
	{
		let panel = this.shadow;
		if(panel)
		{
			let parent = panel.parentNode;
			parent.removeChild(panel);
		}
	}

	shadow = null;

	createShadow()
	{
		let self = this,
		obj = this.shadow = document.createElement('div');

		obj.className = 'prompt-shadow';
		obj.onclick = () =>{self.display();};
		this.container.parentNode.appendChild(obj);
	}
}