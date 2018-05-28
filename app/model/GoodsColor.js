module.exports = app => {
    const { mongoose } = app;
    /**
     * 配色表
     */
    return mongoose.model('GoodsColor', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        colorName: { type: String, default: '' },
        colorValue: { type: String, default: '' },
        number: { type: String, required: true, index: true },
        imgs: { type: [ String ], default: [] },
    }, { collection: 'hope_goodscolors' }));
};
