const Controller = require('../../core/baseController');

class GoodsColorController extends Controller {
    async index() {
        this.success('hi, welcome to goodsColor controller!');
    }

    async findPopular() {
        let { page, count } = this.ctx.params;
        page = this.ctx.helper.toInt(page, 1);
        count = this.ctx.helper.toInt(count, 10);
        const query = {
            is_popular: true,
        };
        const goodsColorArr = await this.ctx.model.GoodsColor.find(query)
            .skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.GoodsColor.count(query);
        this.success({
            list: goodsColorArr,
            pagination: {
                total,
                current: page,
            },
        });
    }

    async detail() {
        let { _id, page, count } = this.ctx.request.body;
        const goodsColor = await this.ctx.model.GoodsColor.findOne({ _id });
        if (goodsColor) {
            page = page || 1;
            count = count || 10;
            const query = { _id: { $in: goodsColor.goods_id_arr } };
            const goodsArr = await this.ctx.model.Goods.find(query).skip((page - 1) * count).limit(count);
            const total = await this.ctx.model.Goods.count(query);
            const goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsColor.goods_type_id }, { img: 1, name: 1 });
            this.success({
                goodsColor,
                goodsType,
                goodsArr: {
                    list: goodsArr,
                    pagination: {
                        total,
                        current: page,
                    },
                },
            });
        } else {
            this.fail(`没有找到id为${_id}的配色`);
        }
    }

    async update() {
        const {
            _id,
        } = this.ctx.request.body;
        const newData = { ...this.ctx.request.body };
        delete newData._id;
        delete newData.from;
        await this.ctx.model.GoodsColor.update({ _id }, { $set: newData });
        this.success();
    }

    async merge() {
        const {
            mergeTargetGoodsColor,
            goodsColorArr,
        } = this.ctx.request.body;
        let goodsColor = null;
        for (let i = 0; i < goodsColorArr.length; i++) {
            if (goodsColorArr[i] !== mergeTargetGoodsColor) {
                goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goodsColorArr[i] }, {
                    number: 1, goods_id_arr: 1, goods_type_id: 1,
                });
                if (goodsColor) {
                    for (let j = 0; j < goodsColor.number.length; j++) {
                        await this.ctx.model.GoodsColor.update({ _id: mergeTargetGoodsColor }, {
                            $addToSet: { number: goodsColor.number[j] },
                        });
                    }
                    for (let j = 0; j < goodsColor.goods_id_arr.length; j++) {
                        await this.ctx.model.GoodsColor.update({ _id: mergeTargetGoodsColor }, {
                            $addToSet: { goods_id_arr: goodsColor.goods_id_arr[j] },
                        });
                    }
                    await this.ctx.model.GoodsType.update({ _id: goodsColor.goods_type_id }, { $pull: { goods_color_arr: goodsColorArr[i] } });
                    await this.ctx.model.Goods.update({ goods_color_id: goodsColorArr[i] }, { $set: { goods_color_id: mergeTargetGoodsColor } }, { multi: true });
                }
            }
        }
        this.success();
    }

    async removeGoods() {
        const { _id, goods_id } = this.ctx.params;
        console.log(_id);
        console.log(goods_id);
        let goods_color = await this.ctx.model.GoodsColor.findOne({ _id, goods_id_arr: goods_id }, { goods_id_arr: 1 });
        if (goods_color) {
            const goods = await this.ctx.model.Goods.findOne({ _id: goods_id }, { url: 1 });
            await this.ctx.model.Goods.remove({ _id: goods_id });
            await this.ctx.model.PendingGoods.update({ url: goods.url }, { is_checked: false });
            goods_color = await this.ctx.model.GoodsColor.update({ _id }, { $pull: { goods_id_arr: goods_id } }, { new: true });
            this.success();
        } else {
            this.fail(`没有找到_id为${_id}包含goods_id为${goods_id}的配色`);
        }
    }
}

module.exports = GoodsColorController;
