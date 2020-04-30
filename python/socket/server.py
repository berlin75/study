#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import selectors, socket

sel = selectors.DefaultSelector()  # 创建默认的selectors对象

# 负责监听“有数据可读”事件的函数
def read(skt, mask):
    try:

        data = skt.recv(1024)       # 读取数据
        if data:
            for s in socket_list:   # 将读取的数据采用循环向每个socket发送一次
                s.send(data)        # Hope it won't block
        else:                       # 如果该socket已被对方关闭，关闭该socket，并从socket_list列表中删除
            print('关闭', skt)
            sel.unregister(skt)
            skt.close()
            socket_list.remove(skt)
    except:                         # 如果捕捉到异常, 将该socket关闭，并从socket_list列表中删除
        print('关闭', skt)
        sel.unregister(skt)
        skt.close()
        socket_list.remove(skt)

socket_list = []

# 负责监听“客户端连接进来”事件的函数
def accept(sock, mask):
    conn, addr = sock.accept()
    socket_list.append(conn)                        # 使用socket_list保存代表客户端的socket
    conn.setblocking(False)
    sel.register(conn, selectors.EVENT_READ, read)  # 使用sel为conn的EVENT_READ事件注册read监听函数

sock = socket.socket()
sock.bind(('0.0.0.0', 30000))
sock.listen()

sock.setblocking(False)                             # 设置该socket是非阻塞的
sel.register(sock, selectors.EVENT_READ, accept)    # 使用sel为sock的EVENT_READ事件注册accept监听函数

# 采用死循环不断提取sel的事件
while True:
    events = sel.select()
    for key, mask in events:
        callback = key.data                         # key的data属性获取为该事件注册的监听函数
        callback(key.fileobj, mask)                 # 调用监听函数, key的fileobj属性获取被监听的socket对象