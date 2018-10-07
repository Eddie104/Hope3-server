const moment = require('moment');
const request = require('request');
const fs = require('fs');
const qiniu = require('qiniu');
const path = require('path');

module.exports = {
    /**
     * 获取当前时间
     * @param {Date} date 日期，可选
     * @return {Date} 日期
     */
    now(date) {
        // 因为mongo里存的时间啊是UTC +0:00的，而中国是UTC +8:00，所以这里要加8小时
        return moment(date || new Date()).add(8, 'hours');
    },

    /**
     * 将数据库中的日期转成时间戳
     * @param {Date} date Date类型
     * @return {Number} 时间戳
     */
    toTimestamp(date) {
        return date ? parseInt(moment(date).subtract(8, 'hours').format('x')) : 0;
    },

    // asyncRequest(url, headers, form, method = 'POST') {
    //     return new Promise((resolve, reject) => {
    //         request({
    //             url,
    //             headers,
    //             form,
    //             method,
    //         }, (err, response, body) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(response, body);
    //             }
    //         });
    //     });
    // },

    /**
     * 判断是否为undefined
     * @param {Any} val 任何实例
     * @return {Bool} 结果
     */
    isUndefined(val) {
        return typeof val === 'undefined';
    },

    toInt(val, defaultValue = 0) {
        val = parseInt(val);
        if (isNaN(val)) {
            val = defaultValue;
        }
        return val;
    },

    /**
     * 等待
     * @param {Number} time 时间，单位毫秒
     * @return {Promise} Promise
     */
    wait(time = 1000) {
        return new Promise(resolve => {
            const t = setTimeout(() => {
                clearTimeout(t);
                resolve();
            }, time);
        });
    },

    /**
     * 写文件
     * @param {String} filePath 文件路径
     * @param {String} content 内容
     * @return {Promise} Promise
     */
    writeFile(filePath, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    /**
     * 下载图片
     * @param {String} url 图片url
     * @param {String} filePath 本地地址
     * @return {Promise} Promise
     */
    downloadImg(url, filePath) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(filePath)) {
                resolve(2);
                return;
            }
            const a = filePath.split(path.sep);
            a.pop();
            const fileDir = a.join(path.sep);
            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir);
            }
            request.head(url, () => {
                const stream = request(url).pipe(fs.createWriteStream(filePath));
                stream.on('finish', () => {
                    resolve(1);
                });
                stream.on('error', () => {
                    reject();
                });
            });
        });
    },

    uploadImg(imgName, imgPath, bucket) {
        return new Promise((resolve, reject) => {
            // qiniu.conf.ACCESS_KEY = this.ctx.app.config.qiniu.accessKey;
            // qiniu.conf.SECRET_KEY = this.ctx.app.config.qiniu.secretKey;
            // const key = imgName;
            // const token = (new qiniu.rs.PutPolicy(`${bucket}:${key}`)).token();
            // const extra = new qiniu.io.PutExtra();
            // qiniu.io.putFile(token, key, imgPath, extra, (err, ret) => {
            //     if (!err) {
            //         console.log(ret);
            //         resolve(ret.hash, ret.key);
            //     } else {
            //         reject(err);
            //     }
            // });
            if (!fs.existsSync(imgPath)) {
                reject();
                return;
            }
            const mac = new qiniu.auth.digest.Mac(this.ctx.app.config.qiniu.accessKey, this.ctx.app.config.qiniu.secretKey);
            const options = {
                scope: bucket,
            };
            const putPolicy = new qiniu.rs.PutPolicy(options);
            const uploadToken = putPolicy.uploadToken(mac);

            const localFile = imgPath;
            const config = new qiniu.conf.Config();
            // 空间对应的机房
            // 机房	Zone对象
            // 华东	qiniu.zone.Zone_z0
            // 华北	qiniu.zone.Zone_z1
            // 华南	qiniu.zone.Zone_z2
            // 北美	qiniu.zone.Zone_na0
            config.zone = qiniu.zone.Zone_z0;
            const formUploader = new qiniu.form_up.FormUploader(config);
            const putExtra = new qiniu.form_up.PutExtra();
            const key = imgName;
            // 文件上传
            formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
                if (respErr) {
                    // console.log('上传报错');
                    // throw respErr;
                    reject(respErr);
                } else {
                    if (respInfo.statusCode === 200) {
                        // console.log('上传成功');
                        /*
                        { hash: 'Fi5m2jff6q7Zuy5VGzAabMUNPOHv',
                            key: 'goods/5a55a88d48555b1ba3a6ab83/5a55a88d48555b1ba3a6ab83.jpg' }
                        */
                        // console.log(respBody);
                        resolve(respBody);
                    } else {
                        console.log('上传失败');
                        console.log(respInfo.statusCode);
                        reject(respInfo.statusCode);
                        // console.log(respInfo.statusCode);
                        // console.log(respBody);
                    }
                }
            });
        });
    },
    // readdir(dirpath) {
    //     const fileArr = fs.readdirSync(dirpath);
    //     console.log(fileArr);
    // },
    // 去除数组的重复成员
    unique(array) {
        return [ ...new Set(array) ];
    },

    isObjectId(_id) {
        if (_id) {
            return /\w{24}/.test(_id);
        }
        return false;
    },
};
