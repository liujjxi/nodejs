var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/nodejs-mongodb');
exports.mongoose=mongoose;