import { Li, Nav, Ul } from '@base-framework/atoms';
import { NavLink } from '@base-framework/base';

/**
 * This will create the navigation link.
 *
 * @param {object} props
 * @returns {object}
 */
const Link = (props) => (
	Li([
		new NavLink(
		{
			href: props.href,
			text: props.label,
			activeClass: 'selected'
		})
	])
);

/**
 * This will create the navigation.
 *
 * @param {object} props
 * @returns {object}
 */
export const Navigation = ({cache, options}) => (
[
	Nav({ class: 'nav', cache }, [
		Ul({
			map: [ options, Link ]
		})
	])
]);