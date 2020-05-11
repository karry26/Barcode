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
        product={};
        var qrcode=req.query.qrcode;
        amazon=  require("./scrappers/amazon")
        flipkart= require("./scrappers/flipkart")
        ideakart=require("./scrappers/ideakart")
        ebay=require("./scrappers/ebay")
        amazon=await amazon.fetch(qrcode)
        product.amazon=amazon; 
      
        flipkart=await flipkart.fetch(qrcode)
        product.flipkart=flipkart;
         
        ideakart=await ideakart.fetch(qrcode);
        product.ideakart=ideakart;

        ebay=await ebay.fetch(qrcode);
        product.ebay=ebay;
        
        module.exports.product=product;
        //product=JSON.parse(JSON.stringify(product))
       // console.log(typeof product)
        resp.send(product)
        //resp.setHeader("content-type","text/html")

     //   resp.sendFile("C:/Users/KArry/Desktop/Barcode/public/displayprod.html");
        //resp.end(JSON.stringify(product));
        /*
        resp.write("<table><tr><h5> " +amazon.prodname + "</h5></tr>")
        
        resp.write("<tr><h5> " + amazon.link+"</h5> </tr>");
    
        resp.write("<tr><img src="+amazon.img+ "></tr>");
        resp.write("<hr><hr>")
        resp.write("<table><tr><h5> " +flipkart.prodname + "</h5></tr>")
    
        resp.write("<tr><h5> " + flipkart.link+"</h5> </tr>");
    
        resp.write("<tr><img src="+flipkart.img+ "></tr>");
        resp.write("<hr><hr>")
        resp.write("<table><tr><h5> " +ideakart.prodname + "</h5></tr>")
    
        resp.write("<tr><h5> " + ideakart.link+"</h5> </tr>");
    
        resp.write("<tr><img src="+ideakart.img+ "></tr></table>");
    
     
     resp.write("</table> ")
        */
       // resp.end();
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

