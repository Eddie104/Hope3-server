// const moment = require('moment');
const Controller = require('../core/baseController');

class OAuthController extends Controller {
    async accessToken() {
        /*
        { token:
            { accessToken: '0bf10b21ab992dab2da83cd8ed79174f4cae4707',
                accessTokenExpiresAt: 2017-11-27T07:04:33.387Z,
                refreshToken: '855b1805c3448bcda9467ce83346f3d62b9bb1f7',
                refreshTokenExpiresAt: 2017-12-11T06:04:33.387Z,
                scope: undefined,
                user: { userId: 1 },
                client:
                { clientId: 'my_app',
                    clientSecret: 'my_secret',
                    redirectUris: [Array],
                    refreshTokenLifetime: 0,
                    accessTokenLifetime: 0,
                    grants: [Array]
                }
            }
        }
        */
        // console.log(this.ctx.state.oauth);
        this.success(this.ctx.state.oauth);
    }

    // async setToken2Server() {
    //     const { accessToken, refreshToken, expiresIn } = this.ctx.request.body;
    //     const client = await this.ctx.model.Client.findOne();
    //     const token = new this.ctx.model.OauthToken({
    //         clientId: client.clientId,
    //         accessToken,
    //         refreshToken,
    //         accessTokenExpiresAt: this.ctx.helper.now(moment().add(expiresIn, 's')),
    //         refreshTokenExpiresAt: this.ctx.helper.now(moment().add(20, 'd')),
    //     });
    //     await token.save();
    //     this.success();
    // }
}
module.exports = OAuthController;
