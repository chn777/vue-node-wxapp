
const {mysql} = require('../qcloud');


module.exports = async(ctx,next) =>{
    const reqParam = ctx.request.query;
    const {id} = reqParam;

    const bookInfo = await mysql('books')
                                        .select("books.*","cSessionInfo.user_info")
                                        .join('cSessionInfo','books.openid','cSessionInfo.open_id').where('books.id',id)
                                        .first();
    const info = JSON.parse(bookInfo.user_info);
    ctx.state.data = Object.assign({},bookInfo,{
        tags:bookInfo.tags.split(','),
        summary:bookInfo.summary.split('\n'),
        user_info : {
            nickName:info.nickName,
            avatarUrl:info.avatarUrl
        }
    });

    await mysql('books').where('id',id).increment('count',1);

}