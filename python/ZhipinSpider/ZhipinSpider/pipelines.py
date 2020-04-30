# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import pymysql

class ZhipinspiderPipeline(object):
    # def process_item(self, item, spider):
        # return item

        # print("工作:" , item['title'])
        # print("工资:" , item['salary'])
        # print("工作地点:" , item['work_addr'])
        # print("详情链接:" , item['url'])
        # print("公司:" , item['company'])
        # print("行业:" , item['industry'])
        # print("公司规模:" , item['company_size'])
        # print("招聘人:" , item['recruiter'])
        # print("发布日期:" , item['publish_date'])

    # 定义构造器,初始化要写入的文件
    def __init__(self):
        self.conn = pymysql.connect(
            host = "localhost",
            user = "admin",
            password = "",
            database = "python",
            charset = "utf8"
        )
        self.cur = self.conn.cursor()
    # 重写close_spider回调方法,用于关闭数据库资源
    def close_spider(self, spider):
        print('----------关闭数据库资源-----------')
        # 关闭游标
        self.cur.close()
        # 关闭连接
        self.conn.close()
    def process_item(self, item, spider):
        self.cur.execute("INSERT INTO job_inf VALUES(null, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (item['title'], item['salary'], item['company'],
            item['url'], item['work_addr'], item['industry'],
            item.get('company_size'), item['recruiter'], item['publish_date']))
        self.conn.commit()
