// const fs = require('fs');
// const path = require('path');
const Controller = require('../core/baseController');

class HomeController extends Controller {
    async index() {
        this.success('hi, welcome to HOPE3!');
    }

    async test() {
        // const goodsArr = await this.ctx.model.Goods.find({
        //     goods_type_id: { $exists: false },
        // }, { goods_color_id: 1 });
        // let goodsColor = null;
        // for (let i = 0; i < goodsArr.length; i++) {
        //     goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goodsArr[i].goods_color_id }, { goods_type_id: 1 });
        //     if (goodsColor) {
        //         await this.ctx.model.Goods.update({
        //             _id: goodsArr[i]._id,
        //         }, {
        //             $set: {
        //                 goods_type_id: goodsColor.goods_type_id,
        //             },
        //         });
        //         console.log(`${i}/${goodsArr.length}`);
        //     }
        // }

        // const goodsTypeArr = await this.ctx.model.GoodsType.find({ is_deleted: false }, { goods_color_arr: 1 });
        // for (let i = 0; i < goodsTypeArr.length; i++) {
        //     await this.ctx.model.GoodsColor.update({
        //         _id: { $in: goodsTypeArr[i].goods_color_arr },
        //     }, {
        //         $set: {
        //             goods_type_id: goodsTypeArr[i]._id,
        //         },
        //     }, { multi: true });
        //     console.log(`${i}/${goodsTypeArr.length}`);
        // }
        this.success('done');
    }
}

module.exports = HomeController;
