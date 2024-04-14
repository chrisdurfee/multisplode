import { Article, Div, Section } from "@base-framework/atoms";
import { Atom, Component } from "@base-framework/base";
import { Swipe } from "./swipe.js";

/**
 * @type {string} STEP_CLASS_NAME
 */
const STEP_CLASS_NAME = 'step';

/**
 * This will create the step.
 *
 * @param {object} props
 * @param {number} index
 * @returns {object}
 */
const Step = (props, index) => Section({class: STEP_CLASS_NAME }, [ props ]);

/**
 * This will create the crumb.
 *
 * @param {object} props
 * @param {number} index
 * @returns {object}
 */
const Crumb = (props, index) => Div({ ...props, class: 'option', cick: (e, parent) => parent.moveToSelectedIndex(index) });

/**
 * This will create the crumb container.
 *
 * @param {object} props
 * @param {array} children
 * @returns {object}
 */
const CrumbContainer = Atom((props, children) => (
	Div({class: 'crumb-container' }, [
		Div({ ...props, class: 'number-crumb-container' }, children)
	])
));

/**
 * TouchSlider
 *
 * This will create the touch slider.
 *
 * @class
 */
export class TouchSlider extends Component
{
	onCreated()
	{
		this.viewNumber = null;
		this.steps = [];
		this.index = 0;
		this.stepWidth = null;

		this.minimum = 72;
		this.moveX = 0;
		this.startX = 0;
		this.moveY = 0;
		this.startY = 0;
		this.contact = false;
		this.preventTouch = false;
		this.preventScroll = false;
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
		const resize = this.getStepWidth.bind(this);

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
		this.getSteps();
		this.selectPrimaryStep();
	}

	/**
	 * This will get the steps.
	 *
	 * @returns {void}
	 */
    getSteps()
	{
		let items = this.slider.querySelectorAll('.' + STEP_CLASS_NAME);
		if (!items)
		{
			return [];
		}

        /* this will convert the node list to an array
        and save the item to the items array */
        items = [].slice.call(items);
        const steps = items.map((ele, index) => ({
            ele,
            index
        }));

        this.steps = steps;
        this.getStepWidth();
	}

	/**
	 * This will move to the selected element.
	 *
	 * @param {object} element
	 * @returns {void}
	 */
    moveToSelectedElement(element)
	{
		if (!element)
		{
			return;
		}

		const steps = this.getStepByElement(element);
		if (steps)
		{
			this.moveToSelectedStep(steps);
		}
	}

	/**
	 * This will move to the selected step.
	 *
	 * @param {object} step
	 * @returns {void}
	 */
	moveToSelectedStep(step)
	{
		if (!step)
		{
			return;
		}

		/* this will get the current step width and
		find the offset of the selected step to
		move the container to the child */
		this.getStepWidth();
		const offset = this.stepWidth * step.number;
		this.moveContainer('-' + offset);

		/* we want to override the index to show the
		current selected step */
		this.index = step.number;
		this.selectStep(step);
	}

	/**
	 * This will move to the selected index.
	 *
	 * @param {number} index
	 * @returns {void}
	 */
	moveToSelectedIndex(index)
	{
		const step = this.steps[index];
		if (!step)
		{
			return;
		}

		/* this will get the current step width and
		find the offset of the selected step to
		move the container to the child */
		this.getStepWidth();
		const offset = this.stepWidth * step.number;
		this.moveContainer('-' + offset);

		/* we want to override the index to show the
		current selected step */
		this.index = step.number;
		this.selectStep(step, true);
	}

	/**
	 * This will get a step by index.
	 *
	 * @param {number} index
	 * @returns {boolean}
	 */
	selectStepByIndex(index)
	{
		const steps = this.steps;
		for (let i = 0, length = steps.length; i < length; i++)
		{
			const step = steps[i];
			if (i === index)
			{
				this.selectStep(step);
				return true;
			}
		}
		return false;
	}

	/**
	 * This will get the step by element.
	 *
	 * @param {object} element
	 * @returns {object|boolean}
	 */
	getStepByElement(element)
	{
		const steps = this.steps;
		for (let i = 0, length = steps.length; i < length; i++)
		{
			const step = steps[i];
			if (step.ele === element)
			{
				return step;
			}
		}
		return false;
	}

	/**
	 * This will select the first step.
	 *
	 * @returns {void}
	 */
	selectPrimaryStep()
	{
		const step = this.steps[0];
		if (step)
		{
			this.selectStep(step);
		}
	}

