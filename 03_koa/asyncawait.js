const Koa = require('koa');
const fs  = require('fs');
const util = require('util');
const readFileUtil = util.promisify(fs.readFile);
const app = new Koa();
const clog = require('./cn7-loger');

console.log('outer in;');

app.use(clog);

app.use(async(ctx,next)=>{
	console.log('loading...');
	const data = await readFileUtil('./package.json',{encoding:'utf8'});
	ctx.body =  data;
	next();
	console.log('over');


});
console.log('outer out;');
app.listen(80);