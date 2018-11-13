<template>
  <div>


    <div class="container">
      <div class="userinfo" >
        <img :src="userinfo.avatarUrl" alt="">
        <p>{{userinfo.nickName}}</p>

      </div>

      <year-page-progress></year-page-progress>

      <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
      <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>

    </div>


  </div>
</template>

<script>
  import YearPageProgress from '@/components/YearProgress'
  import config from '@/my_config'
  import my_util from '@/my_util'
  import qcloud from 'wafer2-client-sdk'
  export default {
    components: {YearPageProgress},
    data () {
      return {
        userinfo: {
          avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
          nickName: '点击登录'
        }
      }
    },
    methods:{
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
      },
      //获取豆瓣读书信息
      async getBook(isbn) {
        console.log(config.getBookUrl);
        try
        {
          const res = await my_util.post('/weapp/getbook',{isbn,openId:this.userinfo.openId});
          console.log(res);
          wx.showToast({
            title: res.title+'添加成功'
          });
        }
        catch (e) {

          console.log('cn7err',e.data.data.msg,e);
          wx.showModal({
            title: '提示',
            content:e.data.data.msg
          });
        }

      },
      //扫描图书isbn编码
      scanBook() {
        wx.scanCode(
          {success:(res)=>
            {
              if(res.result)
              {
                  this.getBook(res.result)
              }
            }
          });
      }
    }
    ,
    onShow() {

      wx.showShareMenu();
      let userinfo = wx.getStorageSync('userinfo');
      if (userinfo)
      {
        this.userinfo = userinfo
      }

    }
  }
</script>

<style scoped lang='scss'>
  .container
  {
    padding:0 30rpx;

  }
  .userinfo
  {
    margin-top:100rpx;
    text-align:center;
    img
    {
      width: 150rpx;
      height:150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }


</style>
