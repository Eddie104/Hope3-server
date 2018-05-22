#!/usr/bin/env python
# -*- coding: utf-8 -*-

import helper
import re
import json
from qiniu import Auth, put_file, etag, urlsafe_base64_encode
import mongo

# SIZE_PRICE_PATTERN = re.compile(r'\{("[\w_\.\s;]+":"["\w_\.\s;]+",?)+\}')
SIZE_PRICE_PATTERN = re.compile(r'var sizeObj =.*}];')


def upload_2_qiniu(img_space, img_name, img_local_path):
	# 需要填写你的 Access Key 和 Secret Key
	access_key = 'u8204eU35XvUiDcFE-NcctjgVtdUkeEeaR6UObWi'
	secret_key = 'lFdpeVd89l5u5e7GKKapdqtI-yPAeHxB9NEDJPv-'
	# 构建鉴权对象
	q = Auth(access_key, secret_key)
	# 要上传的空间
	bucket_name = 'hope2'
	# 上传到七牛后保存的文件名
	key = '%s/%s' % (img_space, img_name)
	# 生成上传 Token，可以指定过期时间等
	token = q.upload_token(bucket_name, key, 3600)
	# 要上传文件的本地路径
	localfile = img_local_path
	ret, info = put_file(token, key, localfile)
	# print(info)
	assert ret['key'] == key
	assert ret['hash'] == etag(localfile)

def fetch_goods(url):
    pq = helper.get(url)
    # 款型名称
    goodsTypeName = None
    try:
        goodsTypeName = pq('span.product_title').text()
    except:
        return
    
    # 配色的编号
    number = pq('span#productSKU').text()
    # 颜色尺寸
    size_price_json = json.loads(SIZE_PRICE_PATTERN.findall(pq.html())[0].replace('var sizeObj = ', '').replace('}];', '}]'))
    size_price_arr = [{'size': a.get('size').strip(), 'price': a.get('pr_sale').strip()} for a in size_price_json]
    # print(size_price_arr)
    result = mongo.insert_pending_goods(goodsTypeName, number, url, size_price_arr, ['0.jpg'])
    if result:
        img_number = re.sub(re.compile(r'\s'), '_', number)
        # img_response = helper.get('https://images.champssports.com/is/image/EBFL2/%s?req=imageset,json' % number, returnText=True)
        # print(img_response)
        img_response = helper.get('https://images.champssports.com/is/image/EBFL2/%s?req=imageset,json' % number, returnText=True)
        img_response = re.compile(r'"IMAGE_SET":"\w+/[_\w]+;').findall(img_response)
        img_url = 'https://images.champssports.com/is/image/%s?hei=600&wid=600' % img_response[0].replace('"IMAGE_SET":"', '').replace(';', '')
        # 下载图片
        result = helper.downloadImg(img_url, '../app/public/tmp/%s/0.jpg' % img_number)
        if result == 1:
            # 上传到七牛
            upload_2_qiniu('goods/%s' % img_number, '0.jpg', '../app/public/tmp/%s/0.jpg' % img_number)

def main():
    b = False
    for page in range(1, 17):
        pq = helper.get('https://www.champssports.com/Mens/Shoes/_-_/N-24Zrj?cm_PAGE=%d&Rpp=180&crumbs=991&Nao=%d' % ((page - 1) * 180, (page - 1) * 180))
        a_arr = pq('div.mainsite_record_listing li > a')
        total = len(a_arr)
        for i in range(0, total):
            if not b:
                if page == 16 and i == 68:
                    b = True
            if b:
                fetch_goods(a_arr[i].get('href'))
                print('DONE ==> page = %d, index = %d' % (page, i))

if __name__ == '__main__':
    main()
