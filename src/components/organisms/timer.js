/**
 * Timer
 *
 * This class will handle the timer.
 *
 * @class
 */
export class Timer
{
	/**
	 * This will set up the duration.
	 */
	constructor(duration, callBack)
	{
		this.timer = null;
		this.duration = duration;
		this.callback = callBack;
	}

	/**
	 * This will set up the timer.
	 *
	 * @returns {void}
	 */
	setupTimer()
	{
		this.timer = window.setTimeout(() => this.callCallback(), this.duration);
	}

	/**
	 * This will start the timer.
	 *
	 * @returns {void}
	 */
	start()
	{
		this.stop();
		this.setupTimer();
	}

	/**
	 * This will stop the timer.
	 *
	 * @returns {void}
	 */
	stop()
	{
		window.clearTimeout(this.timer);
	}

	/**
	 * This will call the callback.
	 *
	 * @returns {void}
	 */
	callCallback()
	{
		if (typeof this.callback === 'function')
		{
			this.callback();
		}
	}
}