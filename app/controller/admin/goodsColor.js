const Controller = require('../../core/baseController');

class GoodsColorController extends Controller {
    async index() {
        this.success('hi, welcome to goodsColor controller!');
    }

    async detail() {
        const { _id } = this.ctx.params;
        const goodsColor = await this.ctx.model.GoodsColor.findOne({ _id });
        if (goodsColor) {
            this.success({ goodsColor });
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
