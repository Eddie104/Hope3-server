/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);

    router.get('/test', controller.home.test);

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

    router.get('/admin/set_pending_goods_check/:_id', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.setCheck);

    router.get('/admin/delete_pending_goods/:_id', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.delete);

    // router.post('/admin/add_goods_type_by_pending_goods', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.createGoodsType);

    // router.post('/admin/relation_goods_type_by_pending_goods', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.relationGoodsType);

    router.get('/admin/fetch_brand_and_category', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.fetchBrandAndCategory);

    router.get('/admin/auto_connect_by_number', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.autoConnectByNumber);

    router.get('/admin/auto_connect_by_name', app.oAuth2Server.authenticate(), controller.admin.pendingGoods.autoConnectByName);

    // 款型相关
    router.post('/admin/add_goods_type', app.oAuth2Server.authenticate(), controller.admin.goodsType.add);
    // 关联款型
    router.post('/admin/connect_goods_type', app.oAuth2Server.authenticate(), controller.admin.goodsType.connect);

    router.post('/admin/find_goods_type', app.oAuth2Server.authenticate(), controller.admin.goodsType.find);

    router.post('/admin/update_goods_type', app.oAuth2Server.authenticate(), controller.admin.goodsType.update);

    router.post('/admin/merge_goods_type', app.oAuth2Server.authenticate(), controller.admin.goodsType.merge);

    router.get('/admin/detail_goods_type/:_id', app.oAuth2Server.authenticate(), controller.admin.goodsType.detail);

    router.get('/admin/remove_goods_color/:_id/:goods_color_id', app.oAuth2Server.authenticate(), controller.admin.goodsType.removeGoodsColor);

    // 配色相关
    router.post('/admin/detail_goods_color', app.oAuth2Server.authenticate(), controller.admin.goodsColor.detail);

    router.post('/admin/update_goods_color', app.oAuth2Server.authenticate(), controller.admin.goodsColor.update);

    router.post('/admin/merge_goods_color', app.oAuth2Server.authenticate(), controller.admin.goodsColor.merge);

    router.get('/admin/remove_goods/:_id/:goods_id', app.oAuth2Server.authenticate(), controller.admin.goodsColor.removeGoods);

    // 商品相关
    router.get('/admin/detail_goods/:_id', app.oAuth2Server.authenticate(), controller.admin.goods.detail);

    router.post('/admin/find_goods', app.oAuth2Server.authenticate(), controller.admin.goods.find);

    router.post('/admin/update_goods', app.oAuth2Server.authenticate(), controller.admin.goods.update);

    // 认证相关
    app.post('/oauth2/access_token', app.oAuth2Server.token(), controller.oauth.accessToken);

    // webhook
    app.post('/webhook/push_admin', controller.webhook.pushAdmin);
};
