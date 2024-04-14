"use strict";

/*
	messages

	this will create, store, track, and remove
	messages.
*/
var Messages =
{
	options: [],

	messages: {
		awful: [],
		bad: [],
		good: [],
		close: [],
		great: []
	},

	reset: function()
	{
		this.options = [];
	},

	setupMessages: function()
	{
		var messages = this.messages;
		var createMessage = function(type, title, text)
		{
			var message = {
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

	getRandomMessage: function(type)
	{
		var messages = this.messages[type];
		if(messages)
		{
			var maxLength = messages.length;
			var number = math.round(Math.random() * (maxLength - 1));
			var message = messages[number];
			if(message)
			{
				this.add(type, message.title, message.text);
			}
		}
	},

	getAll:function()
	{
		return this.options;
	},

	add: function(type, title, text)
	{
		var self = this;
		var flash = new FlashPanel(type, title, text, function()
		{
			self.remove(flash);
		});
		flash.setup();
		this.options.push(flash);
		return flash;
	},

	removeAll: function()
	{
		var options = this.options;
		var maxLength = options.length;
		if(maxLength)
		{
			for(var i = 0; i < maxLength; i++)
			{
				var option = options[i];
				this.remove(option);
			}
		}
	},

	remove: function(option)
	{
		var options = this.options,
		index = options.indexOf(option);
		if(index > -1)
		{
			option.remove();
			options.splice(index, 1);
		}
	}
};