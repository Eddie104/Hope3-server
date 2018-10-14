module.exports = app => {
    const { mongoose } = app;
    /**
     * 物品品牌表
     */
    return mongoose.model('Brand', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true, index: true },
        series: { type: [{ name: String, img: String }], default: [] },
        is_deleted: { type: Boolean, default: false },
    }, { collection: 'hope_brands' }));
};
