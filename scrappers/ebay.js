const axios = require('axios')
const request=require('request')
const cheerio=require('cheerio')
var express=require("express")
var app=express.Router();

async function fetch(qrcode)
{
var  obj={};
var options = {
        url: 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw='+qrcode+'&_sacat=0',
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
            var s_link=$('li.s-item').find('a').attr('href')
            var img_link=$('li.s-item').find('img').attr('src')
            var prod_name=$('li.s-item').find('h3')
        
            prod_name=prod_name.html();
            obj.prodname=prod_name;
            obj.link=s_link;
            obj.img=img_link;
             
               
            
              
       })
       .catch((err)=>{
        console.log(err);
    })
return obj;
}

module.exports.fetch=fetch;