"use strict";

const Utilities =
{
	createCallBack(obj, method, argArray, addArgs)
	{
		if (typeof method !== 'function')
		{
			return false;
		}

		return function()
		{
			argArray = argArray || [];

			if (addArgs === true)
			{
				const args = Array.prototype.slice.call(arguments);
				argArray = argArray.concat(args);
			}

			return method.apply(obj, argArray);
		};
	},

	extendObject(sourceObj, targetObj)
	{
		if(typeof sourceObj !== 'undefined' && typeof targetObj !== 'undefined')
		{
			for(let property in sourceObj)
			{
				if(sourceObj.hasOwnProperty(property) === true && typeof targetObj[property] === 'undefined')
				{
					targetObj[property] = sourceObj[property];
				}
			}

			return targetObj;
		}
		return false;
	},

	extendClass(sourceClass, targetClass)
	{
		/* if we are using a class constructor function
		we want to get the class prototype object */
		const source = (typeof sourceClass === 'function')? sourceClass.prototype : sourceClass,
		target = (typeof targetClass === 'function')? targetClass.prototype : targetClass;

		if (typeof source !== 'object' || typeof target !== 'object')
		{
			return false;
		}

		/* we want to create a new object and add the source
		prototype to the new object */
		const obj = this.createObject(source);

		/* we want to add any additional properties from the
		target class to the new object */
		for (let prop in target)
		{
			obj[prop] = target[prop];
		}

		return obj;
	},

	append(parent, child)
	{
		if (typeof parent === 'string')
		{
			parent = document.getElementById(parent);
		}

		if (parent)
		{
			parent.appendChild(child);
		}
	},

	createObject(object)
	{
		return Object.create(object);
	},

	/**
	 * This will add an animation to an object and
	 * remove it after the duration has passed.
	 * @param {object} obj
	 * @param {string} animation
	 * @param {number} [duration]
	 * @returns {void}
	 */
	addAnimation(obj, animation, duration = 0)
	{
		if (!obj)
		{
			return;
		}

		const list = obj.classList;
		list.add(animation);
		window.setTimeout(() => list.remove(animation), duration);
	}
};

(function()
{
	const Class = () =>
	{

	};

	Class.prototype =
	{
		constructor: Class
	};

	const utils = Utilities;

	Class.extend = function(child)
	{
		/* the child constructor must be set to set
		the parent static methods on the child */
		const constructor = child && child.constructor? child.constructor : false;
		if (constructor)
		{
			/* this will add the parent class to the
			child class */
			constructor.prototype = utils.extendClass(this.prototype, child);

			/* this will add the static methods from the parent to
			the child constructor. */
			utils.extendObject(this, constructor);
			return constructor;
		}
		return false;
	};

	window.Class = Class;
})();