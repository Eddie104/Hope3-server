const Controller = require('../../core/baseController');

class GoodsColorController extends Controller {
    async index() {
        this.success('hi, welcome to goodsColor controller!');
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
            this.success({ goodsColor, goodsArr: {
                list: goodsArr,
                pagination: {
                    total,
                    current: page,
                },
            } });
        } else {
            this.fail(`没有找到id为${_id}的配色`);
        }
    }

    async update() {
        const {
            _id,
            color_name,
            color_value,
            number,
        } = this.ctx.request.body;
        await this.ctx.model.GoodsColor.update({ _id }, { $set: {
            color_name,
            color_value,
            number,
        } });
        this.success();
    }
}

module.exports = GoodsColorController;
