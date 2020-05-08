var express=require("express")
var path=require("path")
var app=express()
var bodyparser= require("body-parser");

app.use(bodyparser.urlencoded({"extended":false}));

app.use(express.static("public"))
app.get("/",function(req,resp)
{
    var filePath=path.join(__dirname,"public","index.html");
    resp.sendFile(filePath);
})
var scrapper=require("./cheerio.js")
app.use("/cheerio.js",scrapper.app)
app.use((req,resp,next)=>{
    resp.status(404).send("<h1>Page not found-invalid url");
});
app.listen(8081,function(){
    console.log("server started at 8081")

});
