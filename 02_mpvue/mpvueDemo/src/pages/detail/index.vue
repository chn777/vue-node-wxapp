<template>
  <div>图书ID{{book}}</div>
</template>

<script>
  import my_util from '@/my_util'
  export default {
    name: "index",
    data() {
      return {
        book:"",
      }
    },
    methods:{
      async getDetailInfo() {
        const info = await my_util.get('/weapp/bookdetail',{id:this.book});
        console.log(info);
        return info;
      }
    },
    mounted() {
      const queryObj = this.$root.$mp.query;
      console.log(queryObj)
      this.book = queryObj.id;
      this.getDetailInfo()

    }
  };
</script>

<style scoped>

</style>
