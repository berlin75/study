#!/bin/bash
#bash ligui.sh https://www.keke1234.cc/gaoqing/cn/KeLaGirls/2018/0702/28677.html 

set -euo pipefail

clear && reset
wget -qcO ligui_o.html $1
iconv -f gb18030 -t utf-8 ligui_o.html -o ligui.html
rm ligui_o.html

downto=`egrep -io "<title>.+</title>" ligui.html | sed 's/[<TITLE>|</TITLE>]//g' | sed 's/ /_/g'`
max_page=`egrep -io "<a>共[0-9]{1,2}页：</a>" ligui.html | sed 's/[<a>共|页：</a>]//g'`
echo "${downto} --- total ${max_page} pages"

if [ ! -d "data/${downto}" ]
  then
    mkdir -p data/${downto}
fi

down_img_in_page(){
	echo ">>>down $1"
	wget -qcO tmp.html $1
	imgs=`egrep -o "https://pic.keke234.com/picss/201[0-9]/allimg/[0-9]{6}/[a-zA-Z0-9-]+.jpg" tmp.html`
	for img in $imgs
	do
		echo $img
		wget -qcP data/${downto} $img
	done
	rm tmp.html
}

down_img_in_page $1

for page in `seq 2 ${max_page}`
do
	page_url=`echo $1 | sed "s/.html/_${page}.html/"`
	down_img_in_page $page_url
done

rm ligui.html
echo "GAME OVER!"