# -*- coding: utf-8 -*-
"""
Created on Mon Feb  4 03:11:44 2019

@author: KArry
"""
#4548736101296 sony
#8901207019005 dabur
#9788177092325 hcverma
#9788126598328 book

import requests
import csv
from bs4 import BeautifulSoup

header={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15'}
qrcode='4005808725298'
page = requests.get('https://www.amazon.in/s?k='+qrcode,headers=header)

soup = BeautifulSoup(page.text, 'html.parser')
print(len(soup))
#print(soup)
article=soup.find('div',{"class":"s-result-list s-search-results sg-row"})
#	class_ ="")
print("************************************************************")
#print(article)
article=article.find("div",{"data-index":"0"})
image=article.find("img",{"data-image-index":"0"})
image=image['src']
article=article.find_all("a",{"class":"a-link-normal a-text-normal"})
#{"class":"main-article__body main-article__wrapper wrapper"}
#article=article.find_all("href")
print("https://www.amazon.in/"+article[0]['href'])
url2=article[0]['href']
page1=requests.get("https://www.amazon.in/"+url2,headers=header)
soup1= BeautifulSoup(page1.text, 'html.parser')
soup1=soup1.find("div",{"id":"centerCol"})
#print(soup1)
#soup1=soup1.find("div",{"id":"titleblock_feature_div"})
soup1=soup1.find("span",{"id":"productTitle"})
ans=soup1
ans=str(ans.text)
#print(soup1[0])
print(ans.strip())
print(image)
#print(type(ans),len(ans))
# article1=article.find_all('td')
# with open('codeforces.csv','w') as f:
#     for i in article1:
#         f.write(str(i.contents[0]))
#f.close()
#background-color: black; background-image: url("https://images-na.ssl-images-amazon.com/images/I/717XckVwfgL.SX522_.png"); background-size: contain; background-position: center center; background-repeat: no-repeat; position: absolute; top: 0px; left: 0px; visibility: hidden; width: 100%; height: 100%;