// const fs = require('fs');
// const path = require('path');
const Controller = require('../../core/baseController');

class PendingGoodsController extends Controller {
    async index() {
        this.success('hi, welcome to pendingGoodsController!');
    }

    async find() {
        let {
            name,
            platform,
            only_pending,
            page,
            count,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
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
        if (/\w{24}/.test(platform)) {
            query.platform_id = platform;
        }
        if (only_pending === true) {
            query.is_checked = { $ne: true };
        }
        const list = await this.ctx.model.PendingGoods.find(query).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.PendingGoods.count(query);
        // 找出平台
        const platformList = await this.ctx.model.Platform.find();
        this.success({
            list,
            pagination: {
                total,
                current: page,
            },
            platform: platformList,
        });
    }

    async fetchBrandAndCategory() {
        const brands = await this.ctx.model.Brand.find({ is_deleted: false });
        const category = await this.ctx.model.Category.find({}, { name: 1 });
        this.success({
            brands,
            category,
        });
    }

    async setCheck() {
        const { _id } = this.ctx.params;
        await this.ctx.model.PendingGoods.update({ _id }, { $set: { is_checked: true } });
        this.success();
    }
}

module.exports = PendingGoodsController;
