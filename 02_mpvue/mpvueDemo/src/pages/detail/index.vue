<template>
  <div>
    <book-info :info="info"></book-info>
  </div>
</template>

<script>
  import my_util from '@/my_util'
  import BookInfo from "@/components/BookInfo"
  export default {
    name: "index",
    components:{BookInfo},
    data() {
      return {
        book:"",
        info:{}
      }
    },
    methods:{
      async getDetailInfo() {
        this.info = await my_util.get('/weapp/bookdetail',{id:this.book});
        console.log('detailInfo',info);
        wx.setNavigationBarTitle({title: this.info.title});

        return info;
      }
    },
    mounted() {
      const queryObj = this.$root.$mp.query;
      console.log(queryObj);
      this.book = queryObj.id;
      this.getDetailInfo();
    }
  };
</script>

<style scoped>

</style>
