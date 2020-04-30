#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import socket
import threading

s = socket.socket()                 # 创建socket对象
s.connect(('127.0.0.1', 30000))     # 连接远程主机

def read_from_server(s):
    while True:
        print(s.recv(2048).decode('utf-8'))

# 客户端启动线程循环不断地读取来自服务器的数据
threading.Thread(target=read_from_server, args=(s, )).start()   # ①

while True:
    line = input('')
    if line is None or line == 'exit':
        break
    # 将用户的键盘输入内容写入socket
    s.send(line.encode('utf-8'))