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
        const list = await this.ctx.model.Brand.find(query).skip((page - 1) * count).limit(count)
            .sort({ id: 1 });
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
            const id = await this.ctx.service.createId.getId('Brand');
            brand = new this.ctx.model.Brand({
                id,
                name,
            });
            await brand.save();
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

    async fetchGoodsImgBySeriesId() {
        let { seriesId, page, pageSize } = this.ctx.params;
        page = this.ctx.helper.toInt(page, 1);
        pageSize = this.ctx.helper.toInt(pageSize, 10);
        const brand = await this.ctx.model.Brand.findOne({ 'series._id': seriesId }, { series: 1 });
        let series = null;
        for (let i = 0; i < brand.series.length; i++) {
            series = brand.series[i];
            if (series._id.toString() === seriesId) break;
            series = null;
        }
        const goodsTypeArr = await this.ctx.model.GoodsType.find({
            series: seriesId,
        }, { _id: 1 }).lean();
        const goodsTypeIdArr = goodsTypeArr.map(goodsType => goodsType._id.toString());
        const list = await this.ctx.model.Goods.find({
            goods_type_id: { $in: goodsTypeIdArr },
        }, {
            img: 1,
        }).skip((page - 1) * pageSize).limit(pageSize);
        const total = await this.ctx.model.Goods.count({
            goods_type_id: { $in: goodsTypeIdArr },
        });
        this.success({
            seriesImg: series.img,
            list,
            pagination: {
                total,
                current: page,
            },
        });
    }

    async setSeriesImg() {
        const { brandId, seriesId, img } = this.ctx.request.body;
        await this.ctx.model.Brand.update({
            _id: brandId,
            'series._id': seriesId,
        }, {
            $set: {
                'series.$.img': img,
            },
        });
        this.success();
    }
}

module.exports = BrandController;
