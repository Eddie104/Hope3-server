module.exports = app => {
    const { mongoose } = app;
    /**
     * 物品类别表
     */
    return mongoose.model('Category', new mongoose.Schema({
        id: { type: Number, required: true, index: true },
        name: { type: String, required: true, index: true },
        sub_category: {
            type: [ mongoose.Schema.ObjectId ],
            default: [],
        },
    }, { collection: 'hope_categories' }));
};
