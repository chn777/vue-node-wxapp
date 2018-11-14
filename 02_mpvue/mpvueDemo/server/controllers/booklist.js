//引入MySQL实例
const { mysql } = require('../qcloud');

module.exports = async(ctx,next) =>
{
  const { page } = ctx.request.query;
  const books = await mysql('books').select("books.*","cSessionInfo.user_info")
                      .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                      .limit(10)
                      .offset(Number(page) * 10);
  console.log(books);
  ctx.state.data = {list:books.map(v=>{
    const info = JSON.parse(v.user_info);
    return Object.assign({},v,{
      user_info:{
        nickName:info.nickName
      }
    })
  })};
  await next();
};
