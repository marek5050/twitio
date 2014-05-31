var locomotive = require('locomotive')
  , util = require('util')
  , Controller = locomotive.Controller
  , _ = require('lodash');

var aws = require("aws-lib");

var accId='AKIAJQDHUK5TEXAPUBMA'
, awsSecret= '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'
, assocId=   'wwwquickfixau-20';

prodAdv = aws.createProdAdvClient(accId, awsSecret, assocId);

var ProductController = new Controller();
var async = require('async');

Product = require('../models/product');
AmazonProduct = require('../models/amazon');

__ = function(object){
	console.log(util.inspect(object, {showHidden: true, colors:true , depth:null}));
}


ProductController.findOne = function(filter, callback){
	var self = this;
	__(filter);
	Product.findOne(filter,'-_id',{ lean : true }, 
	function(err,item){ 
		console.log("Found item: %j and err: %s" , item, err);
		self.item = item;
		callback(null, item);	
		return;
	})
	return;
 };


ProductController.findRelated = function(size, callback){
    var self = this;
    var item = self.item;
    var filter = {'merchantCategory': item.merchantCategory};
	Product.find(filter,'-_id',{ lean : true, limit:size },function(err,results)
	{
		 var unique = _.uniq(results, function(item){return item.Name});
		 console.log("FindRelated: " + unique.length);
		if(!err)	callback(null,unique);
		else callback(err,null);
	})
 return;
}

ProductController.amazonLookup = function(callback){ 
 var self = this;
 var T = self.__app.opHelper;
console.log("SelfItem: "+ self.item.SKU);
 prodAdv.call("ItemLookup",
 			 { Condition:'All', IdType:'UPC', SearchIndex: "Apparel", ItemId: self.item.SKU+"",
 			   ResponseGroup: 'Large,VariationSummary,Variations,VariationImages'},
 function(err, results)
 {
 if(!results) callback(err,null);
 
 console.log("Error: "+ err);
   // __(results);
  if(results.Items.Item)
	{
	 var amazon = results.Items.Item;
  	  // __(amazon);
 		self.tempAmazon = amazon;
  	  callback(null,amazon);
   	  return;
 	}
	callback(err,0);
   return;
})

ProductController.amazonRelated = function(callback){
	var self = this;
	var T = self.__app.opHelper;
	if(typeof self.tempAmazon != 'object'){
		console.log("TempAmazon not set: Exiting Amazon Related");
		callback("Temp not set",0);
		return;
	}
	// __(self.tempAmazon);
prodAdv.call('SimilarityLookup',{Condition: 'All', ItemId: self.tempAmazon.ASIN, ResponseGroup: "Large,Images"},function(err,items){
	  __(items.Items.Item);
	 // console.log("Items: "+ )
	 var filtered = _.filter(items.Items.Item, function(item){var v = item.ItemAttributes; if(typeof v.ListPrice != 'undefined' ) return 1 });
	 // var str= items.join(',');
	 console.log("Filtered length " + filtered.length);
	 var sample = _.sample(filtered,3);
	 	callback(err,sample);
	  });	
	return;
}


/*
execute(operation, params, callback, onError)
// operation: select from http://docs.aws.amazon.com/AWSECommerceService/latest/DG/SummaryofA2SOperations.html
// params: parameters for operation (optional)
// callback(parsed, raw): callback function handling results. parsed = xml2js parsed response. raw = raw xml response
// onError: function handling errors, otherwise all error messages are printed with console.log()

opHelper.execute('ItemSearch', {
  'SearchIndex': 'Books',
  'Keywords': 'harry potter',
  'ResponseGroup': 'ItemAttributes,Offers'
}, function(results) { // you can add a second parameter here to examine the raw xml response
    console.log(results);
});

// output:
// { ItemSearchResponse: 
//    { '$': { xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01' },
//      OperationRequest: [ [Object] ],
//      Items: [ [Object] ] } }

*/


}

ProductController.show = function() 
{
  var self = this;
	  self.title = 'Locomotive';
  var T = self.__app.T;
  var Long = this.__app.Long;

	  console.log("Showing product: "+ self.param('id'));
  var item = {"UPC": self.param("id")};
// /var item = {"UPC": 508767991};
   	async.series([
   		          function(callback){self.findOne(item,callback);},
  		          function(callback){self.amazonLookup(callback);},
   		          function(callback){self.findRelated(12,callback)},
   		          function(callback){self.amazonRelated(callback)}], 
   		  function(err,results)
   		  {
   		  	// console.log("Results: " );
   		  	// __(results);
		    self.renderView(err, 'single', results);
  		});

  	  // console.log("ProductController: "+ util.inspect(self));
  return;
}


ProductController.renderView = function(err, type, results){
	var self = this;
	// console.log("ProductController: "+ util.inspect(self));

	self.related = (typeof results[3] == 'array')? results[2].slice(0,2): results[2];
	self.amazonRelated = (typeof results[3] == 'array')? results[3].slice(0,3): null;
	self.product = results[0];
	self.amazon = results[1];

	// __(self.product);

 self.render('product/'+type);
 return;
}

module.exports = ProductController;