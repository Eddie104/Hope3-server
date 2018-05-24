const Controller = require('../core/baseController');

class NaiFenController extends Controller {
    async index() {
        this.success('hi, welcome to naiFen!');
    }

    async find() {
        let {
            name,
            page,
            count,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
        this.ctx.validate({
            page: 'number',
            count: 'number',
        });
        const query = { };
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        const list = await this.ctx.model.NaiFen.find(query).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.NaiFen.count(query);
        this.success({
            list,
            pagination: {
                total,
                current: page,
            },
        });
    }
}

module.exports = NaiFenController;
