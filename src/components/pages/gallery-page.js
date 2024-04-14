import { MainSection } from "../atoms/atoms.js";
import { ScrollPage } from "./scroll-page.js";

/**
 * This will create the gallery image.
 *
 * @param {object} props
 * @returns {object}
 */
const GalleryImage = (props) => ({
	id: props.id,
	class: 'cast-container ' + props.class,
	'data-id': props.dataId || null
});

/**
 * @type {array} GalleryImages
 */
const GalleryImages = [
	{
		id: 'first',
		class: 'first',
		dataId: 'Ryan Reynolds'
	},
	{
		id: 'second',
		class: 'second'
	},
	{
		id: 'third',
		class: 'third'
	},
	{
		id: 'fourth',
		class: 'fourth'
	},
	{
		id: 'fifth',
		class: 'fifth'
	},
	{
		id: 'sixth',
		class: 'sixth'
	},
	{
		id: 'seventh',
		class: 'seventh'
	},
	{
		id: 'eighth',
		class: 'eighth'
	},
	{
		id: 'ninth',
		class: 'ninth'
	}
];

/**
 * GalleryPanel
 *
 * This will create the gallery panel.
 *
 * @returns {object}
 */
export const GalleryPage = () => (
	new ScrollPage([
		MainSection({ class: 'gallery-panel', map: [ GalleryImages, GalleryImage] })
	])
);