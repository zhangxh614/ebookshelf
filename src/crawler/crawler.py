# -*- coding: utf-8 -*-

import urllib2
from bs4 import BeautifulSoup
import sys
reload(sys) # 这一行和下一行我也不知道为什么要这样，不过whatever，这样不报错了
sys.setdefaultencoding('utf-8') 

#  enable_proxy = True
#  proxy_handler = urllib2.ProxyHandler({"http" : 'http://some-proxy.com:8080'})
#  null_proxy_handler = urllib2.ProxyHandler({})
#  if enable_proxy:
    #  opener = urllib2.build_opener(proxy_handler)
#  else:
    #  opener = urllib2.build_opener(null_proxy_handler)
#  urllib2.install_opener(opener)


isbn=sys.argv[1]
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


print '{' + '"name": "' + soup.select("#wrapper h1 span")[0].get_text() + '",',
print '"images": [',
_first = True
for t in soup.select(".nbg"):
	if not _first:
		print ',',
	else:
		_first = False
		print '{"imgurl": "' + t['href'] + '"}',
		
print '],',
print '"info": ',
for t in soup.select("#info"): 
    print '"' + t.get_text().replace(" ","").replace("\n",' ') + '",',
print '"rating_num":',
for t in soup.select('.rating_num'):
    print '"评分',
    print t.string.strip() + '",',
print '"intro": "',
for t in soup.select(".intro p"):
    print t.get_text(),
print '"'
print '}'