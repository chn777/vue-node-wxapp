const {mysql} = require('../qcloud');

module.exports = async(ctx,next) =>{
    //post获取的参数都在ctx.request.body属性中
  const line = ctx.request.body;
  console.log('tag', line);
  try{
    await mysql("comments").insert(line);
    ctx.state = {
      code:0,
      data:{
        msg:'评论成功'
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