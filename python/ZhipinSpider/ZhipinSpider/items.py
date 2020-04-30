# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ZhipinspiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    # pass

    title = scrapy.Field()        # 工作名称
    salary = scrapy.Field()       # 工资
    company = scrapy.Field()      # 招聘公司
    url = scrapy.Field()          # 工作详细链接
    work_addr = scrapy.Field()    # 工作地点
    industry = scrapy.Field()     # 行业
    company_size = scrapy.Field() # 公司规模
    recruiter = scrapy.Field()    # 招聘人
    publish_date = scrapy.Field() # 发布时间
