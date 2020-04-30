# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

from urllib.request import *

class UnsplashimagespiderPipeline(object):
    def process_item(self, item, spider):      # 每个item代表一个要下载的图片
        print('----------' + item['image_id'] + ': ' + item['download'])
        try:
            with urlopen(item['download']) as result:                          # 打开URL对应的资源
                data = result.read()                                           # 读取图片数据
                with open("images/" + item['image_id'] + '.jpg', 'wb+') as f:  # 打开图片文件,images目录位于项目根目录下
                    f.write(data)                                              # 写入读取的数据
        except Exception as e:
            print('下载图片%s出现错误：' % item['image_id'], e)
