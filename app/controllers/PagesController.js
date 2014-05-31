var locomotive = require('locomotive')
  , util = require('util')
  , Controller = locomotive.Controller
  , async = require('async')
  , _ = require('lodash')
  , graph = require('fbgraph');

var pagesController = new Controller();

var featured = [
["http://shopcrossfitreebok.com/games-gear/regionals/2014-reebok-crossfit-regionals-road-to-the-fittest-tee.html","2014 Reebok CrossFit Regionals Road to the Fittest Tee","$30.00","Screenprint on a soft, worn-in 100% combed cotton jersey tee.Color: Black","/img/images/b248a_nl5_qgq7crf_1.jpg","large"],
﻿["http://shopcrossfitreebok.com/men/new-gear/reebok-crossfit-performance-tri-blend-ss-tee.html","Reebok CrossFit Performance Tri-Blend SS Tee","$32.00","Our performance tri-blend tee features a softer hand and is ergonomically designed to perform during all types of workouts. Side and shoulder seams are rolled forward to decrease bulk and chafing while performing shoulder workouts. Flat-lock stitching to help reduce rub and irritation. PlayDry and anti-microbial.","/img/images/4124a_mbg_1.jpg","large"],
﻿["http://shopcrossfitreebok.com/men/graphic-tees/handstand-pushups-suck-tee.html","Handstand Pushups Suck Tee","$28.00","Screenprint on soft, worn-in 100% combed cotton jersey tee.Color: Black","/img/images/b248a_nl5_dkf7crf_1.jpg","medium"],
﻿["http://shopcrossfitreebok.com/women/graphic-tees/women-reebok-crossfit-fran-graphic-tee.html","Women CrossFit Fran Graphic Tee ","$28.00","True color screenprint on a soft, worn-in tri-blend short sleeve tee.","/img/images/4164w_cx1_wcrfcw_1.jpg","medium"],
﻿["http://shopcrossfitreebok.com/footwear/mens-footwear/nano-3/mens-reebok-crossfit-nano-3-11.html","Mens Reebok CrossFit Nano 3.0","$119.99","Introducing the Nano 3.0, our most versatile training shoe ever constructed. The evolution continues with a Dual Density platform that provides the perfect combination of forefoot cushioining and heel stabilization. We added more flexibility and protection to the outsole with Metasplit grooves and RopePro wraps on the medial and lateral sides. We carried the innovation into the upper with a new DuraCage construction for the ultimate in protection and lightweight support. Now, you are ready to take on the toughest workouts. Color:  Vital Blue/Stadium Red","/img/images/cfm7b_94d_rccrfr_1.jpg","medium"],
﻿["http://shopcrossfitreebok.com/footwear/mens-footwear/sprint-tr/mens-reebok-crossfit-sprint-tr-4.html","Mens Reebok CrossFit Sprint TR","$114.99","Introducing the Reebok CrossFit Sprint TR, constructed specifically for fast workouts. Built for enhanced durability, this shoe features DuraCage, a PU protective indestructible upper with a lightweight feel and response. Built with a Monomesh protection wrap outsole for optimum bite and support against rope climbs. 3mm heel to toe drop and Metasplit grooves enable foot splay for a natural running feel.Color: Steel/Tin Grey/Ultimate Yellow/Gravel","/img/images/cfm8b_83b_rccrfr_1.jpg","medium"],
﻿["http://shopcrossfitreebok.com/women/graphic-tees/her-crossfit-logo-tank.html","Her CrossFit FEF Tank","$30.00","True color screenprint on a pre-shrunk blended polyester and cotton burnout tank.Color: Black","/img/images/b286w_nl5_qgwwcrf_1.jpg","medium"],
﻿["http://shopcrossfitreebok.com/women/graphic-tees/women-reebok-crossfit-move-weight-graphic-tee.html","Women CrossFit Move Weight Graphic Tee ","$28.00","True color screenprint on a soft, worn-in tri-blend short sleeve tee.","/img/images/4161w_cx4_wcrfcw_1.jpg","medium"],
﻿["http://shopcrossfitreebok.com/men/graphic-tees/grab-life-by-the-barbells-tee.html","Grab Life By The Barbells Tee","$30.00","True color screenprint on a soft, worn-in tri-blend short sleeve tee.Color: Heather Grey","/img/images/b234a_prh_hsd7crf_1.jpg","large"],
﻿["http://shopcrossfitreebok.com/footwear/womens-footwear/womens-reebok-crossfit-nano-3-11.html","Womens Reebok CrossFit Nano 3.0","$119.99","Introducing the Nano 3.0, our most versatile training shoe ever constructed. The evolution continues with a Dual Density platform that provides the perfect combination of forefoot cushioining and heel stabilization. We added more flexibility and protection to the outsole with Metasplit grooves and RopePro wraps on the medial and lateral sides. We carried the innovation into the upper with a new DuraCage construction for the ultimate in protection and lightweight support. Now, you are ready to take on the toughest workouts. Color: Blue Bomb/Excellent Red/White","/img/images/cfw5b_93d_rccrfr_1.jpg","medium"]
];

