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
            platform,
            only_pending,
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
        if (/\w{24}/.test(platform)) {
            query.platform_id = platform;
        }
        if (only_pending === true) {
            query.is_checked = { $ne: true };
        }
        const list = await this.ctx.model.PendingGoods.find(query).skip((page - 1) * count).limit(count);
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
        const { _id } = this.ctx.params;
        await this.ctx.model.PendingGoods.update({ _id }, { $set: { is_checked: true } });
        this.success();
    }

    async autoConnectByNumber() {
        const pendingGoodsArr = await this.ctx.model.PendingGoods.find({ is_checked: { $ne: true } }, {
            name: 1,
            number: 1,
            url: 1,
            size_price_arr: 1,
            imgs: 1,
            platform: 1,
            platform_id: 1,
        });
        let pendingGoods = null;
        let goodsColor = null;
        let goodsType = null;
        for (let i = 0; i < pendingGoodsArr.length; i++) {
            pendingGoods = pendingGoodsArr[i];
            goodsColor = await this.ctx.model.GoodsColor.findOne({ number: pendingGoods.number }, { goods_type_id: 1 });
            if (goodsColor) {
                goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsColor.goods_type_id });
                if (goodsType) {
                    // 新建商品
                    const id = await this.ctx.service.createId.getId('Goods');
                    const goods = new this.ctx.model.Goods({
                        id,
                        name: pendingGoods.name,
                        url: pendingGoods.url,
                        number: pendingGoods.number,
                        sku: pendingGoods.size_price_arr,
                        img: Array.isArray(pendingGoods.imgs) && pendingGoods.imgs.length > 0 ? `${pendingGoods.platform}/${pendingGoods.imgs[0]}` : '',
                        platform_id: pendingGoods.platform_id,
                    });
                    await goods.save();

                    // 配色和款型关联上
                    await this.ctx.model.GoodsColor.update({
                        _id: goodsColor._id,
                    }, { $addToSet: { goods_id_arr: goods._id } });

                    // 把商品和配色关联上
                    await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { goods_color_id: goodsColor._id } });
                    await this.ctx.model.PendingGoods.update({ _id: pendingGoods._id }, { $set: { is_checked: true } });
                }
            }
        }
        this.success();
    }
}

module.exports = PendingGoodsController;
