const axios = require('axios')
const request=require('request')
const cheerio=require('cheerio')
var express=require("express")
var app=express.Router();
//#4548736101296 sony
//8901207019005 dabur
//9788177092325 hcverma
//9788126598328 book

 async function fetch(qrcode)
    {
        var obj={};
    
  
    var options ={
        url: 'https://www.amazon.in/s?k=' + qrcode,
        method: 'GET',
        //    proxy: 'http://10.8.0.1:8080',
        headers: {
           // 'Connection': 'keep-alive',
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'
        }
    };
    
        await axios.get(options.url,{headers:options.headers})
        .then((html)=>{
         
            let $ = cheerio.load(html.data);
          
            const stuff = $('div.s-result-list.s-search-results.sg-row');
    
            var s_link = $('div.s-result-list.s-search-results.sg-row').find('div[data-index="0"]').find('a.a-link-normal.a-text-normal').attr('href');
            s_link = "https://www.amazon.in" + s_link;
            //var slink=$('div.s-result-list.s-search-results.sg-row').find('div[data-index="0"]')
            //console.log(slink.html())
            
            var img_link = $('div.s-result-list.s-search-results.sg-row').find('div[data-index="0"]').find('img.s-image').attr('src');
            var prod_name = $('div.s-result-list.s-search-results.sg-row').find('div[data-index="0"]').find('span.a-size-medium.a-color-base.a-text-normal');
            prod_name = prod_name.html();
            obj.prodname = prod_name;
            obj.link = s_link;
            obj.img = img_link;
 

        })
        .catch((err)=>{
            console.log(err);
        })
        return obj;
      
    }
    module.exports.fetch=fetch;
   


