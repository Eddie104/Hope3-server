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
        this.success();
    }
}

module.exports = HomeController;
