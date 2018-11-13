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
    const data = await getJSON(url);
    console.log(data);
  }
  await next();
}
