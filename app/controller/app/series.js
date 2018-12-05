const Controller = require('../../core/baseController');

class SeriesController extends Controller {
    // 获取置顶的系列
    async top() {
        const brandArr = await this.ctx.model.Brand.find({
            'series.is_top': true,
        }, { series: 1 });
        let brand = null;
        let series = null;
        const seriesArr = [];
        let count = 0;
        let enough = false;
        for (let i = 0; i < brandArr.length; i++) {
            brand = brandArr[i];
            for (let j = 0; j < brand.series.length; j++) {
                series = brand.series[j];
                if (series.is_top) {
                    seriesArr.push(series);
                    if (count++ >= 7) {
                        enough = true;
                        break;
                    }
                }
                if (enough) {
                    break;
                }
            }
        }
        this.success(seriesArr);
    }
}

module.exports = SeriesController;
