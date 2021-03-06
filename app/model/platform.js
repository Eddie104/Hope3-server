module.exports = app => {
    const { mongoose } = app;
    /**
     * 平台表
     */
    return mongoose.model('Platform', new mongoose.Schema({
        id: { type: Number, required: true },
        name: { type: String, required: true },
        domain: { type: String, required: true },
    }, { collection: 'hope_platforms' }));
};
