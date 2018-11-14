
const {mysql} = require('../qcloud');


module.exports = async(ctx,next) =>{
    const reqParam = ctx.request.query;
    const {id} = reqParam;
    await mysql('books').where('id',id).increment('count',1);

}