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

    async createLowestPrice(goodsColorArr) {
        // 拿到对应的商品数据
        let goodsIdArr = [];
        for (let index = 0; index < goodsColorArr.length; index++) {
            goodsIdArr = goodsIdArr.concat(goodsColorArr[index].goods_id_arr);
        }
        const goodsArr = await this.ctx.model.Goods.find({
            _id: { $in: goodsIdArr },
        }, { sku: 1, goods_color_id: 1 }).lean();
        // 找出最便宜的goods
        let goods = null;
        let skuArr = null;
        const skuSortFun = (a, b) => a.price > b.price;
        for (let index = 0; index < goodsArr.length; index++) {
            goods = goodsArr[index];
            for (let i = 0; i < goodsColorArr.length; i++) {
                if (goodsColorArr[i]._id.toString() === goods.goods_color_id.toString()) {
                    skuArr = goods.sku;
                    if (skuArr.length > 0) {
                        skuArr = skuArr.filter(s => s.isInStock).sort(skuSortFun);
                        if (!goodsColorArr[i].price || goodsColorArr[i].price > skuArr[0].price) {
                            goodsColorArr[i].price = skuArr[0].price;
                        }
                    }
                    break;
                }
            }
        }
        return goodsColorArr;
    }

    async getGoodsColorArr(query, count) {
        count = this.ctx.helper.toInt(count, 16);
        const fields = {
            img: 1,
            goods_id_arr: 1,
            name: 1,
        };
        let goodsColorArr = null;
        if (count > 0) {
            goodsColorArr = await this.ctx.model.GoodsColor.find(query, fields).limit(count).lean();
        } else {
            goodsColorArr = await this.ctx.model.GoodsColor.find(query, fields).lean();
        }
        goodsColorArr = await this.createLowestPrice(goodsColorArr);
        return goodsColorArr;
    }
}

module.exports = HomeController;
