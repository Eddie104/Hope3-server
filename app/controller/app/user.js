const Controller = require('../../core/baseController');

class UserController extends Controller {
    // async index() {
    //     let { page, pageSize } = this.ctx.query;
    //     page = this.ctx.helper.toInt(page, 1);
    //     pageSize = this.ctx.helper.toInt(pageSize, 10);
    //     const query = {
    //         is_deleted: false,
    //     };
    //     const goodsArr = await this.ctx.model.Goods.find(query).skip((page - 1) * pageSize).limit(pageSize);
    //     this.success(goodsArr);
    // }

    // async show() {
    //     const { id } = this.ctx.params;
    //     const goods = await this.ctx.model.Goods.findOne({ _id: id });
    //     this.success(goods);
    // }

    async register() {
        let { email, password, name } = this.ctx.request.body;
        email = email.toLowerCase();
        let u = await this.ctx.model.User.findOne({ email });
        if (u) {
            this.fail({
                code: -1,
                msg: `已存在email为${email}的账户了`,
            });
            return;
        }
        u = await this.ctx.model.User.findOne({ name });
        if (u) {
            this.fail({
                code: -2,
                msg: `已存在name为${name}的账户了`,
            });
            return;
        }
        u = new this.ctx.model.User({ email, password, name });
        await u.save();
        this.success({
            token: this.app.jwt.sign({ uid: u._id }, this.app.config.jwt.secret),
        });
    }

    async login() {
        let { email, password } = this.ctx.request.body;
        email = email.toLowerCase();
        const u = await this.ctx.model.User.findOne({ email });
        if (!u) {
            this.fail({
                code: -1,
                msg: `没有找到email为${email}的账户`,
            });
            return;
        }
        if (u.password === password) {
            this.success({
                token: this.app.jwt.sign({ uid: u._id }, this.app.config.jwt.secret),
            });
        } else {
            this.fail({
                code: -2,
                msg: '密码错误',
            });
        }
    }
}

module.exports = UserController;
