// 登录授权接口
module.exports = async (ctx, next) => {
  ctx.state.data = {msg:"hello"}
  await next();
}
