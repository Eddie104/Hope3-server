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
            query.platform = platform;
        }
        if (only_pending === true) {
            query.is_checked = { $ne: true };
        }
        const list = await this.ctx.model.PendingGoods.find(query).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.PendingGoods.count(query);
        // 根据list找出goodsType,让前端知道pendingGoods是否有同名的GoodsType
        // const nameArr = [];
        // for (let i = 0; i < list.length; i++) {
        //     nameArr[i] = list[i].name;
        // }
        // const goodsTypeArr = await this.ctx.model.GoodsType.find({ name: { $in: nameArr } }, { name: 1 });
        // for (let i = 0; i < list.length; i++) {
        //     list[i] = list[i]._doc;
        //     for (let j = 0; j < goodsTypeArr.length; j++) {
        //         if (goodsTypeArr[j].name === list[i].name) {
        //             list[i].has_same_goods_type_name = true;
        //             break;
        //         }
        //     }
        // }
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

    // async fetchBrandAndCategory() {
    //     const brands = await this.ctx.model.Brand.find({ is_deleted: false });
    //     const category = await this.ctx.model.Category.find({}, { name: 1 });
    //     this.success({
    //         brands,
    //         category,
    //     });
    // }

    // async relationGoodsType() {
    //     const {
    //         pendingGoods: {
    //             _id,
    //         },
    //         goodsTypeSelected,
    //     } = this.ctx.request.body;
    //     const goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsTypeSelected });
    //     if (goodsType) {
    //         await this._relationGoodsType(goodsType, this.ctx.request.body.pendingGoods);
    //         this.success({
    //             _id,
    //         });
    //     } else {
    //         this.fail(`关联失败，没有找到id为${_id}的款型`);
    //     }
    // }

    // async createGoodsType() {
    //     const {
    //         name,
    //         brand,
    //         series,
    //         category,
    //         subCategory,
    //         gender,
    //         _id,
    //     } = this.ctx.request.body;
    //     let goodsType = await this.ctx.model.GoodsType.findOne({ name }, { name: 1 });
    //     if (!goodsType) {
    //         const newValue = {
    //             brand_id: brand,
    //             category_id: category,
    //             sub_category_id: subCategory,
    //             gender: gender || 0,
    //         };
    //         if (series && series !== 'null') {
    //             newValue.series_id = series;
    //         }
    //         goodsType = await this.ctx.service.createModel.createGoodsType(name);
    //         goodsType = await this.ctx.model.GoodsType.findOneAndUpdate({ _id: goodsType._id }, {
    //             $set: newValue,
    //         }, { new: true });
    //         await this._relationGoodsType(goodsType, this.ctx.request.body, true);
    //         this.success({
    //             _id,
    //         });
    //     } else {
    //         this.fail(`已存在名为${name}的款型了，不能重复添加!`);
    //     }
    // }

    // async _relationGoodsType(goodsType, params, isGoodsTypeNew = false) {
    //     const {
    //         colorName,
    //         colorValue,
    //         number,
    //         imgs,
    //         url,
    //         size_price_arr,
    //         _id,
    //         platform,
    //     } = params;
    //     // 将图片从临时的目录里移动到指定目录
    //     // 先新建文件夹
    //     const fileDir = path.join(this.config.baseDir, 'app/public/', goodsType._id.toString());
    //     if (!fs.existsSync(fileDir)) {
    //         fs.mkdirSync(fileDir);
    //     }
    //     let imgPath = null;
    //     let newImgPath = null;
    //     let newImgName = null;
    //     const newImgs = [];
    //     let isOK = false;
    //     for (let i = 0; i < imgs.length; i++) {
    //         isOK = true;
    //         imgPath = path.join(this.config.baseDir, 'app/public/tmp/', number.replace(/ /g, '_'), imgs[i]);
    //         newImgName = `${new Date().getTime() + Math.floor(Math.random() * 9999)}.jpg`;
    //         newImgs[i] = newImgName;
    //         newImgPath = path.join(fileDir, newImgName);
    //         try {
    //             fs.renameSync(imgPath, newImgPath);
    //         } catch (error) {
    //             isOK = false;
    //             this.ctx.logger.info(`[ERROR] => no img : ${imgPath}`);
    //         }
    //         if (isOK) {
    //             // 再上传到七牛
    //             await this.ctx.helper.uploadImg(`goodsType/${goodsType._id}/${newImgName}`, newImgPath, this.ctx.app.config.qiniu.scope);
    //         }
    //         // 只搞第一张图
    //         break;
    //     }

    //     // 添加配色
    //     const goodsTypeColor = await this.ctx.model.GoodsTypeColor.findOneAndUpdate({
    //         number,
    //     }, {
    //             // 配色名称
    //             name: colorName,
    //             // 编号
    //             number,
    //             color: colorValue,
    //             imgs: newImgs,
    //             goods_type_id: goodsType._id,
    //         }, {
    //             upsert: true,
    //             new: true,
    //         });
    //     // 把图片数据和配色添加到款型里
    //     if (isGoodsTypeNew) {
    //         await this.ctx.model.GoodsType.update({
    //             _id: goodsType._id,
    //         }, {
    //                 $addToSet: {
    //                     color_id_arr: goodsTypeColor._id,
    //                 },
    //                 $set: {
    //                     imgs: newImgs.map(name => { return { name }; }),
    //                 },
    //             });
    //     } else {
    //         await this.ctx.model.GoodsType.update({
    //             _id: goodsType._id,
    //         }, {
    //                 $addToSet: {
    //                     color_id_arr: goodsTypeColor._id,
    //                 },
    //             });
    //     }

    //     // 添加商品数据
    //     let goods = await this.ctx.model.Goods.findOne({ url }, { id: 1 });
    //     if (!goods) {
    //         goods = await this.ctx.service.createModel.createGoods(url, platform);
    //     }
    //     goods = await this.ctx.model.Goods.findOneAndUpdate({ _id: goods._id }, {
    //         $set: {
    //             goods_type_id: goodsType._id,
    //             goods_type_color_id: goodsTypeColor._id,
    //         },
    //     }, { new: true });
    //     // 添加sku数据
    //     let sku = null;
    //     let minPrice = Number.MAX_VALUE;
    //     const skuIdArr = [];
    //     for (let i = 0; i < size_price_arr.length; i++) {
    //         const { price, size } = size_price_arr[i];
    //         minPrice = minPrice > price ? price : minPrice;
    //         sku = await this.ctx.service.createModel.createSKU(number, goods._id, colorName, size);
    //         sku = await this.ctx.model.Sku.findOneAndUpdate({ number }, {
    //             $set: {
    //                 price,
    //             },
    //         }, { new: true });
    //         skuIdArr[i] = sku._id;
    //     }
    //     // 将sku数组存到商品里
    //     await this.ctx.model.Goods.update({
    //         _id: goods._id,
    //     }, {
    //             $set: { sku_id_arr: skuIdArr, min_price: minPrice },
    //         });

    //     // 最后，把待处理的商品变成已处理
    //     await this.ctx.model.PendingGoods.update({ _id }, { $set: { is_checked: true, check_date: this.ctx.helper.now() } });
    // }

    // // 同个网站上不同颜色的鞋是不同的商品
    // // 但是名字是一样的，那根据名字自动关联款型
    // async autoRelation() {
    //     const pendingGoodsArr = await this.ctx.model.PendingGoods.find({
    //         is_checked: { $ne: true },
    //     }, {
    //             name: 1,
    //             colorName: 1,
    //             colorValue: 1,
    //             number: 1,
    //             imgs: 1,
    //             url: 1,
    //             size_price_arr: 1,
    //             platform: 1,
    //         });
    //     let goodsType = null;
    //     for (let i = 0; i < pendingGoodsArr.length; i++) {
    //         goodsType = await this.ctx.model.GoodsType.findOne({ name: pendingGoodsArr[i].name });
    //         if (goodsType) {
    //             await this._relationGoodsType(goodsType, pendingGoodsArr[i]);
    //         }
    //     }
    //     this.success();
    // }

    // async autoRelationByNumber() {
    //     const pendingGoodsArr = await this.ctx.model.PendingGoods.find({
    //         is_checked: { $ne: true },
    //     }, {
    //             name: 1,
    //             colorName: 1,
    //             colorValue: 1,
    //             number: 1,
    //             imgs: 1,
    //             url: 1,
    //             size_price_arr: 1,
    //             platform: 1,
    //         });
    //     let goodsTypeColor = null;
    //     let goodsType = null;
    //     let pendingGoodsNumber = null;
    //     for (let i = 0; i < pendingGoodsArr.length; i++) {
    //         pendingGoodsNumber = pendingGoodsArr[i].number;
    //         goodsTypeColor = await this.ctx.model.GoodsTypeColor.findOne({
    //             number: {
    //                 $regex: pendingGoodsNumber,
    //                 $options: 'i',
    //             },
    //         }, { goods_type_id: 1 });
    //         if (!goodsTypeColor) {
    //             if (!pendingGoodsNumber.includes(' ')) {
    //                 const numberArr = pendingGoodsNumber.split('');
    //                 if (numberArr.length > 3) {
    //                     numberArr.splice(numberArr.length - 3, 0, ' ');
    //                     pendingGoodsNumber = numberArr.join('');
    //                     goodsTypeColor = await this.ctx.model.GoodsTypeColor.findOne({
    //                         number: {
    //                             $regex: `^\w?${pendingGoodsNumber}`,
    //                             $options: 'i',
    //                         },
    //                     }, { goods_type_id: 1 });
    //                 }
    //             }
    //         }
    //         if (goodsTypeColor) {
    //             goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsTypeColor.goods_type_id });
    //             if (goodsType) {
    //                 await this._relationGoodsType(goodsType, pendingGoodsArr[i]);
    //             }
    //         }
    //     }
    //     this.success();
    // }

    // // 获取number相似的待处理商品
    // async findSimilarNumberPendingGoods() {
    //     let {
    //         page,
    //         count,
    //     } = this.ctx.request.body;
    //     page = page || 1;
    //     count = count || 10;
    //     const unCheckedPendingGoodsList = await this.ctx.model.PendingGoods.find({
    //         is_checked: { $ne: true },
    //     }, {
    //             number: 1,
    //             imgs: 1,
    //             id: 1,
    //             name: 1,
    //         }).skip((page - 1) * count).limit(count);
    //     const total = await this.ctx.model.PendingGoods.count({ is_checked: { $ne: true } });
    //     // 找到number最相似的款型
    //     let pendingGoodsNumber = null;
    //     let pendingGoodsNumberArr = null;
    //     let goodsTypeColor = null;
    //     for (let i = 0; i < unCheckedPendingGoodsList.length; i++) {
    //         pendingGoodsNumber = unCheckedPendingGoodsList[i].number;
    //         pendingGoodsNumberArr = pendingGoodsNumber.split('');
    //         if (!pendingGoodsNumber.includes(' ')) {
    //             pendingGoodsNumberArr.splice(pendingGoodsNumberArr.length - 3, 0, ' ');
    //             pendingGoodsNumber = pendingGoodsNumberArr.join('');
    //         }
    //         goodsTypeColor = await this.ctx.model.GoodsTypeColor.findOne({
    //             number: {
    //                 $regex: `\w?${pendingGoodsNumber}`,
    //                 $options: 'i',
    //             },
    //         }, { goods_type_id: 1, imgs: 1 });
    //         if (!goodsTypeColor) {
    //             pendingGoodsNumberArr.shift();
    //             pendingGoodsNumber = pendingGoodsNumberArr.join('');
    //             goodsTypeColor = await this.ctx.model.GoodsTypeColor.findOne({
    //                 number: {
    //                     $regex: pendingGoodsNumber,
    //                     $options: 'i',
    //                 },
    //             }, { goods_type_id: 1, imgs: 1 });
    //         }
    //         if (goodsTypeColor) {
    //             unCheckedPendingGoodsList[i] = {
    //                 ...unCheckedPendingGoodsList[i]._doc,
    //                 goodsTypeColor: {
    //                     ...goodsTypeColor._doc,
    //                 },
    //             };
    //         }
    //     }
    //     this.success({
    //         list: unCheckedPendingGoodsList,
    //         pagination: {
    //             total,
    //             current: page,
    //         },
    //     });
    // }
}

module.exports = PendingGoodsController;
