if(multisplode === 'undefined')
{
  var multisplode = {};
}

/*
	thread

	this will check to setup multi threading
	web workers.
*/
multisplode.thread =
{
	workers: null,
	cpuCount: 1,

	setup: function()
	{
		this.supported = this.checkSupport();
		if(this.supported)
		{
			this.getCpuCount();
		}
	},

	getCpuCount: function()
	{
		var nav = window.navigator;
		if(nav && nav.hardwareConcurrency)
		{
			this.cpuCount = nav.hardwareConcurrency;
		}
	},

	supported: false,
	/* this will check if workers are supported.
	@returns (bool) true or false */
	checkSupport: function()
	{
		if(typeof(Worker) !== "undefined")
		{
			return true;
		}
		return false;
	},

	createWorker: function(src, callBack)
	{
		var worker = new Worker(src);
		if(worker)
		{
			worker.addEventListener('message', callBack);
			this.add(worker);
		}
		return worker;
	},

	reset: function()
	{
		this.workers = [];
	},

	add: function(worker)
	{
		this.workers[this.workers.length] = worker;
	},

	remove: function(worker)
	{
		var index = this.workers.indexOf(worker);
		if(index > -1)
		{
			worker.terminate();
			this.workers.splice(index, 1);
		}
	}
};