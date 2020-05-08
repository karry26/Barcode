const axios = require('axios')
const request=require('request')
const cheerio=require('cheerio')
var express=require("express")
var app=express.Router();
//#4548736101296 sony
//8901207019005 dabur
//9788177092325 hcverma
//9788126598328 book
app.get("/",(req,resp)=>
{
    var amazon;
    var flipkart;
    async function solve ()
        {
        var qrcode=req.query.qrcode;
        amazon=  require("./scrappers/amazon")
        flipkart= require("./scrappers/flipkart")
        amazon=await amazon.fetch(qrcode)
        console.log("amazon done"); 
        //console.log(1)
        flipkart=await flipkart.fetch(qrcode)
        module.exports.object=amazon;
        console.log("flipkart done")
        resp.setHeader("content-type","text/html")
  
        resp.write("<table><tr><h3> " +amazon.prodname + "</h3></tr>")
        
        resp.write("<tr><h3> " + amazon.link+"</h3> </tr>");
    
        resp.write("<tr><img src="+amazon.img+ "></tr></table>");
        resp.write("<hr><hr>")
        resp.write("<table><tr><h3> " +flipkart.prodname + "</h3></tr>")
    
        resp.write("<tr><h3> " + flipkart.link+"</h3> </tr>");
    
        resp.write("<tr><img src="+flipkart.img+ "></tr></table>");
    
     
     resp.write("</table> ")
        
        resp.end();
        }
        /*
    async function display()
    {
        
         await solve()
         .then((response)=>{
           //  resp.write(amazon)
         console.log(1);
         resp.sendFile("C:/Users/KArry/Desktop/Barcode/public/displayprod.html");
             
           // resp.setHeader("content-type","text/html");
    /*
            resp.write("<table><tr><h3> " +amazon.prodname + "</h3></tr>")
        
            resp.write("<tr><h3> " + amazon.link+"</h3> </tr>");
        
            resp.write("<tr><img src="+amazon.img+ "></tr></table>");
            resp.write("<hr><hr>")
            resp.write("<table><tr><h3> " +flipkart.prodname + "</h3></tr>")
        
            resp.write("<tr><h3> " + flipkart.link+"</h3> </tr>");
        
            resp.write("<tr><img src="+flipkart.img+ "></tr></table>");
        
         
         resp.write("</table> ")

         })
         
         
            console.log('my display');
            console.log(amazon.prodname);
            // console.log(response);

          
        
         

    
       // console.log(amazon);
    
      
    
        
                    
  
    }
    */
    solve();
  //  resp.end();
});

module.exports.app=app;

