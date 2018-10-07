const Controller = require('../../core/baseController');

class ShoesController extends Controller {
    async index() {
        let { page, pageSize } = this.ctx.query;
        page = this.ctx.helper.toInt(page, 1);
        pageSize = this.ctx.helper.toInt(pageSize, 10);
        const shoesArr = await this.ctx.model.Goods.find().skip((page - 1) * pageSize).limit(pageSize);
        this.success(shoesArr);
    }

    async show() {
        const { id } = this.ctx.params;
        const shoes = await this.ctx.model.Goods.findOne({ _id: id });
        this.success(shoes);
    }
}

module.exports = ShoesController;
