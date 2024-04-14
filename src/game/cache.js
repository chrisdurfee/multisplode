
export const Cache =
{
	add(callBack, width, height)
	{
		const canvas = this.createCacheCanvas(width, height);
		const ctx = canvas.getContext("2d");
		if (typeof callBack === 'function')
		{
			callBack(ctx);
		}
		return canvas;
	},

	createCacheCanvas(width, height)
	{
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}
};