var _stories = [
	["","Final Heat",0,"","http://www.youtube.com/embed/fhpnfrNRAHQ","video"],
	["","North East D1",0,"","http://www.youtube.com/embed/fKFYwyJkX5A","video"],
	["","Sout West Stream",0,"","http://www.youtube.com/embed/vE1aG22Kqqg","video"],
	["","NorCal Stream",0,"","http://www.youtube.com/embed/OdjgBRliFJo","video"],
	["","North East D2",0,"","http://www.youtube.com/embed/jFJWeiGPdsQ","video"],
];

__ = function(object)
{
	console.log(util.inspect(object, {showHidden: true, colors:true , depth:2}));
}


var aws = require("aws-lib");

var accId='AKIAJQDHUK5TEXAPUBMA'
, awsSecret= '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'
, assocId=   'wwwquickfixau-20';

prodAdv = aws.createProdAdvClient(accId, awsSecret, assocId);

pagesController.amazonFeatured = function(callback){

prodAdv.call("ItemSearch",
 			 { Condition:'New', Keywords:'crossfit sorock', SearchIndex: "Apparel", Sort:'salesrank',
 			   ResponseGroup: 'Large,Images, Variations, VariationMatrix'},
 function(err, results)
 {
 if(!results) {
 	console.log("No response for Featured Amazon");
 	callback("No response", null);
 }

console.log("Error: "+ err);
    // __(results);
  if(results.Items.Item)
	{
	 var amazon = results.Items.Item;
  	  // __(amazon);
 	}
callback(err,amazon);
 })
}
pagesController.featured= function(callback){
	console.log("Returning Featured ");
	callback(null,featured);
	return;
}
pagesController.wod = function(callback){
	console.log("Retrieving daily WOD");
	var wod = "5 rounds 5x Power clean (225#)10x Burpee pull-ups";
	callback(null, wod);
	return;
}

pagesController.stories = function(callback){
	console.log("Retrieving stories.. %s ", _stories);
	 var stories = _stories;
	 callback(null, stories);
	 return;
}

pagesController.main = function() 
{

	// console.log("CHANGE");

	    // get authorization url
    // var authUrl = graph.getOauthUrl({
    //     "client_id":     'cb11debfcb20bf0b88ebce48e94e652e'
    //   , "redirect_uri":  conf.redirect_uri
    // });

	var self = this;
  this.title = 'Crossfit.Cool';
var items = [];

var product= function(arr)
{
	var self = this;
	self.page =arr[0],
	self.name=arr[1],
	self.price= arr[2],
	self.description= arr[3],
	self.image1= arr[4],
	self.image2= arr[5];
	return self;
}


async.series([function(callback){ self.amazonFeatured(callback); }, function(callback) {self.featured(callback) } ,
             function(callback) {self.stories(callback);} , function(callback){ self.wod(callback) }],
 function(err, results){
 	console.log("Finished....Rendering");
 	self.featured = results[1];
 	self.amazonFeatured = results[0];
 	self.stories = results[2];
 	self.wod = results[3];
 	self.render();
})


// var items = _.map(featured, function(item){return new product(item)});
// console.log("Inspect: "+ util.inspect(items));
// this.featured=featured;
// this.wod = "5 rounds 5x Power clean (225#)10x Burpee pull-ups";

 //  async.series([

	
	// ],function(err,results){
 	
   // this.render();
 // });

}






module.exports = pagesController;
