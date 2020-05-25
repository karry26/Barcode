
const mongoose = require('mongoose');

var db=mongoose.connect("mongodb+srv://karry26:karry26@cluster0-fi1yu.gcp.mongodb.net/barcode?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser: true}).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);
});
module.exports.db=db;