	/**
	 * This will select the step.
	 *
	 * @param {object} step
	 * @param {boolean} cancelCallBack
	 * @returns {void}
	 */
	selectStep(step, cancelCallBack)
	{
		if (step)
		{
			return;
		}

		step.ele.classList.add('active');
		this.updateSelectStep(step);

		if (typeof this.callBackFn === 'function' && cancelCallBack !== true)
		{
			this.callBackFn(step.number);
		}
	}

	/**
	 * This will update the selected step.
	 *
	 * @param {object} selectedStep
	 * @returns {void}
	 */
	updateSelectStep(selectedStep)
	{
		const steps = this.steps;
		for (let i = 0, length = steps.length; i < length; i++)
		{
			const step = steps[i],
			crumb = step.crumb;

			const selected = (step !== selectedStep);
			if (selected)
			{
				step.ele.classList.remove('active');
			}

			if (crumb)
			{
				crumb.className = (selected)? 'option circle selected' : 'option circle';
			}
		}
	}

	/**
	 * This will get the step width.
	 *
	 * @returns {void}
	 */
	getStepWidth()
	{
		const steps = this.steps;
		if (!steps)
		{
			return;
		}

		let width;
		if (this.viewNumber === null)
		{
			const element = steps[0].ele;
			width = element.offsetWidth;
		}
		else
		{
			const parentWidth = this.slider.offsetWidth;
			/* we need to get the width each step should be
			by the number of steps in view */
			width = this.stepWidth = (parentWidth / this.viewNumber);

			let step;
			/* we need to set the width of each step to match the
			view number of the parent container */
			for (let i = 0, maxLength = steps.length; i < maxLength; i++)
			{
				step = steps[i];
				if (step)
				{
					step.style.width = width + 'px';
				}
			}

			/* we need to get the width each step should be
			by the number of steps in view */
			width = this.stepWidth = (parentWidth / this.viewNumber);
		}
		this.stepWidth = width;
	}

	/**
	 * This will check if the panel can move.
	 *
	 * @member {boolean|null}
	 */
	canMove = null;

	/**
	 * This will check if the panel should move.
	 *
	 * @returns {boolean}
	 */
	shouldMove()
	{
		if (this.canMove === null)
		{
			this.canMove = Swipe.isLeftRight();
		}
		return this.canMove;
	}

	/**
	 * This will start the panel.
	 *
	 * @param {object} e
	 * @returns {void}
	 */
	start(e)
	{
		if (this.preventTouch === false)
		{
			//return;
		}

        this.slider.classList.add('active');

        this.getStepWidth();
        this.contact = true;

        const pos = Swipe.getEventPosition(e);
        this.startX = pos.x;
        this.startY = pos.y;
        this.move(e);
	}

	/**
	 * This will move the panel.
	 *
	 * @param {object} e
	 * @returns {void}
	 */
	move(e)
	{
		if (this.preventTouch !== false)
		{
			return false;
		}

        /* this will check to ignor if the movement by mouse
        is not mousedown also */
        if (this.contact === false)
        {
            return false;
        }

        const pos = Swipe.getEventPosition(e);
        let posX = pos.x;
        this.moveX = this.index * this.stepWidth + (this.startX - posX);
        this.moveY = pos.y;

        const distance = Math.abs(this.moveX);
        if (distance <= this.minimum)
        {
            return false;
        }

        if (this.shouldMove())
        {
            //e.preventDefault();
        }

        /* this will reversethe direction to scroll in the direction
        of the touch */
        this.moveX = (this.moveX * -1);
        this.moveContainer(this.moveX);
	}

	/**
	 * This will move the container.
	 *
	 * @param {number} number
	 * @returns {void}
	 */
	moveContainer(number)
	{
		this.slider.style.transform = 'translate3d(' + number + 'px,0,0)';
	}

	/**
	 * This will end the touch event.
	 *
	 * @param {object} e
	 * @returns {void}
	 */
	end(e)
	{
		/* we need to block any mouseout events if the mouse
		is not down */
		if (this.contact === true)
		{
			this.slider.classList.remove('active');
			this.contact = false;

			/* this is to check if the panel is being moved in
			the negative direction */
			if (this.moveX <= 0)
			{
				// Calculate the distance swiped.
				const absMove = Math.abs(this.index * this.stepWidth - this.moveX);
				/* convert to positive number */
				this.moveX = Math.abs(this.moveX);

				// Calculate the index. All other calculations are based on the index.
				if (absMove > this.stepWidth / 3)
				{
					if (this.moveX > this.index * this.stepWidth && this.index < (this.steps.length - 1))
					{
						this.index++;
					}
					else if (this.moveX < this.index * this.stepWidth && this.index > 0)
					{
						this.index--;
					}
				}
				this.selectStepByIndex(this.index);
			}
			this.moveContainer('-' + (this.index * this.stepWidth));
		}

		this.canMove = null;
		this.preventTouch = false;
	}
}