const axios = require('axios')
const request=require('request')
const cheerio=require('cheerio')
var express=require("express")
var app=express.Router();
//#4548736101296 sony
//8901207019005 dabur
//9788177092325 hcverma
//9788126598328 book
//app.get("/",(req,resp)=>
//{
async function fetch(qrcode)
{
var  obj={};
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

    await axios.get(options.url,{headers:options.headers})
    .then((html)=>{
              let $=cheerio.load(html.data)
              var s_link=$('div._3liAhj').find('a.Zhf2z-').attr('href')
            
              s_link="https://www.flipkart.com"+s_link;
              var img_link=$('div._3liAhj').find('img').attr('src')
              var prod_name=$('div._3liAhj').find('a._2cLu-l')
              var price=$('div._3liAhj').find('div._1vC4OE').text()
              price=price.split('₹')
              price=price[1];
             
                prod_name=prod_name.html();
                obj.prodname=prod_name;
                obj.link=s_link;
                obj.img=img_link;
                obj.price=price;
             
               
            
              
       })
       .catch((err)=>{
        console.log(err);
    })
return obj;
}

module.exports.fetch=fetch;