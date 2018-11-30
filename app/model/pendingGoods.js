module.exports = app => {
    const { mongoose } = app;
    /**
     * 待处理的商品数据，也就是爬虫从网站上爬下来的数据
     */
    return mongoose.model('PendingGoods', new mongoose.Schema({
        platform_id: mongoose.Schema.ObjectId,
        platform: { type: String, required: true },
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true, index: true },
        url: { type: String, required: true, index: true },
        color_name: { type: String, default: '' },
        color_value: { type: String, default: '' },
        number: { type: String, required: true, index: true },
        is_checked: { type: Boolean, default: false },
        // goods_type_id: mongoose.Schema.ObjectId,
        size_price_arr: {
            type: [{ size: String, price: Number }],
            default: [],
        },
        imgs: { type: [ String ], default: [] },
        is_deleted: { type: Boolean, default: false },
        img_downloaded: { type: Boolean, default: false },
        // 性别，0是所有 1是男 2是女
        gender: { type: Number, default: 0 },
        // 爬虫更新的次数，如果小于identityCounter表里记录的值，说明此次更新中没有该商品
        update_counter: { type: Number, default: 0 },
        // 是否缺货了
        is_out_stock: { type: Boolean, default: false },
        // 是否优先处理的，值越大，越优先处理
        priority: { type: Number, default: 0, index: true },
    }, { collection: 'hope_pendinggoods' }));
};
