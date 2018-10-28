const child_process = require('child_process');

const Service = require('egg').Service;

class SpiderService extends Service {

    async run() {
        child_process.exec('cd /home/Hope3-spider/ && python spider.py goat', (error, stdout, stderr) => {
            this.ctx.logger.info('error  => ');
            this.ctx.logger.info(error);
            this.ctx.logger.info('stderr => ' + stderr);
        });
        return true;
    }

}

module.exports = SpiderService;
