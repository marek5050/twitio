module.exports = function() {

  this.mongoose = require('mongoose');
  require('mongoose-long')(this.mongoose);
  this.Long = this.mongoose.Types.Long;
   
    switch (this.env) {
    case 'development':

      this.mongoose.connect("mongodb://127.0.0.1/ct");  

//      this.mongoose.connect('mongodb://localhost/Wolf');
      break;
    case 'production':
//      this.mongoose.connect('mongodb://localhost/');
      break;
  }

  this.mongooseTypes = require("mongoose-types");
  this.mongooseTypes.loadTypes(this.mongoose);


//  this.mongoose.model('User', schemas.UserSchema);
//  this.mongoose.model('Post', schemas.PostSchema);
}