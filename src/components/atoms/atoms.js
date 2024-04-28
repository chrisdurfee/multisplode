import { A, Article, Br, Button, H1, H2, Header, P, Section, Span } from '@base-framework/atoms';
import { Atom } from '@base-framework/base';
export { A, Article, Br, Button, H1, H2, Header, P, Section, Span };

/**
 * This will create a video element.
 *
 * @param {object} props
 * @returns {object}
 */
export const Video = Atom((props) =>
{
	return {
		tag: 'video',
		class: props.class,
		html: '<source src="' + props.src + '"></source>',
		autoplay: true,
		muted: true,
		loop: true
	};
});

/**
 * This will create a main section element.
 *
 * @param {object} props
 * @param {array} children
 */
export const MainSection = Atom((props, children) =>
{
	return {
		tag: 'section',
		...props,
		class: 'main-panel ' + (props.class || ''),
		children
	};
});