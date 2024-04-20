/**
 * Progress
 *
 * This will create a progress bar.
 *
 * @class
 */
export class Progress
{
	/**
	 * This will create a new progress bar.
	 *
	 * @param {object} element
	 */
	constructor(element)
	{
		this.element = element;
		this.length = 0;
		this.progress = 0;
	}

	/**
	 * This will setup the progress bar.
	 *
	 * @returns {object}
	 */
	setup()
	{
		const element = this.element;
		if (!element)
		{
			return;
		}

		const length = this.length = element.getTotalLength();
		element.style.strokeDasharray = length + ' ' + length;
		this.changeStrokeOffset(length);
		this.reset();
	}

	/**
	 * This will modify the transition of the element.
	 *
	 * @param {number} time
	 */
	modifyTransition(time)
	{
		this.element.style.transition = 'stroke-dashoffset ' + time + 'ms linear';
	}

	/**
	 * This will update the element to show the
	 * current progress by adding the current stroke.
	 *
	 * @param {number} number
	 * @param {number} total
	 */
	update(number, total)
	{
		/* this will get the progress and convert
		 it to be a decimal */
		let progress = ((number / total * 100) / 100);
		progress = (progress < 1)? progress.toFixed(2) : 1;
		if ((progress === 1 && this.progress !== progress) || progress !== this.progress)
		{
			let length = this.length;
			/* we want to the progress bar to grow clockwise
			so we want to subtract the progress percent from the length */
			let strokeOffset = length - (length * progress);
			this.changeStrokeOffset(strokeOffset);
			this.progress = progress;
		}
	}

	/**
	 * This will change the stroke offset of the element.
	 *
	 * @param {number} number
	 */
	changeStrokeOffset(number)
	{
		this.element.style.strokeDashoffset = number;
	}

	reset()
	{
		const length = this.length;
		this.progress = null;
		this.changeStrokeOffset(length);

		/* this will setup the progress to grow to the end
		andsetup the transistion to grow until the limit */
		const duration = 150;
		this.modifyTransition(duration);
		this.changeStrokeOffset(length);
	}

	stop()
	{
		/* this will remove the transition to go back
		to the start without animating */
		this.modifyTransition(0);
	}
}