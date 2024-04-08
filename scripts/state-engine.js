"use strict";

var mainContainer; 
var blurMain = function(mode)
{ 
	var mainContainer = mainContainer || document.getElementById('main_container');
	if(mode === true)
	{ 
		mainContainer.classList.add('blur'); 
	} 
	else 
	{ 
		mainContainer.classList.remove('blur');
	}
}; 

var StateEngine = 
{ 
	state: null,  
	states: [], 
	
	setup: function() 
	{ 
		this.add(new HomeState());
		this.add(new LevelSelectState());
		this.add(new SettingsState());
		this.add(new PlayState());
		this.add(new PauseState());
		this.add(new LevelSummaryState());
	}, 
	
	get: function(id) 
	{ 
		var states = this.states; 
		for(var i = 0, length = states.length; i < length; i++) 
		{ 
			var state = states[i]; 
			if(state.id === id) 
			{ 
				return state; 
			} 
		} 
		return false; 
	}, 
	
	change: function(state) 
	{ 
		var self = this; 
		this.update(state); 
		
		var getActive = function(state) 
		{ 
			var active = []; 
			/* we want to activate any includes before activating 
			the state */ 
			var includes = state.includes; 
			if(includes.length > 0) 
			{ 
				for(var i = 0, maxLength = includes.length; i < maxLength; i++) 
				{ 
					var include = self.get(includes[i]); 
					if(include !== false) 
					{ 
						active = active.concat(getActive(include)); 
					} 
				} 
			} 
			active.push(state);
			
			return active; 
		}; 
		
		var states = this.states;
		var activate = function(active) 
		{ 
			var i, length, state; 
			var stateLength = states.length; 
			length = stateLength; 
			for(i = 0; i < length; i++) 
			{ 
				state = states[i]; 
				if(active.indexOf(state) === -1) 
				{ 
					if(state.selected === true) 
					{ 
						state.deactivate();
					}
					state.selected = false; 
				}
			} 
			
			length = stateLength; 
			for(i = 0; i < length; i++) 
			{ 
				state = states[i]; 
				if(active.indexOf(state) >= 0) 
				{ 
					state.selected = true; 
					state.activate(); 
				}
			}
		}; 
		
		var active = []; 
		for(var i = 0, length = states.length; i < length; i++) 
		{ 
			var option = states[i]; 
			if(option.id === state) 
			{ 
				active = getActive(option); 
				break;   
			} 
		}
		if(active && active.length && active[0] != '')
		{ 
			activate(active);
		}
	}, 
	
	update: function(state) 
	{ 
		this.state = state; 
	}, 
	
	reset: function() 
	{ 
		this.states = []; 
	}, 
	
	getAll:function() 
	{ 
		return this.states; 
	},
	
	add: function(state) 
	{ 
		if(state && typeof state === 'object') 
		{ 
			state.selected = false; 
			this.states.push(state); 
		}
	}, 
	
	remove: function(state)
	{ 
		var index = this.states.indexOf(state); 
		if(index > -1) 
		{ 
			this.states.splice(index, 1); 
		}
	}
}; 

var State = function() 
{ 
	this.id = 'state'; 
	this.label = 'label'; 
	this.panel = ''; 
	
	this.includes = []; 
}; 

Class.extend( 
{ 
	constructor: State, 
	
	getPanel: function() 
	{ 
		if(this.panelEle) 
		{ 
			return this.panelEle; 
		}
		else 
		{ 
			var panel = this.panelEle = document.getElementById(this.panel);
			return panel? panel : false; 
		}
	}, 
	
	display: function(mode) 
	{ 
		var panel = this.getPanel(); 
		if(panel) 
		{ 
			var type = (this.type)? this.type : 'block'; 
			panel.style.display = (mode === 'block')? type : 'none';  
		} 
	}, 				 
	
	activate: function() 
	{ 
		this.display('block'); 
	}, 
	
	deactivate: function() 
	{ 
		this.display();
	} 
}); 

