import { Prompt } from './prompt.js';

export class PromptStartUp extends Prompt
{
	constructor(id, container, activateCallBack, deactivateCallBack)
    {
        super(id, container, activateCallBack, deactivateCallBack);
        this.id = id;
        this.activateCallBack = activateCallBack || false;
        this.deactivateCallBack = deactivateCallBack || false;

        this.container = this.getContainer(container);
    }

	setup()
	{
        this.addHeader();
        this.setupTouch();
	}

	setupTouch()
	{
		let touch = PromptStartUp.touch = new TouchSlider('#startup-step-panel', '.step');
		touch.setup();
	}

	toggleDisplay()
	{
		let obj = this.container,
		display = obj.style.display;

		if(display === '' || display === 'none')
		{
			PromptStartUp.touch.reset();

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
}