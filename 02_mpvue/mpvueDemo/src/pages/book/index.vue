<template>
	<div>
    <top-swiper :tops = "topList"></top-swiper>
    <book-item :key="books.id" v-for="book of books" :book="book"></book-item>
    <p v-if="!more" style="font-size: 10px;color: brown;text-align: center">没有更多数据</p>
  </div>
</template>

<script>
  import my_util from '@/my_util'
  import BookItem from "@/components/BookItem";
  import TopSwiper from "@/components/TopSwiper";
	export default {
		name: "index",
    components: {BookItem,TopSwiper},
    data() {
		  return {
		    books:[],
        page:0,
        more:true,
        topList:[]
      }
    },
    methods:{
		  async getTops() {
        const res = await my_util.get('/weapp/tops');
        this.topList = res.booklist;
      },
      async getBookList(init) {
        if(init){
          this.page = 0
        }
        wx.showNavigationBarLoading();
        try
        {
          const res = await my_util.get('/weapp/booklist',{page:this.page});
          console.log(res);
          if(this.page > 0 && res.list.length < 10){
            this.more = false;
          }
          else
          {
            this.more = true
          }
          if(init){
            this.books = res.list;
          }
          else
          {
            this.books = this.books.concat(res.list)
          }

          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
        }
        catch (e) {
          console.log(e);
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
        }

      },
    },
    onPullDownRefresh(){
      this.getBookList(true);
      this.getTops();
		  console.log("下拉")
    },
    onReachBottom(){
		  console.log('bottom');
		  if(this.more)
		  {
		    this.page+=1;
		    this.getBookList()
      }
      else
      {
		    return;
      }
    },
    created()
    {
		  this.getBookList(true)
      this.topList = this.getTops();
    }
	}
</script>

<style scoped>

</style>
