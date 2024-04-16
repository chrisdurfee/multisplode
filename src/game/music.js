
export class Music
{
	constructor(audioId, songFileName)
	{
		this.eleId = audioId;
		this.element = null;
		this.song = songFileName;
	}

	getElement()
	{
		if(this.element === null)
		{
			this.element = document.getElementById(this.eleId);
		}
		return this.element;
	}

	change(fileName)
	{
		if(this.song !== fileName)
		{
			this.song = fileName;
			let music = this.getElement();
			music.src = 'sound/music/' + fileName;

			if(Settings.music === true)
			{
				this.start();
			}
		}
	}

	delay()
	{
		if(Settings.music === true)
		{
			this.start();
		}
	}

	start()
	{
		let music = this.getElement();
		music.volume = 0.6;
		music.play();
	}

	stop()
	{
		let music = this.getElement();
		music.pause();
	}
}
