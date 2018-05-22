const Controller = require('../../core/baseController');

class ShopController extends Controller {
    async index() {
        this.success('hi, welcome to shop!');
    }

    async find() {
        let {
            name,
            platform,
            fields,
            page,
            count,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
        fields = fields || {};
        this.ctx.validate({
            page: 'number',
            count: 'number',
        });
        const query = {};
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        if (platform) {
            query.platform = platform;
        }
        const list = await this.ctx.model.Shop.find(query, fields).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.Shop.count(query);
        this.success({
            list,
            pagination: {
                total,
                current: page,
            },
        });
    }

    async detail() {
        const { id } = this.ctx.params;
        const shop = await this.ctx.model.Shop.findOne({ _id: id });
        if (shop) {
            this.success(shop);
        } else {
            this.fail(`没有找到id为${id}的店铺`);
        }
    }

    async update() {
        const {
            _id,
            id,
            name,
            keywords,
        } = this.ctx.request.body;
        if (Array.isArray(keywords)) {
            const keywordStr = keywords.map(keyword => keyword.replace(/\s/g, '+')).join('&');
            await this.ctx.model.Shop.update({ _id }, { $set: { id, name, subscribe_keywords: keywordStr } });
            this.success();
        } else {
            this.fail(`keywords不是数组=>${keywords}`);
        }
    }
}

module.exports = ShopController;
