#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import MongoClient
import datetime

conn = MongoClient('47.100.164.90', 27017)
# 连接NAS数据库，没有则自动创建
db = conn.Hope3
naiFen = db.naifens


def insert_naifen(name, url, qiTaPeiFang, age, youJi, shuXing, peiFang, pinPai, yaoQiu, changDi, teShu):
    global naiFen
    result = naiFen.find_one({'url': url})
    if result:
        naiFen.update({'url': url}, {'$set': {
            'name': name,
            'qiTaPeiFang': qiTaPeiFang,
            'age': age,
            'youJi': youJi,
            'shuXing': shuXing,
            'peiFang': peiFang,
            'pinPai': pinPai,
            'yaoQiu': yaoQiu,
            'changDi': changDi,
            'teShu': teShu
        }})
        return False
    naiFen.insert({
        'name': name,
        'url': url,
        'qiTaPeiFang': qiTaPeiFang,
        'age': age,
        'youJi': youJi,
        'shuXing': shuXing,
        'peiFang': peiFang,
        'pinPai': pinPai,
        'yaoQiu': yaoQiu,
        'changDi': changDi,
        'teShu': teShu,
        '__v': 0
    })
    return True
