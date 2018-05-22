module.exports = app => {
    const { mongoose } = app;

    return mongoose.model('OAuthToken', new mongoose.Schema({
        accessToken: { type: String, required: true },
        accessTokenExpiresAt: { type: Date, required: true },
        refreshToken: { type: String, required: true },
        refreshTokenExpiresAt: { type: Date, required: true },
        clientId: { type: String, required: true },
        user_id: { type: mongoose.Schema.ObjectId, required: true },
    }));
};
