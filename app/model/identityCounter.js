module.exports = app => {
    const { mongoose } = app;
    /**
     * 自增长表
     */
    return mongoose.model('IdentityCounter', new mongoose.Schema({
        model: { type: String, required: true },
        count: { type: Number, default: 0 },
    }));
};
