module.exports = async(ctx,next) => {
	const start = new Date().getTime();
	console.log('starting at',start);
	await next();
	const end  = new Date().getTime();
	console.log('end at',end,'total',end - start,'body-length',ctx.body.length);

}