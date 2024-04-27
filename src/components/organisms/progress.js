import { Div } from "@base-framework/atoms";
import { Component } from "@base-framework/base";
import { Levels } from "../../game/level/levels.js";

/**
 * Progress
 *
 * This will create a progress bar.
 *
 * @class
 */
export class Progress extends Component
{
	/**
	 * This will create a new progress bar.
	 *
	 */
	beforeSetup()
	{
		this.data = Levels.currentLevel.data;

		this.length = 0;
		this.progress = 0;
	}

	render()
	{
		return Div({ class: 'progress-bar', onSet: ['scoreNumber', (value) => this.update(value, this.data.minimum)], html: `<svg id="level-progress-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.2 83.6" width="83px" height="83px">
		<style>
		  .progress-bg{opacity:0.2;fill:#FFFFFF;stroke-width:0px;enable-background:new ;} .progress{fill:none;stroke:#FF4881;stroke-width:4;stroke-miterlimit:10;}
		</style>
		<path class="progress-bg" d="M74.7 21L62.2 8.5C50.9-2.8 32.3-2.8 21 8.5L8.5 21c-11.3 11.3-11.3 29.9 0 41.2L21 74.7C32.3 86 50.9 86 62.2 74.7l12.5-12.5C86 50.9 86 32.3 74.7 21zm-3.3 39.1L60.1 71.4c-10.2 10.2-26.9 10.2-37.1 0L11.8 60.1C1.6 49.9 1.6 33.2 11.8 23L23 11.8c10.2-10.2 26.9-10.2 37.1 0L71.4 23c10.2 10.2 10.2 26.9 0 37.1z"/>
		<path id="progress-line" class="progress" d="M60.82 72.582c-10.606 10.605-27.968 10.605-38.572 0L10.603 60.834c-10.605-10.605-10.605-27.967 0-38.57l11.644-11.645C32.852.013 50.214.013 60.817 10.62l11.75 11.643c10.604 10.605 10.604 27.967 0 38.57l-11.748 11.75"/>
	  </svg>` });
	}

	/**
	 * This will setup the progress bar.
	 *
	 * @returns {object}
	 */
	afterSetup()
	{
		const DELAY = 10;
		window.setTimeout(() =>
		{
			const element = this.element = document.getElementById('progress-line');

			const length = this.length = element.getTotalLength();
			element.style.strokeDasharray = length + ' ' + length;
			this.changeStrokeOffset(length);

			window.setTimeout(() =>
			{
				this.reset();
			}, 150);
		}, DELAY);
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
			const length = this.length;
			/* we want to the progress bar to grow clockwise
			so we want to subtract the progress percent from the length */
			const strokeOffset = length - (length * progress);
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
		if (!this.element)
		{
			return;
		}

		this.element.style.strokeDashoffset = number;
	}

	reset()
	{
		const length = this.length;
		this.changeStrokeOffset(length);

		/* this will setup the progress to grow to the end
		andsetup the transistion to grow until the limit */
		const duration = 150;
		this.modifyTransition(duration);
	}

	beforeDestroy()
	{
		/* this will remove the transition to go back
		to the start without animating */
		this.modifyTransition(0);
	}
}