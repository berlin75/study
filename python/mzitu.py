#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import requests,os
from lxml import etree

base_url = 'https://www.mzitu.com/page/4/'
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'img')
UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit'

r1 = requests.get(base_url, headers = {'User-Agent': UA})
html = etree.HTML(r1.text)
url_list = html.xpath('//ul[@id="pins"]/li/a/@href')
print('tasks length: ', len(url_list))

for url in url_list:
    # 获取套图链接信息
    r2 = requests.get(url, headers = {'User-Agent': UA})
    html = etree.HTML(r2.text)
    title = html.xpath('//h2/text()')[0]
    num = int(html.xpath('//div[@class="pagenavi"]/a[last()-1]/span/text()')[0])  # 获取套图总张数
    path = os.path.join(BASE_DIR, '[p' + str(num) + ']' + title)  # 保存路径文件夹
    if not os.path.exists(path): os.makedirs(path)
    #循环获取各图片URL
    for i in range(1, num+1):
        url_new = "%s/%s"%(url, i)
        r3 = requests.get(url_new, headers = {'User-Agent': UA})
        html = etree.HTML(r3.text)
        img_url = html.xpath('//div[@class="main-image"]/p/a/img/@src')[0]
        r4 = requests.get(img_url, headers={'Referer':url_new, 'User-Agent': UA})
        file_name = os.path.join(path, img_url.rsplit('/', maxsplit=1)[1])
        # print(file_name)
        with open(file_name,'wb') as f:
            f.write(r4.content)
    print('>>> %s done' % url)