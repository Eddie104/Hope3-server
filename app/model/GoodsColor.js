module.exports = app => {
    const { mongoose } = app;
    /**
     * 配色表
     */
    return mongoose.model('GoodsColor', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        colorName: { type: String, default: '' },
        colorValue: { type: String, default: '' },
        number: { type: [ String ], default: [] },
        img: { type: String, default: '' },
        goods_id_arr: { type: [ mongoose.Schema.ObjectId ], default: [] },
    }, { collection: 'hope_goodscolors' }));
};
