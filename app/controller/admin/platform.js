const Controller = require('../../core/baseController');

class PlatformController extends Controller {
    async index() {
        this.success('hi, welcome to platform!');
    }

    async find() {
        let {
            name,
            fields,
            page,
            count,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
        fields = fields || {};
        this.ctx.validate({
            page: 'number',
            count: 'number',
        });
        const query = {};
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        const list = await this.ctx.model.Platform.find(query, fields).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.Platform.count(query);
        this.success({
            list,
            pagination: {
                total,
                current: page,
            },
        });
    }

    async detail() {
        const { id } = this.ctx.params;
        const platform = await this.ctx.model.Platform.findOne({ _id: id });
        if (platform) {
            this.success(platform);
        } else {
            this.fail(`没有找到id为${id}的平台`);
        }
    }

    async update() {
        const {
            id,
            name,
            domain,
        } = this.ctx.request.body;
        await this.ctx.model.Platform.update({ _id: id }, { $set: { name, domain } });
        this.success();
    }

    async add() {
        const {
            name,
            domain,
        } = this.ctx.request.body;
        this.ctx.validate({
            name: 'string',
            domain: 'string',
        });
        const platform = new this.ctx.model.Platform({
            name, domain,
        });
        await platform.save();
        this.success();
    }
}

module.exports = PlatformController;
