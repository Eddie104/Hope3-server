// const fs = require('fs');
// const path = require('path');
const Controller = require('../core/baseController');

class HomeController extends Controller {
    async index() {
        this.success('hi, welcome to HOPE3!');
    }

    async test() {
        // const pendingGoods = await this.ctx.model.PendingGoods.find({ platform: 'flightclub', is_deleted: false }, { url: 1 });
        // let goods = null;
        // for (let i = 0; i < pendingGoods.length; i++) {
        //     goods = await this.ctx.model.Goods.findOne({ url: pendingGoods[i].url }, { id: 1 });
        //     if (goods) {
        //         await this.ctx.model.PendingGoods.update({ _id: pendingGoods[i]._id }, { $set: { is_checked: true } });
        //     }
        // }
        this.success('done');
    }
}

module.exports = HomeController;
