class MyNumbers:
    def __iter__(self):
        self.a = 1
        return self

    def __next__(self):
        x = self.a
        self.a += 1
        return x

myclass = MyNumbers()
myiter = iter(myclass)

print(next(myiter))
print(next(myiter))
print(next(myiter))
print(next(myiter))
print(next(myiter))

import sys;sys.exit()

import re, jieba
from collections import Counter

# 正则对字符串清洗
def textParse(str_doc):
    # 正则过滤掉特殊符号、标点、英文、数字等。
    r = '[a-zA-Z0-9’!"#$%&\'()*+,-./:：;；|<=>?@，—。?★、…【】《》？“”‘’！[\\]^_`{|}~]+'
    str_doc = re.sub(r, ' ', str_doc)      # 去除换行符
    str_doc = re.sub('\s+', ' ', str_doc)  # 多个空格成1个
    str_doc = str_doc.replace('\n',' ')    # 去除换行符
    return str_doc

# 去掉一些停用词和数字、单个字符、空格
def rm_tokens(words_list, stwlist):
    return [word for word in words_list if word not in stwlist and not word.isdigit() and len(word) != 1 and word != ' ']

# 利用jieba对文本进行分词,返回切词后的list
def seq_doc(str_doc):
    sent_list = map(textParse, str_doc.split('\n'))
    # 创建并获取停用词列表,NLPIR_stopwords.txt
    # stwlist = open('NLPIR_stopwords.txt', 'r', encoding='utf8').read()
    stwlist = '''
!
#
$
万一
三天两头
不仅
不仅仅
只要
重要
同时
正在
'''
    stwlist = set(stwlist.split('\n'))
    word_2dlist = [rm_tokens(jieba.lcut(part), stwlist) for part in sent_list]  # 分词并去除停用词
    word_list = sum(word_2dlist, [])  # 合并列表
    return word_list

if __name__ == '__main__':
    import requests
    from lxml import etree
    text = requests.get('http://baijiahao.baidu.com/s?id=1649239865802332584').text
    html = etree.HTML(text)
    target = html.xpath('//*[@id="left-container"]/div[1]//text()')
    target = '\n'.join(target)
    r = seq_doc(target)

    # 词频统计,高频词,低频词
    words = Counter(r).most_common(20)
    wlist = [w for w in words if w[1] > 5]
    print(wlist)