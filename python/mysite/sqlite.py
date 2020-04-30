#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import sqlite3

conn = sqlite3.connect('db.sqlite3')
cursor = conn.cursor()

cursor.execute('drop TABLE if EXISTS session;')


# 获得数据库中所有表的列表
cursor.execute('SELECT name FROM sqlite_master WHERE type="table" ORDER BY name')
values = cursor.fetchall()
print(values)

tns = 'polls_question', 'polls_choice', 'blog_author', 'blog_blog', 'blog_entry'

for tn in tns:
  if tn:

    print('%s数据表的结构和数据：' % tn)
    # 查询出某个表的所有字段信息
    cursor.execute('PRAGMA table_info(%s)' % tn)
    values = cursor.fetchall()
    print(values)

    cursor.execute('SELECT * FROM %s' % tn)
    values = cursor.fetchall()
    print(values)

cursor.close()
conn.close()