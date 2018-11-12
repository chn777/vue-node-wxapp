const Koa = require('koa');
const app = new Koa();
app.use(async(ctx,next)=>{
	let url = ctx.request.url;
	let ct = "";
	if(url === '/'){
		ct = "更目录"
	}
	else if (url === '/detail'){
		ct = '列表';
	}
	else {
		ct = '404'
	}
	ctx.body = ct;
	next();
});

app.listen(80);