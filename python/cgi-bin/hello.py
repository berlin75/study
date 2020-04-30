#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import os

print("Content-type:text/html\n")
print("<meta charset=\"utf-8\">")

# CGI处理模块
import cgi, cgitb

# 创建FieldStorage的实例化
form = cgi.FieldStorage()

# 获取数据
site_name = form.getvalue('name')
site_url  = form.getvalue('url')

print("<title>CGI测试实例</title>")
print("<h2>%s官网:%s</h2>" % (site_name, site_url))

print("<b>环境变量</b><br>")
print("<ul>")
for key in os.environ.keys():
    print("<li><span style='color:green'>%30s </span> : %s </li>" % (key,os.environ[key]))
print("</ul>")