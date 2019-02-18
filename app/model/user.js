module.exports = app => {
    const { mongoose } = app;
    /**
     * 用户表
     */
    return mongoose.model('User', new mongoose.Schema({
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, default: 'a@b.com' },
    }));
};
