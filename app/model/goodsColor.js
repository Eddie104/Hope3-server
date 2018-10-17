module.exports = app => {
    const { mongoose } = app;
    /**
     * 配色表
     */
    return mongoose.model('GoodsColor', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        color_name: { type: String, default: '' },
        color_value: { type: String, default: '' },
        // 颜色类型
        color_type: { type: String, default: '' },
        number: { type: [ String ], default: [] },
        img: { type: String, default: '' },
        goods_id_arr: { type: [ mongoose.Schema.ObjectId ], default: [] },
        goods_type_id: mongoose.Schema.ObjectId,
        is_popular: { type: Boolean, default: false },
    }, { collection: 'hope_goodscolors' }));
};
