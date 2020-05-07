var express=require("express")
var path=require("path")
var app=express()



app.listen(8080,function(){
    console.log("server started at 8080")

});
//console.log(__dirname+"/uploads")
app.use('/public',express.static(path.join(__dirname,"public")))
app.get("/",function(req,resp)
{
    resp.setHeader("content-type","text/html");
    var filePath=path.join(__dirname,"public","index.html");
    resp.sendFile(filePath);
    //resp.sendFile("index.html");
   // resp.end()
})
var scrapper=require("./cheerio.js")
app.use("/cheerio.js",scrapper)
