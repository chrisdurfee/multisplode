
export class FlashPanel
{
	constructor(type, title, description, callback, duration, container)
	{
		/* this will setup to have mutliple instances of the
		panel in one project without issue */
		this.number = (typeof FlashPanel.number === 'undefined')? FlashPanel.number = 0 : (++FlashPanel.number);
		this.id = 'flash_panel_' + this.number;

		/* this will save the title and description */
		this.type = type || '';
		this.title = title;
		this.description = description;
		this.duration = (typeof duration === 'number')? duration : 4000;
		this.timer = null;

		this.container = container || document.getElementById('game_container');

		/* this will save the callback and args */
		this.callback = callback;
	}

	setup()
	{
		this.createPanel();
		this.startTimer();
	}

	create(type, id, className, html, parent)
	{
		let element = document.createElement(type);
		element.id = id;
		element.className = className;
		if(html)
		{
			element.innerHTML = html;
		}

		if(typeof parent !== 'object')
		{
			parent = document.getElementById(parent);
		}
		parent.appendChild(element);
		return element;
	}

	createPanel()
	{
		let self = this;
		let frag = document.createDocumentFragment();
		let panel = this.create('div', this.id, 'flash-panel dropInBounce ' + this.type, '', frag);
		let buttonContainer = this.create('footer', this.id + '_buttons', 'button-container', '', panel);

		let imageContainer = this.create('div', '', 'icon-container', '', panel);

		let titleContainer = this.create('header', this.id + '_title_container', 'title-container', '', panel);
		this.create('div', this.id + '_title', 'title left dark', this.title, titleContainer);
		this.create('div', this.id + '_text', 'description center dark', this.description, titleContainer);

		let button = this.create('button', this.id + '_button_2', 'bttn circle close', '<div class="content"><span></span><span></span></div>', buttonContainer);
		button.onclick = () =>
		{
			self.close();
		};

		Utilities.append(this.container, frag);
	}

	remove()
	{
		let panel = document.getElementById(this.id);
		if(panel)
		{
			panel.parentNode.removeChild(panel);
		}
	}

	close()
	{
		let obj = document.getElementById(this.id);
		if(obj)
		{
			let self = this;
			obj.classList.add('closed');
			window.setTimeout(function()
			{
				self.remove();
			}, 800);
		}
		this.stopTimer();
	}

	accept()
	{
		if(typeof this.callback === 'function')
		{
			this.callback.call();
		}
		this.close();
	}

	startTimer()
	{
		let self = this;
		this.stopTimer();

		this.timer = window.setTimeout(function()
		{
			self.close();
		}, this.duration);
	}

	stopTimer()
	{
		window.clearTimeout(this.timer);
	}
}