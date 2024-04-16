
import { PromptStartup } from './prompt-startup.js';
import { Prompt } from './prompt.js';

const PromptTypes = {
	Prompt,
	PromptStartup
};

export const Prompts =
{
	prompts: [],

	setup()
	{
		let stopActivate = game.stopDraw.bind(game),
		startDeactivate = game.startDraw.bind(game);

		this.add('PromptStartUp', 'startup-panel', 'startup-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'add-two-panel', 'add-two-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'add-three-panel', 'add-three-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'add-four-panel', 'add-four-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'pulse-particle-panel', 'pulse-particle-panel', stopActivate, startDeactivate);

		this.add('Prompt', 'gravity-field-panel', 'gravity-field-panel', stopActivate, startDeactivate);
	},

	getPrompt(id)
	{
		let prompts = this.prompts;
		for(let i = 0, length = prompts.length; i < length; i++)
		{
			let prompt = prompts[i];
			if(prompt.id === id)
			{
				return prompt;
			}
		}
		return false;
	},

	showPrompt(id)
	{
		let prompt = this.getPrompt(id);
		if(prompt)
		{
			prompt.display();
		}
	},

	reset()
	{
		this.prompts = [];
	},

	getAll:function()
	{
		return this.prompts;
	},

	add(promptType, id, container, activate, deactivate)
	{
		let prompt;

		try{
			const type = PromptTypes[promptType];
			prompt = new type(id, container, activate, deactivate);
			prompt.setup();
		}
		catch(e)
		{
			console.log(e);
		}

		if(prompt)
		{
			this.prompts.push(prompt);
			return prompt;
		}
		return false;
	},

	remove(prompt)
	{
		let index = this.prompts.indexOf(prompt);
		if(index > -1)
		{
			this.prompts.splice(index, 1);
		}
	}
};