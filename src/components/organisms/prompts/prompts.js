import { Builder } from '@base-framework/base';
import { PromptStartup } from './prompt-startup.js';
import { Prompt } from './prompt.js';

/**
 * @type {object} PromptTypes
 */
const PromptTypes = {
	Prompt,
	PromptStartup
};

/**
 * This will create a prompt.
 *
 * @param {object} props
 * @returns {object|null}
 */
const createPrompt = (props) =>
{
	try {
		const type = PromptTypes[props.type];
		const prompt = new type(props);
		Builder.render(prompt, document.body);
		return prompt;
	}
	catch (e)
	{
		console.log(e);
	}
	return null;
}

/**
 * Prompts
 *
 * @type {object} Prompts
 */
export const Prompts =
{
	/**
	 * @type {array} prompts
	 */
	prompts: [],

	/**
	 * This will setup the prompts.
	 *
	 * @returns {void}
	 */
	setup()
	{
		let stopActivate = game.stopDraw.bind(game),
		startDeactivate = game.startDraw.bind(game);

		this.add({
			type: 'PromptStartup',
			id: 'startup-panel',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'Prompt',
			id: 'add-two-panel',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'Prompt',
			id: 'add-three-panel',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'Prompt',
			id: 'add-four-panel',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'Prompt',
			id: 'add-five-panel',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'Prompt',
			id: 'gravity-field-panel',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});
	},

	/**
	 * This will get the prompt.
	 *
	 * @param {string} id
	 * @returns {object|null}
	 */
	getPrompt(id)
	{
		const prompts = this.prompts;
		for (let i = 0, length = prompts.length; i < length; i++)
		{
			const prompt = prompts[i];
			if (prompt.id === id)
			{
				return prompt;
			}
		}
		return null;
	},

	/**
	 * This will show the prompt.
	 *
	 * @param {string} id
	 * @returns {void}
	 */
	showPrompt(id)
	{
		const prompt = this.getPrompt(id);
		if (prompt)
		{
			prompt.display();
		}
	},

	/**
	 * This will reset the prompts.
	 *
	 * @returns {void}
	 */
	reset()
	{
		this.prompts = [];
	},

	/**
	 * This will get all the prompts.
	 *
	 * @returns {array}
	 */
	getAll()
	{
		return this.prompts;
	},

	/**
	 * This will add the prompt.
	 *
	 * @param {object} props
	 * @returns {object|boolean}
	 */
	add(props)
	{
		const prompt = createPrompt(props);
		if (prompt)
		{
			this.prompts.push(prompt);
			return prompt;
		}
		return false;
	},

	/**
	 * This will remove the prompt.
	 *
	 * @param {object} prompt
	 * @returns {void}
	 */
	remove(prompt)
	{
		const index = this.prompts.indexOf(prompt);
		if (index > -1)
		{
			this.prompts.splice(index, 1);
		}
	}
};