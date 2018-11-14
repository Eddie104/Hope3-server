const Controller = require('../../core/baseController');

class GoodsController extends Controller {
    async index() {
        this.success('hi, welcome to goods controller!');
    }

    async find() {
        let {
            name,
            number,
            page,
            count,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
        // this.ctx.validate({
        //     page: 'number',
        //     count: 'number',
        // });
        const query = {};
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        if (number) {
            query.number = {
                $regex: number,
                $options: 'i',
            };
        }
        const list = await this.ctx.model.Goods.find(query).skip((page - 1) * count).limit(count);
        // 带上款型
        const goodsTypeIdArr = list.map(goods => goods.goods_type_id);
        const goodsTypeArr = await this.ctx.model.GoodsType.find({ _id: { $in: goodsTypeIdArr } }, { name: 1, img: 1 });
        const total = await this.ctx.model.Goods.count(query);
        this.success({
            goodsTypeArr,
            list,
            pagination: {
                total,
                current: page,
            },
        });
    }

    async detail() {
        const { _id } = this.ctx.params;
        const goods = await this.ctx.model.Goods.findOne({ _id });
        const platform = await this.ctx.model.Platform.find();
        if (goods) {
            this.success({ goods, platform });
        } else {
            this.fail(`没有找到id为${_id}的商品`);
        }
    }

    async update() {
        const {
            _id,
            sku,
            number,
            platform_id,
            name,
        } = this.ctx.request.body;
        const data = {
            sku,
            number,
            name,
        };
        if (this.ctx.helper.isObjectId(platform_id)) data.platform_id = platform_id;
        await this.ctx.model.Goods.update({ _id }, { $set: data });
        this.success();
    }
}

module.exports = GoodsController;
