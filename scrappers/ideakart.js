const axios = require('axios')
const request=require('request')
const cheerio=require('cheerio')
var express=require("express")
var app=express.Router();

async function fetch(qrcode)
{
var  obj={};
var options = {
        url: 'https://ideakart.com/search?query='+qrcode,
        method: 'GET',
    //    proxy: 'http://10.8.0.1:8080',
        headers: {
           'Connection': 'keep-alive',
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'
        }
    };
    var s_link;

    await axios.get(options.url,{headers:options.headers})
    .then((html)=>{
            let $=cheerio.load(html.data)
             s_link=$('section.search-section').find('a').attr('href')
            var img_link=$('section.search-section').find('img').attr('src')
            var prod_name=$('section.search-section').find('a')
        
            prod_name=prod_name.html();
            obj.prodname=prod_name;
            obj.link=s_link;
            obj.img=img_link;

            
             
               
            
              
       })
       .catch((err)=>{
        console.log(err);
    })
    await axios.get(s_link,{headers:options.headers})
    .then((html)=>{
        let $=cheerio.load(html.data);
        var price=$('div.col-md-4.col-sm-5').find('table').find('h3');
        
        price=price.text();
        price=price.split("\n");
        price=price[1]
       // console.log( price);
        obj.price=price;
    })
    .catch((err)=>{
        console.log(err);
    })

return obj;
}

module.exports.fetch=fetch;