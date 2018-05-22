module.exports = () => {
    const config = exports = {};
    config.middleware = [ ];
    config.mongoose = {
        url: 'mongodb://47.100.164.90:27017/Hope3',
        options: {
            db: { native_parser: true },
            server: {
                poolSize: 5,
                auto_reconnect: true,
                socketOptions: { keepAlive: 1 },
            },
        },
    };
    return config;
};
