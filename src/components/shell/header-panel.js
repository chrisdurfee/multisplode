import { A, Div, Header, Img } from "@base-framework/atoms";
import { Jot } from "@base-framework/base";
import { Navigation } from "../organisms/navigation.js";
import { Links } from './links.js';

/**
 * This will create the logo.
 *
 * @returns {object}
 */
const Logo = () => A({ class: 'logo', href: '/'}, [
	Img({
		src: '/life/images/life-logo.svg'
	})
]);

/**
 * HeaderPanel
 *
 * This will create the header panel.
 *
 * @class
 */
export const HeaderPanel = Jot(
{
	render()
	{
		return Header({ onState: ['dark', { inner: true }]}, [
			Div({ class: 'logo-container' }, [
				Logo()
			]),
			Div({ class: 'nav-container' }, [
				Navigation({
					cache: 'nav',
					options: Links()
				})
			])
		]);
	},

	/**
	 * This will setup the states. We are setting a target id
	 * to allow the state to be accessed globally.
	 *
	 * @returns {object}
	 */
	state()
	{
		this.stateTargetId = 'header';

		return {
			dark: false
		};
	}
});