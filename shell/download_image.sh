#!/bin/bash
#########################################
#图片下载器                              #
#script_name: dowonload_image.sh         #
#author:weixiaoxin write by 2017-09-20   #     
#########################################
 
function get_second_level_url(){
  UA="Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24"
  curl -s -o tmp.html -A "$UA" "$1"
  u=`grep -E -o "/Html/63/[0-9]+\.html\" target=\"_blank\"><span>[0-9]{2}-[0-9]{2}</span>" tmp.html|sed 's/ /_/ '`
  for line in $u
  do
    url=`echo $line|grep -E -o "/Html/63/[0-9]+\.html"`
    datetime=`echo $line|grep -E -o "[0-9]{2}-[0-9]{2}"`
    url_date+="$url,$datetime\n"
    #url_array[$url]=$datetime
  done

  echo  ${url_date}
}
 
function get_image(){
  UA="Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24"
  curl -s -o tmp.html -A "$UA" "$1"
  title=`grep -E -o "<title>.*</title>" tmp.html|sed 's/[<title>|</title>]//g'`
  datetime=$2
  img_url=`grep -E -o "https://img.997pp.com/tp/[0-9]{4}/[0-9]{2}/[a-zA-Z0-9]+.jpg" tmp.html`

  if [ -z $img_url ]
  then
    img_url=`grep -E -o "http://img.997pp.com/tp/[0-9]{4}/[0-9]{2}/[a-zA-Z0-9]+.jpg" tmp.html`
  fi
 
  if [ ! -d "data/${datetime}/${title}" ]
  then
    mkdir -p data/$datetime/${title}
  fi
 
  n=1
  for i in $img_url
  do
    echo $i
    i=`echo $i|sed 's/https/http/g'`
    curl -s -o data/${datetime}/${title}/$n.jpg -A "$UA"  "$i"
    #sleep 2
    let n=n+1
    echo $n
  done
}
 
function index(){
  first_url="https://www.6858v.com/Html/63/index-5.html"
  second_url=`get_second_level_url ${first_url}`

  for line in `echo -e $second_url`
  do
    url=`echo $line|awk -F',' '{ print $1 }'`
    url="https://www.6858v.com$url"
    datetime=`echo $line|awk -F',' '{ print $2 }'`
    get_image $url $datetime
    #sleep 5
  done
}

index