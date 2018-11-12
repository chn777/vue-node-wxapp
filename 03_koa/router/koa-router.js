const Koa = require('koa');
const Router = require('koa-router');
const lg = require('../cn7-loger');
const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
	// ctx.router available
	ctx.body = "更目录";
	console.log(ctx.router);
});
router.get('/detail', (ctx, next) => {
	// ctx.router available
	ctx.body = "列表";
});

app
	.use(lg)
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(80);