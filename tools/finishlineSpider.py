#!/usr/bin/env python
# -*- coding: utf-8 -*-

import helper
import re
from qiniu import Auth, put_file, etag, urlsafe_base64_encode
import mongo


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


def fetch_detail(url):
    pq = helper.get(url, {}, {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'max-age=0',
        'referer': 'https://www.finishline.com/store/men/shoes/_/N-1737dkj?mnid=men_shoes',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 OPR/52.0.2871.40'
    })
    if pq:
        # 款型名称
        goodsTypeName = pq('input.bVProductName').attr('value')
        # 配色的编号
        span = pq('div#styleColors span.styleColorIds')
        number = span.text().strip().replace('- ', '')
        number = re.sub(re.compile(r'\s'), ' ', number)
        span = pq('div#productPrices span')
        price = span.text().replace('$', '').split(' ')[0]
        try:
            price = float(price)
        except:
            price = 0.0
        a_arr = pq('div#productSizes a')
        size_price_arr = [{'size': a.text.strip(), 'price': price} for a in a_arr]
        img_number = re.sub(re.compile(r'\s'), '_', number)
        result = mongo.insert_pending_goods(goodsTypeName, number, url, size_price_arr, ['0.jpg'])
        if result:
            # 下载图片
            img_url = 'https://images.finishline.com/is/image/FinishLine/shadow_temp?$image_src=FinishLine/%s_P1&$Main_shdw$' % (img_number)
            result = helper.downloadImg(img_url, '../app/public/tmp/%s/0.jpg' % img_number)
            if result == 1:
                # 上传到七牛
                upload_2_qiniu('goods/%s' % img_number, '0.jpg', '../app/public/tmp/%s/0.jpg' % img_number)
    else:
        print('error!!!')
    

def main():
    url = 'https://www.finishline.com/store/men/shoes/_/N-1737dkj?mnid=men_shoes&Ns=sku.bestSeller%7C1&sort=sort%3Abest%20sellers%0A%20#/store/men/shoes/_/N-1737dkj?mnid=men_shoes&Ns=sku.bestSeller%7C1'
    page = 7
    pattern = re.compile(r'<div\sclass="product\-card"\sid="\w+"\sdata\-prodid="\w+"\sdata\-productid="\w+"\sdata\-baseurl="[\/\w\-\?]*">\s+<a\sid="\w+"\shref="[\/\w\-\?&=]*"')
    while True:
        count = (page - 1) * 40
        print('cur page => %d' % page)
        html = helper.post('%s&No=%d' % (url, count), {
            'mnid': 'men_shoes',
            'No': count,
            'Ns': 'sku.bestSeller | 1',
            'isAjax': 'true'
        }, {
            'origin': 'https://www.finishline.com',
            'referer': 'https://www.finishline.com/store/men/shoes/_/N-1737dkj?mnid=men_shoes&Ns=sku.bestSeller%7C1&sort=sort%3Abest%20sellers%0A%20',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 OPR/52.0.2871.40',
            'x-requested-with': 'XMLHttpRequest',
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9',
            'content-length': '0'
        }, returnText=True)
        str_arr = pattern.findall(html)
        if len(str_arr) < 1:
            break
        index = 0
        for s in str_arr:
            print('cur page = %d, index = %d' % (page, index))
            # if page == 1:
            #     if index < 28:
            #         index += 1
            #         continue
            if page == 7:
                if index < 33:
                    index += 1
                    continue
            goods_url = 'https://www.finishline.com%s' % s.split(' href="')[1].replace('"', '')
            fetch_detail(goods_url)
            index += 1
        page += 1

if __name__ == '__main__':
    main()
