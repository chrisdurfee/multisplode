// "use strict";

// var AdService = Class.extend(
// {
// 	constructor: function(iosId, iosBannerId, iosIntl, andId, andBannerId, andIntl)
// 	{
// 		this.settings =
// 		{
// 			ios:
// 			{
// 				appId: iosId,
// 				banner: iosBannerId,
// 				interstitial: iosIntl
// 			},
// 			android:
// 			{
// 				appId: andId,
// 				banner: andBannerId,
// 				interstitial: andIntl
// 			}
// 		};

// 		this.intAd = null;
// 		this.adMob = null;
// 	},

// 	setup: function()
// 	{
// 		if(this.isSupported())
// 		{
// 			this.addMob = Cocoon.Ad.AdMob;

// 			var settings = this.settings;
// 			this.addMob.configure({
// 				android: {
// 					appId: settings.android.appId,
// 					banner: settings.android.banner,
// 					interstitial: settings.android.interstitial,
// 					personalizedAdsConsent: false,
// 				},
// 				ios: {
// 					appId: settings.ios.appId,
// 					banner: settings.ios.banner,
// 					interstitial: settings.ios.interstitial,
// 					personalizedAdsConsent: false,
// 				}
// 			});
// 			this.queueIntersitial();
// 		}
// 	},

// 	setupEvents: function()
// 	{
// 		var self = this;
// 		var interstitial = this.intAd;
// 		/*interstitial.on("load", function(){
// 			//console.log("Interstitial loaded");
// 		});

// 		interstitial.on("fail", function(error){
// 			//console.log("Interstitial failed: " + JSON.stringify(error));
// 		});

// 		interstitial.on("show", function(){
// 			//console.log("Interstitial shown");
// 		});*/

// 		interstitial.on("dismiss", function(){
// 			self.intAd = false;
// 			self.queueIntersitial();
// 		});

// 		/*interstitial.on("click", function(){
// 		   console.log("Interstitial clicked");
// 		});*/
// 	},

// 	isSupported: function()
// 	{
// 		return (Cocoon && Cocoon.Ad && Cocoon.Ad.AdMob);
// 	},

// 	queueIntersitial: function()
// 	{
// 		this.intAd = this.adMob.createInterstitial();
// 		this.setupEvents();
// 	},

// 	showInterstitial: function()
// 	{
// 		if(this.adMob && this.intAd)
// 		{
// 			this.intAd.show();
// 		}
// 	}
// });

// /* this will setup a defaul object that will
// hold functions incase we can setup by cordova */
// var ads =
// {
// 	showInterstitial: function()
// 	{

// 	}
// };

// var setupAdService = function()
// {
// 	var adMob = new AdService(
// 		'ca-app-pub-4701654588985905~6499650719',
// 		'ca-app-pub-4701654588985905/1790249516',
// 		'ca-app-pub-4701654588985905/7976383913',
// 		'ca-app-pub-4701654588985905~2069451110',
// 		'ca-app-pub-4701654588985905/3266982717',
// 		'ca-app-pub-4701654588985905/3546184312'
// 	);

// 	if(adMob.isSupported())
// 	{
// 		adMob.setup();
// 		ads = adMob;
// 	}
// };

// document.addEventListener("deviceready", setupAdService, false);