<script>

import my_util from '@/my_util';
import config from '@/my_config'

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

      }

    },
    async created ()
    {
      const res = await my_util.get('/weapp/demo');
      console.log(123,res);
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
