"use strict";

var AdService = function(iosId, iosIntl, andId, andIntl) 
{ 
	var publisherIds = 
	{ 
		ios:  
		{
			banner: iosId, 
			interstitial: iosIntl 
		}, 
		android: 
		{ 
			banner: andId, 
			interstitial: andIntl
		}
	}; 
	
	this.publisher = (/(android)/i.test(navigator.userAgent)) ? publisherIds.android : publisherIds.ios;
	this.adMob = null; 
}; 

Class.extend( 
{ 
	constructor: AdService, 
	
	setup: function() 
	{ 
		if(this.isSupported()) 
		{ 
			var publisher = this.publisher; 
			window.plugins.AdMob.setOptions({
				publisherId: publisher.banner,
				interstitialAdId: publisher.interstitial, 
				adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,  //use SMART_BANNER, BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
				bannerAtTop: false, // set to true, to put banner at top
				overlap: true, // set to true, to allow banner overlap webview
				offsetTopBar: false, // set to true to avoid ios7 status bar overlap                    
				autoShow: false, // autoshow intertitial Ad
				isTesting: false // receiving test ad
			}); 
			
			this.setupEvents(); 
			
			this.adMob = window.plugins.AdMob;  
			this.queueIntersitial();  
		} 
	}, 
	
	setupEvents: function() 
	{ 
		var self = this; 
		document.addEventListener('onReceiveAd', function(){});
        document.addEventListener('onFailedToReceiveAd', function(data){});
        document.addEventListener('onPresentAd', function(){});
        document.addEventListener('onDismissAd', function(){ });
        document.addEventListener('onLeaveToAd', function(){ });
        document.addEventListener('onReceiveInterstitialAd', function(){ });
        document.addEventListener('onPresentInterstitialAd', function(){ });
        document.addEventListener('onDismissInterstitialAd', function(){
            //get the next one ready only after the current one is closed
			self.queueIntersitial();
        });
	}, 
	
	isSupported: function() 
	{ 
		return (window.plugins && window.plugins.AdMob); 
	}, 
	
	showBanner: function() 
	{ 
		if(this.adMob) 
		{ 
			this.adMob.createBannerView();
		}
	}, 
	
	queueIntersitial: function() 
	{ 
		this.adMob.createInterstitialView();
		this.adMob.requestInterstitialAd();
	},
	
	showInterstitial: function() 
	{ 
		if(this.adMob) 
		{  
			this.adMob.showInterstitialAd(); 
		}
	}
}); 

/* this will setup a defaul object that will 
hold functions incase we can setup by cordova */ 
var ads = 
{ 
	showBanner: function()
	{
		
	}, 
	
	showInterstitial: function() 
	{ 
		
	}
}; 

var setupAdService = function() 
{ 
	var adMob = new AdService(
		'ca-app-pub-4701654588985905/1790249516', 
		'ca-app-pub-4701654588985905/7976383913', 
		'ca-app-pub-4701654588985905/3266982717', 
		'ca-app-pub-4701654588985905/3546184312'
	); 
	
	if(adMob.isSupported())
	{ 
		adMob.setup();
		ads = adMob;
	} 
}; 

document.addEventListener("deviceready", setupAdService, false);