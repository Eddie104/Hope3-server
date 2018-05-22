const Controller = require('../../core/baseController');

class BrandController extends Controller {
    async index() {
        this.success('hi, welcome to brand!');
    }

    async find() {
        let {
            name,
            page,
            count,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
        this.ctx.validate({
            page: 'number',
            count: 'number',
        });
        const query = { is_deleted: false };
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        const list = await this.ctx.model.Brand.find(query).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.Brand.count(query);
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
        const brand = await this.ctx.model.Brand.findOne({ _id: id, is_deleted: false });
        if (brand) {
            this.success(brand);
        } else {
            this.fail(`没有找到id为${id}的品牌`);
        }
    }

    async update() {
        const {
            id,
            name,
            series,
        } = this.ctx.request.body;
        let brand = await this.ctx.model.Brand.findOne({ _id: id });
        if (brand) {
            const newSeries = brand.series.map(s => s._doc);
            let needRemove = false;
            for (let i = newSeries.length - 1; i > -1; i--) {
                needRemove = true;
                for (let j = 0; j < series.length; j++) {
                    if (newSeries[i]._id.toString() === series[j]._id) {
                        needRemove = false;
                        break;
                    }
                }
                if (needRemove) {
                    newSeries.splice(i, 1);
                }
            }
            let needAdd = false;
            for (let i = 0; i < series.length; i++) {
                needAdd = true;
                for (let j = 0; j < newSeries.length; j++) {
                    if (newSeries[j]._id) {
                        if (series[i]._id === newSeries[j]._id.toString()) {
                            needAdd = false;
                            newSeries[j].name = series[i].name;
                            break;
                        }
                    }
                }
                if (needAdd) {
                    newSeries.push({ name: series[i].name });
                }
            }
            brand = await this.ctx.model.Brand.findOneAndUpdate({ _id: id }, { $set: { series: newSeries, name } }, { new: true });
            this.success(brand);
        } else {
            this.fail(`没有找到id为${id}的品牌`);
        }
    }

    async add() {
        const {
            name,
        } = this.ctx.request.body;
        let brand = await this.ctx.model.Brand.findOne({ name }, { name: 1 });
        if (!brand) {
            brand = await this.ctx.service.createModel.createBrand(name);
            this.success(brand);
        } else {
            this.fail(`已存在名字为${name}的品牌了`);
        }
    }

    async remove() {
        const { id } = this.ctx.params;
        await this.ctx.model.Brand.findOneAndUpdate({ _id: id }, { is_deleted: true });
        this.success(id);
    }
}

module.exports = BrandController;
