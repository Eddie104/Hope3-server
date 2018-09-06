// const fs = require('fs');
// const path = require('path');
const Controller = require('../core/baseController');

class HomeController extends Controller {
    async index() {
        this.success('hi, welcome to HOPE3!');
    }

    async test() {
        // // eastbay
        // let platform = await this.ctx.model.Platform.findOne({ _id: '5b04ff19b0394165bc8de23d' });
        // let goodsArr = await this.ctx.model.Goods.find({ platform_id: platform._id });
        // let total = goodsArr.length;
        // let goods = null;
        // let goodsColor = null;
        // let goodsType = null;
        // let imgName = null;
        // for (let i = 0; i < total; i++) {
        //     console.log(i, total);
        //     goods = goodsArr[i];
        //     goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goods.goods_color_id });
        //     goodsType = await this.ctx.model.GoodsType.findOne({ goods_color_arr: goodsColor._id });
        //     imgName = `${platform.name}/${goods.number}.jpg`;
        //     await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { img: imgName } });
        //     await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $set: { img: imgName } });
        //     await this.ctx.model.GoodsColor.update({ _id: goodsColor._id }, { $set: { goods_type_id: goodsType._id, img: imgName } });
        // }
        // // flightclub
        // platform = await this.ctx.model.Platform.findOne({ _id: '5ac8592c48555b1ba318964a' });
        // goodsArr = await this.ctx.model.Goods.find({ platform_id: platform._id });
        // total = goodsArr.length;
        // for (let i = 0; i < total; i++) {
        //     console.log(i, total);
        //     goods = goodsArr[i];
        //     goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goods.goods_color_id });
        //     goodsType = await this.ctx.model.GoodsType.findOne({ goods_color_arr: goodsColor._id });
        //     imgName = `${platform.name}/${goods.number}.jpg`;
        //     await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { img: imgName } });
        //     await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $set: { img: imgName } });
        //     await this.ctx.model.GoodsColor.update({ _id: goodsColor._id }, { $set: { goods_type_id: goodsType._id, img: imgName } });
        // }
        // // finishline
        // platform = await this.ctx.model.Platform.findOne({ _id: '5ac8594e48555b1ba31896ba' });
        // goodsArr = await this.ctx.model.Goods.find({ platform_id: platform._id });
        // total = goodsArr.length;
        // for (let i = 0; i < total; i++) {
        //     console.log(i, total);
        //     goods = goodsArr[i];
        //     goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goods.goods_color_id });
        //     goodsType = await this.ctx.model.GoodsType.findOne({ goods_color_arr: goodsColor._id });
        //     imgName = `${platform.name}/${goods.number}.jpg`;
        //     await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { img: imgName } });
        //     await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $set: { img: imgName } });
        //     await this.ctx.model.GoodsColor.update({ _id: goodsColor._id }, { $set: { goods_type_id: goodsType._id, img: imgName } });
        // }
        // // champssports
        // platform = await this.ctx.model.Platform.findOne({ _id: '5af1310e48555b1ba3387bcc' });
        // goodsArr = await this.ctx.model.Goods.find({ platform_id: platform._id });
        // total = goodsArr.length;
        // for (let i = 0; i < total; i++) {
        //     console.log(i, total);
        //     goods = goodsArr[i];
        //     goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goods.goods_color_id });
        //     goodsType = await this.ctx.model.GoodsType.findOne({ goods_color_arr: goodsColor._id });
        //     imgName = `${platform.name}/${goods.number}.jpg`;
        //     await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { img: imgName } });
        //     await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $set: { img: imgName } });
        //     await this.ctx.model.GoodsColor.update({ _id: goodsColor._id }, { $set: { goods_type_id: goodsType._id, img: imgName } });
        // }


        // const goodsColorArr = await this.ctx.model.GoodsColor.find({}, { goods_type_id: 1 });
        // let goodsType = null;
        // for (let i = 0; i < goodsColorArr.length; i++) {
        //     console.log(`${i}/${goodsColorArr.length}`);
        //     goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsColorArr[i].goods_type_id }, { name: 1 });
        //     if (goodsType) {
        //         await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $addToSet: { goods_color_arr: goodsColorArr[i]._id } });
        //     } else {
        //         console.log('aaaaa', goodsColorArr[i].goods_type_id);
        //     }
        // }

        // const goodsColorArr = await this.ctx.model.GoodsColor.find({}, { goods_type_id: 1 });
        // let goodsColor = null;
        // for (let i = 0; i < goodsColorArr.length; i++) {
        //     console.log(`${i}/${goodsColorArr.length}`);
        //     goodsColor = goodsColorArr[i];
        //     await this.ctx.model.GoodsType.update({ _id: goodsColor.goods_type_id }, { $addToSet: { goods_color_arr: goodsColor._id } });
        // }

        // const goodsArr = await this.ctx.model.Goods.find({ goods_type_id: { $exists: false } }, { _id: 1 });
        // let goodsColor = null;
        // for (let i = 0; i < goodsArr.length; i++) {
        //     goodsColor = await this.ctx.model.GoodsColor.findOne({ goods_id_arr: goodsArr[i]._id }, { goods_type_id: 1 });
        //     if (goodsColor) {
        //         await this.ctx.model.Goods.update({ _id: goodsArr[i]._id }, { $set: { goods_type_id: goodsColor.goods_type_id } });
        //     }
        // }

        // const pendingGoodsArr = await this.ctx.model.PendingGoods.find({ platform: 'finishline' }, { url: 1 });
        // const urlArr = this.ctx.helper.unique(pendingGoodsArr.map(p => p.url));
        // console.log(urlArr.length);
        /*
        // ObjectId("5ac8594e48555b1ba31896ba")
        // ObjectId("5af1310e48555b1ba3387bcc")
        const model = this.ctx.model;
        const removedPlatformIdArr = [ '5ac8594e48555b1ba31896ba', '5af1310e48555b1ba3387bcc' ];
        await model.PendingGoods.remove({ platform_id: { $in: removedPlatformIdArr } });
        const goodsIdArr = await model.Goods.find({ platform_id: { $in: removedPlatformIdArr } }, { _id: 1 });
        await model.Goods.remove({ platform_id: { $in: removedPlatformIdArr } });
        let goodsColor = null;
        let goodsType = null;
        for (let i = 0; i < goodsIdArr.length; i++) {
            goodsColor = await model.GoodsColor.findOne({ goods_id_arr: goodsIdArr[i] }, { goods_type_id: 1, goods_id_arr: 1 });
            if (goodsColor) {
                if (goodsColor.goods_id_arr.length > 1) {
                    await model.GoodsColor.update({ _id: goodsColor._id }, { $pull: { goods_id_arr: goodsIdArr[i]._id } });
                } else {
                    await model.GoodsColor.remove({ _id: goodsColor._id });
                    goodsType = await model.GoodsType.findOne({ goods_color_arr: goodsColor._id }, { goods_color_arr: 1 });
                    if (goodsType) {
                        if (goodsType.goods_color_arr.length > 1) {
                            await model.GoodsType.update({ _id: goodsType._id }, { $pull: { goods_color_arr: goodsColor._id } });
                        } else {
                            await model.GoodsType.remove({ _id: goodsType._id });
                        }
                    }
                }
            }
            console.log(`${i + 1}/${goodsIdArr.length}`);
        }
        */
        this.success('done');
    }
}

module.exports = HomeController;
