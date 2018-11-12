const Koa = require("koa");
const app = new Koa();

app.use(async (ctx,next) =>{
	ctx.body = '1';
	await next();
	ctx.body += '2';
});
app.use(async (ctx,next) =>{
	ctx.body = '3';
	await next();
	ctx.body += '4';
});
app.use(async (ctx,next) =>{
	ctx.body = '5';
	await next();
	ctx.body += '6';
});



app.listen(8080);