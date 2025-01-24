
// export class AdService
// {
// 	constructor(iosId, iosIntl, andId, andIntl)
// 	{
// 		let publisherIds =
// 		{
// 			ios:
// 			{
// 				banner: iosId,
// 				interstitial: iosIntl
// 			},
// 			android:
// 			{
// 				banner: andId,
// 				interstitial: andIntl
// 			}
// 		};

// 		this.publisher = (/(android)/i.test(navigator.userAgent)) ? publisherIds.android : publisherIds.ios;
// 		this.adMob = null;
// 	}

// 	setup()
// 	{
// 		if(this.isSupported())
// 		{
// 			let publisher = this.publisher;
// 			window.plugins.AdMob.setOptions({
// 				publisherId: publisher.banner,
// 				interstitialAdId: publisher.interstitial,
// 				adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,  //use SMART_BANNER, BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
// 				bannerAtTop: false, // set to true, to put banner at top
// 				overlap: true, // set to true, to allow banner overlap webview
// 				offsetTopBar: false, // set to true to avoid ios7 status bar overlap
// 				autoShow: false, // autoshow intertitial Ad
// 				isTesting: false // receiving test ad
// 			});

// 			this.setupEvents();

// 			this.adMob = window.plugins.AdMob;
// 			this.queueIntersitial();
// 		}
// 	}

// 	setupEvents()
// 	{
// 		let self = this;
// 		document.addEventListener('onReceiveAd', () =>{});
//         document.addEventListener('onFailedToReceiveAd', (data) =>{});
//         document.addEventListener('onPresentAd', () =>{});
//         document.addEventListener('onDismissAd', () =>{ });
//         document.addEventListener('onLeaveToAd', () =>{ });
//         document.addEventListener('onReceiveInterstitialAd', () =>{ });
//         document.addEventListener('onPresentInterstitialAd', () =>{ });
//         document.addEventListener('onDismissInterstitialAd', () =>{
//             //get the next one ready only after the current one is closed
// 			self.queueIntersitial();
//         });
// 	}

// 	isSupported()
// 	{
// 		return (window.plugins && window.plugins.AdMob);
// 	}

// 	showBanner()
// 	{
// 		if(this.adMob)
// 		{
// 			this.adMob.createBannerView();
// 		}
// 	}

// 	queueIntersitial()
// 	{
// 		this.adMob.createInterstitialView();
// 		this.adMob.requestInterstitialAd();
// 	}

// 	showInterstitial()
// 	{
// 		if (this.adMob)
// 		{
// 			this.adMob.showInterstitialAd();
// 		}
// 	}
// }

// /* this will setup a defaul object that will
// hold functions incase we can setup by cordova */
// let ads =
// {
// 	showBanner()
// 	{

// 	},

// 	showInterstitial()
// 	{

// 	}
// };

// const setupAdService = () =>
// {
// 	const adMob = new AdService(
// 		'ca-app-pub-4701654588985905/1790249516',
// 		'ca-app-pub-4701654588985905/7976383913',
// 		'ca-app-pub-4701654588985905/3266982717',
// 		'ca-app-pub-4701654588985905/3546184312'
// 	);

// 	if (adMob.isSupported())
// 	{
// 		adMob.setup();
// 		ads = adMob;
// 	}
// };

// document.addEventListener("deviceready", setupAdService, false);