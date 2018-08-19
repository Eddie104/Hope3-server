module.exports = app => {
    const { mongoose } = app;
    /**
     * sku历史表
     */
    return mongoose.model('SKUHistory', new mongoose.Schema({
        goods_id: { type: mongoose.Schema.ObjectId, required: true, index: true },
        size: { type: Number, required: true },
        price: { type: Number, required: true },
        date: { type: Date, required: true },
    }, { collection: 'hope_sku_history' }));
};