var HomeState = function() 
{ 
	this.id = 'menu'; 
	this.label = 'Menu'; 
	this.panel = 'home_panel'; 
	
	this.includes = []; 
	this.setup(); 
}; 

State.extend( 
{ 
	constructor: HomeState, 
	
	setup: function()
	{ 
		var panel = this.getPanel(); 
		var home = document.getElementById('main-home-menu');
		window.setTimeout(function()
		{ 
			panel.classList.remove('loading');
		}, 500); 
		
		window.setTimeout(function()
		{ 
			home.classList.remove('loading');
		}, 1000);
	}, 
	
	panelClass: function(mode)
	{ 
		var panel = this.getPanel();
		switch(mode) 
		{
			case 'add': 
				panel.classList.add('active'); 
				break; 
			case 'remove': 
				panel.classList.remove('active'); 
				break; 
		}
	}, 
	
	activate: function() 
	{ 
		game.stopStage(); 
		game.music.change('play-loop.mp3'); 
		
		this.display('block');
		this.panelClass('add'); 
	}, 
	
	deactivate: function() 
	{ 
		blurMain();
		this.display('none');
		this.panelClass('remove');
	} 
}); 

var LevelSelectState = function() 
{ 
	this.id = 'level-select'; 
	this.label = 'Level Select'; 
	this.panel = 'level_panel';
	this.timerLevel = null;  
	
	this.includes = ['menu']; 
	
	this.control = null; 
	this.setup(); 
}; 

State.extend(
{ 
	constructor: LevelSelectState, 
	
	setup: function() 
	{ 
		var control = this.control = new ControlPanel(); 
		control.setup('#level-select-step-panel', '.step', '#level-select-nav-container', ['Level Select']); 
		
		this.homeEle = document.getElementById('home_panel'); 
	}, 
	
	panelClass: function(mode)
	{ 
		var panel = this.getPanel(); 
		var classList = panel.classList; 
		switch(mode) 
		{
			case 'open': 
				classList.add('open'); 
				classList.remove('close'); 
				break; 
			case 'closed': 
				classList.add('close'); 
				classList.remove('open'); 
				break; 
		}
	}, 
	
	resetControllPanel: function()
	{ 
		var control = this.control; 
		control.touch.reset(); 
		control.nav.resize();
	}, 
	
	activate: function() 
	{ 
		var panel = this.getPanel(); 
		var homePanel = this.homeEle; 
		var mode = panel.style.display; 
		if(mode !== 'block') 
		{ 
			homePanel.classList.remove('active'); 
			
			blurMain(true);
			
			this.display('block');
			this.panelClass('open'); 
			
			this.resetControllPanel(); 
			
			/* this will reset and setup the level options 
			in the level select panel */ 
			game.setupLevelSelect();
		} 
		else
		{  
			blurMain(); 
			
			homePanel.classList.add('active');
			this.panelClass('closed');
			
			this.closeByTimer();  
		}
		
		game.stopStage();
		
	}, 
	
	closeByTimer: function()
	{ 
		var self = this; 
		/* this will set a timer to display none 
		the parent after the close animation */ 
		window.clearTimeout(this.timerLevel); 
		this.timerLevel = window.setTimeout(function() 
		{ 
			self.display(); 
		}, 500);
	}, 
	
	deactivate: function() 
	{ 
		blurMain();
		this.display(); 
	} 
}); 

var SettingsState = function() 
{ 
	this.id = 'settings'; 
	this.label = 'Settings'; 
	this.panel = 'settings_panel';
	this.timerLevel = null;  
	this.touch = null; 
	this.includes = ['menu']; 
	
	this.control = null; 
	
	this.setup(); 
}; 

