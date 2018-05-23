/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);

    // 平台相关
    router.post('/admin/find_platform', app.oAuth2Server.authenticate(), controller.admin.platform.find);

    router.get('/admin/detail_platform/:id', app.oAuth2Server.authenticate(), controller.admin.platform.detail);

    router.post('/admin/update_platform', app.oAuth2Server.authenticate(), controller.admin.platform.update);

    router.post('/admin/add_platform', app.oAuth2Server.authenticate(), controller.admin.platform.add);
    // 品牌相关
    router.post('/admin/find_brand', app.oAuth2Server.authenticate(), controller.admin.brand.find);

    router.get('/admin/detail_brand/:id', app.oAuth2Server.authenticate(), controller.admin.brand.detail);

    router.post('/admin/update_brand', app.oAuth2Server.authenticate(), controller.admin.brand.update);

    router.post('/admin/add_brand', app.oAuth2Server.authenticate(), controller.admin.brand.add);

    router.get('/admin/remove_brand/:id', app.oAuth2Server.authenticate(), controller.admin.brand.remove);

    // 类目相关
    router.post('/admin/add_category', app.oAuth2Server.authenticate(), controller.admin.category.add);

    router.post('/admin/find_category', app.oAuth2Server.authenticate(), controller.admin.category.find);

    router.get('/admin/detail_category/:id', app.oAuth2Server.authenticate(), controller.admin.category.detail);

    router.post('/admin/update_category', app.oAuth2Server.authenticate(), controller.admin.category.update);

    router.get('/admin/fetch_sub_category/:_id', app.oAuth2Server.authenticate(), controller.admin.category.fetchSubCategory);

    // 商店相关

    router.post('/admin/find_shop', app.oAuth2Server.authenticate(), controller.admin.shop.find);

    router.get('/admin/detail_shop/:id', app.oAuth2Server.authenticate(), controller.admin.shop.detail);

    router.post('/admin/update_shop', app.oAuth2Server.authenticate(), controller.admin.shop.update);

    // 待处理商品相关
    router.post('/admin/find_pending_goods', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.find);

    // router.post('/admin/add_goods_type_by_pending_goods', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.createGoodsType);

    // router.post('/admin/relation_goods_type_by_pending_goods', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.relationGoodsType);

    // router.get('/admin/fetch_brand_and_category', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.fetchBrandAndCategory);

    // 认证相关
    app.post('/oauth2/access_token', app.oAuth2Server.token(), controller.oauth.accessToken);
};
