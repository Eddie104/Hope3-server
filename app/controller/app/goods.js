const Controller = require('../../core/baseController');

class GoodsController extends Controller {
    async index() {
        let { page, pageSize } = this.ctx.query;
        page = this.ctx.helper.toInt(page, 1);
        pageSize = this.ctx.helper.toInt(pageSize, 10);
        const query = {
            is_deleted: false,
        };
        const goodsArr = await this.ctx.model.Goods.find(query).skip((page - 1) * pageSize).limit(pageSize);
        this.success(goodsArr);
    }

    async show() {
        const { id } = this.ctx.params;
        const goods = await this.ctx.model.Goods.findOne({ _id: id });
        this.success(goods);
    }
}

module.exports = GoodsController;
