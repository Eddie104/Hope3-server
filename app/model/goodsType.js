module.exports = app => {
    const { mongoose } = app;
    /**
     * 款型表
     */
    return mongoose.model('GoodsType', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true, index: true },
        goods_color_arr: { type: [ mongoose.Schema.ObjectId ], default: [] },
    }, { collection: 'hope_goodstypes' }));
};
