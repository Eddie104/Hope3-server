module.exports = app => {
    const { mongoose } = app;
    /**
     * 款型表
     */
    return mongoose.model('GoodsType', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true, index: true },
        goods_color_arr: { type: [ mongoose.Schema.ObjectId ], default: [] },
        // 0 通用 1 男鞋 2 女鞋 3 男童鞋 4 女童鞋
        gender: { type: Number, default: 0 },
        category: mongoose.Schema.ObjectId,
        sub_category: mongoose.Schema.ObjectId,
        brand: mongoose.Schema.ObjectId,
        series: mongoose.Schema.ObjectId,
        img: { type: String, default: '' },
        is_deleted: { type: Boolean, default: false },
        hot_degree: { type: Number, default: 9 },
    }, { collection: 'hope_goodstypes' }));
};
