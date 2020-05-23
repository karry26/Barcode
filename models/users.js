const mongoose = require('mongoose');
var UserSchema=new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    mobile:String,
    pic:String,
    occupation:String,
    address:String,
    dob:String,
    city:String
});
module.exports=mongoose.model("user",UserSchema);