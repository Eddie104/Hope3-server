#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import MongoClient
import datetime

conn = MongoClient('47.100.164.90', 27017)
# 连接NAS数据库，没有则自动创建
db = conn.Hope2
# 使用models集合，没有则自动创建
identityCounter = db.identitycounters
pendingGoods = db.pendinggoods
goods = db.goods
skus = db.skus
goodsTypeColor = db.goodstypecolors

def get_goods(query, fields={}):
    global goods
    result = goods.find(query, fields)
    return result

def get_one_sku(query, fields={}):
    global skus
    result = skus.find_one(query, fields)
    return result

def get_one_goods_type_color(query, fields={}):
    global goodsTypeColor
    result = goodsTypeColor.find_one(query, fields)
    return result

def update_goods_type_color(query, update):
    global goodsTypeColor
    goodsTypeColor.update(query, update)

def get_pending_goods_id():
    global identityCounter
    result = identityCounter.find_one({'model': 'PendingGoods'})
    count = result.get('count')
    identityCounter.update({'model': 'PendingGoods'}, {
        '$inc': {'count': 1}})
    return count + 1


def insert_pending_goods(name, number, url, size_price_arr, imgs):
    global pendingGoods
    result = pendingGoods.find_one({'url': url})
    if result:
        return False
    id = get_pending_goods_id()
    pendingGoods.insert({
        'id': id,
        'platform': '5af1310e48555b1ba3387bcc',
        'name': name,
        'colorName': '',
        'colorValue': '',
        'number': number,
        'url': url,
        'size_price_arr': size_price_arr,
        'imgs': imgs,
        'check_date': datetime.datetime(1970, 1, 1),
        'is_checked': False,
        '__v': 0        
    })
    return True
