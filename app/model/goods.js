module.exports = app => {
    const { mongoose } = app;
    /**
     * 商品表
     */
    return mongoose.model('Goods', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true },
        url: { type: String, required: true, index: true },
        number: { type: String, default: [] },
        sku: { type: [{ size: Number, price: Number, isInStock: Boolean }], default: [] },
        update_sku_time: Date,
        img: { type: String, default: '' },
        platform_id: { type: mongoose.Schema.ObjectId, required: true },
        goods_color_id: mongoose.Schema.ObjectId,
        // 性别，0是所有 1是男 2是女
        gender: { type: Number, default: 0 },
    }, { collection: 'hope_goods' }));
};
