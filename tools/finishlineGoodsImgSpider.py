#!/usr/bin/env python
# -*- coding: utf-8 -*-

import helper
import mongo
import re
from qiniu import Auth, put_file, etag, urlsafe_base64_encode


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

def fetch_img_url(url):
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
        # 配色的编号
        span = pq('div#styleColors span.styleColorIds')
        number = span.text().strip().replace('- ', '')
        number = re.sub(re.compile(r'\s'), ' ', number)
        img_number = re.sub(re.compile(r'\s'), '_', number)
        return 'https://images.finishline.com/is/image/FinishLine/shadow_temp?$image_src=FinishLine/%s_P1&$Main_shdw$' % (img_number)
    else:
        print('error!!!')

def main():
    goods_arr = mongo.get_goods(
        {}, {'url': 1, 'sku_id_arr': 1, 'id': 1, 'platform': 1})
    for goods in goods_arr:
        if str(goods.get('platform')) == '5ac8594e48555b1ba31896ba':
            url = goods.get('url')
            goods_id = str(goods.get('id'))
            sku_id_arr = goods.get('sku_id_arr')
            if len(sku_id_arr) > 0:
                sku = mongo.get_one_sku({'_id': sku_id_arr[0]}, {'number': 1})
                goodsTypeColor = mongo.get_one_goods_type_color(
                    {'number': sku.get('number')}, {'reseted_img': 1})
                if not goodsTypeColor.get('reseted_img'):
                    img_url = fetch_img_url(url)
                    if img_url:
                        result = helper.downloadImg(
                            img_url, '../app/public/goodsTypeColor/%s/%s_0.jpg' % (goods_id, goods_id))
                        if result == 1:
                            # 上传到七牛
                            print('start uploading img')
                            upload_2_qiniu('goodsTypeColor/%s' % goods_id, '%s_0.jpg' % goods_id,
                                           '../app/public/goodsTypeColor/%s/%s_0.jpg' % (goods_id, goods_id))
                            mongo.update_goods_type_color(
                            	{'number': sku.get('number')}, {'$set': {'reseted_img': True, 'img_url': img_url, 'imgs': ['%s_0.jpg' % goods_id]}})
    #             sku = await this.ctx.model.Sku.findOne({ _id: skuIdArr[0] }, { number: 1 });
    #             goodsTypeColor = await this.ctx.model.GoodsTypeColor.findOne({ number: sku.number }, { id: 1, reseted_img: 1 });
    #             if (!goodsTypeColor.reseted_img) {
    #                 // 开始下载图片
    #                 const result = await this.curl(url);
    #                 if (result.status === 200) {
    #                     const $ = cheerio.load(result.data);
    #                     let imgArr = $('li.more-views-li a');
    #                     // 没有找到图片，说明这个商品只有一张图片
    #                     if (imgArr.length === 0) {
    #                         imgArr = [ $('div.mobile-product-image img').attr('data-src') ];
    #                     } else {
    #                         for (let j = 0; j < imgArr.length; j++) {
    #                             imgArr[j] = $(imgArr[j]).attr('href');
    #                         }
    #                     }
    #                     // 下载图片
    #                     let imgPath = null;
    #                     let downloadResult = null;
    #                     const imgs = [];
    #                     const img_url = [];
    #                     for (let j = 0; j < imgArr.length; j++) {
    #                         imgs[j] = `${goodsId}_${j}.jpg`;
    #                         img_url[j] = imgArr[j].toString();
    #                         downloadResult = null;
    #                         imgPath = path.join(this.config.baseDir, 'app', 'public', 'goodsTypeColor', goodsId, `${goodsId}_${j}.jpg`);
    #                         try {
    #                             this.ctx.logger.info(`[goodsSpider info] => start to download img: url = ${imgArr[j]}`);
    #                             downloadResult = await this.ctx.helper.downloadImg(imgArr[j], imgPath);
    #                         } catch (error) {
    #                             this.ctx.logger.info(`[fightclubSpider ERROR] => download img error: url = ${url}`);
    #                         }
    #                         // 1是下载成功了
    #                         if (downloadResult === 1) {
    #                             if (this.ctx.app.config.env === 'prod') {
    #                                 try {
    #                                     await this.ctx.helper.uploadImg(path.join('goodsTypeColor', goodsId, `${goodsId}_${j}.jpg`), imgPath, this.ctx.app.config.qiniu.scope);
    #                                     this.ctx.logger.info(`[fightclubSpider info] => upload img to qiniu: url = goodsTypeColor/${goodsId}/${goodsId}_${j}.jpg`);
    #                                 } catch (error) {
    #                                     if (error === 614) {
    #                                         // 七牛上有同名的文件了
    #                                         this.ctx.logger.info(`[fightclubSpider ERROR] => the name: goodsTypeColor/${goodsId}/${goodsId}_${j}.jpg is exists`);
    #                                     }
    #                                 }
    #                             }
    #                         }
    #                     }
    #                     // 图片下载完了，并且都上传到七牛了,更新下数据层吧
    #                     await this.ctx.model.GoodsTypeColor.update({ number: sku.number }, { $set: {
    #                         reseted_img: true,
    #                         img_url,
    #                         imgs,
    #                     } });
    #                 }
    #             }
    #         }
    #     }

if __name__ == '__main__':
    main()
