const Controller = require('../../core/baseController');

class GoodsController extends Controller {
    async index() {
        let { page, pageSize } = this.ctx.query;
        page = this.ctx.helper.toInt(page, 1);
        pageSize = this.ctx.helper.toInt(pageSize, 10);
        const goodsTypeArr = await this.ctx.model.GoodsType.find().skip((page - 1) * pageSize).limit(pageSize);
        this.success(goodsTypeArr);
    }

    async show() {
        const { id } = this.ctx.params;
        const goodsType = await this.ctx.model.GoodsType.findOne({ _id: id });
        this.success(goodsType);
    }
}

module.exports = GoodsController;
