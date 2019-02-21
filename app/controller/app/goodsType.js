const Controller = require('../../core/baseController');

class GoodsTypeController extends Controller {
    async index() {
        let { page, pageSize, series } = this.ctx.query;
        page = this.ctx.helper.toInt(page, 1);
        pageSize = this.ctx.helper.toInt(pageSize, 10);
        const query = {
            is_deleted: false,
        };
        if (this.ctx.helper.isObjectId(series)) {
            query.series = series;
        }
        const goodsTypeArr = await this.ctx.model.GoodsType.find(query).skip((page - 1) * pageSize).limit(pageSize);
        this.success(goodsTypeArr);
    }

    async show() {
        const { id } = this.ctx.params;
        const { goodsColorId } = this.ctx.query;
        const goodsType = await this.ctx.model.GoodsType.findOne({ _id: id }, {
            img: 1,
            name: 1,
            goods_color_arr: 1,
        }).lean();
        // 获取款型下的配色，获得的配色中必须包含goodsColorId
        const goodsColorFields = {
            img: 1,
            name: 1,
            goods_id_arr: 1,
            color_name: 1,
            color_value: 1,
            color_type: 1,
        };
        const targetGoodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goodsColorId }, goodsColorFields);
        const goodsColorIdArr = goodsType.goods_color_arr;
        for (let i = 0; i < goodsColorIdArr.length; i++) {
            if (goodsColorIdArr[i].toString() === goodsColorId) {
                goodsColorIdArr.splice(i, 1);
                break;
            }
        }
        const goodsColorArr = await this.ctx.model.GoodsColor.find({
            _id: { $in: goodsColorIdArr },
        }, goodsColorFields).limit(10);
        goodsColorArr.unshift(targetGoodsColor);

        // 再获取目标配色的商品数据
        const goodsArr = await this.ctx.model.Goods.find({
            _id: { $in: targetGoodsColor.goods_id_arr },
        }, {
            img: 1,
            sku: 1,
        });
        // 删除款型的配色数据，省得浪费带宽
        delete goodsType.goods_color_arr;

        this.success({
            goodsType,
            goodsColorArr,
            goodsArr,
        });
    }
}

module.exports = GoodsTypeController;
