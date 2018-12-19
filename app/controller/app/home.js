const Controller = require('../../core/baseController');

class HomeController extends Controller {
    async index() {
        const { seriesCount, popularGoodsColorCount, recommendGoodsColorCount } = this.ctx.params;
        const popularGoodsColorArr = await this.getGoodsColorArr({ is_popular: true }, popularGoodsColorCount);
        const recommendGoodsColorArr = await this.getGoodsColorArr({ is_recommend: true }, recommendGoodsColorCount);
        const topSeries = await this.getTopSeries(seriesCount);
        this.success({
            popularGoodsColorArr,
            recommendGoodsColorArr,
            topSeries,
        });
    }

    async getTopSeries(count) {
        count = this.ctx.helper.toInt(count, 7);
        const brandArr = await this.ctx.model.Brand.find({
            'series.is_top': true,
        }, { series: 1 });
        let brand = null;
        let series = null;
        const seriesArr = [];
        let counter = 0;
        let enough = false;
        for (let i = 0; i < brandArr.length; i++) {
            brand = brandArr[i];
            for (let j = 0; j < brand.series.length; j++) {
                series = brand.series[j];
                if (series.is_top) {
                    seriesArr.push(series);
                    if (count > 0) {
                        if (counter++ >= count - 1) {
                            enough = true;
                            break;
                        }
                    }
                }
                if (enough) {
                    break;
                }
            }
        }
        return seriesArr;
    }

    async getGoodsColorArr(query, count) {
        count = this.ctx.helper.toInt(count, 16);
        const fields = {
            img: 1,
            goods_id_arr: 1,
            name: 1,
            goods_type_id: 1,
        };
        let goodsColorArr = null;
        if (count > 0) {
            goodsColorArr = await this.ctx.model.GoodsColor.find(query, fields).limit(count).lean();
        } else {
            goodsColorArr = await this.ctx.model.GoodsColor.find(query, fields).lean();
        }
        goodsColorArr = await this.ctx.service.goods.createLowestPrice(goodsColorArr);
        return goodsColorArr;
    }
}

module.exports = HomeController;
