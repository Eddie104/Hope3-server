module.exports = app => {
    const { mongoose } = app;
    /**
     * 物品子类别表
     */
    return mongoose.model('SubCategory', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true, index: true },
        parent: mongoose.Schema.ObjectId,
    }, { collection: 'hope_subcategories' }));
};
