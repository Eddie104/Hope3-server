module.exports = () => {
    class Model {
        constructor(ctx) {
            this.ctx = ctx;
        }

        async getClient(clientId, clientSecret) {
            const client = await this.ctx.model.Client.findOne({
                clientId,
            });
            if (!client || clientSecret !== client.clientSecret) {
                return;
            }
            return client;
        }

        async getUser(username, password) {
            const user = await this.ctx.model.User.findOne({ name: username });
            if (!user || username !== user.name || password !== user.password) {
                return;
            }
            return { userId: user._id, userName: user.name };
        }

        async getAccessToken(bearerToken) {
            const token = await this.ctx.model.OauthToken.findOne({
                accessToken: bearerToken,
            });
            if (token) {
                const client = await this.ctx.model.Client.findOne({
                    clientId: token.clientId,
                });
                if (client) {
                    const user = await this.ctx.model.User.findOne({ _id: token.user_id }, { name: 1 });
                    return {
                        user: { userId: user._id, userName: user.name },
                        client: {
                            clientId: client.clientId,
                            clientSecret: client.clientSecret,
                            grants: client.grants,
                        },
                        accessToken: token.accessToken,
                        accessTokenExpiresAt: token.accessTokenExpiresAt,
                        refreshToken: token.refreshToken,
                        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                    };
                }
            }
        }

        async saveToken(token, client, user) {
            // token
            // {
            //     accessToken: '7bc2e0b64d82383a0ee4b96c9cd4937da72abecc',
            //     accessTokenExpiresAt: 2017-11-27T09:20:15.739Z,
            //     refreshToken: '565e3fa4b04081cbdb32ed67a53ee2461c40253e',
            //     refreshTokenExpiresAt: 2017-12-11T08:20:15.740Z,
            //     scope: undefined
            // }
            const oauthToken = new this.ctx.model.OauthToken({
                accessToken: token.accessToken,
                accessTokenExpiresAt: this.ctx.helper.now(new Date(token.accessTokenExpiresAt)),
                refreshToken: token.refreshToken,
                refreshTokenExpiresAt: this.ctx.helper.now(new Date(token.refreshTokenExpiresAt)),
                clientId: client.clientId,
                user_id: user.userId,
            });
            await oauthToken.save();
            return {
                accessToken: oauthToken.accessToken,
                accessTokenExpiresAt: oauthToken.accessTokenExpiresAt,
                refreshToken: oauthToken.refreshToken,
                refreshTokenExpiresAt: oauthToken.refreshTokenExpiresAt,
                client,
                user,
            };
        }

        // async getAuthorizationCode() {

        // }
    }

    return Model;
};
