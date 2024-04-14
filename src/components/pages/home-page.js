import { Article, Button, Div, H1 } from '@base-framework/atoms';
import { MainSection, Video } from '../atoms/atoms.js';
import { Page } from './page.js';

/**
 * HomePage
 *
 * This will create the home page.
 *
 * @returns {object}
 */
export const HomePage = () => (
	new Page([
		MainSection({ class: 'home-panel' }, [
			Div({ class: 'video-container' }, [
				Video({
					class: 'video',
					src: '/life/videos/life-trailer-2.mp4#t=0.26,214"></source>'
				})
			]),
			Article({ class: 'headline-panel' }, [
				H1({
					innerHTML: 'Now Playing<br><span>In Theatres</span>',
					class: 'headline'
				}),
				Button({ class: 'bttn' }, 'Watch Trailer')
			])
		])
	])
);