# -*- coding: utf-8 -*-
import scrapy, json
from UnsplashimageSpider.items import UnsplashimagespiderItem as ImageItem

class UnsplashImageSpider(scrapy.Spider):
    name = 'unsplash_image'
    allowed_domains = ['unsplash.com']
    start_urls = ['https://unsplash.com/napi/photos?page=1&per_page=12']  # 指定的URL是本项目爬取的第一个页面

    def __init__ (self):
        self.page_index = 1

    def parse(self, response):
        # 解析服务器响应的JSON字符串,由于该页面的响应是一个JSON数据,因此程序无须使用XPath或CSS选择器来“提取”数据,而是直接使用json模块的loads()函数来加载该响应数据即可
        photo_list = json.loads(response.text) # ①
        # 遍历每张图片,在获取JSON响应数据之后,程序同样将JSON数据封装成Item对象后返回给Scrapy引擎
        # Spider到底应该使用XPath或CSS选择器来提取响应数据还是使用JSON,完全取决于目标网站的响应内容总之,提取到数据之后,将数据封装成Item对象后返回给Scrapy引擎就对了
        for photo in photo_list:
            item = ImageItem()
            item['image_id'] = photo['id']
            item['download'] = photo['urls']['raw']
            yield item

        # 定义了加载下一页数据的URL,接下来使用scrapy.Request向该URL发送请求,并指定使用self.parse方法来处理服务器响应内容,这样程序就可以不断地请求下一页的图片数据
        self.page_index += 1
        next_link = 'https://unsplash.com/napi/photos?page=' + str(self.page_index) + '&per_page=12'  # 获取下一页的链接
        yield scrapy.Request(next_link, callback=self.parse)                 # 继续获取下一页的图片
