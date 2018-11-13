<script>

import my_util from '@/my_util';
import config from '@/my_config'
import qcloud from 'wafer2-client-sdk'

export default {
  data () {
    return {
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  methods:
  {
      //简单登录测试
      myloging:function () {
        qcloud.setLoginUrl(config.loginUrl);
        qcloud.login({
          success: function (userInfo) {
            console.log('登录成功', userInfo);
          },
          fail: function (err) {
            console.log('登录失败', err);
          }
        });

      },
      loginSuccess (res)
      {
        wx.showToast({
          title: '登录成功'
        });
        wx.setStorageSync('userinfo', res);
        this.userinfo = res
      },
      login ()
      {
        wx.showToast({
          title: '登录中',
          icon: 'loading'
        });
        qcloud.setLoginUrl(config.loginUrl);
        const session = qcloud.Session.get();
        if (session)
        {
          qcloud.loginWithCode({
            success: res => {
              console.log('没过期的登录', res);
              this.loginSuccess(res)
            },
            fail: err => {
              console.error(err)
            }
          });
        }
        else
        {
          qcloud.login({
            success: res => {
              console.log('登录成功', res);
              this.loginSuccess(res)
            },
            fail: err => {
              console.error(err)
            }
          });
        }
      }
    },
    async created ()
    {
      const res = await my_util.get('/weapp/demo');
      console.log(123,res);
      await this.login()
    }
}
</script>

<style>
  .btn{
    color:white;
    background:#EA5A49;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-left: 15px;
    border-radius: 2px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width: 100%;
  }
  .btn:active{
    background: #FA5A49;
  }
</style>
