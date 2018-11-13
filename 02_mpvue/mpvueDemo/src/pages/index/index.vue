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
  export default {
    components: {YearPageProgress},
    data () {
      return {
        userinfo: {
          avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
          nickName: ''
        }
      }
    },
    methods:{
      scanBook() {
        wx.scanCode({
          success (res) {
            console.log(res)
          }
        })
      }
    }
    ,
    created(){
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
