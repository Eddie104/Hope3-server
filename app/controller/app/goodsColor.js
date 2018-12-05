const Controller = require('../../core/baseController');

class GoodsColorController extends Controller {
    async index() {
        let { page, pageSize } = this.ctx.query;
        page = this.ctx.helper.toInt(page, 1);
        pageSize = this.ctx.helper.toInt(pageSize, 10);
        const goodsColorArr = await this.ctx.model.GoodsColor.find().skip((page - 1) * pageSize).limit(pageSize);
        this.success(goodsColorArr);
    }

    async show() {
        const { id } = this.ctx.params;
        const goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: id });
        this.success(goodsColor);
    }

    async top() {
        let { count } = this.ctx.params;
        count = this.ctx.helper.toInt(count, 16);
        const query = { is_popular: true };
        const fields = {
            img: 1,
            goods_id_arr: 1,
            name: 1,
        };
        let goodsColorArr = null;
        if (count > 0) {
            goodsColorArr = await this.ctx.model.GoodsColor.find(query, fields).limit(count).lean();
        } else {
            goodsColorArr = await this.ctx.model.GoodsColor.find(query, fields).lean();
        }

        // 拿到对应的商品数据
        let goodsIdArr = [];
        for (let index = 0; index < goodsColorArr.length; index++) {
            goodsIdArr = goodsIdArr.concat(goodsColorArr[index].goods_id_arr);
        }
        const goodsArr = await this.ctx.model.Goods.find({
            _id: { $in: goodsIdArr },
        }, { sku: 1, goods_color_id: 1 }).lean();
        // 找出最便宜的goods
        let goods = null;
        let skuArr = null;
        const skuSortFun = (a, b) => a.price > b.price;
        for (let index = 0; index < goodsArr.length; index++) {
            goods = goodsArr[index];
            for (let i = 0; i < goodsColorArr.length; i++) {
                if (goodsColorArr[i]._id.toString() === goods.goods_color_id.toString()) {
                    skuArr = goods.sku;
                    if (skuArr.length > 0) {
                        skuArr = skuArr.filter(s => s.isInStock).sort(skuSortFun);
                        if (!goodsColorArr[i].price || goodsColorArr[i].price > skuArr[0].price) {
                            goodsColorArr[i].price = skuArr[0].price;
                        }
                    }
                    break;
                }
            }
        }
        this.success({
            goodsColorArr,
        });
    }
}

module.exports = GoodsColorController;
