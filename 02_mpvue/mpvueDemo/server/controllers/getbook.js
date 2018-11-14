const https = require('https');
//引入MySQL实例
const {mysql} = require('../qcloud');

async function getJSON(url){
  let dataStr = "";
  let bookData = "";

  return new Promise((resolve,reject)=>{
      https.get(url,res => {
        res.on('data',data=>{
          dataStr += data;
        });
        res.on('end',()=>{
          bookData = JSON.parse(dataStr);
          if(bookData.title){
            resolve(bookData);
          }
          else reject();
        });
      })
  });

}




//查询图书信息
module.exports = async (ctx, next) => {
  //post获取的参数都在ctx.request.body属性中
  const {isbn,openId} = ctx.request.body;
  const openid = openId;
  if(isbn&&openId)
  {
    const exitsBooks = await mysql('books').select().where('isbn',isbn);
    if(exitsBooks.length)
    {
      ctx.state = {
        code:-1,
        data:{
          msg:'图书已存在'
        }
      };
      return ;
    }


    const url = `https://api.douban.com/v2/book/isbn/${isbn}`
    const bookInfo = await getJSON(url);
    const {title,image,alt,publisher,summary,price} = bookInfo;
    console.log(bookInfo);
    const tags = bookInfo.tags.map(item=>{return `${item.name} ${item.count}` }).join(',');
    const author = bookInfo.author.join(',')
    const lineObj = {isbn,openid,title,image,alt,publisher,summary,price,tags,author,rate:bookInfo.rating.average};
    console.log('rate===',lineObj);
    try{
      await mysql("books").insert(lineObj);
      ctx.state = {
        code:0,
        data:{
          msg:'成功',title
        }
      }
    }
    catch (e)
    {
      console.log('insert error',e);
      ctx.state = {
        code:-1,
        data:{
          msg:'新增失败' + e.sqlMessage
        }
      }
    }
  }
  await next();
}
