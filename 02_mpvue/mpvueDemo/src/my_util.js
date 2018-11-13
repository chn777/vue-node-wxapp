//工具函数库
import my_config from './my_config'

function httpReq(url,method,data)
{
  return new Promise((resolve,reject)=>{
    wx.request(
      {
        data,method,
        url:my_config.host+url,
        success:function (res) {
          if(res.data.code == 0 ){
            resolve(res.data.data)
          }
          else{
            reject(res)
          }
        },
        fail:reject
      });
  })
}

const myUtil = {
    get:function (url,data)
    {
      return httpReq(url,"GET",data);
    },
    post(url,data)
    {
      return httpReq(url,"POST",data);
    }
};

export default myUtil



