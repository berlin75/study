# -*- coding: utf-8 -*-
import scrapy
from ZhipinSpider.items import ZhipinspiderItem


class JobPositionSpider(scrapy.Spider):
    name = 'job_position'
    allowed_domains = ['zhipin.com']
    start_urls = ['https://www.zhipin.com/c101280100/h_101280100/']

    def parse(self, response):
        # pass

        # 遍历页面上所有//div[@class="job-primary"]节点,每个节点都包含一份招聘信息,为每个节点都建立一个ZhipinspiderItem对象,并从该节点中提取项目感兴趣的信息存入ZhipinspiderItem对象中
        for job_primary in response.xpath('//div[@class="job-primary"]'):
            item = ZhipinspiderItem()

            # 匹配//div[@class="job-primary"]节点下/div[@class="info-primary"]节点,也就是匹配到包含工作信息的div元素
            info_primary = job_primary.xpath('./div[@class="info-primary"]')
            item['title'] = info_primary.xpath('./h3/a/div[@class="job-title"]/text()').extract_first()
            item['salary'] = info_primary.xpath('./h3/a/span[@class="red"]/text()').extract_first()
            item['work_addr'] = info_primary.xpath('./p/text()').extract_first()
            item['url'] = info_primary.xpath('./h3/a/@href').extract_first()

            # 匹配//div[@class="job-primary"]节点下./div[@class="info-company"]节点下的/div[@class="company-text"]的节点,也就是匹配到包含公司信息的div元素
            company_text = job_primary.xpath('./div[@class="info-company"]/div[@class="company-text"]')
            item['company'] = company_text.xpath('./h3/a/text()').extract_first()
            company_info = company_text.xpath('./p/text()').extract()

            if company_info and len(company_info) > 0:
                item['industry'] = company_info[0]
            if company_info and len(company_info) > 2:
                item['company_size'] = company_info[2]

            # 匹配//div[@class="job-primary"]节点下./div[@class="info-publis"]节点下,也就是匹配到包含发布人信息的div元素
            info_publis = job_primary.xpath('./div[@class="info-publis"]')
            item['recruiter'] = info_publis.xpath('./h3/text()').extract_first()
            item['publish_date'] = info_publis.xpath('./p/text()').extract_first()

            # 使用yield语句将item对象返回给Scrapy引擎。此处不能使用return,因为return会导致整个方法返回,循环不能继续执行,而yield将会创建一个生成器
            yield item

            new_links = response.xpath('//div[@class="page"]/a[@class="next"]/@href').extract() # 解析下一页的链接
            if new_links and len(new_links) > 0:
                new_link = new_links[0]  # 获取下一页的链接
                yield scrapy.Request("https://www.zhipin.com" + new_link, callback=self.parse) # 再次发送请求获取下一页数据
