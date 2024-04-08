"use strict";

var Utilities = 
{ 
	/* this will bind the method to an object to return 
	the bound method. 
	@param (object) obj = the object to bind the method 
	@param (function) method = the method to bind 
	@param [(array)] argArray = the method args 
	@param [(bool)] addArgs = this will set the curried 
	args to be added to the original args 
	@return a bound method or false on error */ 
	createCallBack: function(obj, method, argArray, addArgs) 
	{ 
		if(typeof method === 'function') 
		{ 
			return function() 
			{ 
				argArray = argArray || []; 
				
				if(addArgs === true) 
				{ 
					var args = Array.prototype.slice.call(arguments); 
					argArray = argArray.concat(args); 
				} 
				
				return method.apply(obj, argArray);
			}; 
		} 
		else 
		{ 
			return false; 
		}
	}, 
	
	/* this will extend an object and return the extedned 
	object or false.  
	@param (object) sourceObj = the original object 
	@param (object) targetObj = the target object */ 
	extendObject: function(sourceObj, targetObj) 
	{ 
		if(typeof sourceObj !== 'undefined' && typeof targetObj !== 'undefined') 
		{ 
			for(var property in sourceObj) 
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
	
	/* this will extend an object by creating a clone object and 
	returning the new object with the added object or false. 
	@param (mixed) sourceClass = the original (class function 
	constructor or class prototype) unextended 
	@param (mixed) addingClass = the (class function constructor
	or class prototype) to add to the original */ 
	extendClass: function(sourceClass, targetClass) 
	{ 
		/* if we are using a class constructor function 
		we want to get the class prototype object */  
		var source = (typeof sourceClass === 'function')? sourceClass.prototype : sourceClass, 
		target = (typeof targetClass === 'function')? targetClass.prototype : targetClass;			
		
		if(typeof source === 'object' && typeof target === 'object') 
		{ 
			/* we want to create a new object and add the source 
			prototype to the new object */ 
			var obj = this.createObject(source);  
			
			/* we want to add any additional properties from the 
			target class to the new object */ 
			for(var prop in target) 
			{ 
				obj[prop] = target[prop]; 
			} 
			
			return obj; 
		} 
		return false; 
	}, 
	
	append: function(parent, child)
	{ 
		if(typeof parent === 'string')
		{ 
			parent = document.getElementById(parent); 
		}
		
		if(parent)
		{ 
			parent.appendChild(child); 
		}
	}, 
	
	/* this will return a new object and extend it if an object it supplied. 
	@param [(object)] object = the extending object 
	@return (object) this will return a new object with the 
	inherited object */ 
	createObject: function(object) 
	{ 
		return Object.create(object); 
	}, 
	
	addAnimation: function(obj, animation, duration) 
	{ 
		duration = typeof duration === 'number'? duration : 0; 
		if(obj) 
		{ 
			var list = obj.classList;
			list.add(animation); 
			window.setTimeout(function()
			{ 
				list.remove(animation); 
			}, duration); 
		} 
	}
}; 

(function()
{ 
	/* 
		Class 

		this will allow class object to be extend 
		from a single factory.  

	*/ 
	var Class = function() 
	{ 

	}; 

	Class.prototype =  
	{ 
		constructor: Class
	}; 
	
	var utils = Utilities; 

	/* this will allow the classes to be extened. 
	@param (object) child = the child object to extend 
	@return (mixed) the new child prototype or false */ 
	Class.extend = function(child)
	{  
		/* the child constructor must be set to set 
		the parent static methods on the child */ 
		var constructor = child && child.constructor? child.constructor : false; 
		if(constructor)
		{ 
			/* this will add the parent class to the 
			child class */ 
			constructor.prototype = utils.extendClass(this.prototype, child);  

			/* this will add the static methods from the parent to 
			the child constructor. */ 
			utils.extendObject(this, constructor); 
			return constructor.prototype;
		} 
		return false; 
	}; 

	window.Class = Class;
})(); 