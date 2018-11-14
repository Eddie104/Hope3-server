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

        // const goodsColorArr = await this.ctx.model.GoodsColor.find({ goods_type_id: null });
        // let goodsType = null;
        // for (let i = 0; i < goodsColorArr.length; i++) {
        //     goodsType = await this.ctx.model.GoodsType.findOne({ goods_color_arr: goodsColorArr[i]._id });
        //     if (goodsType) {
        //         await this.ctx.model.GoodsColor.update({
        //             _id: goodsColorArr[i]._id,
        //         }, {
        //             $set: {
        //                 goods_type_id: goodsType._id,
        //             },
        //         });
        //     }
        // }
        // const goodsTypeIdArr = [
        //     // '5adac8a4d4d146356a2dda00', '5ad343a07481447cd799bc65', '5adac8a4d4d146356a2dda00', '5b27800daf99ea7cbec8259a', '5ba49728a0af7a5a45dc46e7', '5b27800daf99ea7cbec8259a', '5ba396e5a0af7a5a45dc0e26', '5ba396e5a0af7a5a45dc0e26', '5b7a8d74d7050f0551d6b9bf', '5ad346d77481447cd799bdd7', '5ba3a5d9a0af7a5a45dc12d3', '5ad35b467481447cd799e24d', '5ad353607481447cd799d735', '5ad3525e7481447cd799d61e', '5ad346d77481447cd799bdd7', '5b5c47f7b3db8a711ad387e8', '5ba4405ea0af7a5a45dc1728', '5ba4405ea0af7a5a45dc1728', '5ba78f9ba0af7a5a45dc91eb', '5b7e16d2d7050f0551d6c68a', '5b7e824ed7050f0551d6db30', '5b7e16d2d7050f0551d6c68a', '5ad352687481447cd799d629', '5ad35be77481447cd799e290', '5ad352687481447cd799d629', '5ba449dba0af7a5a45dc1e17', '5ba449dba0af7a5a45dc1e17', '5ba449eda0af7a5a45dc1e42', '5ad344307481447cd799bcbd', '5ad344307481447cd799bcbd', '5ad357ba7481447cd799d8ae', '5ad357ab7481447cd799d8a1', '5ad345c17481447cd799bd46', '5ad345c17481447cd799bd46', '5ad366757481447cd799e92f', '5ad368057481447cd799ea08', '5ad358857481447cd799d92b', '5ad35aa87481447cd799e21a', '5ad35aa87481447cd799e21a', '5ae819f07e5cce53d58fa527', '5ad345b77481447cd799bd40', '5ad345b77481447cd799bd40', '5ad350867481447cd799d52a', '5ba79dc4a0af7a5a45dc97b3', '5ad3500d7481447cd799d4a6', '5ba79dc4a0af7a5a45dc97b3', '5ad343c67481447cd799bc82', '5ba4507ea0af7a5a45dc234e', '5ba450efa0af7a5a45dc2413', '5ad343c67481447cd799bc82', '5ad346e07481447cd799bde2', '5ad357017481447cd799d81e', '5b7e6214d7050f0551d6cf25', '5ad343c67481447cd799bc82', '5ad362337481447cd799e50f', '5ad343c67481447cd799bc82', '5ad344307481447cd799bcbd', '5ad344307481447cd799bcbd', '5ad344647481447cd799bce7', '5ad3589f7481447cd799d93c', '5ad358e87481447cd799d94b', '5ad3589f7481447cd799d93c', '5ad345c17481447cd799bd46', '5ba45c77a0af7a5a45dc2eb3', '5ad345c17481447cd799bd46', '5adbf51093e4be36d6a0584a', '5ba47607a0af7a5a45dc4301', '5adbf51093e4be36d6a0584a', '5b5426f52769bd65f7d659a2', '5ba4a6fca0af7a5a45dc53c8', '5b5426f52769bd65f7d659a2', '5ad351fc7481447cd799d5f5', '5ba4c282a0af7a5a45dc6e30', '5ba4c2b2a0af7a5a45dc6e6f', '5ba4c2bba0af7a5a45dc6e7e', '5ad351fc7481447cd799d5f5', '5b5303a2af53340c390fc6f4', '5b7d2049d7050f0551d6c4ee', '5b3a35274f09b2791cc59965', '5b5303a2af53340c390fc6f4', '5ad358f37481447cd799d953', '5ba4a09ba0af7a5a45dc4c40', '5ba4a0aba0af7a5a45dc4c56', '5ad358f37481447cd799d953', '5ad35ffc7481447cd799e436', '5ad358637481447cd799d918', '5ad369697481447cd799eaff', '5ad360137481447cd799e43a', '5ad367987481447cd799e9d6', '5ba497c4a0af7a5a45dc4769', '5ba4979fa0af7a5a45dc473c', '5ba497c4a0af7a5a45dc4769', '5ad358f37481447cd799d953', '5ba4a067a0af7a5a45dc4bd5', '5ad358f37481447cd799d953', '5ad35e0c7481447cd799e3c4', '5ad35e0c7481447cd799e3c4', '5ad35fab7481447cd799e421', '5ad367827481447cd799e9ce', '5ad35fb77481447cd799e425', '5ad367a87481447cd799e9e0', '5ad346907481447cd799bdae', '5ba4a2a4a0af7a5a45dc4e99', '5ba4a2b4a0af7a5a45dc4eaf', '5ba4a2cca0af7a5a45dc4eef', '5ba4a2e4a0af7a5a45dc4f05', '5ad357317481447cd799d83f', '5ad3661a7481447cd799e916', '5ad357877481447cd799d882', '5ad3575a7481447cd799d85c', '5ad3538b7481447cd799d770', '5ad346907481447cd799bdae', '5ad363f67481447cd799e641', '5b7d0b13d7050f0551d6bfa5', '5ba4a1cca0af7a5a45dc4dac', '5ba4a17aa0af7a5a45dc4d5e', '5ba4a1cca0af7a5a45dc4dac', '5ad346907481447cd799bdae', '5ba4a227a0af7a5a45dc4e1a', '5ba4a249a0af7a5a45dc4e45', '5ba4a267a0af7a5a45dc4e70', '5ad346907481447cd799bdae', '5ad346907481447cd799bdae', '5ba4a12da0af7a5a45dc4d10', '5ba4a2f5a0af7a5a45dc4f1b', '5ad346907481447cd799bdae', '5ad346907481447cd799bdae', '5ba4a110a0af7a5a45dc4cfa', '5ad346907481447cd799bdae', '5ad351e47481447cd799d5e2', '5ba79286a0af7a5a45dc9312', '5ba79292a0af7a5a45dc9321', '5ad366267481447cd799e91a', '5ba49ffea0af7a5a45dc4aee', '5ad366267481447cd799e91a', '5ad35dc97481447cd799e3a0', '5ad35dc97481447cd799e3a0', '5ad367717481447cd799e9c9', '5ad35d057481447cd799e331', '5ad35d057481447cd799e331', '5ad368197481447cd799ea1e', '5ad347167481447cd799be18', '5ba4b0dca0af7a5a45dc5ee7', '5ba4b10aa0af7a5a45dc5f51', '5ad347167481447cd799be18', '5ad3472a7481447cd799be2c', '5ad367fb7481447cd799e9fe', '5ad357e87481447cd799d8d4', '5ba7a34aa0af7a5a45dc9a79', '5b418283af53340c390fb8a8', '5ba372b7a0af7a5a45dc0a3f', '5ba372cea0af7a5a45dc0a55', '5ad367137481447cd799e9a5', '5ad362d97481447cd799e572', '5b418283af53340c390fb8a8',
        //     '5ba4a110a0af7a5a45dc4cfa', '5ad346907481447cd799bdae', '5ad351e47481447cd799d5e2', '5ba79286a0af7a5a45dc9312', '5ba79292a0af7a5a45dc9321',
        // ];
        // const goodsTypeArr = await this.ctx.model.GoodsType.find({
        //     _id: { $in: goodsTypeIdArr },
        // }, { name: 1 });
        // this.success(goodsTypeArr);

        /*
        // const goodsTypeArr = await this.ctx.model.GoodsType.find({ name: /^JORDAN AIR JORDAN/ }, { name: 1 });
        const goodsTypeArr = await this.ctx.model.GoodsType.find({
            name: {
                $regex: new RegExp('WOMEN\'?S'),
            },
        }, { name: 1 });
        const total = goodsTypeArr.length;
        for (let i = 0; i < goodsTypeArr.length; i++) {
            console.log(`${i + 1}/${total}`);
            await this.ctx.model.GoodsType.update({
                _id: goodsTypeArr[i]._id,
            }, {
                $set: {
                    name: goodsTypeArr[i].name.replace('WOMENS', 'WMNS').replace('WOMEN\'S', 'WMNS'),
                },
            });
        }
        */
        // let goods_color = null;
        // const goodsArr = await this.ctx.model.Goods.find({}, { goods_color_id: 1 });
        // for (let i = 0; i < goodsArr.length; i++) {
        //     console.log(`${i + 1}/${goodsArr.length}`);
        //     goods_color = await this.ctx.model.GoodsColor.findOne({ _id: goodsArr[i].goods_color_id }, { goods_type_id: 1 });
        //     await this.ctx.model.Goods.update({ _id: goodsArr[i]._id }, { $set: { goods_type_id: goods_color.goods_type_id } });
        // }
        const goodsColorArr = await this.ctx.model.GoodsColor.find({}, { goods_id_arr: 1, goods_type_id: 1 });
        for (let i = 0; i < goodsColorArr.length; i++) {
            console.log(`${i + 1}/${goodsColorArr.length}`);
            await this.ctx.model.Goods.update({
                _id: { $in: goodsColorArr[i].goods_id_arr },
            }, {
                $set: { goods_type_id: goodsColorArr[i].goods_type_id },
            }, { multi: true });
        }
        this.success();
    }
}

module.exports = HomeController;
