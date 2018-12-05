module.exports = app => {
    const { mongoose } = app;
    /**
     * 配色表
     */
    return mongoose.model('GoodsColor', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true },
        color_name: { type: String, default: '' },
        color_value: { type: String, default: '' },
        // 颜色类型
        color_type: { type: String, default: '' },
        number: { type: [ String ], default: [] },
        img: { type: String, default: '' },
        goods_id_arr: { type: [ mongoose.Schema.ObjectId ], default: [] },
        goods_type_id: mongoose.Schema.ObjectId,
        is_popular: { type: Boolean, default: false },
        // 在哪些平台上是热度商品
        hot: { type: [ mongoose.Schema.ObjectId ], default: [] },
        // 热度值，在多少个平台上是热度商品，热度值就是多少
        hot_degree: { type: Number, default: 0 },
    }, { collection: 'hope_goodscolors' }));
};
