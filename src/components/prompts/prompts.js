import { AddFourPrompt } from './add-four-prompt.js';
import { AddThreePrompt } from './add-three-prompt.js';
import { AddTwoPrompt } from './add-two-prompt.js';
import { GravityFieldPrompt } from './gravity-field-prompt.js';
import { PulseParticlePrompt } from './pulse-particle-prompt.js';
import { StartupPrompt } from './startup-prompt.js';

/**
 * @type {object} PromptTypes
 */
const PromptTypes = {
	StartupPrompt,
	AddTwoPrompt,
	AddThreePrompt,
	AddFourPrompt,
	PulseParticlePrompt,
	GravityFieldPrompt
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
		return new type(props);
	}
	catch (e)
	{
		console.log(e);
	}
	return null;
};

/**
 * Prompts
 *
 * @type {object} Prompts
 */
export const Prompts =
{
	/**
	 * @type {object} prompts
	 */
	prompts: {},

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
			type: 'StartupPrompt',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'AddTwoPrompt',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'AddThreePrompt',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'AddFourPrompt',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'PulseParticlePrompt',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});

		this.add({
			type: 'GravityFieldPrompt',
			activateCallback: stopActivate,
			deactivateCallback: startDeactivate
		});
	},

	/**
	 * This will get the prompt.
	 *
	 * @param {string} type
	 * @returns {object|null}
	 */
	getPrompt(type)
	{
		return this.prompts[type] || null;
	},

	/**
	 * This will show the prompt.
	 *
	 * @param {string} type
	 * @returns {void}
	 */
	showPrompt(type)
	{
		const prompt = this.getPrompt(type);
		if (prompt)
		{
			prompt.open();
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