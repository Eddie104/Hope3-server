const Controller = require('../../core/baseController');

class GoodsTypeController extends Controller {
    async index() {
        this.success('hi, welcome to goodsType controller!');
    }

    async find() {
        let {
            name,
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
        const list = await this.ctx.model.GoodsType.find(query).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.GoodsType.count(query);
        this.success({
            list,
            pagination: {
                total,
                current: page,
            },
        });
    }

    // async detail() {
    //     const { id } = this.ctx.params;
    //     const platform = await this.ctx.model.Platform.findOne({ _id: id });
    //     if (platform) {
    //         this.success(platform);
    //     } else {
    //         this.fail(`没有找到id为${id}的平台`);
    //     }
    // }

    // async update() {
    //     const {
    //         id,
    //         name,
    //         domain,
    //     } = this.ctx.request.body;
    //     await this.ctx.model.Platform.update({ _id: id }, { $set: { name, domain } });
    //     this.success();
    // }

    async add() {
        const {
            name,
            gender,
            category,
            subCategory,
            brand,
            series,
        } = this.ctx.request.body;
        let goodsType = await this.ctx.model.GoodsType.findOne({ name }, { id: 1 });
        if (!goodsType) {
            const id = await this.ctx.service.createId.getId('GoodsType');
            const data = {
                id, name, goods_color_arr: [],
            };
            if (gender) { data.gender = gender; }
            if (category) { data.category = category; }
            if (subCategory) { data.subCategory = subCategory; }
            if (brand) { data.brand = brand; }
            if (series) { data.series = series; }
            goodsType = new this.ctx.model.GoodsType(data);
            await goodsType.save();
            this.success();
        } else {
            this.fail(`已存在名字为${name}的款型了`);
        }
    }
}

module.exports = GoodsTypeController;
