import { MathUtil } from "../../game/math-util.js";
import { Messages } from "../../game/messages.js";

/**
 * This will get the summary message.
 *
 * @returns {void}
 */
export const getSummaryMessage = (level) =>
{
	let type;
	if (level.scorePoints > level.highScorePoints && level.scoreNumber >= level.minimum)
	{
		type = 'great';
	}
	else if (level.scoreNumber >= level.minimum)
	{
		type = 'good';
	}
	else if (level.scoreNumber >= level.minimum - 4 && level.scoreNumber <= level.minimum - 1)
	{
		type = 'close';
	}
	else if (level.scoreNumber == 0)
	{
		type = 'awful';
	}
	else if (level.scoreNumber <= MathUtil.round(level.minimum * 0.25))
	{
		type = 'bad';
	}

	if (type)
	{
		return getMessage(type);
	}
}

/**
 * This will show a message.
 *
 * @param {string} type
 * @returns {void}
 */
export const getMessage = (type) =>
{
	return Messages.getRandomMessage(type);
};