LevelSelectState.extend(
{ 
	constructor: SettingsState, 
	
	setup: function() 
	{ 
		var control = this.control = new ControlPanel(); 
		control.setup('#settings-step-panel', '.step', '#settings-nav-container', ['audio', 'video', 'about']);
		
		Settings.setup(); 
		
		this.homeEle = document.getElementById('home_panel');
	},
	
	selectByNav: function(index) 
	{ 
		if(this.touch) 
		{ 
			this.touch.moveToSelectedIndex(index); 
		}
	}, 
	
	selectBySlide: function(index) 
	{ 
		if(this.nav) 
		{ 
			this.nav.moveToSelectedIndex(index); 
		}
	},
	
	activate: function() 
	{ 
		var panel = this.getPanel(); 
		var homePanel = this.homeEle; 
		var mode = panel.style.display; 
		if(mode !== 'block') 
		{ 
			homePanel.classList.remove('active');
			
			blurMain(true);
			
			this.display('block');
			this.panelClass('open');;
			
			this.resetControllPanel(); 
			
			/* this will reset and setup the level options 
			in the level select panel */ 
			game.setupLevelSelect();
		} 
		else
		{  
			blurMain(); 
			
			homePanel.classList.add('active');
			this.panelClass('closed'); 
			
			this.closeByTimer();  
		}
		
		game.stopStage();
	}, 
	
	deactivate: function() 
	{ 
		blurMain(); 
		this.display(); 
	} 
});

var PlayState = function() 
{ 
	this.id = 'play'; 
	this.label = 'Play'; 
	this.panel = 'play-container'; 
	this.type = 'flex'; 
	
	this.includes = []; 
	this.setup(); 
}; 

State.extend( 
{ 
	constructor: PlayState,
	
	setup: function()
	{ 
		var panel = this.getPanel(); 
		panel.classList.remove('loading');
		
		this.display();
	}, 
	
	activate: function() 
	{ 
		game.startStage(); 		
		game.music.change('play-loop.mp3');
		
		this.display('block');
	}, 
	
	deactivate: function() 
	{ 
		this.display();
	} 
});

var PauseState = function() 
{ 
	this.id = 'pause'; 
	this.label = 'Pause'; 
	this.panel = 'pause_panel'; 
	this.type = 'flex';
	
	this.includes = ['play']; 
}; 

State.extend( 
{ 
	constructor: PauseState, 
	
	activate: function() 
	{ 
		game.stopStage(); 
		blurMain(true); 
		
		this.display('block');
	}, 
	
	deactivate: function() 
	{ 
		blurMain(); 
		this.display();
	} 
}); 

var LevelSummaryState = function() 
{ 
	this.id = 'level-summary'; 
	this.label = 'Level summary'; 
	this.panel = 'levelSummary'; 
	
	this.ads = true; 
	this.instAdCount = 0; 
	
	this.includes = []; 
	this.setup(); 
	/*if(this.ads === true) 
	{ 
		this.setupBannerAd();
	}*/
}; 

State.extend( 
{ 
	constructor: LevelSummaryState,
	
	setup: function()
	{
		this.playContainerEle = document.getElementById('play-container'); 
	}, 
	
	activate: function() 
	{ 
		blurMain(true);
		this.playContainerEle.style.display = 'flex'; 
		
		game.stopStage();  
		game.music.change('summary-slow-loop.mp3');
		
		if(this.ads === true) 
		{ 
			this.setupInstAd(); 
		}  
		
		this.display('block');
	}, 
	
	setupInstAd: function() 
	{ 
		var count = this.instAdCount++; 
		if(count >= 2) 
		{ 
			ads.showInterstitial(); 
			this.instAdCount = 0; 
		}
	}, 
	
	setupBannerAd: function() 
	{ 
		/*var container = document.getElementById('summary-ad-banner-container'); 
		if(container) 
		{ 
			container.innerHTML = ''; 
			container.innerHTML = '<script src="http://ad.leadbolt.net/show_app_ad.js?section_id=186191761"></script>';
		}*/
	}, 
	
	deactivate: function() 
	{ 
		blurMain(); 
		this.playContainerEle.style.display = 'none';
		/*if(this.ads === true) 
		{ 
			this.setupBannerAd();
		}*/
		this.display();
	} 
});