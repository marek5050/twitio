var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;


/*
ProductID: String 
 ,Name: String 
 ,MerchantID: String 
 ,Merchant: String 
 ,Link: String 
 ,Thumbnail: String 
 ,BigImage: String 
 ,Price: String 
 ,RetailPrice: String 
 ,Category: String 
 ,SubCategory: String 
 ,Description: String 
 ,Custom1: String 
 ,Custom2: String 
 ,Custom3: String 
 ,Custom4: String 
 ,Custom5: String 
 ,LastUpdated: String 
 ,status: String 
 ,manufacturer: String 
 ,partnumber: String 
 ,merchantCategory: String 
 ,merchantSubcategory: String 
 ,shortDescription: String 
 ,ISBN: String 
 ,UPC: String 
 ,SKU: String 
 ,CrossSell: String 
 ,MerchantGroup: String 
 ,MerchantSubgroup: String 
 ,CompatibleWith: String 
 ,CompareTo: String 
 ,QuantityDiscount: String 
 ,Bestseller: String 
 ,AddToCartURL: String 
 ,ReviewsRSSURL: String 
 ,Option1: String 
 ,Option2: String 
 ,Option3: String 
 ,Option4: String 
 ,Option5: String 
 ,mobileURL: String 
 ,mobileImage: String 
 ,mobileThumbnail: String 
 ,: String 
 ,: String 
 ,: String 
 ,: String 
 ,: String 
 ,: String 
 ,
*/

var amazonProductSchema = new Schema({
  ProductID: Number
 , Name: {type: String, default:''}
 , MerchantID: Number
 , Merchant: String
 , itemLink: String
 , Thumbnail: String
 , BigImage: String
 , Price: String
 , RetailPrice: String
 , Category: String 
 , SubCategory: String 
 , Description: String 
 , Custom1: String 
 , Custom2: String 
 , Custom3: String 
 , Custom4: String 
 , Custom5: String 
 , LastUpdated: String 
 , status: String 
 , manufacturer: String 
 , partnumber: String 
 , merchantCategory: String 
 , merchantSubcategory: String 
 , shortDescription: String 
 , ISBN: String 
 , UPC: String 
 , SKU: String 
 , CrossSell: String 
 , MerchantGroup: String 
 , MerchantSubgroup: String 
 , CompatibleWith: String 
 , CompareTo: String 
 , QuantityDiscount: String 
 , Bestseller: String 
 , AddToCartURL: String 
 , ReviewsRSSURL: String 
 , Option1: String 
 , Option2: String 
 , Option3: String 
 , Option4: String 
 , Option5: String 
 , mobileURL: String 
 , mobileImage: String 
 , mobileThumbnail: String 
 , spare1: String 
 , spare2: String 
 , spare3: String 
 , spare4: String 
 , spare5: String 
 , spare6: String 
 ,
},{collection:'amazonProduct'});

module.exports = mongoose.model('amazonProduct', amazonProductSchema);