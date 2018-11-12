//工具函数库
import my_config from './my_config'

const myUtil = {
    get:function (url,data)
    {
      return new Promise((resolve,reject)=>{
        wx.request(
          {
            url:my_config.host+url,
            data:data,
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
};

export default myUtil



