const Controller = require('../../core/baseController');
class CategoryController extends Controller {
    async index() {
        this.success('hi, welcome to category!');
    }

    async add() {
        const {
            name,
        } = this.ctx.request.body;
        let category = await this.ctx.model.Category.findOne({ name });
        if (!category) {
            const id = await this.ctx.service.createId.getId('Category');
            category = new this.ctx.model.Category({
                id, name,
            });
            await category.save();
            this.success(category);
        } else {
            this.fail(`已存在名为${name}的类目了`);
        }
    }

    async find() {
        let {
            name,
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
        const list = await this.ctx.model.Category.find(query, fields).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.Category.count(query);
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
        const category = await this.ctx.model.Category.findOne({ _id: id });
        if (category) {
            const subCategory = await this.ctx.model.SubCategory.find({ parent: id });
            this.success({
                category,
                subCategory,
            });
        } else {
            this.fail(`没有找到id为${id}的类目`);
        }
    }

    async update() {
        const {
            _id,
            name,
            sub_category,
        } = this.ctx.request.body;
        let subCategory = null;
        for (let i = 0; i < sub_category.length; i++) {
            if (sub_category[i].changed) {
                if (sub_category[i]._id) {
                    await this.ctx.model.SubCategory.update({ _id: sub_category[i]._id }, { name: sub_category[i].name });
                } else {
                    const id = await this.ctx.service.createId.getId('SubCategory');
                    subCategory = new this.ctx.model.SubCategory({
                        parent: _id,
                        id,
                        name: sub_category[i].name,
                    });
                    await subCategory.save();
                }
            }
        }
        subCategory = await this.ctx.model.SubCategory.find({ parent: _id });
        await this.ctx.model.Category.update({ _id }, {
            $set: {
                name,
                sub_category: subCategory.map(item => item._id),
            },
        });
        this.success(subCategory);
    }

    async fetchSubCategory() {
        const { _id } = this.ctx.params;
        const subCategory = await this.ctx.model.SubCategory.find({ parent: _id });
        this.success(subCategory);
    }
}

module.exports = CategoryController;
