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
    var qrcode='8901207019005'
   // var qrcode=req.query.qrcode
    console.log(qrcode)

var options = {
        url: 'https://www.flipkart.com/search?q='+qrcode,
        method: 'GET',
    //    proxy: 'http://10.8.0.1:8080',
        headers: {
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'
        }
    };

    request(options, function (error, response, html) {
       if (!error && response.statusCode == 200) {
              var $=cheerio.load(html)
              var s_link=$('div._3liAhj').find('a.Zhf2z-').attr('href')
            
              s_link="https://www.flipkart.com"+s_link;
              var img_link=$('div._3liAhj').find('img').attr('src')
              var prod_name=$('div._3liAhj').find('a._2cLu-l')
              //resp.setHeader("content-type","text/html");
                prod_name=prod_name.html();
               
            
                 resp.write("<table><tr><h3> " + prod_name + "</h3></tr>")

                resp.write("<tr><h3> " + s_link+"</h3> </tr>");
            
           resp.write("<tr><img src="+img_link+ "></tr></table>");
          
             resp.write("</table> ")
            //  console.log( prod_name)
              //console.log(s_link);
              //console.log(1)
              //console.log(img_link.html());
       }
});
})
module.exports=app;

