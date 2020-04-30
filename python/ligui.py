#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from html.parser import HTMLParser                    # 引入HTML解析模块
from urllib import request                            # 引入URL请求模块
import re                                             # 引入正则表达式模块
import os
# import gzip, cStringIO

class MyHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.links = []
        self.pages = 0
        self.ispage = False
    def handle_starttag(self, tag, attrs):
        if tag == "img" and len(attrs) == 3:
            for (variable, value) in attrs:
                if variable == "src" :
                    self.links.append(value)

def down(currentpage, dirname):
    with request.urlopen(currentpage) as f:
        data = f.read()
        html_code = data.decode('gbk')   # gb2312
        hp = MyHTMLParser()
        hp.feed(html_code)
        hp.close()
        for link in hp.links:
            print('⇣ ', link)
            request.urlretrieve(link, os.path.join(dirname, os.path.split(link)[1]))

bases = [
    'https://www.keke234.com/gaoqing/cn/xiuren/2019/0811/33876.html',
    'https://www.keke234.com/gaoqing/cn/xiuren/2019/0811/33870.html',
    'https://www.keke234.com/gaoqing/cn/xiuren/2019/0811/33867.html',
    'https://www.keke234.com/gaoqing/cn/xiuren/2019/0821/33947.html',
    'https://www.keke234.com/gaoqing/cn/xiuren/2019/0821/33943.html',
    'https://www.keke234.com/gaoqing/cn/YouMi/2019/0811/33901.html'
]

for base in bases:
    dirname = os.path.join('./img/', base.replace('/', ''))
    if not os.path.isdir(dirname):
        os.mkdir(dirname)

    down(base, dirname)

    for x in list(range(2,15)):
        try:
            cur = base.replace('.html', '_'+str(x)+'.html')
            print('↳  ', cur)
            down(cur, dirname)
        except Exception as e:
            print('done')
            break
