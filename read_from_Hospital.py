#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2016年5月4日
从 https://raw.githubusercontent.com/langhua9527/Hospital/ 中解析数据
@author: hustcc
'''
import requests
import os
import json
import sys
sys


def get_res_content():
    r = requests.get("https://raw.githubusercontent.com/open-power-workgroup/Hospital/master/resource/API_resource/hospital_list.json").json()
    
    return r

def process_json(content_json):
    hospital_res = {}
    cnt = 1
    for city in content_json:
        hospitals = content_json[city]
        for name in hospitals:
            hospital = hospitals[name]
            websites = hospital.get(u"网址") or []
            phones = hospital.get(u"电话") or []
            if len(phones) > 2:
                phones = phones[0:2]
            # 对于没有网址的医院，使用pt_num
            if len(websites) == 0:
                hospital_res["pt" + str(cnt)] = [name, " / ".join(phones)]
                cnt += 1
            for website in websites:
                website = website.replace("http://", "").replace("https://", "").replace("/", "")
                hospital_res[website] = [name, " / ".join(phones)]
    
    return hospital_res;

def output_raw(hospital_res):
    try:
        filename = os.path.join(os.getcwd(), "PTHospitalList.js")
        output = json.dumps(hospital_res, indent=2)
        output = "var PTHospitalList = " + output + ";"
        
        file_object = open(filename, 'w')
        file_object.write(output)
        file_object.close( )
    except IOError:  # file don't exist
        print(u"File save Error", filename)
        

if __name__ == '__main__':
    content_json = get_res_content()
    hos = process_json(content_json)
    output_raw(hos)