const Controller = require('../../core/baseController');

class GoodsTypeController extends Controller {
    async index() {
        this.success('hi, welcome to goodsType controller!');
    }

    async find() {
        let {
            name,
            key1,
            key2,
            gender,
            category,
            subCategory,
            brand,
            series,
            page,
            count,
            fields,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
        // this.ctx.validate({
        //     page: 'number',
        //     count: 'number',
        // });
        const queryArr = [{ is_deleted: false }];
        if (name) {
            queryArr.push({
                name: {
                    $regex: name,
                    $options: 'i',
                },
            });
        }
        if (key1) {
            queryArr.push({
                name: {
                    $regex: key1,
                    $options: 'i',
                },
            });
        }
        if (key2) {
            queryArr.push({
                name: {
                    $regex: key2,
                    $options: 'i',
                },
            });
        }
        if (gender && gender >= 0) {
            queryArr.push({
                gender,
            });
        } else if (gender === -1) {
            queryArr.push({
                gender: null,
            });
        }
        if (category && category !== -1) {
            queryArr.push({
                category,
            });
        } else if (category !== 0) {
            queryArr.push({
                category: null,
            });
        }
        if (subCategory === 0) {
            queryArr.push({
                sub_category: null,
            });
        } else if (subCategory && subCategory !== -1) {
            queryArr.push({ subCategory });
        }
        if (brand === 0) {
            queryArr.push({
                brand: null,
            });
        } else if (brand && brand !== -1) {
            queryArr.push({ brand });
        }
        if (series === 0) {
            queryArr.push({
                series: null,
            });
        } else if (series && series !== -1) {
            queryArr.push({ series });
        }
        const query = { $and: queryArr };
        const list = await this.ctx.model.GoodsType.find(query, fields || {}).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.GoodsType.count(query);
        // 带上分类和子分类的数据
        const categoryArr = await this.ctx.model.Category.find();
        // 找出品牌数据
        const brands = await this.ctx.model.Brand.find();
        this.success({
            listData: {
                list,
                pagination: {
                    total,
                    current: page,
                },
            },
            category: categoryArr,
            brands,
        });
    }

    async detail() {
        const { _id } = this.ctx.params;
        const goodsType = await this.ctx.model.GoodsType.findOne({ _id, is_deleted: false });
        const goodsColorArr = await this.ctx.model.GoodsColor.find({ _id: { $in: goodsType.goods_color_arr } });
        // 找出品牌数据
        const brands = await this.ctx.model.Brand.find();
        const category = await this.ctx.model.Category.find();
        if (goodsType) {
            this.success({ goodsType, goodsColorArr, brands, category });
        } else {
            this.fail(`没有找到id为${_id}的款型`);
        }
    }

    async update() {
        const {
            _id,
            name,
            gender,
            brand,
            series,
            category,
            sub_category,
        } = this.ctx.request.body;
        const data = { name, gender };
        if (this.ctx.helper.isObjectId(brand)) data.brand = brand;
        if (this.ctx.helper.isObjectId(series)) data.series = series;
        if (this.ctx.helper.isObjectId(category)) data.category = category;
        if (this.ctx.helper.isObjectId(sub_category)) data.sub_category = sub_category;
        await this.ctx.model.GoodsType.update({ _id }, { $set: data });
        this.success();
    }

    /**
     * 待处理物品关联到已有的款型上
     */
    async connect() {
        const {
            name,
            color_name,
            color_value,
            number,
            imgs,
            platform,
            platform_id,
            url,
            size_price_arr,
            goods_type_id,
            gender,
        } = this.ctx.request.body;
        const goodsType = await this.ctx.model.GoodsType.findOne({ _id: goods_type_id, is_deleted: false }, { goods_color_arr: 1 });
        if (goodsType) {
            // 新建商品
            let id = await this.ctx.service.createId.getId('Goods');
            const crawlCount = await this.ctx.model.IdentityCounter.findOne({ model: `${platform}CrawlCounter` }, { count: 1 });
            const goods = new this.ctx.model.Goods({
                id,
                name,
                url,
                number,
                sku: size_price_arr,
                img: Array.isArray(imgs) && imgs.length > 0 ? `${platform}/${imgs[0]}` : '',
                platform_id,
                gender,
                goods_color_id: goodsType._id,
                update_counter: crawlCount ? crawlCount.count : 0,
            });
            await goods.save();

            // 根据number找到款型下面的配色，如果没有找到，那就new一个
            let goodsColor = await this.ctx.model.GoodsColor.findOne({
                _id: { $in: goodsType.goods_color_arr },
                number,
            }, { _id: 1 });
            if (!goodsColor) {
                // 新建配色
                id = await this.ctx.service.createId.getId('GoodsColor');
                goodsColor = new this.ctx.model.GoodsColor({
                    id,
                    color_name: color_name || '',
                    color_value: color_value || '',
                    number: [ number ],
                    img: Array.isArray(imgs) && imgs.length > 0 ? `${platform}/${imgs[0]}` : '',
                    goods_id_arr: [ goods._id ],
                    // 配色和款型关联上
                    goods_type_id,
                });
                await goodsColor.save();
            } else {
                await this.ctx.model.GoodsColor.update({
                    _id: goodsColor._id,
                }, { $addToSet: { goods_id_arr: goods._id }, $set: { goods_type_id } });
            }
            // 把商品和配色关联上
            await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { goods_color_id: goodsColor._id } });
            await this.ctx.model.GoodsType.update({ _id: goods_type_id }, { $addToSet: { goods_color_arr: goodsColor._id } });
            this.success();
        } else {
            this.fail(`不存在_id为${goods_type_id}的款型`);
        }
    }

    async add() {
        const {
            name,
            gender,
            category,
            subCategory,
            brand,
            series,
            color_name,
            color_value,
            number,
            imgs,
            platform,
            platform_id,
            url,
            size_price_arr,
        } = this.ctx.request.body;
        // console.log(this.ctx.request.body);
        let goodsType = await this.ctx.model.GoodsType.findOne({ name, is_deleted: false }, { id: 1 });
        if (!goodsType) {
            // 新建商品
            let id = await this.ctx.service.createId.getId('Goods');
            const crawlCount = await this.ctx.model.IdentityCounter.findOne({ model: `${platform}CrawlCounter` }, { count: 1 });
            const goods = new this.ctx.model.Goods({
                id,
                name,
                url,
                number,
                sku: size_price_arr,
                img: Array.isArray(imgs) && imgs.length > 0 ? `${platform}/${imgs[0]}` : '',
                platform_id,
                gender,
                update_counter: crawlCount ? crawlCount.count : 0,
            });
            await goods.save();
            // 新建配色
            id = await this.ctx.service.createId.getId('GoodsColor');
            const goodsColor = new this.ctx.model.GoodsColor({
                id,
                color_name: color_name || '',
                color_value: color_value || '',
                number: [ number ],
                img: Array.isArray(imgs) && imgs.length > 0 ? `${platform}/${imgs[0]}` : '',
                goods_id_arr: [ goods._id ],
            });
            await goodsColor.save();
            // 把商品和配色关联上
            await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { goods_color_id: goodsColor._id } });

            id = await this.ctx.service.createId.getId('GoodsType');
            const data = {
                id, name, goods_color_arr: [ goodsColor._id ], img: Array.isArray(imgs) && imgs.length > 0 ? `${platform}/${imgs[0]}` : '',
            };
            if (gender) { data.gender = gender; }
            if (category) { data.category = category; }
            if (subCategory) { data.sub_category = subCategory; }
            if (brand) { data.brand = brand; }
            if (this.ctx.helper.isObjectId(series)) { data.series = series; }
            goodsType = new this.ctx.model.GoodsType(data);
            await goodsType.save();
            // 把配色和款型关联上
            await this.ctx.model.GoodsColor.update({ _id: goodsColor._id }, { $set: { goods_type_id: goodsType._id } });
            await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { goods_type_id: goodsType._id } });
            this.success();
        } else {
            this.fail(`已存在名字为${name}的款型了`);
        }
    }

    async merge() {
        const {
            mergeTargetGoodsType,
            goodsTypeArr,
        } = this.ctx.request.body;
        let goodsType = null;
        for (let i = 0; i < goodsTypeArr.length; i++) {
            if (goodsTypeArr[i] !== mergeTargetGoodsType) {
                goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsTypeArr[i], is_deleted: false }, { goods_color_arr: 1 });
                if (goodsType) {
                    for (let j = 0; j < goodsType.goods_color_arr.length; j++) {
                        await this.ctx.model.GoodsType.update({
                            _id: mergeTargetGoodsType,
                        }, { $addToSet: { goods_color_arr: goodsType.goods_color_arr[j] } });
                    }
                    await this.ctx.model.GoodsColor.update({
                        _id: { $in: goodsType.goods_color_arr },
                    }, { $set: { goods_type_id: mergeTargetGoodsType } }, { multi: true });
                    await this.ctx.model.GoodsType.update({ _id: goodsTypeArr[i] }, { $set: { is_deleted: true } });
                }
            }
        }
        this.ctx.logger.info(`[merge] => mergeTargetGoodsType = ${mergeTargetGoodsType} goodsTypeArr = ${goodsTypeArr.join(',')}`);
        this.success();
    }

    async unMerge() {
        let {
            mergeTargetGoodsType,
            goodsTypeArr,
        } = this.ctx.params;
        goodsTypeArr = goodsTypeArr.split(',');
        let goodsType = null;
        for (let i = 0; i < goodsTypeArr.length; i++) {
            goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsTypeArr[i], is_deleted: true }, { goods_color_arr: 1 });
            if (goodsType) {
                for (let j = 0; j < goodsType.goods_color_arr.length; j++) {
                    await this.ctx.model.GoodsType.update({
                        _id: mergeTargetGoodsType,
                    }, { $pull: { goods_color_arr: goodsType.goods_color_arr[j] } });
                }
                await this.ctx.model.GoodsColor.update({
                    _id: { $in: goodsType.goods_color_arr },
                }, { $set: { goods_type_id: goodsTypeArr[i] } }, { multi: true });
                await this.ctx.model.GoodsType.update({ _id: goodsTypeArr[i] }, { $set: { is_deleted: false } });
            }
        }
        this.success();
    }

    async removeGoodsColor() {
        const { _id, goods_color_id } = this.ctx.params;
        const goodsType = await this.ctx.model.GoodsType.findOne({ _id, goods_color_arr: goods_color_id }, { goods_color_arr: 1 });
        if (goodsType) {
            const goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goods_color_id }, { goods_id_arr: 1 });
            if (goodsColor) {
                if (goodsColor.goods_id_arr.length < 1) {
                    await this.ctx.model.GoodsColor.remove({ _id: goods_color_id });
                    await this.ctx.model.GoodsType.update({ $pull: { goods_color_arr: goods_color_id } });
                    this.success();
                } else {
                    this.fail(`_id为${goods_color_id}的配色还有商品数据，不能删除!`);
                }
            } else {
                this.fail(`没有找到_id为${goods_color_id}的配色`);
            }
        } else {
            this.fail(`没有找到_id为${_id}包含配色_id为${goods_color_id}的款型`);
        }
    }
}

module.exports = GoodsTypeController;
