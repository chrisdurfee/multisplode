import { Audio } from "@base-framework/atoms";
import { Component } from "@base-framework/base";
import { Settings } from "../../game/settings.js";

/**
 * GameAudio
 *
 * This will render the game audio.
 *
 * @class
 */
export class GameAudio extends Component
{
	/**
	 * This will render the music.
	 *
	 * @returns {object}
	 */
	render()
	{
		return Audio({
			src: this.getFilePath(),
			loop: true
		});
	}

	/**
	 * This will get the file path.
	 *
	 * @returns {string}
	 */
	getFilePath()
	{
		return 'sound/music/' + this.fileName;
	}

	/**
	 * This will chnage the music.
	 *
	 * @param {string} fileName
	 * @returns {void}
	 */
	change(fileName)
	{
		if (this.fileName === fileName)
		{
			return;
		}

		this.fileName = fileName;
		this.panel.src = this.getFilePath();

		if (this.state.music === true)
		{
			this.start();
		}
	}

	/**
	 * This will check to start the music.
	 *
	 * @returns {void}
	 */
	afterSetup()
	{
		if (Settings.music === true)
		{
			this.start();
		}
	}

	/**
	 * This will setup the states.
	 *
	 * @returns {object}
	 */
	setupStates()
	{
		return {
			remotes: [
				{
					id: 'settings',
					music: {
						callBack: (state) =>
						{
							if (!this.panel)
							{
								return;
							}

							if (state === true)
							{
								this.start();
							}
							else
							{
								this.stop();
							}
						}
					},
					song: {
						callBack: (state) =>
						{
							if (!this.panel)
							{
								return;
							}

							this.change(state);
						}
					}
				}
			]
		};
	}

	/**
	 * This will start the music.
	 *
	 * @returns {void}
	 */
	start()
	{
		const music = this.panel;
		music.volume = 0.6;
		music.play();
	}

	/**
	 * This will stop the music.
	 *
	 * @returns {void}
	 */
	stop()
	{
		this.panel.pause();
	}
}
