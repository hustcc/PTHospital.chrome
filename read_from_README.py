#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2016年5月4日
从 https://raw.githubusercontent.com/langhua9527/Hospital/master/README.md 中解析数据
@author: hustcc
'''
import requests
import re
import json


def get_readme_content():
    r = requests.get("https://raw.githubusercontent.com/langhua9527/Hospital/master/README.md")
    
    return r.text

def get_phone_num(content, i, max = 4):
    "  - 电话 +86 21 5187 6888"
    cnt = 0
    while True:
        cnt = cnt + 1
        if cnt > max:
            return None
        i = i - 1
        line = content[i]
        if line.startswith(u"  - 电话 "):
            return line[len(u"  - 电话 "):]
    
def get_website(line):
    "  - 网址 www.tcmmh.com"
    if line.startswith(u"  - 网址 "):
        return line[len(u"  - 网址 "):]
    return None

def get_name(content, i):
    "- 上海市闵行区中医院"
    cnt = 0
    while True:
        cnt = cnt + 1
        i = i - 1
        line = content[i]
        if line.startswith(u"- "):
            return line[len(u"- "):], cnt

def process_readme(content):
    hos = {}
    content = content.split("\n")
    for i in xrange(len(content)):
        line = content[i]
        website = get_website(line)
        if website:
            name, max = get_name(content, i)
            callnum = get_phone_num(content, i, max)
            hos[website] = [(name or ""), callnum or ""]
#             print website, hos[website]
    
    return hos


if __name__ == '__main__':
    content = get_readme_content()
    hos = process_readme(content)
    print len(hos)
    print json.dumps(hos)