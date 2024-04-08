"use strict";

var UI =
{
	title: 'Multisplode',

	setup: function()
	{
		this.setupTitle();
	},

	setupTitle: function()
	{
		document.title = this.title;
	},

	setupProgress: function()
	{
		var doc = document;
		var svgContainer = doc.getElementById("level-progress-image");
		var getElement = function()
		{
			return doc.getElementById('progress-line');
			/*var svgDoc = svgContainer.contentDocument;
			return svgDoc.getElementById('progress-line');*/
		};

		var parent = this;

		this.progress =
		{
			/* this will store the progress svg and the
			length of the path */
			element: null,
			length: 0,

			progress: 0,

			/* this will setup the progress svg element and set
			the transition style on the elmement */
			setup: function()
			{
				var element = this.element = getElement();
				if(element)
				{
					var length = this.length = element.getTotalLength();
					element.style.strokeDasharray = length + ' ' + length;
					this.changeStrokeOffset(length);
				}
				this.reset();
			},

			modifyTransition: function(time)
			{
				var element = this.element,
				style = element.style;
				style.transition =
					style.WebkitTransition = 'stroke-dashoffset ' + time + 'ms linear';
			},

			/* this will update the element to show the
			current progress by adding the current stroke
			offset length as the progress. */
			update: function(number, total)
			{
				/* this will get the progress and convert
				 it to be a decimal */
				var progress = ((number / total * 100) / 100);
				progress = (progress < 1)? progress.toFixed(2) : 1;
				if((progress === 1 && this.progress !== progress) || progress !== this.progress)
				{
					var length = this.length;
					/* we want to the progress bar to grow clockwise
					so we want to subtract the progress percent from the length */
					var strokeOffset = length - (length * progress);
					this.changeStrokeOffset(strokeOffset);
					this.progress = progress;
				}
			},

			changeStrokeOffset: function(number)
			{
				this.element.style.strokeDashoffset = number;
			},

			/* this will reset the progress svg */
			reset: function()
			{
				var length = this.length;
				this.progress = null;
				this.changeStrokeOffset(length);

				/* this will setup the progress to grow to the end
				andsetup the transistion to grow until the limit */
				this.modifyTransition(150);
				this.changeStrokeOffset(length);
			},

			stop: function()
			{
				/* this will remove the transition to go back
				to the start without animating */
				this.modifyTransition(0);
			}
		};

		/* we want to delay the setup to load the svg */
		var callBack = this.progress.setup;
		svgContainer.onload = callBack;

		this.progress.setup();
	},

	setupTouches: function()
	{
		this.touches =
		{
			options: [],
			current: 0,

			container: null,

			setup: function()
			{
				this.container = document.getElementById('levelTouches');
			},

			add: function(type, container)
			{
				type = type || 'Shockwave';
				var element = document.createElement('div');
				element.className = 'touch-icon circle ' + type.toLowerCase();

				var options = this.options;
				options[options.length] = {
					element: element,
					type: type,
					selected: false
				};
				container.insertBefore(element, container.firstChild);
			},

			setupTouches: function(level)
			{
				this.reset();
				this.current = level.touchLimit - 1;

				/* we want to add all the new elements to a
				document fragment then add the fragment to
				the container */
				var frag = document.createDocumentFragment();

				var devices = level.devices;
				for(var prop in devices)
				{
					var count = devices[prop];
					for(var i = 0; i < count; i++)
					{
						this.add(prop, frag);
					}
				}

				this.container.appendChild(frag);
			},

			select: function()
			{
				var selected = false;
				if(this.current >= 0)
				{
					var options = this.options,
					length = options.length;

					var option = options[this.current];
					if(option.selected === false)
					{
						selected = option;
						option.selected = true;
						option.element.classList.add('inactive');
						this.current--;
					}
				}
				return selected;
			},

			reset: function()
			{
				this.container.innerHTML = '';
				this.options = [];
				this.current = 0;
			}
		};

		this.touches.setup();
	},

	resetLevelUi: function(level)
	{
		Messages.removeAll();

		this.updatePlayContainerClass(level);

		/* this will setup  the control panel ui
		to show the level settings */
		this.updateLevelNumber(level.number);
		this.updateLevelMin(level.minimum);

		this.progress.reset();
		this.touches.setupTouches(level);
	},

	levelNumberElement: null,

	updateLevelNumber: function(number)
	{
		var levelNumber = this.levelNumberElement;
		/* this will setup  the control panel ui
		to show the level settings */
		if(levelNumber !== null)
		{
			levelNumber.textContent = number;
		}
		else
		{
			this.levelNumberElement = document.getElementById('levelNumber');
			this.updateLevelNumber(number);
		}
	},

	playContainerElement: null,

	updatePlayContainerClass: function(level)
	{
		var defaultClass = 'play-container';
		if(this.playContainerElement === null)
		{
			this.playContainerElement = document.getElementById('play-container');
		}
		this.playContainerElement.className = defaultClass + ' ' + level.levelClass;
	},

	levelMinElement: document.getElementById('levelMinimum'),

	updateLevelMin: function(number)
	{
		this.levelMinElement.textContent = number;
	},

	/* this will update the control panel ui with the
	current data. */
	updatePlayUi: function(level)
	{
		this.progress.update(level.scoreNumber, level.minimum);
	},

	updateTouchUi: function()
	{
		return this.touches.select();
	},

	updateSummary: function(level)
	{
		//summary information
		var doc = document;
		doc.getElementById('summaryLevelNumber').textContent = level.number;
		doc.getElementById('summaryLevelParticles').textContent = level.quantity;
		doc.getElementById('summaryLevelMinium').textContent = level.minimum;
		doc.getElementById('summaryLevelDestroyed').textContent = level.scoreNumber;
		doc.getElementById('summaryLevelPoints').textContent = level.scorePoints;
		doc.getElementById('summaryHighScorePoints').textContent = level.highScorePoints;

		//enable or diable previous
		var previousButton = doc.getElementById('previous_level');
		if(level.number > 1)
		{
			previousButton.classList.remove('hidden');
		}
		else
		{
			previousButton.classList.add('hidden');
		}

		var levels = Levels;
		var levelStatus = doc.getElementById('summaryLevelStatus');
		var destroyedSummary = doc.getElementById('destroyedSummary');
		var destroyedClassList = destroyedSummary.classList;
		if(level.scoreNumber >= level.minimum)
		{
			levelStatus.textContent = 'Congrats, You Passed';
			destroyedClassList.add('pass');
			destroyedClassList.remove('fail');

			/* we want to unlock the next level */
			levels.unlockNextLevel();
		}
		else
		{
			levelStatus.textContent = 'Sorry, Try Again';
			destroyedClassList.remove('pass');
			destroyedClassList.add('fail');
		}

		//enable or disable next
		var buttonNext = doc.getElementById('next_level');
		if(buttonNext)
		{
			var buttonNextClassList = buttonNext.classList;
			if(level.number < levels.activeLevels.length)
			{
				if(levels.isNextLevelLocked() === false)
				{
					buttonNextClassList.remove('hidden');
				}
				else
				{
					try{
						buttonNextClassList.add('hidden');
					}
					catch(e)
					{

					}
				}
			}
			else
			{
				buttonNextClassList.add('hidden');
			}
		}
	}
};

UI.setup();