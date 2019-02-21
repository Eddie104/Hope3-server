const Controller = require('../../core/baseController');

class BrandController extends Controller {
    async index() {
        let { page, pageSize } = this.ctx.query;
        page = this.ctx.helper.toInt(page, 1);
        pageSize = this.ctx.helper.toInt(pageSize, 10);

        const brandArr = await this.ctx.model.Brand.find({ is_deleted: false }).skip((page - 1) * pageSize).limit(pageSize);
        this.success({
            brandArr,
        });
    }
}

module.exports = BrandController;
