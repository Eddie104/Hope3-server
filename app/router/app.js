module.exports = app => {
    const { router, controller } = app;
    // Method	Path	      Route Name	Controller.Action
    // GET	   /posts	       posts	app.controllers.posts.index
    // GET	   /posts/new	   new_post	app.controllers.posts.new
    // GET     /posts/:id	   post	app.controllers.posts.show
    // GET     /posts/:id/edit edit_post	app.controllers.posts.edit
    // POST    /posts	       posts	app.controllers.posts.create
    // PUT     /posts/:id	    post	app.controllers.posts.update
    // DELETE  /posts/:id	    post	app.controllers.posts.destroy

    const jwt = app.middleware.jwt();

    router.post('/api/app/user/register', controller.app.user.register);

    router.post('/api/app/user/login', controller.app.user.login);

    // app
    router.resources('series', '/api/app/series', jwt, controller.app.series);

    router.get('/api/app/series/top/:count', jwt, controller.app.series.top);

    // ----------- brand --------------
    router.resources('brand', '/api/app/brand', jwt, controller.app.brand);

    // ----------- home --------------
    router.get('/api/app/home/:seriesCount/:popularGoodsColorCount/:recommendGoodsColorCount', jwt, controller.app.home.index);

    // ----------- goodsType --------------

    router.resources('goodsType', '/api/app/goodsType', jwt, controller.app.goodsType);

    // router.get('/api/app/goodsType/show/:goodsColorId', controller.app.goodsType.showByGoodsColor);

    // ----------- goodsColor --------------

    router.resources('goodsColor', '/api/app/goodsColor', jwt, controller.app.goodsColor);

    router.get('/api/app/goodsColor/top/:count', jwt, controller.app.goodsColor.top);

    router.get('/api/app/goodsColor/recommend/:page/:pageSize', jwt, controller.app.goodsColor.recommend);

    // ----------- goods --------------

    router.resources('goods', '/api/app/goods', jwt, controller.app.goods);
};
