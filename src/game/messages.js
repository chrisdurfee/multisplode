import { MathUtil } from './math-util.js';

/**
 * Messages
 *
 * This will show messages to the player.
 */
export const Messages =
{
	options: [],

	/**
	 * This will hold all the messages.
	 */
	messages: {
		awful: [],
		bad: [],
		good: [],
		close: [],
		great: []
	},

	/**
	 * This will reset the messages.
	 *
	 * @returns {void}
	 */
	reset()
	{
		this.options = [];
	},

	/**
	 * This will set up the messages.
	 *
	 * @returns {void}
	 */
	setup()
	{
		const messages = this.messages;
		const createMessage = (type, title, text) =>
		{
			const message = {
				title: title,
				text: text
			};
			messages[type].push(message);
		};

		createMessage(
			'awful',
			'Whaaaa?',
			'Let\'s just pretend this didn\'t happen...'
		);
		createMessage(
			'awful',
			'Umm...',
			'I\'ve stopped watching already. Let\'s try again'
		);
		createMessage(
			'awful',
			'Uhhh...',
			'Houston, we have a problem'
		);
		createMessage(
			'awful',
			'Achievement unlocked (not really)',
			'Being this bad has to be rewarded...'
		);
		createMessage(
			'awful',
			'Maybe next time...',
			'Just click retry and don\'t look back'
		);
		createMessage(
			'bad',
			'Brah',
			'It\'s like you weren\'t even looking at the screen'
		);
		createMessage(
			'bad',
			'Bad you did',
			'These are not the scores you are looking for'
		);
		createMessage(
			'bad',
			'Someone once told me',
			'Just keep trying. Just keep trying.'
		);
		createMessage(
			'bad',
			'Yikes',
			'You should try searching for the Konami Code'
		);
		createMessage(
			'bad',
			'Like a car in a hotel room...',
			'You just wonder "How did this happen?"'
		);
		createMessage(
			'close',
			'Almost',
			'So close yet so far away!'
		);
		createMessage(
			'close',
			'This level is even more difficult than...',
			'That time I tried to be Batman'
		);
		createMessage(
			'close',
			'There has got to be',
			'A skip button around here somewhere'
		);
		createMessage(
			'close',
			'You will beat it..',
			'Eggs or batter maybe... but this level not likely.'
		);
		createMessage(
			'good',
			'Done and done!',
			'You must have studied winning in college'
		);
		createMessage(
			'good',
			'Another one bites the dust',
			'Keep up the good work!'
		);
		createMessage(
			'good',
			'Impressive',
			'Your efforts are rewarded'
		);
		createMessage(
			'good',
			'Are you a torch?',
			'Because you are on fire!'
		);
		createMessage(
			'good',
			'Crank it up',
			'Someone must have turned you to "eleven"'
		);
		createMessage(
			'good',
			'Ahhh',
			'You complete me'
		);
		createMessage(
			'good',
			'You are more dedicated than...',
			'A hobbit with a gold ring!'
		);
		createMessage(
			'good',
			'Good job',
			'That\'ll do, Player. That\'ll do'
		);
		createMessage(
			'good',
			'Tears of joy',
			'You make me so proud sometimes!'
		);
		createMessage(
			'great',
			'New high score!',
			'Practice does make perfect'
		);
		createMessage(
			'great',
			'Living legend',
			'Nobody will beat that score!'
		);
		createMessage(
			'great',
			'Cat like reflexes',
			'You must be a ninja!'
		);
		createMessage(
			'great',
			'You are',
			'King of the world!'
		);
	},

	/**
	 * This will get a random message.
	 *
	 * @param {string} type
	 * @returns {object}
	 */
	getRandomMessage(type)
	{
		const messages = this.messages[type];
		if (!messages)
		{
			return;
		}

		const maxLength = messages.length;
		const number = MathUtil.round(Math.random() * (maxLength - 1));
		const message = messages[number];
		message.type = type;
		return message;
	},

	/**
	 * This will get all the messages.
	 *
	 * @returns {object}
	 */
	getAll()
	{
		return this.options;
	},

	/**
	 * This will remove all the messages.
	 *
	 * @returns {void}
	 */
	removeAll()
	{
		let options = this.options;
		let maxLength = options.length;
		if(maxLength)
		{
			for(let i = 0; i < maxLength; i++)
			{
				let option = options[i];
				this.remove(option);
			}
		}
	},

	/**
	 * This will remove a message.
	 *
	 * @param {object} option
	 * @returns {void}
	 */
	remove(option)
	{
		const options = this.options,
		index = options.indexOf(option);
		if (index > -1)
		{
			option.remove();
			options.splice(index, 1);
		}
	}
};