const child_process = require('child_process');

const Service = require('egg').Service;

class SpiderService extends Service {

    async run() {
        child_process.exec('cd /home/Hope3-spider/ && python spider.py goat');
        return true;
    }

}

module.exports = SpiderService;
