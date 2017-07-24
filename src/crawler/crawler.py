# -*- coding: utf-8 -*-

import urllib2
from bs4 import BeautifulSoup


#  enable_proxy = True
#  proxy_handler = urllib2.ProxyHandler({"http" : 'http://some-proxy.com:8080'})
#  null_proxy_handler = urllib2.ProxyHandler({})
#  if enable_proxy:
    #  opener = urllib2.build_opener(proxy_handler)
#  else:
    #  opener = urllib2.build_opener(null_proxy_handler)
#  urllib2.install_opener(opener)


isbn=input('ISBN:')
request=urllib2.Request("https://book.douban.com/subject_search?search_text="+str(isbn)+"&cat=1001")
try:
    response = urllib2.urlopen(request,timeout=100)
except urllib2.URLError, e:
    print e.reason

html=response.read()
soup = BeautifulSoup(html,"lxml")
target=soup.select(".info h2 a")[0]['href']


request = urllib2.Request(target)
try:
    response = urllib2.urlopen(request)
except urllib2.URLError, e:
    print e.reason

ans=response.read()
soup = BeautifulSoup(ans,"lxml")


print soup.select("#wrapper h1 span")[0].get_text();
for t in soup.select(".nbg"):
    print t['href']
for t in soup.select("#info"):
    print t.get_text().replace(" ","").replace("\n",' ');
for t in soup.select('.rating_num'):
    print '评分',
    print t.string.strip()
for t in soup.select(".intro p"):
    print t.get_text()
