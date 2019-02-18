module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1514430527431_7904';

    config.security = {
        csrf: {
            // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
            // headerName: 'x-csrf-token',
            // ignoreJSON: true,
            enable: false,
        },
    };

    config.cors = {
        // {string|Function} origin: '*',
        origin: '*',
        // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    // config.graphql = {
    //     router: '/graphql',
    //     // 是否加载到 app 上，默认开启
    //     app: true,
    //     // 是否加载到 agent 上，默认关闭
    //     agent: false,
    //     // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    //     graphiql: true,
    //     // graphQL 路由前的拦截器
    //     onPreGraphQL: async ctx => { },
    //     // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    //     // *onPreGraphiQL (ctx) { },
    // };

    // add your config here
    config.middleware = [ 'logger' ];

    config.mongoose = {
        // url: 'mongodb://localhost:27017/Hope3',
        url: 'mongodb://106.15.93.73:27017/Hope3',
        options: {
            db: { native_parser: true },
            server: {
                poolSize: 10,
                auto_reconnect: true,
                socketOptions: {
                    keepAlive: 1,
                    socketTimeoutMS: 60000,
                    connectTimeoutMS: 60000,
                },
            },
        },
    };

    config.bodyParser = {
        jsonLimit: '100kb',
        formLimit: '100kb',
    };

    config.logger = {
        level: 'DEBUG',
    };

    config.oauth2Server = {
        grants: [ 'password' ],
    };

    config.qiniu = {
        // 上传图片的空间名
        secretKey: 'lFdpeVd89l5u5e7GKKapdqtI-yPAeHxB9NEDJPv-',
        accessKey: 'u8204eU35XvUiDcFE-NcctjgVtdUkeEeaR6UObWi',
        scope: 'hope2',
        domain: 'http://p5epqbgwe.bkt.clouddn.com',
    };

    config.baiduFanyi = {
        url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
        appid: '20180123000118092',
        key: 'vn7iR4V0Mh70brhbSxnC',
    };

    config.multipart = {
        fileSize: '1mb',
        whitelist: [
            '.jpg',
            '.jpeg',
        ],
    };

    config.jwt = {
        secret: 'HL$Pl0tKH25W4pj$aU$xJy37',
    };

    return config;
};

