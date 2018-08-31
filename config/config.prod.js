module.exports = () => {
    const config = exports = {};
    config.middleware = [ ];
    config.mongoose = {
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
    return config;
};
