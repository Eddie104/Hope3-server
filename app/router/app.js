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
    // app
    router.resources('goodsType', '/api/app/goodsType', controller.app.goodsType);

    router.resources('series', '/api/app/series', controller.app.series);

    router.get('/api/app/top_series', controller.app.series.topSeries);
};