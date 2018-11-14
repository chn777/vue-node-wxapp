<template>
  <div class='bookinfo'>
    <div class="thumb">
      <img class='back'
           :src="info.image"
           mode='aspectFill'>
      <img class="img"
           :src="info.image"
           mode='aspectFit'
      >
      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="left">
        添加人:
        <img :src="userinfo.avatarUrl" class='avatar' mode='aspectFit'>
        {{userinfo.nickName}}
      </div>
      <div class="right text-primary">
        {{info.rate}}分
        <my-rate :value='info.rate'></my-rate>
      </div>
    </div>
    <div class="detail">
      <div class="left">{{info.publisher}}</div>
      <div class="right">
        {{info.price}}
      </div>
    </div>
    <div class="tags">
      <div class="badge" :key='tag' v-for='tag in info.tags'>{{tag}}</div>
    </div>
    <div class="summary">
      <p :key='i' v-for='(sum,i) in info.summary'>{{sum}}</p>
    </div>
  </div>
</template>

<script>
  import myRate from '@/components/myRate'
  export default {
    components: {
      myRate
    },
    props: ['info'],
    computed: {
      userinfo () {
        return this.info.user_info || {}
      }
    },
    created() {
      wx.showShareMenu();
    }
  }
</script>

<style lang='scss'>
  .bookinfo{
    font-size: 14px;

    .badge{
      display: inline-block;
      margin:5px;
      padding:5px;
      border-radius: 10px;
      border:1px #EA5A49 solid;
      color:#EA5A49;
    }
    .summary{
      padding:0 15px;
      margin-top:10px;
      p{
        text-indent: 2em;
        font-size:14px;
      }
    }

    .detail{
      padding:5px 10px;
      display: flex;
      .left{
        flex: 1;
      }
      .right{
        flex: 1;
        text-align: right;
      }
      .avatar{
        width:20px;
        height:20px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .thumb{
      width:750rpx;
      height:500rpx;
      overflow:hidden;
      position: relative;
      .back{
        filter: blur(15px);
        width:100%;
      }
      .img{
        position: absolute;
        width:100%;
        height:300rpx;
        left:0;
        top:30rpx;
      }
      .info{
        color:white;
        position: absolute;
        width:100%;
        left:0;
        top:330rpx;
        text-align: center;
        .title{
          font-size:20px;
        }
        .author{
          font-size: 14px;
        }

      }
    }
  }
</style>

