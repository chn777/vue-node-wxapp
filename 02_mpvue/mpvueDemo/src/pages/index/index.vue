<template>
  <div>
      主页

    <div class="container">
      <div class="userinfo" >
        <img :src="userinfo.avatarUrl" alt="">
        <p>{{userinfo.nickName}}</p>
      </div>
      <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
      <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>

    </div>

  </div>
</template>

<script>

  import qcloud from 'wafer2-client-sdk'
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
    onShow ()
    {
      this.login();
      wx.showShareMenu();
      let userinfo = wx.getStorageSync('userinfo');
      if (userinfo) {
        this.userinfo = userinfo
      }
    }
  }
</script>

<style scoped >



</style>
