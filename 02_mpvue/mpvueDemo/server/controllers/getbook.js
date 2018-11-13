const https = require('https');
const httpsGet = require('util').promisify(https.get);

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
  if(isbn&&openId){
    const url = `https://api.douban.com/v2/book/isbn/${isbn}`
    const bookInfo = await getJSON(url);
    const {title,image,alt,publisher,summary,price ,tags,author} = bookInfo;
    const tagStr = tags.map(item=>{return `${item.name} ${item.count}` }).join(',');
    const authorStr = author.join(',')
    // tags.forEach(item=>tagStr+=(item.name +' '+ item.count+','));
    console.log({title,image,alt,publisher,summary,price ,tagStr,authorStr});
  }
  await next();
}
