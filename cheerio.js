const axios = require('axios')
const request=require('request')
const cheerio=require('cheerio')

//#4548736101296 sony
//8901207019005 dabur
//9788177092325 hcverma
//9788126598328 book
var qrcode='8901207019005'

var options = {
        url: 'https://www.amazon.in/s?k='+qrcode,
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
              const stuff=$('div.s-result-list.s-search-results.sg-row')
              var s_link=$('div[data-index="0"]').find('a.a-link-normal.a-text-normal').attr('href')
            
              s_link="https://www.amazon.in/"+s_link;
              var img_link=$('div[data-index="0"]').find('img').attr('src')
              var prod_name=$('div[data-index="0"]').find('span.a-size-medium.a-color-base.a-text-normal')
              console.log( prod_name.html())
              

              
       }
});

