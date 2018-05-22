module.exports = app => {
    const { mongoose } = app;

    return mongoose.model('Client', new mongoose.Schema({
        clientSecret: { type: String, required: true },
        clientId: { type: String, required: true },
        grants: { type: [ String ], required: true },
    }));
};
