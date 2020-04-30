# 获取官方PHP7.1-cli镜像,并在此基础上进行修改	
# docker build -t swoole .
# docker run -it -v /mnt:/root/www swoole /bin/bash
FROM php

WORKDIR /usr/src/swoole

RUN buildDeps='unzip wget git' \
# 修改apt源为163的源
&& echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" > /etc/apt/sources.list \
&& echo "deb http://mirrors.163.com/debian/ jessie-updates main non-free contrib" >> /etc/apt/sources.list \
&& echo "deb http://mirrors.163.com/debian/ jessie-backports main non-free contrib" >> /etc/apt/sources.list \
&& echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >> /etc/apt/sources.list \
&& echo "deb-src http://mirrors.163.com/debian/ jessie-updates main non-free contrib" >> /etc/apt/sources.list \
&& echo "deb-src http://mirrors.163.com/debian/ jessie-backports main non-free contrib" >> /etc/apt/sources.list \
&& echo "deb http://mirrors.163.com/debian-security/ jessie/updates main non-free contrib" >> /etc/apt/sources.list \
&& apt-get update \
&& apt-get install -y $buildDeps \
# 安装ifconfig、ping、service、ps命令
&& apt install -y net-tools inetutils-ping initscripts procps apache2-utils \
#安装igbinary扩展
&& pecl install -o -f igbinary \ 
&& rm -rf /tmp/pear \ 
&& docker-php-ext-enable igbinary \
#安装redis扩展
&& pecl install -o -f redis \ 
&& rm -rf /tmp/pear \ 
&& docker-php-ext-enable redis \
#安装mysql扩展
&& docker-php-ext-install pdo_mysql \
#安装swoole扩展
&& git clone https://github.com/swoole/swoole-src.git \
&& cd swoole-src \
&& phpize \
&& ./configure \
&& make \
&& make install \
&& docker-php-ext-enable swoole \
&& rm -rf /var/lib/apt/lists/* \
&& rm -rf /tmp/swoole-src \
&& rm -rf /usr/src/swoole \
&& apt-get purge -y --auto-remove $buildDeps \
&& echo "alias ll='ls -alF'" >> /root/.bashrc

WORKDIR /root/www