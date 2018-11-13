//引入MySQL实例
const { mysql } = require('../qcloud');

module.exports = async(ctx,next) =>
{
  const books = await mysql('books').select();
  console.log(books);
  ctx.state.data = {list:books};
  await next();
};
