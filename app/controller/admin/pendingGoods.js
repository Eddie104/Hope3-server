// const fs = require('fs');
// const path = require('path');
const Controller = require('../../core/baseController');

class PendingGoodsController extends Controller {
    async index() {
        this.success('hi, welcome to pendingGoodsController!');
    }

    async find() {
        let {
            name,
            number,
            platform,
            only_pending,
            is_deleted,
            page,
            count,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
        this.ctx.validate({
            page: 'number',
            count: 'number',
        });
        const query = {};
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        if (number) {
            query.number = {
                $regex: number,
                $options: 'i',
            };
        }
        if (/\w{24}/.test(platform)) {
            query.platform_id = platform;
        }
        if (only_pending === true) {
            query.is_checked = { $ne: true };
        }
        if (is_deleted === 1) {
            query.is_deleted = true;
        } else if (is_deleted === 2) {
            query.is_deleted = false;
        }
        const list = await this.ctx.model.PendingGoods.find(query)
            .skip((page - 1) * count)
            .limit(count)
            .sort({ priority: -1 });
        const total = await this.ctx.model.PendingGoods.count(query);
        // 找出平台
        const platformList = await this.ctx.model.Platform.find();
        this.success({
            list,
            pagination: {
                total,
                current: page,
            },
            platform: platformList,
        });
    }

    async fetchBrandAndCategory() {
        const brands = await this.ctx.model.Brand.find({ is_deleted: false });
        const category = await this.ctx.model.Category.find({}, { name: 1 });
        this.success({
            brands,
            category,
        });
    }

    async setCheck() {
        // const { _id } = this.ctx.params;
        const { idArr } = this.ctx.request.body;
        await this.ctx.model.PendingGoods.update({ _id: idArr }, { $set: { is_checked: true } }, { multi: true });
        this.success();
    }

    async delete() {
        const { _id } = this.ctx.params;
        await this.ctx.model.PendingGoods.update({ _id }, { $set: { is_deleted: true } });
        this.success();
    }

    async autoConnectByName() {
        const pendingGoodsArr = await this.ctx.model.PendingGoods.find({ is_checked: { $ne: true } }, {
            name: 1,
            number: 1,
            url: 1,
            size_price_arr: 1,
            imgs: 1,
            platform: 1,
            platform_id: 1,
            color_name: 1,
            color_value: 1,
            gender: 1,
        });
        let pendingGoods = null;
        let goodsColor = null;
        let goodsType = null;
        let crawlCount = 0;
        let img = null;
        for (let i = 0; i < pendingGoodsArr.length; i++) {
            pendingGoods = pendingGoodsArr[i];
            img = Array.isArray(pendingGoods.imgs) && pendingGoods.imgs.length > 0 ? `${pendingGoods.platform}/${pendingGoods.imgs[0]}` : '';
            goodsType = await this.ctx.model.GoodsType.findOne({ name: pendingGoods.name, is_deleted: false }, { goods_color_arr: 1 });
            if (goodsType) {
                // 新建商品
                let id = await this.ctx.service.createId.getId('Goods');
                crawlCount = await this.ctx.model.IdentityCounter.findOne({ model: `${pendingGoods.platform}CrawlCounter` }, { count: 1 });
                const goods = new this.ctx.model.Goods({
                    id,
                    name: pendingGoods.name,
                    url: pendingGoods.url,
                    number: this.ctx.helper.formatGoodsNumber(pendingGoods.number),
                    sku: pendingGoods.size_price_arr,
                    img,
                    platform_id: pendingGoods.platform_id,
                    gender: pendingGoods.gender,
                    goods_type_id: goodsType._id,
                    update_counter: crawlCount ? crawlCount.count : 0,
                });
                await goods.save();
                // 新建配色
                id = await this.ctx.service.createId.getId('GoodsColor');
                goodsColor = new this.ctx.model.GoodsColor({
                    id,
                    name: goodsType.name,
                    color_name: pendingGoods.color_name,
                    color_value: pendingGoods.color_value,
                    number: this.ctx.helper.formatGoodsNumber(pendingGoods.number),
                    img,
                    goods_id_arr: [ goods._id ],
                    goods_type_id: goodsType._id,
                });
                await goodsColor.save();
                // 配色和款型关联上
                await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $addToSet: { goods_color_arr: goodsColor._id } });
                // 把商品和配色关联上
                await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { goods_color_id: goodsColor._id } });
                await this.ctx.model.PendingGoods.update({ _id: pendingGoods._id }, { $set: { is_checked: true } });
            }
        }
        this.success();
    }

    async autoConnectByNumber() {
        const keywords = [
            'Jordan',
            'nike',
        ];
        const or = keywords.map(kw => {
            return {
                name: {
                    $regex: kw,
                    $options: 'i',
                },
            };
        });
        const pendingGoodsArr = await this.ctx.model.PendingGoods.find({
            is_checked: { $ne: true },
            $or: or,
        }, {
            name: 1,
            number: 1,
            url: 1,
            size_price_arr: 1,
            imgs: 1,
            platform: 1,
            platform_id: 1,
            gender: 1,
        });
        let pendingGoods = null;
        let goodsColorArr = null;
        let goodsColor = null;
        let goodsType = null;
        let crawlCount = null;
        let pendingGoodsNumber = null;
        for (let i = 0; i < pendingGoodsArr.length; i++) {
            console.log(`${i}/${pendingGoodsArr.length}`);
            pendingGoods = pendingGoodsArr[i];
            pendingGoodsNumber = pendingGoods.number;
            if (pendingGoodsNumber) {
                if (pendingGoodsNumber.indexOf(' ') !== -1) {
                    pendingGoodsNumber = pendingGoodsNumber.split(' ')[0];
                } else if (pendingGoodsNumber.indexOf('-') !== -1) {
                    pendingGoodsNumber = pendingGoodsNumber.split('-')[0];
                } else {
                    // 如果最后一位不是数字的话，就去掉最后的四位
                    const lastChar = pendingGoodsNumber.substr(pendingGoodsNumber.length - 1, 1);
                    if (isNaN(lastChar)) {
                        // 去掉最后的四位
                        pendingGoodsNumber = pendingGoodsNumber.substring(0, pendingGoodsNumber.length - 4);
                    } else {
                        // 去掉最后的三位
                        pendingGoodsNumber = pendingGoodsNumber.substring(0, pendingGoodsNumber.length - 3);
                    }
                }
                goodsColorArr = await this.ctx.model.GoodsColor.find({
                    number: {
                        $regex: pendingGoodsNumber,
                        $options: 'i',
                    },
                }, { goods_type_id: 1 });
                if (goodsColorArr && goodsColorArr.length > 0) {
                    // const goodsTypeIdArr = [ ...new Set(goodsColorArr.map(item => item.goods_type_id)) ];
                    for (let j = 0; j < goodsColorArr.length; j++) {
                        goodsColor = goodsColorArr[j];
                        goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsColor.goods_type_id, is_deleted: false });
                        if (goodsType) {
                            // 新建商品
                            const id = await this.ctx.service.createId.getId('Goods');
                            crawlCount = await this.ctx.model.IdentityCounter.findOne({ model: `${pendingGoods.platform}CrawlCounter` }, { count: 1 });
                            const goods = new this.ctx.model.Goods({
                                id,
                                name: pendingGoods.name,
                                url: pendingGoods.url,
                                number: this.ctx.helper.formatGoodsNumber(pendingGoods.number),
                                sku: pendingGoods.size_price_arr,
                                img: Array.isArray(pendingGoods.imgs) && pendingGoods.imgs.length > 0 ? `${pendingGoods.platform}/${pendingGoods.imgs[0]}` : '',
                                platform_id: pendingGoods.platform_id,
                                gender: pendingGoods.gender,
                                goods_type_id: goodsType._id,
                                update_counter: crawlCount ? crawlCount.count : 0,
                            });
                            await goods.save();

                            // 配色和款型关联上
                            await this.ctx.model.GoodsColor.update({
                                _id: goodsColor._id,
                            }, { $addToSet: { goods_id_arr: goods._id } });

                            // 把商品和配色关联上
                            await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { goods_color_id: goodsColor._id } });
                            await this.ctx.model.PendingGoods.update({ _id: pendingGoods._id }, { $set: { is_checked: true } });
                            await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $addToSet: { goods_color_arr: goodsColor._id } });
                            break;
                        }
                    }
                }
            } else {
                console.log('======');
                console.log(pendingGoods);
                console.log('======');
            }
        }
        this.success();
    }
}

module.exports = PendingGoodsController;
