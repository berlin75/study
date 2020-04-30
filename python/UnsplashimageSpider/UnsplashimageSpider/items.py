# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class UnsplashimagespiderItem(scrapy.Item):
    image_id = scrapy.Field()  # 保存图片id
    download = scrapy.Field()  # 保存图片下载地址
