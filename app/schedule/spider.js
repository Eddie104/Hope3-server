module.exports = {
    schedule: {
        // *    *    *    *    *    *
        // ┬    ┬    ┬    ┬    ┬    ┬
        // │    │    │    │    │    |
        // │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
        // │    │    │    │    └───── month (1 - 12)
        // │    │    │    └────────── day of month (1 - 31)
        // │    │    └─────────────── hour (0 - 23)
        // │    └──────────────────── minute (0 - 59)
        // └───────────────────────── second (0 - 59, optional)
        cron: '0 0 */3 * * *',
        type: 'worker',
    },

    async task() {
        // const res = await ctx.curl('http://www.api.com/cache', {
        //     dataType: 'json',
        // });
        // ctx.app.cache = res.data;

    },
};
