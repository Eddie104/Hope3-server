const Service = require('egg').Service;

class CreateService extends Service {

    async createGoodsType(name) {
        const id = await this._getId('GoodsType');
        const model = new this.ctx.model.GoodsType({
            id,
            name,
        });
        await model.save();
        return model;
    }

    async createGoodsTypeColor(name) {
        const id = await this._getId('GoodsTypeColor');
        const model = new this.ctx.model.GoodsTypeColor({
            id,
            name,
        });
        await model.save();
        return model;
    }

    async createBrand(name) {
        const id = await this._getId('Brand');
        const model = new this.ctx.model.Brand({
            id,
            name,
        });
        await model.save();
        return model;
    }

    async createCategory(name) {
        const id = await this._getId('Category');
        const model = new this.ctx.model.Category({
            id,
            name,
        });
        await model.save();
        return model;
    }

    async createSubCategory(name, parent) {
        const id = await this._getId('SubCategory');
        const model = new this.ctx.model.SubCategory({
            id,
            name,
            parent,
        });
        await model.save();
        return model;
    }

    async createGoods(url, platform) {
        const id = await this._getId('Goods');
        const model = new this.ctx.model.Goods({
            id,
            url,
            platform,
        });
        await model.save();
        return model;
    }

    async createPendingGoods(number, platform) {
        const id = await this._getId('PendingGoods');
        const model = new this.ctx.model.PendingGoods({
            id,
            number,
            platform,
        });
        await model.save();
        return model;
    }

    async createSKU(number, goodsId, colorName, size) {
        const id = await this._getId('SKU');
        const model = new this.ctx.model.Sku({
            id,
            number,
            goods_id: goodsId,
            colorName,
            size,
        });
        await model.save();
        return model;
    }

    async _getId(model) {
        const result = await this.ctx.model.IdentityCounter.findOneAndUpdate({
            model,
        }, {
            $inc: {
                count: 1,
            },
        }, {
            upsert: true,
            new: true,
        });
        return result.count;
    }

}

module.exports = CreateService;
