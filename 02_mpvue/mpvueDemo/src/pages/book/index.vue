<template>
	<div>
    <book-item :key="books.id" v-for="book of books" :book="book"></book-item>
  </div>
</template>

<script>
  import my_util from '@/my_util'
  import BookItem from "@/components/BookItem";
	export default {
		name: "index",
    components: {BookItem},
    data() {
		  return {
		    books:[]
      }
    },
    methods:{
      async getBookList() {
        wx.showNavigationBarLoading();
        try
        {
          const res = await my_util.get('/weapp/booklist');
          console.log(res);
          this.books = res.list;
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
      this.getBookList();
		  console.log("下拉")
    }
    ,
    created()
    {
		  this.getBookList()
    }
	}
</script>

<style scoped>

</style>
