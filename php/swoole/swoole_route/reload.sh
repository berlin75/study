#!/bin/bash
#热重启只需要重启worker进程即可,以下命令使worker进程处理完之后重启
#ps aux | grep route_master | grep -v grep | awk '{print $2}' | xargs kill -USR1
kill -USR1 $(pidof route_master)