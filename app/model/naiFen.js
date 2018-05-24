module.exports = app => {
    const { mongoose } = app;

    return mongoose.model('NaiFen', new mongoose.Schema({
        name: { type: String, required: true },
        url: { type: String, default: '' },
        qiTaPeiFang: { type: String, default: '' },
        age: { type: String, default: '' },
        youJi: { type: String, default: '' },
        shuXing: { type: String, default: '' },
        peiFang: { type: String, default: '' },
        pinPai: { type: String, default: '' },
        yaoQiu: { type: String, default: '' },
        changDi: { type: String, default: '' },
        teShu: { type: String, default: '' },
    }, { collection: 'naifens' }));
};
