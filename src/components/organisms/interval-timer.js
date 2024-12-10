import { Timer } from "./timer";

/**
 * IntervalTimer
 *
 * This class will handle the timer.
 *
 * @class
 */
export class IntervalTimer extends Timer
{
	/**
	 * This will set up the timer.
	 *
	 * @returns {void}
	 */
	setupTimer()
	{
		this.timer = window.setInterval(() => this.callCallback(), this.duration);
	}

	/**
	 * This will stop the timer.
	 *
	 * @returns {void}
	 */
	stop()
	{
		window.clearInterval(this.timer);
	}
}