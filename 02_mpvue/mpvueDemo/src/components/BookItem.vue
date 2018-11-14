<template>
  <a :href="detailUrl">
    <div class="book-card">
    <div class="thumb">
      <img :src="book.image"
           class="img"
           mode="aspectFit"
      />
    </div>
    <div class="detail">
      <div class="row text-primary">
        <div class="left">
          {{book.title}}
        </div>
        <div class="right">
        {{book.rate}}
        <my-rate  :value='book.rate'></my-rate>
      </div>
      </div>
      <div class="row">
        <div class="left">
          {{book.author}}
        </div>
        <div class="right text-primary">
          浏览量:{{book.count}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          {{book.publisher}}
        </div>
        <div class="right">
          {{book.user_info.nickName}}
        </div>
      </div>


    </div>
  </div>
  </a>
</template>

<script>
  import myRate from '@/components/myRate';
  import Rate from 'vue-tiny-rate';
	export default {
		name: "BookItem",
    components:{
      myRate
    },
    computed:{
      detailUrl() {
        return "../detail/main?id="+this.book.id
      }
    },
    props:{
		  book:{
		    type:Object
      }
    }
	}
</script>

<style lang='scss' scoped>
  .book-card{
    padding:5px;
    overflow: hidden;
    margin-top:5px;
    margin-bottom:5px;
    font-size:14px;
    border-bottom: 1px solid lightgray;
    .thumb{
      width:90px;
      height:90px;
      float: left;
      margin:0 auto;
      overflow:hidden;
      .img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .detail{
      margin-left: 100px;
      .row{
        line-height:20px;
        margin-bottom:3px;
        display: flex;
      }
        .right{
          /*float: right;*/
          flex: 1;

        }
        .left{
          /*margin-right:80px;*/
          flex: 1;
        }
    }

  }
</style>


