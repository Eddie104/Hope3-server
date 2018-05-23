module.exports = app => {
    const { mongoose } = app;
    /**
     * 待处理的商品数据，也就是爬虫从网站上爬下来的数据
     */
    return mongoose.model('PendingGoods', new mongoose.Schema({
        // platform: { type: mongoose.Schema.ObjectId, required: true },
        platform: { type: String, required: true },
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true, index: true },
        url: { type: String, required: true },
        // colorName: { type: String, default: '' },
        // colorValue: { type: String, default: '' },
        number: { type: String, required: true, index: true },
        is_checked: { type: Boolean, default: false },
        // goods_type_id: mongoose.Schema.ObjectId,
        size_price_arr: {
            type: [{ size: String, price: Number }],
            default: [],
        },
        imgs: { type: [ String ], default: [] },
    }, { collection: 'hope_penginggoods' }));
};
